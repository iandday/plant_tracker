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

    def validate_unique(self, exclude=None):
        qs = Location.objects.filter(name=self.name)
        if qs.filter(user=self.user).exists():
            raise ValidationError("Location must be unique per user")

    def save(self, *args, **kwargs):
        self.validate_unique()
        super(Location, self).save(*args, **kwargs)


class Area(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(name="name", unique=False, blank=False, null=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Activity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(name="name", blank=False, null=False)
    description = models.TextField(name="description", blank=True, null=True)


class Plant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(name="name", blank=False, null=False, unique=True)
    common_name = models.TextField(name="common_name", blank=True, null=True)
    scientific_name = models.TextField(name="scientific_name", blank=True, null=True)
    purchase_date = models.DateField(name="purchase_date", blank=True, null=True)
    graveyard = models.BooleanField(name="graveyard", default=False)
    death_date = models.DateField(name="death_date", null=True, blank=True)
    main_photo = models.ImageField(upload_to="images/", null=True)
    notes = models.TextField(name="notes", null=True, blank=True)
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
    photo = models.ImageField(upload_to="images/", null=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
