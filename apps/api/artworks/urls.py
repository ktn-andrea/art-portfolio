from django.urls import path

from .views import (
    ArtistDetailView,
    ArtistListView,
    ArtworkListView,
    DisciplineDetailView,
    DisciplineListView,
)

urlpatterns = [
    path("artists/", ArtistListView.as_view(), name="artist-list"),
    path("artists/<int:pk>/", ArtistDetailView.as_view(), name="artist-detail"),
    path("artworks/", ArtworkListView.as_view(), name="artwork-list"),
    path("disciplines/", DisciplineListView.as_view(), name="discipline-list"),
    path(
        "disciplines/<slug:slug>/",
        DisciplineDetailView.as_view(),
        name="discipline-detail",
    ),
]
