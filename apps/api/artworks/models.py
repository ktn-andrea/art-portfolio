from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    cover_image = models.ImageField(
        upload_to="artist_covers/",
        blank=True,
        null=True,
    )
    disciplines = models.ManyToManyField(
        "Discipline",
        related_name="artists",
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Artwork(models.Model):
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name="artworks",
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="artworks/")
    year = models.PositiveIntegerField()
    medium = models.CharField(max_length=100)
    dimensions = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Discipline(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("order", "name")

    def __str__(self):
        return self.name
