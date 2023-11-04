from backend.mixins import ImageFormMixin

from .models import Company


class CompanyAdminForm(ImageFormMixin):
    class Meta:
        model = Company
        fields = "__all__"
