import logging
import environ
from django.db import migrations

logger = logging.getLogger(__name__)


def generate_superuser(apps, schema_editor):
    from django.contrib.auth import get_user_model

    env = environ.Env()
    password = env.str("ADMIN_PASSWORD")
    email = env.str("ADMIN_EMAIL")
    f_name = env.str("ADMIN_LAST_NAME")
    l_name = env.str("ADMIN_FIRST_NAME")

    user = get_user_model()

    if not user.objects.filter(email=EMAIL).exists():
        logger.info("Creating new superuser")
        admin = user.objects.create_superuser(
            password=password, email=email, first_name=f_name, last_name=l_name
        )
        admin.save()
        admin.set_password(password)
    else:
        logger.info("Superuser already created!")


class Migration(migrations.Migration):

    dependencies = [("users", "0002_historicaluser")]


operations = [migrations.RunPython(generate_superuser)]
