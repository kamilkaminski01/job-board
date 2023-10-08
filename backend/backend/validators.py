# These validators are taken from `django-advanced_password_validation`
# and converted for the project needs
# https://github.com/ezrajrice/django-advanced_password_validation/blob/master/django_advanced_password_validation/advanced_password_validation.py

from django.core.exceptions import ValidationError


class ContainsDigitsValidator:
    def __init__(self, min_digits: int = 1) -> None:
        self.min_digits = min_digits

    def validate(self, password: str, user=None) -> None:
        if sum(c.isdigit() for c in password) < self.min_digits:
            raise ValidationError(
                "Password must contain at least %(min_digits)d number.",
                code="password_no_digit",
                params={"min_digits": self.min_digits},
            )

    def get_help_text(self) -> str:
        return "Your password must contain at least %(min_digits)d number." % {
            "min_digits": self.min_digits
        }


class ContainsUppercaseValidator:
    def __init__(self, min_uppercase: int = 1) -> None:
        self.min_uppercase = min_uppercase

    def validate(self, password: str, user=None) -> None:
        if sum(c.isupper() for c in password) < self.min_uppercase:
            raise ValidationError(
                (
                    "Password must contain at least %(min_uppercase)d "
                    "uppercase character."
                ),
                code="password_no_upper",
                params={"min_uppercase": self.min_uppercase},
            )

    def get_help_text(self) -> str:
        return (
            "Your password must contain at least %(min_uppercase)d "
            "uppercase character."
        ) % {"min_uppercase": self.min_uppercase}


class ContainsLowercaseValidator:
    def __init__(self, min_lowercase: int = 1) -> None:
        self.min_lowercase = min_lowercase

    def validate(self, password: str, user=None) -> None:
        if sum(c.islower() for c in password) < self.min_lowercase:
            raise ValidationError(
                (
                    "Password must contain at least %(min_lowercase)d "
                    "lowercase character."
                ),
                code="password_no_lower",
                params={"min_lowercase": self.min_lowercase},
            )

    def get_help_text(self) -> str:
        return (
            "Your password must contain at least %(min_lowercase)d "
            "lowercase character."
        ) % {"min_lowercase": self.min_lowercase}
