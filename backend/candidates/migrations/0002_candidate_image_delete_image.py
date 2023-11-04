# Generated by Django 4.2.6 on 2023-11-01 10:08

from django.db import migrations, models

import backend.utils
import candidates.models


class Migration(migrations.Migration):
    dependencies = [
        ("candidates", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="candidate",
            name="image",
            field=models.FileField(
                null=True,
                upload_to=candidates.models._upload_images,
                validators=[backend.utils.validate_file_extension],
                verbose_name="image",
            ),
        ),
        migrations.DeleteModel(
            name="Image",
        ),
    ]