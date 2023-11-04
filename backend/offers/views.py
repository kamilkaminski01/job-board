from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

from .models import Offer
from .serializers import OfferListSerializer


class OfferPagination(PageNumberPagination):
    page_size = 10


class OfferListView(ListAPIView):
    serializer_class = OfferListSerializer
    queryset = Offer.objects.all().order_by("-created_at")
    pagination_class = OfferPagination
