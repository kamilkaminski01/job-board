from rest_framework import serializers

from .models import Customization


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customization
        fields = [
            "primary_color",
            "secondary_color",
            "font_color",
            "hover_color",
        ]
