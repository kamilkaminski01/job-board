from django.db import models

from backend.utils import hash_file, validate_file_extension
from users.models import User


def _upload_to_company_images(instance: "Company", filename: str) -> str:
    hashed_file = hash_file(instance.image.open())
    return f"company_images/{hashed_file}/{filename}"


class Company(User):
    name = models.CharField(
        max_length=40,
        verbose_name="name",
    )
    description = models.TextField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name="description",
    )
    image = models.FileField(
        verbose_name="image",
        upload_to=_upload_to_company_images,
        validators=[validate_file_extension],
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs) -> None:
        self.is_staff = True
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
