"""
Django settings for plant_tracker project.

Generated by 'django-admin startproject' using Django 5.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from django.urls import reverse_lazy
import environ
import os
from datetime import timedelta
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.templatetags.static import static

env = environ.Env(DEBUG=(bool, False))

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "tracker",
    "users",
    "ninja_jwt",
    "ninja_extra",
    "corsheaders",  # https://pypi.org/project/django-cors-headers/
    "import_export",  # https://django-import-export.readthedocs.io/en/latest/
    "simple_history",  # https://django-simple-history.readthedocs.io/en/latest/quick_start.html#install
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "simple_history.middleware.HistoryRequestMiddleware",
]
AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    # "allauth.account.auth_backends.AuthenticationBackend",
    # "master_password.auth.ModelBackend",
)
ROOT_URLCONF = "plant_tracker.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "frontend", "dist")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "plant_tracker.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": env.db(),
}
AUTH_USER_MODEL = "users.User"
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "default",
        }
    },
    "formatters": {
        "default": {
            "format": "[DJANGO] %(levelname)s %(asctime)s %(module)s "
            "%(name)s.%(funcName)s:%(lineno)s: %(message)s"
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
        "propagate": True,
    },
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = "/static"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "frontend", "dist")]

MEDIA_ROOT = env("MEDIA_PATH")
MEDIA_URL = "media/"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

NINJA_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(
        minutes=env.int("JWT_ACCESS_TOKEN_LIFETIME_MINUTES")
    ),
    "REFRESH_TOKEN_LIFETIME": timedelta(
        days=env.int("JWT_ACCESS_REFRESH_LIFETIME_DAYS")
    ),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": env("JWT_SIGNING_KEY"),
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "ninja_jwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("ninja_jwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "ninja_jwt.models.TokenUser",
    "JTI_CLAIM": "jti",
    # 'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    # 'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    # 'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
    # For Controller Schemas
    # FOR OBTAIN PAIR
    "TOKEN_OBTAIN_PAIR_INPUT_SCHEMA": "ninja_jwt.schema.TokenObtainPairInputSchema",
    "TOKEN_OBTAIN_PAIR_REFRESH_INPUT_SCHEMA": "ninja_jwt.schema.TokenRefreshInputSchema",
    # FOR SLIDING TOKEN
    "TOKEN_OBTAIN_SLIDING_INPUT_SCHEMA": "ninja_jwt.schema.TokenObtainSlidingInputSchema",
    "TOKEN_OBTAIN_SLIDING_REFRESH_INPUT_SCHEMA": "ninja_jwt.schema.TokenRefreshSlidingInputSchema",
    "TOKEN_BLACKLIST_INPUT_SCHEMA": "ninja_jwt.schema.TokenBlacklistInputSchema",
    "TOKEN_VERIFY_INPUT_SCHEMA": "ninja_jwt.schema.TokenVerifyInputSchema",
}

# CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:80",
    "http://localhost:5173",
    "http://plant.ianday.me",
    "https://plant.ianday.me",
]
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]
CORS_ALLOW_CREDENTIALS = True
