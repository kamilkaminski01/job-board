from django.contrib import admin
from django.utils.html import format_html

from users.admin import UsersAdmin

from .models import Candidate, Image
from .utils import does_file_exist


class ImageInline(admin.TabularInline):
    model = Image


class CandidateAdmin(UsersAdmin):
    inlines = [ImageInline]
    add_fieldsets = UsersAdmin.change_fields_in_add_fieldsets(
        additional_general_fields=[
            "bio",
            "github_url",
            "linkedin_url",
        ],
    )
    fieldsets = UsersAdmin.change_fields_in_fieldsets(
        additional_general_fields=[
            "bio",
            "github_url",
            "linkedin_url",
        ],
    )
    list_display = [
        "image_preview",
        "email",
        "first_name",
        "last_name",
    ]
    list_display_links = ["email"]

    def image_preview(self, obj: Candidate) -> str:
        if not does_file_exist(obj.image.image):
            return "-"
        return format_html(
            '<img src="{url}" width=50px height=50px/>',
            url=obj.image.image.url,
        )


admin.site.register(Candidate, CandidateAdmin)
