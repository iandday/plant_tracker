import logging
import environ
from django.db import migrations
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)


def generate_superuser(apps, schema_editor):
    env = environ.Env()
    user = get_user_model()
    user.objects.create_superuser(
        password=env.str("ADMIN_PASSWORD"), email=env.str("ADMIN_EMAIL")
    )


class Migration(migrations.Migration):
    dependencies = [("users", "0002_historicaluser")]

    operations = [migrations.RunPython(generate_superuser)]
