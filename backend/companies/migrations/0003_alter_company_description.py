# Generated by Django 4.2.6 on 2023-11-12 18:43

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("companies", "0002_alter_company_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="company",
            name="description",
            field=models.TextField(
                default=django.utils.timezone.now,
                max_length=300,
                verbose_name="description",
            ),
            preserve_default=False,
        ),
    ]