import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getArtists, getDisciplines } from "../../lib/api";
import type { Artist } from "../../types/artist";
import type { Discipline } from "../../types/discipline";
import styles from "./index.module.css";

type ArtistsPageProps = {
	artists: Artist[];
	disciplines: Discipline[];
};

export const getServerSideProps: GetServerSideProps<
	ArtistsPageProps
> = async () => {
	try {
		const [artists, disciplines] = await Promise.all([
			getArtists(),
			getDisciplines(),
		]);

		return { props: { artists, disciplines } };
	} catch (error) {
		console.error("Failed to load artists:", error);
		throw error;
	}
};

export default function ArtistsPage({
	artists: initialArtists,
	disciplines,
}: ArtistsPageProps) {
	const [artists, setArtists] = useState(initialArtists);
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(search);
	const [selectedDiscipline, setSelectedDiscipline] = useState("");

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedSearch(search);
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [search]);

	function handleFilterChange(nextDiscipline: string, nextSearch: string) {
		setSelectedDiscipline(nextDiscipline);
		setSearch(nextSearch);
	}

	useEffect(() => {
		let cancelled = false;

		async function fetchArtists() {
			try {
				const filteredArtists = await getArtists(
					selectedDiscipline || undefined,
					debouncedSearch || undefined,
				);

				if (!cancelled) {
					setArtists(filteredArtists);
				}
			} catch (error) {
				if (!cancelled) {
					console.error("Failed to fetch artists:", error);
				}
			}
		}

		fetchArtists();

		return () => {
			cancelled = true;
		};
	}, [selectedDiscipline, debouncedSearch]);

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

				<div className={styles.filters}>
					<div className={styles.searchField}>
						<label htmlFor="artist-search">Search by name</label>
						<input
							id="artist-search"
							type="search"
							placeholder="Enter an artist's name"
							value={search}
							onChange={(event) =>
								handleFilterChange(selectedDiscipline, event.target.value)
							}
						/>
					</div>

					<div className={styles.disciplineField}>
						<label htmlFor="discipline-filter">Filter by discipline</label>
						<select
							id="discipline-filter"
							value={selectedDiscipline}
							onChange={(event) =>
								handleFilterChange(event.target.value, search)
							}
						>
							<option value="">All disciplines</option>
							{disciplines.map((discipline) => (
								<option key={discipline.id} value={discipline.slug}>
									{discipline.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{artists.length === 0 ? (
					<p className={styles.emptyState}>
						No artists found for this discipline.
					</p>
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
