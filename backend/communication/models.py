from textwrap import shorten

from django.db import models
from django.utils.html import strip_tags
from tinymce.models import HTMLField

from candidates.models import Candidate
from companies.models import Company
from users.models import User


class Message(models.Model):
    class MessageStatus(models.TextChoices):
        SCHEDULED = "scheduled", "Scheduled"
        SENT = "sent", "Sent"
        PARTIAL_SUCCESS = "partial_success", "Partial success"
        FAILED = "failed", "Failed"

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="created at")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="updated at")
    send_at = models.DateTimeField(
        verbose_name="send at",
        auto_now=False,
        auto_now_add=False,
        blank=True,
        null=True,
        help_text="When both fields are empty message is sent immediately",
    )
    tasks_start_time = models.DateTimeField(
        verbose_name="Sending started at",
        auto_now=False,
        auto_now_add=False,
        blank=True,
        null=True,
        help_text="Time when the messages sending began",
    )
    tasks_finish_time = models.DateTimeField(
        verbose_name="Sending finished at",
        auto_now=False,
        auto_now_add=False,
        blank=True,
        null=True,
        help_text="Time when all messages have been sent",
    )
    status = models.CharField(
        verbose_name="message status",
        choices=MessageStatus.choices,
        max_length=15,
        blank=True,
        default=MessageStatus.SCHEDULED,
    )
    sender = models.ForeignKey(
        User,
        verbose_name="sender",
        related_name="sender",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    title = models.CharField(
        verbose_name="email subject",
        max_length=150,
        blank=True,
    )
    company = models.ManyToManyField(
        Company,
        blank=True,
        verbose_name="send to: companies",
    )
    candidate = models.ManyToManyField(
        Candidate,
        blank=True,
        verbose_name="send to: candidates",
    )
    content = HTMLField(verbose_name="message content")
    rq_task_id = models.CharField(max_length=36, blank=True)
    task_info = models.TextField(verbose_name="task info", blank=True)

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"

    def __str__(self):
        text = self.title if self.title else strip_tags(self.content)
        max_length = 20
        return shorten(text, max_length, placeholder="...")
