from datetime import datetime
from textwrap import shorten
from typing import Optional

from django.contrib import admin
from django.contrib.admin import display
from django.db.models import F, QuerySet
from django.http import HttpRequest
from django.utils.html import strip_tags
from django.utils.timezone import localtime

from candidates.models import Candidate
from companies.models import Company
from users.models import User

from .forms import CommunicationForm
from .models import Message


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

    def save_model(
        self, request: HttpRequest, obj: Message, form: CommunicationForm, change: bool
    ) -> None:
        if obj.send_at is None:
            obj.send_at = localtime()

        obj.sender: User = request.user  # type: ignore
        obj.save()


admin.site.register(Message, CommunicationAdmin)
