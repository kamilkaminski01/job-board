from backend.mixins import ImageFormMixin

from .models import Candidate


class CandidateAdminForm(ImageFormMixin):
    class Meta:
        model = Candidate
        fields = "__all__"
