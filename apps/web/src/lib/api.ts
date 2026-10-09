import type { Artist } from "../types/artist";

const API_URL = "http://127.0.0.1:8000";

export async function getArtworks() {
	const response = await fetch(`${API_URL}/api/artworks/`);

	if (!response.ok) {
		throw new Error("Failed to fetch artworks");
	}

	return response.json();
}

export async function getArtists(): Promise<Artist[]> {
	const response = await fetch(`${API_URL}/api/artists/`);

	if (!response.ok) {
		throw new Error("Failed to fetch artists");
	}

	return response.json();
}

export async function getArtist(id: number): Promise<Artist> {
	const response = await fetch(`${API_URL}/api/artists/${id}/`);

	if (!response.ok) {
		throw new Error(`Failed to fetch artist with ID ${id}`);
	}

	return response.json();
}
