from django.db import migrations

from customization.models import Customization


def apply_migration(apps, schema_editor):
    Customization.objects.create()


class Migration(migrations.Migration):
    dependencies = [
        ("customization", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(apply_migration),
    ]
