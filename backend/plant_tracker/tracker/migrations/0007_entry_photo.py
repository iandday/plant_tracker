# Generated by Django 5.0.3 on 2024-04-10 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0006_alter_plant_purchase_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='photo',
            field=models.ImageField(null=True, upload_to='images/'),
        ),
    ]
