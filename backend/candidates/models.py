from django.db import models

from users.models import User

from .utils import hash_file, validate_file_extension


def _upload_image_to_images(instance, filename: str) -> str:
    hashed_file = hash_file(instance.image.open())
    return f"images/{instance.candidate.id}/{hashed_file}/{filename}"


class Candidate(User):
    description = models.TextField(max_length=300, null=True, blank=True)
    github_url = models.URLField(max_length=150, null=True, blank=True)
    linkedin_url = models.URLField(max_length=150, null=True, blank=True)

    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.email

    class Meta:
        verbose_name = "Candidate"
        verbose_name_plural = "Candidates"


class Image(models.Model):
    candidate = models.OneToOneField(
        Candidate,
        on_delete=models.CASCADE,
        verbose_name="candidate image",
    )
    image = models.FileField(
        upload_to=_upload_image_to_images,
        validators=[validate_file_extension],
        verbose_name="image",
    )

    def __str__(self):
        return Image._meta.verbose_name.title()

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"
