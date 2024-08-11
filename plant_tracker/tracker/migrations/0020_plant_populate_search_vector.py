# Generated by Django 5.0.3 on 2024-07-30 21:24

import django.contrib.postgres.indexes
import django.contrib.postgres.search
from django.conf import settings
from django.db import migrations

def compute_search_vector(apps, schema_editor):
    Plant = apps.get_model("tracker", "Plant")
    Plant.objects.update(search_vector=django.contrib.postgres.search.SearchVector("name", "common_name", "scientific_name", "notes"))


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0019_plant_search_vector_and_more'),
    ]

    operations = [
        migrations.RunSQL(
            sql="""
            CREATE TRIGGER search_vector_trigger
            BEFORE INSERT OR UPDATE OF name, common_name, scientific_name, notes, search_vector
            ON tracker_plant
            FOR EACH ROW EXECUTE PROCEDURE
            tsvector_update_trigger(
                search_vector, 'pg_catalog.english', name, common_name, scientific_name, notes
            );
            UPDATE tracker_plant SET search_vector = NULL;
            """,
            reverse_sql="""
            DROP TRIGGER IF EXISTS search_vector_trigger
            ON tracker_plant;
            """,
        ),
        migrations.RunPython(
            compute_search_vector, reverse_code=migrations.RunPython.noop
        ),
    ]
