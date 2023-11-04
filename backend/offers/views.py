from rest_framework.generics import ListAPIView

from .models import Offer
from .serializers import OfferListSerializer


class OfferListView(ListAPIView):
    serializer_class = OfferListSerializer
    queryset = Offer.objects.all()
