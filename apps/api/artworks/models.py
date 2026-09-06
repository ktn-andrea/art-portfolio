from django.db import models


class Artwork(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="artworks/")
    year = models.PositiveIntegerField()
    medium = models.CharField(max_length=100)
    dimensions = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
