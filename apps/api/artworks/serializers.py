from rest_framework import serializers

from .models import Artist, Artwork, Discipline


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = (
            "id",
            "title",
            "description",
            "image",
            "year",
            "medium",
            "dimensions",
            "created_at",
        )


class ArtistSerializer(serializers.ModelSerializer):
    artworks = ArtworkSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = (
            "id",
            "name",
            "bio",
            "created_at",
            "artworks",
        )


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "order",
        )
