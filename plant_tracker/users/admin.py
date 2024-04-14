from django.contrib import admin
from users.models import User
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin


@admin.register(User)
class CustomUserClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass
