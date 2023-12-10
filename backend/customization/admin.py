from django.contrib import admin

from .models import Customization


class CustomizationAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


admin.site.register(Customization, CustomizationAdmin)
