from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.db import models
from django.forms import ClearableFileInput


class TimeStampMixin(models.Model):
    """Mixin for models that require fields with time of creation and time of
    update."""

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="created at")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="updated at")

    class Meta:
        abstract = True


class ImageFormMixin(forms.ModelForm):
    image = forms.ImageField(
        label="Image",
        required=False,
        widget=ClearableFileInput,
    )
    password = ReadOnlyPasswordHashField(
        label="Password",
        help_text=(
            "Raw passwords are not stored, so there is no way to see "
            "this user's password, but you can change the password "
            'using <a href="../password/">this form</a>.'
        ),
    )
