import type { GetServerSideProps } from "next";
import Link from "next/link";
import ArtistCard from "../components/ArtistCard/ArtistCard";
import DisciplineCard from "../components/DisciplineCard/DisciplineCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import HomeHero from "../components/HomeHero/HomeHero";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import { getArtists, getDisciplines } from "../lib/api";
import type { Artist } from "../types/artist";
import type { Discipline } from "../types/discipline";
import styles from "./index.module.css";

type HomeProps = {
	artists: Artist[];
	disciplines: Discipline[];
};

const disciplineImages: Record<string, string> = {
	painting: "/images/disciplines/painting.svg",
	drawing: "/images/disciplines/drawing.svg",
	photography: "/images/disciplines/photography.svg",
	"ceramics-pottery": "/images/disciplines/ceramics-pottery.svg",
	sculpture: "/images/disciplines/sculpture.svg",
	"writing-poetry": "/images/disciplines/writing-poetry.svg",
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	try {
		const [artists, disciplines] = await Promise.all([
			getArtists(),
			getDisciplines(),
		]);

		return {
			props: { artists, disciplines },
		};
	} catch (error) {
		console.error("Failed to load homepage data:", error);
		throw error;
	}
};

export default function Home({ artists, disciplines = [] }: HomeProps) {
	return (
		<>
			<Header />

			<main className={styles.page}>
				<HomeHero />

				<section
					className={styles.section}
					aria-labelledby="disciplines-heading"
				>
					<SectionHeader
						title="Explore disciplines"
						id="disciplines-heading"
						description="Find inspiration in different forms of creativity."
					/>

					<ul className={styles.disciplineGrid}>
						{disciplines.map((discipline) => (
							<li key={discipline.slug}>
								<DisciplineCard
									discipline={discipline}
									image={disciplineImages[discipline.slug]}
								/>
							</li>
						))}
					</ul>
				</section>

				<section className={styles.section} aria-labelledby="artists-heading">
					<SectionHeader
						title="Artists to discover"
						id="artists-heading"
						action={
							<Link className={styles.textLink} href="/artists">
								View all artists →
							</Link>
						}
					/>

					{artists.length === 0 ? (
						<p className={styles.emptyState}>No artists to display yet.</p>
					) : (
						<ul className={styles.artistGrid}>
							{artists.slice(0, 6).map((artist) => (
								<li key={artist.id}>
									<ArtistCard artist={artist} />
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
