import type { Artwork } from "./artwork";

export type Artist = {
	id: number;
	name: string;
	bio: string;
	created_at: string;
	artworks: Artwork[];
};
