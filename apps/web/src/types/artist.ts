import type { Artwork } from "./artwork";

export type Artist = {
	id: number;
	name: string;
	bio: string;
	cover_image: string | null;
	created_at: string;
	artworks: Artwork[];
};
