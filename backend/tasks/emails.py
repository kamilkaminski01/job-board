import binascii
import json
import logging
import os
from dataclasses import dataclass
from datetime import datetime
from typing import Tuple

from botocore.exceptions import ClientError
from django.utils.html import strip_tags
from django.utils.timezone import localtime
from django_rq import get_queue, job
from rq import Retry
from rq.job import Dependency

from backend import settings
from communication.models import Message

from .exceptions import EmailDataParameterInvalidError, EmptyEmailReceiversListError
from .utils import (
    AWSClient,
    adjust_template_to_aws_standard,
    change_model,
    check_if_message_uses_custom_formatting,
    create_recipients_list,
    update_message_status,
)

logger = logging.getLogger(__name__)

default_queue = get_queue("default")


@dataclass(frozen=True)
class EmailData:
    subject: str
    send_from: str
    send_to: list[str]
    plain_msg: str
    html_msg: str
    attachment: bytes = b""

    def validate_params(self):
        if not isinstance(self.send_to, list) or len(self.send_to) == 0:
            raise EmptyEmailReceiversListError(
                "send_to parameter is not a list or it's empty"
            )

        if self.subject == "":
            raise EmailDataParameterInvalidError("subject param is empty")
        if self.send_from == "":
            raise EmailDataParameterInvalidError("send_from param is empty")
        if self.html_msg == "":
            raise EmailDataParameterInvalidError("html_msg param is empty")
        if self.plain_msg == "":
            raise EmailDataParameterInvalidError("plain_msg is empty")


def schedule_communicational_email_task(send_at: datetime, message_id: int) -> str:
    """Checks if `send_at` is now or in the past or in the future, schedules
    `prepare_email` and returns job id to save in db."""
    if localtime(send_at) <= localtime():
        rq_job = prepare_email.delay(message_id=message_id)
    else:
        rq_job = default_queue.enqueue_at(
            send_at,
            prepare_email,
            message_id=message_id,
        )
    return rq_job.id


@job("default", retry=Retry(max=settings.RQ_RETRIES_COUNT, interval=10))
def prepare_email(message_id: int) -> None:
    try:
        message_obj = Message.objects.get(pk=message_id)
    except Message.DoesNotExist as exc:
        logger.warning("Message does not exist while preparing an email: %s", exc)
        return

    change_model(obj=message_obj, tasks_start_time=localtime())

    uses_formatting = check_if_message_uses_custom_formatting(message_obj.content)
    send_to_limiter = 50 if uses_formatting else 1
    # AWS allows only up to 50 mails to send at one api call, else we use 1 for
    # non-templated emails
    email_data_list, recipient_groups_list = _prepare_email_data(
        message_obj=message_obj,
        send_from="kamilkaminski39@gmail.com",
        max_send_to_amount=send_to_limiter,
    )
    if uses_formatting and email_data_list:
        _run_templated_email_process(
            email_data_list=email_data_list,
            recipient_groups=recipient_groups_list,
            message_obj=message_obj,
        )
    else:
        jobs_list = []
        for email_data in email_data_list:
            email_job = send_email.delay(email_data)
            jobs_list.append(email_job)

        _change_email_status_after_scheduling(jobs_list, message_obj)


def _prepare_email_data(
    message_obj: Message, send_from: str, max_send_to_amount: int
) -> tuple[list[EmailData], list[list]]:
    candidates = message_obj.candidate.all()
    companies = message_obj.company.all()
    recipients = create_recipients_list(companies, candidates)
    valid_recipients = [recipient for recipient in recipients if recipient.email]
    if (removed_recipients_amount := len(recipients) - len(valid_recipients)) > 0:
        message_obj.task_info = "Skipped %(amount)d recipients without emails set." % {
            "amount": removed_recipients_amount
        }
        message_obj.save()

    if not valid_recipients:
        return [], []

    recipient_groups = []
    for index in range(0, len(valid_recipients), max_send_to_amount):
        recipient_groups.append(valid_recipients[index : index + max_send_to_amount])

    email_data_list = []
    for sublist in recipient_groups:
        data = EmailData(
            subject=message_obj.title,
            send_from=send_from,
            send_to=[recipient.email for recipient in sublist],
            plain_msg=strip_tags(message_obj.content),
            html_msg=message_obj.content,
        )
        email_data_list.append(data)

    return email_data_list, recipient_groups


def _run_templated_email_process(
    email_data_list: list[EmailData],
    recipient_groups: list[list],
    message_obj: Message,
) -> None:
    """Function used to run templated email process.

    Checks if message uses formatting then creates template calls
    `_prepare_bulk_email_data` and `send_bulk_templated_email` after all
    of it if changes message status
    using`_change_email_status_after_scheduling`
    """
    uses_custom_format = check_if_message_uses_custom_formatting(
        email_data_list[0].plain_msg
    )

    _, template_name = _create_email_template(email_data_list, uses_custom_format)

    jobs_list = []
    for email_data, group in zip(email_data_list, recipient_groups):
        bulk_email_data = _prepare_bulk_email_data(group)
        email_job = send_bulk_templated_email.delay(
            send_from=email_data.send_from,
            bulk_email_entries=bulk_email_data,
            template_name=template_name,
        )
        jobs_list.append(email_job)

    _change_email_status_after_scheduling(jobs_list, message_obj)


