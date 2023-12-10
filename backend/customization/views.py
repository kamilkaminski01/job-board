from rest_framework.generics import RetrieveAPIView, get_object_or_404

from .models import Customization
from .serializers import ColorSerializer


class ColorsView(RetrieveAPIView):
    queryset = Customization.objects.all()
    serializer_class = ColorSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)
        return obj
