from django.urls import path

from .views import OfferApplicationHistoryView, OfferDetailsView, OfferListView

urlpatterns = [
    path("", OfferListView.as_view(), name="offers"),
    path("<int:pk>/", OfferDetailsView.as_view(), name="offer_details"),
    path("apply/", OfferApplicationHistoryView.as_view(), name="apply_offer"),
]
