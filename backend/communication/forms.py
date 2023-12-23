from django.forms import ModelForm

from .models import Message


class CommunicationForm(ModelForm):
    class Meta:
        model = Message
        fields = [
            "send_at",
            "title",
            "candidate",
            "company",
            "content",
        ]
