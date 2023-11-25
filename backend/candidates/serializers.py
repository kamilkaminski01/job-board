from typing import Dict, Optional

from django.contrib.auth import password_validation
from rest_framework import serializers

from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    image = serializers.SerializerMethodField("get_image")

    class Meta:
        model = Candidate
        fields = [
            "email",
            "password",
            "first_name",
            "last_name",
            "description",
            "image",
            "github_url",
            "linkedin_url",
        ]

    def create(self, validated_data: Dict) -> Candidate:
        candidate = super().create(validated_data)
        candidate.set_password(validated_data["password"])
        candidate.save()
        return candidate

    def validate_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data

    def get_image(self, instance: Candidate) -> Optional[str]:
        context = self.context["request"]
        if Candidate.objects.filter(id=context.user.id).exists():
            if image := instance.image:
                return context.build_absolute_uri(image.url)
        return None


class CandidateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = [
            "email",
            "first_name",
            "last_name",
            "image",
            "description",
            "github_url",
            "linkedin_url",
        ]
        read_only_fields = ["email"]


class CandidateNewPasswordSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, source="password"
    )

    def update(self, instance: Candidate, validated_data: dict) -> Candidate:
        candidate = super().update(instance, validated_data)
        candidate.set_password(validated_data["password"])
        candidate.save()
        return candidate

    def validate_new_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data

    class Meta:
        model = Candidate
        fields = ["new_password"]
