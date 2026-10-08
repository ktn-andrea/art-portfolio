from django.contrib import admin

from .models import Artist, Artwork


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "medium", "created_at")
    search_fields = ("title", "medium")