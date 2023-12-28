from django.db.models import QuerySet
from rest_framework import filters, status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from candidates.models import Candidate
from tasks.emails import EmailData, send_email

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

    def post(self, request, *args, **kwargs) -> Response:
        try:
            candidate = Candidate.objects.get(id=self.request.user.id)
        except Candidate.DoesNotExist:
            return Response(
                {
                    "code": "candidate_not_found",
                    "message": "You need to be a candidate to apply",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        offer_id = self.request.data.get("offer")
        applied_offer = Offer.objects.get(id=offer_id)
        application_exists = OfferApplicationHistory.objects.filter(
            candidate=candidate, offer=applied_offer
        ).exists()
        if application_exists:
            return Response(
                {
                    "code": "application_exists",
                    "message": "You have already applied for this offer",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return self.create(request, *args, **kwargs)

    def perform_create(
        self, serializer: OfferApplicationHistoryCreateSerializer
    ) -> None:
        candidate_id = self.request.user.id
        offer_id = self.request.data.get("offer")
        candidate = Candidate.objects.get(id=candidate_id)
        offer = Offer.objects.get(id=offer_id)
        company_email_data = EmailData(
            subject=f"Job Board - a candidate applied for {offer.title}",
            send_from="kamilkaminski39@gmail.com",
            send_to=[offer.company.email],
            plain_msg=f"<h4>{candidate.first_name} {candidate.last_name}"
            f"applied for your offer - {offer.title}</h4>"
            f"You can find more information in the admin panel",
            html_msg=f"<h4>{candidate.first_name} {candidate.last_name}"
            f"applied for your offer - {offer.title}</h4>"
            f"You can find more information in the admin panel",
        )
        candidate_email_data = EmailData(
            subject=f"Job Board - you applied for {offer.title}",
            send_from="kamilkaminski39@gmail.com",
            send_to=[candidate.email],
            plain_msg=f"<h4>You've just applied for {offer.title}</h4>"
            f"We wish you luck!",
            html_msg=f"<h4>You've just applied for {offer.title}</h4>"
            f"We wish you luck!",
        )
        send_email.delay(company_email_data)
        send_email.delay(candidate_email_data)
        serializer.save(candidate=candidate)


class OfferApplicationHistoryListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = OfferPagination
    serializer_class = OfferApplicationHistoryListSerializer

    def get_queryset(self) -> QuerySet[OfferApplicationHistory]:
        try:
            candidate = Candidate.objects.get(pk=self.request.user.id)
        except Candidate.DoesNotExist:
            return OfferApplicationHistory.objects.none()
        queryset = OfferApplicationHistory.objects.filter(candidate=candidate).order_by(
            "-application_date"
        )
        return queryset
