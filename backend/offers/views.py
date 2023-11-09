from rest_framework import filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination

from .models import Offer
from .serializers import OfferDetailsSerializer, OfferListSerializer


class OfferPagination(PageNumberPagination):
    page_size = 10


class OfferListView(ListAPIView):
    serializer_class = OfferListSerializer
    pagination_class = OfferPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "salary_max"]

    def get_queryset(self):
        queryset = Offer.objects.all()
        if min := self.request.query_params.get("min"):
            queryset = queryset.filter(salary_min__gte=min)
        if max := self.request.query_params.get("max"):
            queryset = queryset.filter(salary_max__lte=max)
        return queryset


class OfferDetailsView(RetrieveAPIView):
    serializer_class = OfferDetailsSerializer
    queryset = Offer.objects.all()
