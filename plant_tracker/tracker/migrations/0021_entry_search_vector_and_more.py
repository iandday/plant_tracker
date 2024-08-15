# Generated by Django 5.0.3 on 2024-08-11 19:16

import django.contrib.postgres.indexes
import django.contrib.postgres.search
from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0020_plant_populate_search_vector'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(null=True),
        ),
        migrations.AddIndex(
            model_name='entry',
            index=django.contrib.postgres.indexes.GinIndex(fields=['search_vector'], name='tracker_ent_search__e070fa_gin'),
        ),
    ]