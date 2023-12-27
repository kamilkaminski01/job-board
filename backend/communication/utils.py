from django.contrib import messages
from django.http import HttpRequest


def add_err_msg_at_change_when_task_in_progress(request: HttpRequest) -> None:
    messages.add_message(
        request,
        messages.ERROR,
        "Cannot change the data of a message while it is being sent",
    )
