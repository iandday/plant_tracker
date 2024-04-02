from django.db import models
import uuid
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.conf import settings


def validate_health_score(value):
    if value < 0 or value > 5:
        raise ValidationError(
            ("%(value)s is not between 1 and 5"),
            params={"value": value},
        )


class Location(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(name="name", unique=True, blank=False, null=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Area(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(name="name", unique=True, blank=False, null=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Activity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(name="name", blank=False, null=False)
    description = models.TextField(name="description", blank=True, null=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Plant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(name="name", blank=False, null=False)
    common_name = models.TextField(name="common_name", blank=False, null=False)
    scientific_name = models.TextField(name="scientific_name", blank=False, null=False)
    purchase_date = models.DateField(name="purchase_date")
    graveyard = models.BooleanField(name="graveyard", default=False)
    death_date = models.DateField(name="death_date")
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Entry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateTimeField(name="Timestamp")
    activities = models.ManyToManyField(Activity)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    notes = models.TextField(name="notes", blank=True, null=True)
    plant_health = models.IntegerField(
        name="plant_health", validators=[validate_health_score]
    )
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
