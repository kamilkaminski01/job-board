# Generated by Django 4.2.6 on 2023-11-18 11:04

import tinymce.models
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("offers", "0003_alter_offer_employment_type_alter_offer_experience_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="offer",
            name="description",
            field=tinymce.models.HTMLField(
                blank=True, null=True, verbose_name="description"
            ),
        ),
    ]
