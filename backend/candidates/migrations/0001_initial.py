# Generated by Django 4.2.6 on 2023-10-26 17:41

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models

import candidates.models
import candidates.utils
import users.models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Candidate",
            fields=[
                (
                    "user_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "description",
                    models.TextField(blank=True, max_length=300, null=True),
                ),
                ("github_url", models.URLField(blank=True, max_length=150, null=True)),
                (
                    "linkedin_url",
                    models.URLField(blank=True, max_length=150, null=True),
                ),
            ],
            options={
                "verbose_name": "Candidate",
                "verbose_name_plural": "Candidates",
            },
            bases=("users.user",),
            managers=[
                ("objects", users.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name="Image",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    models.FileField(
                        upload_to=candidates.models._upload_image_to_images,
                        validators=[candidates.utils.validate_file_extension],
                        verbose_name="image",
                    ),
                ),
                (
                    "candidate",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="candidates.candidate",
                        verbose_name="candidate image",
                    ),
                ),
            ],
            options={
                "verbose_name": "Image",
                "verbose_name_plural": "Images",
            },
        ),
    ]
