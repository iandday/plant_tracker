# Generated by Django 5.0.3 on 2024-04-03 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='death_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
