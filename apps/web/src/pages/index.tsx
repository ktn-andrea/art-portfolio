import Image from "next/image";
import { useEffect, useState } from "react";
import { getArtworks } from "../lib/api";

type Artwork = {
	id: number;
	title: string;
	description: string;
	image: string;
	year: number;
	medium: string;
	dimensions: string;
	created_at: string;
};

export default function Home() {
	const [artworks, setArtworks] = useState<Artwork[]>([]);

	useEffect(() => {
		getArtworks().then(setArtworks);
	}, []);

	return (
		<main>
			<h1>Art Portfolio</h1>

			{artworks.map((artwork) => (
				<article key={artwork.id}>
					<h2>{artwork.title}</h2>
					<Image
						src={artwork.image}
						alt={artwork.title}
						width={500}
						height={500}
					/>
					<p>{artwork.medium}</p>
					<p>{artwork.year}</p>
				</article>
			))}
		</main>
	);
}
