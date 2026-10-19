from rest_framework import generics

from .models import Artist, Artwork, Discipline
from .serializers import ArtistSerializer, ArtworkSerializer, DisciplineSerializer


class ArtistListView(generics.ListAPIView):
    serializer_class = ArtistSerializer

    def get_queryset(self):
        queryset = Artist.objects.all()
        discipline = self.request.query_params.get("discipline")
        search = self.request.query_params.get("search")

        if discipline:
            queryset = queryset.filter(disciplines__slug=discipline)

        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset.distinct()


class ArtistDetailView(generics.RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtworkListView(generics.ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer


class DisciplineListView(generics.ListAPIView):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer


class DisciplineDetailView(generics.RetrieveAPIView):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer
    lookup_field = "slug"
