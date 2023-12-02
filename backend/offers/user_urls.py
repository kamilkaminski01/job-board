from django.urls import path

from .views import OfferApplicationHistoryListView

urlpatterns = [
    path(
        "",
        OfferApplicationHistoryListView.as_view(),
        name="offer_application_history",
    ),
]
