from django.urls import include, path

from candidates.views import CandidateAPIView

urlpatterns = [
    path("", CandidateAPIView.as_view(), name="candidate_api"),
    path(
        "offer-application-history/",
        include("offers.user_urls"),
        name="offer_application_history",
    ),
]
