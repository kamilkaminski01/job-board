import logging
import re
from functools import cached_property
from itertools import chain
from typing import TypeVar

import boto3
from botocore.exceptions import ClientError
from django.db.models import Model, QuerySet
from django.utils.timezone import localtime
from django_rq import job
from rq import get_current_job
from rq.job import Job

from backend import settings
from communication.models import Message

from .exceptions import InvalidAWSCredentials

logger = logging.getLogger(__name__)

custom_formatting_re = re.compile(r"{(.*?)}|{}")

accepted_formatting = ["{surname}", "{name}"]

T = TypeVar("T", bound=Model)


class AWSClient:
    @cached_property
    def email_client(self):
        try:
            return boto3.client(
                service_name="sesv2",
                region_name=settings.AWS_REGION,
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            )
        except ClientError as e:
            logger.error("AWS ClientError: %s", e)
            raise InvalidAWSCredentials("Check for AWS perms and credentials")


def create_recipients_list(companies: QuerySet, candidates: QuerySet) -> list:
    return [recipient for recipient in chain(companies, candidates)]


def change_model(obj: T, **kwargs) -> None:
    for key, new_value in kwargs.items():
        setattr(obj, key, new_value)
    obj.save()


def replace_email_non_accepted_formatting(match: re.Match) -> str:
    if (to_replace := match.group(0)) not in accepted_formatting:
        return ""
    else:
        return f"{{{to_replace}}}"


def check_if_message_uses_custom_formatting(message: str) -> bool:
    return bool(re.search(custom_formatting_re, message))


def adjust_template_to_aws_standard(template: str) -> str:
    return re.sub(custom_formatting_re, replace_email_non_accepted_formatting, template)


@job
def update_message_status(message_id: int, **kwargs) -> None:
    """
    - This function takes its params, gets ids of the messages which were passed as
    `depends_on` and checks if any of them failed.
    - If so it changes status to `FAILED` and sets `tasks_finish_time` to the current
    time using `change_model` function
    """
    if this_job := get_current_job():
        failed_amount = _get_amount_of_failed_dependency_jobs(this_job._dependency_ids)
        failed_task_info = None
        if failed_amount == len(this_job._dependency_ids):
            status = Message.MessageStatus.FAILED
            failed_task_info = "All tasks have failed."
        elif failed_amount == 0:
            status = Message.MessageStatus.SENT
        else:
            status = Message.MessageStatus.PARTIAL_SUCCESS
            failed_task_info = "%(task_amount)d tasks have failed." % {
                "task_amount": failed_amount
            }
        finish_time = localtime()

        try:
            message_obj = Message.objects.get(pk=message_id)
            if failed_task_info:
                if message_obj.task_info:
                    kwargs.update(
                        {"task_info": f"{message_obj.task_info} {failed_task_info}"}
                    )
                else:
                    kwargs.update({"task_info": failed_task_info})

            change_model(
                obj=message_obj,
                status=status,
                tasks_finish_time=finish_time,
                **kwargs,
            )
        except Message.DoesNotExist as exc:
            logger.warning(
                "Message obj does not exist while preparing a message: %s", exc
            )


def _get_amount_of_failed_dependency_jobs(job_ids_list: list[str]) -> int:
    amount = 0
    for job_id in job_ids_list:
        if Job.fetch(job_id).is_failed:
            amount += 1
    return amount
