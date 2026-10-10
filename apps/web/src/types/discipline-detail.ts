export type DisciplineArtist = {
	id: number;
	name: string;
	bio: string;
};

export type DisciplineDetail = {
	id: number;
	name: string;
	slug: string;
	description: string;
	artists: DisciplineArtist[];
};
