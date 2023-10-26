from django.urls import path

from candidates.views import CandidateAPIView

urlpatterns = [
    path("", CandidateAPIView.as_view(), name="candidate_api"),
]
