from rest_framework.permissions import BasePermission
from rest_framework.request import Request

from .models import Candidate


class IsCandidate(BasePermission):
    message = "You must be a Candidate to perform this action"

    def has_permission(self, request: Request, view) -> bool:
        try:
            candidate = Candidate.objects.get(id=request.user.id).id
            return request.user.id == candidate
        except Candidate.DoesNotExist:
            return False
