from typing import Optional

from rest_framework import serializers

from .models import Offer, OfferApplicationHistory, TechStack


class TechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = ["id", "title", "advancement"]


class BaseOfferSerializer(serializers.ModelSerializer):
    company = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    tech_stacks = TechStackSerializer(many=True)

    class Meta:
        model = Offer
        fields = [
            "id",
            "company",
            "image",
            "title",
            "salary_min",
            "salary_max",
            "currency",
            "description",
            "experience",
            "tech_stacks",
        ]

    def get_company(self, obj: Offer) -> str:
        return obj.company.name

    def get_image(self, obj: Offer) -> Optional[str]:
        context = self.context["request"]
        if not obj.company.image:
            return None
        return context.build_absolute_uri(obj.company.image.url)


class OfferListSerializer(BaseOfferSerializer):
    class Meta(BaseOfferSerializer.Meta):
        fields = BaseOfferSerializer.Meta.fields


class OfferDetailsSerializer(BaseOfferSerializer):
    company_description = serializers.SerializerMethodField()

    class Meta(BaseOfferSerializer.Meta):
        fields = BaseOfferSerializer.Meta.fields + [
            "company_description",
            "employment_type",
            "work_type",
        ]

    def get_company_description(self, obj: Offer) -> Optional[str]:
        return obj.company.description


class OfferApplicationHistoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferApplicationHistory
        fields = ["offer"]


class OfferApplicationHistoryListSerializer(serializers.ModelSerializer):
    offer = OfferListSerializer(many=False, read_only=True)

    class Meta:
        model = OfferApplicationHistory
        fields = ["id", "application_date", "offer"]
