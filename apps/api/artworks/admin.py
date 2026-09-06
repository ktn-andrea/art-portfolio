# Register your models here.
from django.contrib import admin

from .models import Artwork


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "medium", "created_at")
    search_fields = ("title", "medium")
