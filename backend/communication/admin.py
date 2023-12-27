import logging
from datetime import datetime
from html import unescape
from textwrap import shorten
from typing import Optional

from django.contrib import admin
from django.contrib.admin import display
from django.db.models import Count, F, QuerySet
from django.http import HttpRequest
from django.utils.html import strip_tags
from django.utils.timezone import localtime
from django_rq import get_connection
from django_rq.jobs import Job
from rq.exceptions import NoSuchJobError

from candidates.models import Candidate
from companies.models import Company
from tasks.emails import schedule_communicational_email_task
from users.models import User

from .forms import CommunicationForm
from .models import Message
from .utils import add_err_msg_at_change_when_task_in_progress

rq_connection = get_connection()

logger = logging.getLogger(__name__)


class CommunicationAdmin(admin.ModelAdmin):
    form = CommunicationForm
    list_display = [
        "sender",
        "msg_title",
        "stripped_content",
        "recipients",
        "scheduled_sending",
        "tasks_finish_time",
    ]
    readonly_fields = [
        "status",
        "sender",
        "tasks_start_time",
        "tasks_finish_time",
        "task_info",
    ]
    ordering = [
        F("tasks_finish_time").desc(nulls_last=True),  # type: ignore
        F("send_at").desc(nulls_last=True),  # type: ignore
    ]
    fieldsets = (
        (
            "General",
            {
                "classes": ("wide",),
                "fields": [
                    "title",
                    "content",
                    "send_at",
                    "status",
                    "sender",
                    "tasks_start_time",
                    "tasks_finish_time",
                    "task_info",
                ],
            },
        ),
        (
            "Recipients",
            {
                "classes": ("collapse",),
                "fields": [
                    "candidate",
                    "company",
                ],
            },
        ),
    )

    @display(description="Sending scheduled at", ordering="send_at")
    def scheduled_sending(self, obj: Message) -> Optional[datetime]:
        return obj.send_at

    @display(description="message content", ordering="content")
    def stripped_content(self, obj: Message) -> str:
        return shorten(strip_tags(obj.content), 20)

    @display(description="title", ordering="title")
    def msg_title(self, obj: Message) -> str:
        return "-" if not obj.title else obj.title

    @display(description="recipients", ordering="-recipients_amount")
    def recipients(self, obj: Message) -> str:
        related_candidates: QuerySet[Candidate] = obj.candidate.all()
        related_companies: QuerySet[Company] = obj.company.all()
        recipients_list = list(related_candidates) + list(related_companies)
        recipients_count = len(recipients_list)
        if recipients_count > 1:
            return (
                f"{recipients_list[0].first_name} {recipients_list[0].last_name}"
                f" (+{recipients_count - 1})"
            )
        elif recipients_count == 1:
            return f"{recipients_list[0].first_name} {recipients_list[0].last_name}"
        else:
            return "All recipients are deleted"

    def get_queryset(self, request: HttpRequest) -> QuerySet[Message]:
        queryset = super(CommunicationAdmin, self).get_queryset(request)
        return queryset.annotate(
            recipients_amount=Count("company", distinct=True)
            + Count("candidate", distinct=True)
        )

    def save_model(
        self, request: HttpRequest, obj: Message, form: CommunicationForm, change: bool
    ) -> None:
        if change and not obj.tasks_start_time:
            try:
                job = Job.fetch(obj.rq_task_id, connection=rq_connection)
                if not job.is_started:
                    job.delete()
                    obj.rq_task_id = ""
                else:
                    add_err_msg_at_change_when_task_in_progress(request)
                    return
            except NoSuchJobError as exc:
                logger.error("Tried to remove non existing job %s", exc)
                pass

        # rich text formatting works fine, but when user uses raw html it automatically
        # escapes it
        obj.content = unescape(obj.content)
        if obj.send_at is None:
            obj.send_at = localtime()

        obj.sender: User = request.user  # type: ignore
        obj.save()

        job_id = schedule_communicational_email_task(
            send_at=obj.send_at, message_id=obj.pk
        )

        obj.rq_task_id = job_id
        obj.save()


admin.site.register(Message, CommunicationAdmin)
