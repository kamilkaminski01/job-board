from typing import Dict

from django.contrib.auth import password_validation
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]

    def create(self, validated_data: Dict) -> User:
        user = super().create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]
        read_only_fields = ["email"]


class UserNewPasswordSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, source="password"
    )

    def update(self, instance: User, validated_data: dict) -> User:
        user = super().update(instance, validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate_new_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data

    class Meta:
        model = User
        fields = ["new_password"]
