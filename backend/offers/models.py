from django.db import models

from companies.models import Company


class Offer(models.Model):
    class CurrencyChoices(models.TextChoices):
        PLN = ("PLN", "PLN")
        USD = ("USD", "USD")
        EUR = ("EUR", "EUR")

    class ExperienceChoices(models.TextChoices):
        JUNIOR = "junior"
        MID = "mid"
        SENIOR = "senior"

    class EmploymentType(models.TextChoices):
        B2B = "B2B"
        PERMANENT = "permanent"
        INTERNSHIP = "internship"

    class WorkType(models.TextChoices):
        FULL_TIME = "full_time"
        PART_TIME = "part_time"
        FREELANCE = "freelance"

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
    description = models.TextField(
        max_length=4000,
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

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Offer"
        verbose_name_plural = "Offers"


class TechStack(models.Model):
    class AdvancementType(models.TextChoices):
        NICE_TO_HAVE = "nice_to_have"
        JUNIOR = "junior"
        REGULAR = "regular"
        ADVANCED = "advanced"
        MASTER = "master"

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
