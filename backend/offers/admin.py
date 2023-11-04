from django.contrib import admin

from .models import Offer, TechStack


class TechStackAdmin(admin.TabularInline):
    model = TechStack
    extra = 1


class OfferAdmin(admin.ModelAdmin):
    inlines = [TechStackAdmin]
    list_display = [
        "title",
        "company",
    ]


admin.site.register(Offer, OfferAdmin)
