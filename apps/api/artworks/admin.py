from typing import ClassVar

from django.contrib import admin

from .models import Artist, Artwork, Discipline


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)
    filter_horizontal = ("disciplines",)


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "medium", "created_at")
    search_fields = ("title", "medium")


@admin.register(Discipline)
class DisciplineAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields: ClassVar[dict[str, tuple[str, ...]]] = {
        "slug": ("name",),
    }
    ordering = ("order", "name")
