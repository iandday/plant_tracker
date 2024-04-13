from django.contrib import admin
from unfold.admin import ModelAdmin
from users.models import User


@admin.register(User)
class CustomUserClass(ModelAdmin):
    pass
