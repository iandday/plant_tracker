from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin


from tracker.models import Activity, Area, Plant, Location, Entry


@admin.register(Activity)
class CustomActivityClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


@admin.register(Plant)
class CustomPlantClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ["name", "common_name", "scientific_name", "user"]


@admin.register(Area)
class CustomAreaClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ["name", "location", "user"]


@admin.register(Location)
class CustomLocationClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ["name"]


@admin.register(Entry)
class CustomEntryClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass
