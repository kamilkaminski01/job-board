from django.db import models
from tinymce.models import HTMLField

from backend.mixins import TimeStampMixin
from candidates.models import Candidate
from companies.models import Company


class Offer(TimeStampMixin):
    class CurrencyChoices(models.TextChoices):
        PLN = ("PLN", "PLN")
        USD = ("USD", "USD")
        EUR = ("EUR", "EUR")

    class ExperienceChoices(models.TextChoices):
        JUNIOR = "Junior"
        MID = "Mid"
        SENIOR = "Senior"

    class EmploymentType(models.TextChoices):
        B2B = "B2B"
        PERMANENT = "Permanent"
        INTERNSHIP = "Internship"

    class WorkType(models.TextChoices):
        FULL_TIME = "Full time"
        PART_TIME = "Part time"
        FREELANCE = "Freelance"

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="offers",
        verbose_name="company",
    )
    title = models.CharField(
        max_length=80,
        verbose_name="title",
    )
    salary_min = models.PositiveIntegerField(
        verbose_name="minimum salary",
    )
    salary_max = models.PositiveIntegerField(
        verbose_name="maximum salary",
    )
    currency = models.CharField(
        max_length=3,
        choices=CurrencyChoices.choices,
        default=CurrencyChoices.PLN,
        verbose_name="currency",
    )
    description = HTMLField(
        null=True,
        blank=True,
        verbose_name="description",
    )
    experience = models.CharField(
        max_length=6,
        choices=ExperienceChoices.choices,
        verbose_name="experience",
    )
    employment_type = models.CharField(
        max_length=10,
        choices=EmploymentType.choices,
        null=True,
        blank=True,
        verbose_name="employment type",
    )
    work_type = models.CharField(
        max_length=9,
        choices=WorkType.choices,
        null=True,
        blank=True,
        verbose_name="work type",
    )
    candidates = models.ManyToManyField(
        Candidate,
        verbose_name="candidates",
        related_name="offers",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Offer"
        verbose_name_plural = "Offers"


class TechStack(models.Model):
    class AdvancementType(models.TextChoices):
        NICE_TO_HAVE = "Nice to have"
        JUNIOR = "Junior"
        REGULAR = "Regular"
        ADVANCED = "Advanced"
        MASTER = "Master"

    title = models.CharField(
        max_length=40,
        verbose_name="tech stack",
    )
    advancement = models.CharField(
        max_length=12,
        choices=AdvancementType.choices,
        verbose_name="advancement",
    )
    offer = models.ForeignKey(
        Offer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="tech_stacks",
        verbose_name="offer",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Tech stack"
        verbose_name_plural = "Tech stacks"
