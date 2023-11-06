from rest_framework import serializers

from .models import Offer, TechStack


class TechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = ["id", "title", "advancement"]


class OfferListSerializer(serializers.ModelSerializer):
    company = serializers.SerializerMethodField("get_company")
    image = serializers.SerializerMethodField("get_image")
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
            "employment_type",
            "work_type",
            "tech_stacks",
        ]

    def get_company(self, obj: Offer) -> str:
        return obj.company.name

    def get_image(self, obj: Offer) -> str:
        context = self.context["request"]
        if not obj.company.image:
            return context.build_absolute_uri("/static/img/img-placeholder.png")
        return context.build_absolute_uri(obj.company.image.url)
