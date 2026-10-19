import type { GetServerSideProps } from "next";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getArtists } from "../../lib/api";
import type { Artist } from "../../types/artist";
import styles from "./index.module.css";

type ArtistsPageProps = {
	artists: Artist[];
};

export const getServerSideProps: GetServerSideProps<
	ArtistsPageProps
> = async () => {
	try {
		const artists = await getArtists();
		return { props: { artists } };
	} catch (error) {
		console.error("Failed to load artists:", error);
		throw error;
	}
};

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	return (
		<>
			<Header />

			<main className={styles.page}>
				<header className={styles.pageHeader}>
					<p className={styles.eyebrow}>Discover</p>
					<h1 className={styles.title}>Artists</h1>
					<p className={styles.description}>
						Meet independent artists and explore their creative work.
					</p>
				</header>

				{artists.length === 0 ? (
					<p className={styles.emptyState}>No artists to display yet.</p>
				) : (
					<ul className={styles.artistGrid}>
						{artists.map((artist) => (
							<li key={artist.id}>
								<ArtistCard artist={artist} />
							</li>
						))}
					</ul>
				)}
			</main>

			<Footer />
		</>
	);
}
