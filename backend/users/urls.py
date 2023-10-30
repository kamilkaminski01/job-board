from django.urls import path

from candidates.views import CandidateAPIView, ImageAPIView

urlpatterns = [
    path("", CandidateAPIView.as_view(), name="candidate_api"),
    path("image/", ImageAPIView.as_view(), name="candidate_image_api"),
]
