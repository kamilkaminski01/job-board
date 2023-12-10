from colorfield.fields import ColorField
from django.db import models


class Customization(models.Model):
    primary_color = ColorField(default="#5bcaac", verbose_name="primary color")
    secondary_color = ColorField(default="#45a58a", verbose_name="secondary color")
    font_color = ColorField(default="#333333", verbose_name="font color")
    hover_color = ColorField(default="#74e2c4", verbose_name="hover color")

    def __str__(self):
        return "Customization"

    class Meta:
        verbose_name = "Customization"
        verbose_name_plural = "Customizations"
