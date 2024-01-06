from typing import List, Optional

from django.contrib import admin
from django.db.models import QuerySet
from django.http import HttpRequest

from companies.models import Company

from .forms import OfferForm
from .models import Offer, OfferApplicationHistory, TechStack


class TechStackAdminInline(admin.TabularInline):
    model = TechStack
    extra = 0


class OfferApplicationHistoryInline(admin.TabularInline):
    model = OfferApplicationHistory

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


class OfferAdmin(admin.ModelAdmin):
    inlines = [TechStackAdminInline, OfferApplicationHistoryInline]
    form = OfferForm
    list_display = [
        "order",
        "is_promoted",
        "title",
        "company",
        "candidates_applied",
        "created_at",
    ]
    list_display_links = ["title"]
    search_fields = ["title", "company__name"]

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            company = Company.objects.get(id=request.user.id)
            form.base_fields["company"].queryset = Company.objects.filter(id=company.id)
            form.base_fields["company"].initial = company
            form.base_fields["order"].disabled = True
            form.base_fields["is_promoted"].disabled = True
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

    def candidates_applied(self, obj: Offer) -> int:
        return obj.offer_application_history.count()

    def save_model(
        self, request: HttpRequest, obj: Offer, form: OfferForm, change: bool
    ):
        if obj.order == 0:
            last_offer = Offer.objects.all().order_by("-order").first()
            obj.order = last_offer.order + 1 if last_offer else 1
        super().save_model(request, obj, form, change)

    candidates_applied.short_description = "Candidates applied"  # type: ignore


class OfferApplicationHistoryAdmin(admin.ModelAdmin):
    list_display = ["__str__", "application_date"]

    def get_readonly_fields(
        self, request: HttpRequest, obj: Optional[OfferApplicationHistory] = None
    ) -> List:
        if obj is None:
            return []
        else:
            return ["candidate", "offer"]

    def get_queryset(
        self, request, obj: Optional[OfferApplicationHistory] = None
    ) -> QuerySet[OfferApplicationHistory]:
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            company = Company.objects.get(id=request.user.id)
            queryset = queryset.filter(offer__company=company)
        return queryset


admin.site.register(Offer, OfferAdmin)
admin.site.register(OfferApplicationHistory, OfferApplicationHistoryAdmin)
