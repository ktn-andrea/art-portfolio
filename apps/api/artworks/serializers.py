from rest_framework import serializers

from .models import Artist, Artwork, Discipline


class DisciplineArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ("id", "name", "bio")


class DisciplineSerializer(serializers.ModelSerializer):
    artists = DisciplineArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Discipline
        fields = ("id", "name", "slug", "description", "artists")


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
            "cover_image",
            "created_at",
            "artworks",
            "disciplines",
        )
