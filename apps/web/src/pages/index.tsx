import type { GetServerSideProps } from "next";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { getArtists } from "../lib/api";
import type { Artist } from "../types/artist";

type HomeProps = {
	artists: Artist[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	try {
		const artists = await getArtists();

		return {
			props: { artists },
		};
	} catch (error) {
		console.error("Failed to load artists:", error);

		return {
			props: { artists: [] },
		};
	}
};

export default function Home({ artists }: HomeProps) {
	return (
		<>
			<Header />

			<main>
				<section>
					<h1>Discover artists</h1>

					{artists.length === 0 ? (
						<p>No artists to display yet.</p>
					) : (
						<ul>
							{artists.map((artist) => (
								<li key={artist.id}>
									<Link href={`/artists/${artist.id}`}>
										<h2>{artist.name}</h2>
									</Link>

									{artist.bio && <p>{artist.bio}</p>}
									<p>{artist.artworks.length} artworks</p>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>

			<Footer />
		</>
	);
}
