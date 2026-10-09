import type { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getArtist } from "../../lib/api";
import type { Artist } from "../../types/artist";

type ArtistPageProps = {
	artist: Artist;
};

export const getServerSideProps: GetServerSideProps<ArtistPageProps> = async (
	context,
) => {
	const id = Number(context.params?.id);

	if (!Number.isInteger(id) || id <= 0) {
		return { notFound: true };
	}

	try {
		const artist = await getArtist(id);

		return {
			props: { artist },
		};
	} catch {
		return { notFound: true };
	}
};

export default function ArtistPage({ artist }: ArtistPageProps) {
	return (
		<>
			<Header />

			<main>
				<Link href="/">← Discover artists</Link>

				<section>
					<h1>{artist.name}</h1>

					{artist.bio && <p>{artist.bio}</p>}
				</section>

				<section>
					<h2>Artworks</h2>

					{artist.artworks.length === 0 ? (
						<p>No artworks to display yet.</p>
					) : (
						<ul>
							{artist.artworks.map((artwork) => (
								<li key={artwork.id}>
									<h3>{artwork.title}</h3>

									{artwork.image && (
										<Image
											src={artwork.image}
											alt={artwork.title}
											width={400}
											height={300}
											style={{
												width: "100%",
												height: "auto",
											}}
										/>
									)}

									{artwork.description && <p>{artwork.description}</p>}

									<p>
										{artwork.year} · {artwork.medium}
									</p>
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
