from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.forms import ClearableFileInput


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
