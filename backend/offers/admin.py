from typing import Optional

from django.contrib import admin
from django.db.models import QuerySet

from companies.models import Company

from .forms import OfferForm
from .models import Offer, TechStack


class TechStackAdminInline(admin.TabularInline):
    model = TechStack
    extra = 0


class CandidatesInline(admin.TabularInline):
    model = Offer.candidates.through
    verbose_name = "Candidates"
    verbose_name_plural = "Candidates"

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


class OfferAdmin(admin.ModelAdmin):
    inlines = [TechStackAdminInline, CandidatesInline]
    form = OfferForm
    list_display = [
        "title",
        "company",
        "candidates_count",
        "created_at",
    ]
    ordering = ["-created_at"]
    search_fields = ["title", "company__name"]

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            company = Company.objects.get(id=request.user.id)
            form.base_fields["company"].initial = company
            form.base_fields["company"].widget.attrs["disabled"] = True
        return form

    def get_queryset(self, request) -> QuerySet[Offer]:
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            company = Company.objects.get(id=request.user.id)
            queryset = queryset.filter(company=company)
        return queryset

    def has_change_permission(self, request, obj: Optional[Offer] = None) -> bool:
        if not request.user.is_superuser:
            company = Company.objects.get(id=request.user.id)
            return obj is not None and obj.company == company
        return True

    def candidates_count(self, obj: Offer) -> int:
        return obj.candidates.count()

    candidates_count.short_description = "Candidates applied"  # type: ignore


admin.site.register(Offer, OfferAdmin)
