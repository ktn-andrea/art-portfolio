import { useEffect, useState } from "react";
import Gallery from "../components/Gallery/Gallery";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import { getArtworks } from "../lib/api";
import type { Artwork } from "../types/artwork";

export default function Home() {
	const [artworks, setArtworks] = useState<Artwork[]>([]);

	useEffect(() => {
		getArtworks().then(setArtworks);
	}, []);

	return (
		<>
			<Header />

			<main>
				<Hero />

				<Gallery artworks={artworks} />
			</main>
		</>
	);
}
