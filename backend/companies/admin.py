from django.contrib import admin
from django.db.models import QuerySet
from django.http import HttpRequest
from django.utils.html import format_html

from backend.utils import does_file_exist
from offers.models import Offer
from users.admin import UsersAdmin

from .forms import CompanyAdminForm
from .models import Company


class CompanyOffersAdminInline(admin.TabularInline):
    model = Offer
    show_change_link = True
    fields = [
        "title",
        "salary_min",
        "salary_max",
        "currency",
        "work_type",
        "employment_type",
        "experience",
    ]
    readonly_fields = [
        "title",
        "salary_min",
        "salary_max",
        "currency",
        "work_type",
        "employment_type",
        "experience",
    ]

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
    inlines = [CompanyOffersAdminInline]
    form = CompanyAdminForm
    list_display = [
        "image_preview",
        "name",
        "email",
        "offers_count",
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

    def offers_count(self, obj: Company) -> int:
        return obj.offers.count()

    def get_queryset(self, request: HttpRequest) -> QuerySet[Company]:
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            queryset = queryset.filter(id=request.user.id)
        return queryset

    def has_change_permission(self, request: HttpRequest, obj=None) -> bool:
        return request.user.is_superuser or (
            obj is not None and obj.id == request.user.id
        )


admin.site.register(Company, CompanyAdmin)
