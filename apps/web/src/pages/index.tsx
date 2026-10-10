import type { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
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
				<section className={styles.hero} aria-labelledby="hero-heading">
					<p className={styles.eyebrow}>A space for independent creativity</p>

					<h1 className={styles.heroTitle} id="hero-heading">
						Find your kind of art.
					</h1>

					<p className={styles.heroDescription}>
						Discover artists and explore creative work across disciplines,
						materials and ideas.
					</p>
				</section>

				<section
					className={styles.section}
					aria-labelledby="disciplines-heading"
				>
					<div className={styles.sectionHeader}>
						<div>
							<h2 className={styles.sectionTitle} id="disciplines-heading">
								Explore disciplines
							</h2>

							<p className={styles.sectionDescription}>
								Find inspiration in different forms of creativity.
							</p>
						</div>
					</div>

					<ul className={styles.disciplineGrid}>
						{disciplines.map((discipline) => (
							<li key={discipline.slug}>
								<Link
									className={styles.disciplineCard}
									href={`/disciplines/${discipline.slug}`}
								>
									<Image
										className={styles.disciplineImage}
										src={disciplineImages[discipline.slug]}
										alt=""
										width={300}
										height={250}
										sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw"
									/>

									<div className={styles.disciplineContent}>
										<h3 className={styles.disciplineName}>{discipline.name}</h3>

										<p className={styles.disciplineDescription}>
											{discipline.description ||
												"Explore this creative discipline."}
										</p>

										<span className={styles.cardArrow} aria-hidden="true">
											↗
										</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</section>

				<section className={styles.section} aria-labelledby="artists-heading">
					<div className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle} id="artists-heading">
							Artists to discover
						</h2>

						<Link className={styles.textLink} href="/artists">
							View all artists →
						</Link>
					</div>

					{artists.length === 0 ? (
						<p className={styles.emptyState}>No artists to display yet.</p>
					) : (
						<ul className={styles.artistGrid}>
							{artists.slice(0, 6).map((artist) => (
								<li className={styles.artistCard} key={artist.id}>
									<Link
										className={styles.artistImageLink}
										href={`/artists/${artist.id}`}
									>
										{artist.artworks[0]?.image ? (
											<Image
												className={styles.artistImage}
												src={artist.artworks[0].image}
												alt={`Artwork by ${artist.name}`}
												width={600}
												height={450}
											/>
										) : (
											<div className={styles.artistImagePlaceholder}>
												<span>No artwork available</span>
											</div>
										)}
									</Link>

									<h3 className={styles.artistName}>
										<Link
											className={styles.artistLink}
											href={`/artists/${artist.id}`}
										>
											{artist.name}
										</Link>
									</h3>

									{artist.bio && (
										<p className={styles.artistBio}>{artist.bio}</p>
									)}

									<p className={styles.artistMeta}>
										{artist.artworks.length}{" "}
										{artist.artworks.length === 1 ? "artwork" : "artworks"}
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
