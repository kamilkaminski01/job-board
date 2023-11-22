from django.contrib import admin
from django.http import HttpRequest
from django.utils.html import format_html

from backend.utils import does_file_exist
from users.admin import UsersAdmin

from .forms import CandidateAdminForm
from .models import Candidate


class CandidateAdmin(UsersAdmin):
    add_fieldsets = UsersAdmin.change_fields_in_add_fieldsets(
        additional_general_fields=[
            "image",
            "description",
            "github_url",
            "linkedin_url",
        ],
    )
    fieldsets = UsersAdmin.change_fields_in_fieldsets(
        additional_general_fields=[
            "image",
            "description",
            "github_url",
            "linkedin_url",
        ],
    )
    form = CandidateAdminForm
    list_display = [
        "image_preview",
        "email",
        "first_name",
        "last_name",
    ]
    list_display_links = ["email"]
    search_fields = ["email", "first_name", "last_name"]

    def image_preview(self, obj: Candidate) -> str:
        if not does_file_exist(obj.image):
            return "-"
        return format_html(
            '<img src="{url}" width=50px height=50px/>',
            url=obj.image.url,
        )

    def get_queryset(self, request: HttpRequest, obj=None):
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            # flake8: noqa
            queryset = queryset.filter(offers__company=request.user.company)  # type: ignore
        return queryset


admin.site.register(Candidate, CandidateAdmin)
