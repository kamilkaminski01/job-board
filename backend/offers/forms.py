from django import forms

from offers.models import Offer


class OfferForm(forms.ModelForm):
    class Meta:
        model = Offer
        exclude = ["candidates"]

    def clean(self):
        cleaned_data = super().clean()
        salary_min = cleaned_data.get("salary_min")
        salary_max = cleaned_data.get("salary_max")

        if (
            salary_min is not None
            and salary_max is not None
            and salary_min >= salary_max
        ):
            raise forms.ValidationError(
                "Maximum salary must be greater than minimum salary"
            )
