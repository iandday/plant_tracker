# Generated by Django 5.0.3 on 2024-04-18 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0009_populate_activities'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='name',
            field=models.TextField(unique=True),
        ),
    ]
