from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

# from unfold.admin import ModelAdmin
from tracker.models import Activity, Area, Plant, Location, Entry


# @admin.register(Activity)
# class CustomActivityClass(ModelAdmin):
#     pass


# @admin.register(Area)
# class CustomAreaClass(ModelAdmin):
#     pass


@admin.register(Plant)
class CustomUserClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


# @admin.register(Location)
# class CustomLocationClass(ModelAdmin):
#     pass


# @admin.register(Entry)
# class CustomEntryClass(ModelAdmin):
#     pass
