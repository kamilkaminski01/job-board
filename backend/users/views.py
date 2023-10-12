from typing import List

from rest_framework import generics, mixins
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from .serializers import UserSerializer, UserUpdateSerializer


class UserAPIView(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView,
):
    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

    def post(self, request: Request, *args, **kwargs) -> Response:
        return self.create(request, *args, **kwargs)

    def get_serializer_class(self) -> ModelSerializer:
        if self.request.method in ["PUT", "PATCH"]:
            return UserUpdateSerializer
        return UserSerializer

    def get_permissions(self) -> List[BasePermission]:
        if self.request.method == "POST":
            return []
        return [IsAuthenticated()]

    def get_object(self):
        return self.request.user
