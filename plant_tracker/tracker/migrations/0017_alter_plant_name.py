# Generated by Django 5.0.3 on 2024-04-28 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0016_alter_location_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='name',
            field=models.TextField(),
        ),
    ]