def _create_email_template(
    email_data_list: list[EmailData], uses_formatting: bool
) -> Tuple[dict, str]:
    """Creates email template on AWS SES and returns tuple containing response
    and template name to get it later."""
    template_name = binascii.b2a_hex(os.urandom(16)).decode()
    template_data: dict = {
        "TemplateName": template_name,
        "TemplateContent": {
            "Subject": email_data_list[0].subject,
            "Text": email_data_list[0].plain_msg,
            "Html": email_data_list[0].html_msg,
        },
    }

    if uses_formatting:
        template_data["TemplateContent"]["Text"] = adjust_template_to_aws_standard(
            email_data_list[0].html_msg
        )
        template_data["TemplateContent"]["Html"] = adjust_template_to_aws_standard(
            email_data_list[0].plain_msg
        )

    try:
        client = AWSClient().email_client
        response = client.create_email_template(**template_data)
        return response, template_name
    except client.exceptions.LimitExceededException as exc:
        logger.error("SES limit exceeded: %s", exc)
        raise exc
    except client.exceptions.AlreadyExistsException as exc:
        logger.error("SES template with this name already exists, creating new one")
        _create_email_template(email_data_list, uses_formatting)
        raise exc
    except ClientError as exc:
        logger.error("SES client error: %s", exc)
        raise exc


def _prepare_bulk_email_data(recipients: list) -> list[dict]:
    """Prepares list of personalized data used in email templates for every
    recipient."""
    bulk_email_data = []

    for recipient in recipients:
        user_template_data = {
            "name": recipient.first_name if recipient.first_name else "",
            "surname": recipient.last_name if recipient.last_name else "",
        }

        email_template_data = {
            "Destination": {
                "ToAddresses": [recipient.email],
            },
            "ReplacementEmailContent": {
                "ReplacementTemplate": {
                    "ReplacementTemplateData": json.dumps(user_template_data),
                }
            },
        }
        bulk_email_data.append(email_template_data)

    return bulk_email_data


@job("default", retry=Retry(max=settings.RQ_RETRIES_COUNT, interval=10))
def send_bulk_templated_email(
    send_from: str, bulk_email_entries: list[dict], template_name: str
) -> dict:
    """Sends bulk email using templates."""
    bulk_data = {
        "FromEmailAddress": send_from,
        "DefaultContent": {
            "Template": {
                "TemplateName": template_name,
                "TemplateData": json.dumps({"name": "", "surname": ""}),
            }
        },
        "BulkEmailEntries": bulk_email_entries,
    }

    try:
        client = AWSClient().email_client
        response = client.send_bulk_email(**bulk_data)
        _delete_email_template(template_name)
        return response
    except client.exceptions.LimitExceededException as exc:
        logger.error("SES limit exceeded: %s", exc)
        raise exc
    except client.exceptions.MailFromDomainNotVerifiedException as exc:
        logger.error("Domain not verified on SES platform: %s", exc)
        raise exc
    except ClientError as exc:
        logger.error("SES client error: %s", exc)
        raise exc


def _delete_email_template(template_name: str) -> dict:
    """Removes template from AWS using its name."""
    try:
        client = AWSClient().email_client
        response = client.delete_email_template(TemplateName=template_name)
        return response
    except ClientError as exc:
        logger.error("SES client error: %s", exc)
        raise exc


def _change_email_status_after_scheduling(
    jobs_list: list, message_obj: Message
) -> None:
    """Checks if jobs_list is not empty and if so it waits until all
    `depends_on` jobs are finished and then changes message status.

    If list is empty changes message status to `FAILED`
    """
    if jobs_list:
        dependency = Dependency(jobs=jobs_list, allow_failure=True)
        update_message_status.delay(message_id=message_obj.pk, depends_on=dependency)
    else:
        change_model(
            obj=message_obj,
            status=Message.MessageStatus.FAILED,
            tasks_finish_time=localtime(),
        )


@job("default", retry=Retry(max=settings.RQ_RETRIES_COUNT, interval=10))
def send_email(email_data: EmailData) -> dict:
    """Sends normal email to one person using AWS SES."""
    send_data: dict = {
        "FromEmailAddress": email_data.send_from,
        "Destination": {"ToAddresses": email_data.send_to},
        "Content": {},
    }

    send_data["Content"]["Simple"] = {
        "Subject": {"Data": email_data.subject},
        "Body": {
            "Text": {"Data": email_data.plain_msg},
            "Html": {"Data": email_data.html_msg},
        },
    }

    try:
        client = AWSClient().email_client
        response = client.send_email(**send_data)
        return response
    except client.exceptions.LimitExceededException as exc:
        logger.error("SES limit exceeded: %s", exc)
        raise exc
    except ClientError as exc:
        logger.error("SES client error: %s", exc)
        raise exc
    except (EmailDataParameterInvalidError, EmptyEmailReceiversListError) as exc:
        raise exc
