import os
from pathlib import Path

from environs import Env

env = Env()
env.read_env()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")
DEBUG = env.bool("DEBUG")

ALLOWED_HOSTS = ["." + host.strip() for host in env.list("ALLOWED_HOSTS")]

INSTALLED_APPS = [
    "rest_framework",
    "social_django",
    "rest_social_auth",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_rq",
    "tinymce",
    "colorfield",
    "customization",
    "communication",
    "users",
    "candidates",
    "companies",
    "offers",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS")

if DEBUG:
    INSTALLED_APPS.insert(0, "corsheaders")
    MIDDLEWARE.insert(0, "corsheaders.middleware.CorsMiddleware")
    CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "social_django.context_processors.backends",
                "social_django.context_processors.login_redirect",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": env("POSTGRES_HOST", "localhost"),
        "PORT": env("POSTGRES_PORT", "5432"),
        "NAME": env("POSTGRES_NAME", "postgres"),
        "USER": env("POSTGRES_USER", "postgres"),
        "PASSWORD": env("POSTGRES_PASSWORD", "postgres"),
    }
}

RQ_QUEUES = {
    "default": {
        "HOST": os.getenv("REDIS_HOST", "localhost"),
        "PORT": int(os.getenv("REDIS_PORT", "6379")),
        "DB": int(os.getenv("REDIS_DB", "0")),
    }
}

RQ_RETRIES_COUNT = 5

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "backend.validators.ContainsUppercaseValidator",
        "OPTIONS": {"min_uppercase": 1},
    },
    {
        "NAME": "backend.validators.ContainsLowercaseValidator",
        "OPTIONS": {"min_lowercase": 1},
    },
    {
        "NAME": "backend.validators.ContainsDigitsValidator",
        "OPTIONS": {"min_digits": 1},
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {"min_length": 8},
    },
]

AUTH_USER_MODEL = "users.User"

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Warsaw"

USE_I18N = True

USE_TZ = True

STATIC_DIR = os.path.join(BASE_DIR, "/static/")
STATICFILES_DIRS = ("./backend/static",)
if not os.path.isdir(STATIC_DIR):
    os.mkdir(STATIC_DIR)

MEDIA_ROOT = os.path.join(BASE_DIR, "/media/")
MEDIA_URL = "/media/"

# AWS keys
AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
AWS_REGION = env("AWS_REGION", "eu-central-1")

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_RENDERER_CLASSES": (
        "djangorestframework_camel_case.render.CamelCaseJSONRenderer",
        "djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer",
    ),
    "DEFAULT_PARSER_CLASSES": (
        "djangorestframework_camel_case.parser.CamelCaseJSONParser",
        "djangorestframework_camel_case.parser.CamelCaseFormParser",
        "djangorestframework_camel_case.parser.CamelCaseMultiPartParser",
    ),
    "EXCEPTION_HANDLER": "backend.exception_handler.full_details_exception_handler",
}

AUTHENTICATION_BACKENDS = (
    "social_core.backends.google.GoogleOAuth2",
    "social_core.backends.github.GithubOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)

SOCIAL_AUTH_PIPELINE = (
    "social_core.pipeline.social_auth.social_details",
    "social_core.pipeline.social_auth.social_uid",
    "social_core.pipeline.social_auth.auth_allowed",
    "social_core.pipeline.social_auth.social_user",
    "social_core.pipeline.user.get_username",
    "users.utils.create_social_auth_candidate",
    "social_core.pipeline.social_auth.associate_user",
    "social_core.pipeline.social_auth.load_extra_data",
    "social_core.pipeline.user.user_details",
)

# Google configuration
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env("SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET")
SOCIAL_AUTH_USER_FIELDS = ["email", "password", "first_name", "last_name"]

# GitHub configuration
SOCIAL_AUTH_GITHUB_KEY = env("SOCIAL_AUTH_GITHUB_KEY")
SOCIAL_AUTH_GITHUB_SECRET = env("SOCIAL_AUTH_GITHUB_SECRET")
