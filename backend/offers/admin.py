from django.contrib import admin

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


admin.site.register(Offer, OfferAdmin)
