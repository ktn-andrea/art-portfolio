import type { Artist } from "../types/artist";
import type { Discipline } from "../types/discipline";
import type { DisciplineDetail } from "../types/discipline-detail";

const API_URL = "http://127.0.0.1:8000";

export async function getArtworks() {
	const response = await fetch(`${API_URL}/api/artworks/`);

	if (!response.ok) {
		throw new Error("Failed to fetch artworks");
	}

	return response.json();
}

export async function getArtists(
	discipline?: string,
	search?: string,
): Promise<Artist[]> {
	const params = new URLSearchParams();

	if (discipline) {
		params.set("discipline", discipline);
	}

	if (search) {
		params.set("search", search);
	}

	const query = params.toString();
	const url = `${API_URL}/api/artists/${query ? `?${query}` : ""}`;

	const response = await fetch(url);

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

export async function getDisciplines(): Promise<Discipline[]> {
	const response = await fetch(`${API_URL}/api/disciplines/`);

	if (!response.ok) {
		throw new Error("Failed to fetch disciplines");
	}

	return response.json();
}

export async function getDiscipline(
	slug: string,
): Promise<DisciplineDetail | null> {
	const response = await fetch(
		`${API_URL}/api/disciplines/${encodeURIComponent(slug)}/`,
	);

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error(`Failed to fetch discipline: ${slug}`);
	}

	return response.json();
}
