from django.db import models

from backend.utils import hash_file, validate_file_extension
from users.models import User


def _upload_images(instance: "Candidate", filename: str) -> str:
    hashed_file = hash_file(instance.image.open())
    return f"images/{hashed_file}/{filename}"


class Candidate(User):
    image = models.FileField(
        upload_to=_upload_images,
        validators=[validate_file_extension],
        null=True,
        blank=True,
        verbose_name="image",
    )
    description = models.TextField(
        max_length=300,
        null=True,
        blank=True,
        verbose_name="description",
    )
    github_url = models.URLField(
        max_length=150,
        null=True,
        blank=True,
        verbose_name="github url",
    )
    linkedin_url = models.URLField(
        max_length=150,
        null=True,
        blank=True,
        verbose_name="linkedin url",
    )

    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.email

    class Meta:
        verbose_name = "Candidate"
        verbose_name_plural = "Candidates"
