from django.contrib import admin
from django.db.models import QuerySet
from django.http import HttpRequest

from .forms import OfferForm
from .models import Offer, TechStack


class TechStackAdmin(admin.TabularInline):
    model = TechStack
    extra = 1


class OfferAdmin(admin.ModelAdmin):
    inlines = [TechStackAdmin]
    form = OfferForm
    list_display = [
        "title",
        "company",
        "created_at",
    ]
    ordering = ["-created_at"]

    def get_queryset(self, request: HttpRequest) -> QuerySet[Offer]:
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(company=request.user.company)  # type: ignore

    def has_change_permission(self, request: HttpRequest, obj=None) -> bool:
        return request.user.is_superuser or (
            obj is not None and obj.company == request.user.company  # type: ignore
        )


admin.site.register(Offer, OfferAdmin)
