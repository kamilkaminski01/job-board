from django.db.models import QuerySet
from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from candidates.models import Candidate

from .models import Offer, OfferApplicationHistory
from .serializers import (
    OfferApplicationHistoryCreateSerializer,
    OfferApplicationHistoryListSerializer,
    OfferDetailsSerializer,
    OfferListSerializer,
)


class OfferPagination(PageNumberPagination):
    page_size = 20


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


class OfferApplicationHistoryCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OfferApplicationHistoryCreateSerializer
    queryset = OfferApplicationHistory.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(
        self, serializer: OfferApplicationHistoryCreateSerializer
    ) -> None:
        candidate = Candidate.objects.get(id=self.request.user.id)
        serializer.save(candidate=candidate)


class OfferApplicationHistoryListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = OfferPagination
    serializer_class = OfferApplicationHistoryListSerializer

    def get_queryset(self) -> QuerySet[OfferApplicationHistory]:
        candidate = Candidate.objects.get(pk=self.request.user.id)
        queryset = OfferApplicationHistory.objects.filter(candidate=candidate).order_by(
            "-application_date"
        )
        return queryset
