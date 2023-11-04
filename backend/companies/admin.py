from django.contrib import admin
from django.utils.html import format_html

from backend.utils import does_file_exist
from offers.models import Offer
from users.admin import UsersAdmin

from .forms import CompanyAdminForm
from .models import Company


class CompanyOffersAdmin(admin.TabularInline):
    model = Offer
    show_change_link = True

    def get_readonly_fields(self, request, obj=None):
        return (
            "title",
            "salary_min",
            "salary_max",
            "currency",
            "description",
            "work_type",
            "employment_type",
            "experience",
        )

    def has_add_permission(self, request, obj=None):
        return False


class CompanyAdmin(UsersAdmin):
    add_fieldsets = UsersAdmin.change_fields_in_add_fieldsets(
        additional_general_fields=["name", "description", "image"],
        excessive_general_fields=["first_name", "last_name"],
        excessive_advanced_fields=["is_staff"],
    )
    fieldsets = UsersAdmin.change_fields_in_fieldsets(
        additional_general_fields=["name", "description", "image"],
        excessive_general_fields=["first_name", "last_name"],
        excessive_advanced_fields=["is_staff"],
    )
    inlines = [CompanyOffersAdmin]
    form = CompanyAdminForm
    list_display = [
        "image_preview",
        "name",
        "email",
    ]
    list_display_links = ["name"]
    search_fields = ["name", "email"]

    def image_preview(self, obj: Company) -> str:
        if not does_file_exist(obj.image):
            return "-"
        return format_html(
            '<img src="{url}" width=50px height=50px/>',
            url=obj.image.url,
        )


admin.site.register(Company, CompanyAdmin)
