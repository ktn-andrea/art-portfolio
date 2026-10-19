import type { GetServerSideProps } from "next";
import DisciplineCard from "../../components/DisciplineCard/DisciplineCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getDisciplines } from "../../lib/api";
import type { Discipline } from "../../types/discipline";
import styles from "./index.module.css";

type DisciplinesPageProps = {
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

export const getServerSideProps: GetServerSideProps<
	DisciplinesPageProps
> = async () => {
	try {
		const disciplines = await getDisciplines();
		return { props: { disciplines } };
	} catch (error) {
		console.error("Failed to load disciplines:", error);
		throw error;
	}
};

export default function DisciplinesPage({ disciplines }: DisciplinesPageProps) {
	return (
		<>
			<Header />

			<main className={styles.page}>
				<header className={styles.pageHeader}>
					<p className={styles.eyebrow}>Discover</p>
					<h1 className={styles.title}>Disciplines</h1>
					<p className={styles.description}>
						Explore different forms of creativity, from painting and photography
						to writing and ceramics.
					</p>
				</header>

				{disciplines.length === 0 ? (
					<p className={styles.emptyState}>No disciplines to display yet.</p>
				) : (
					<ul className={styles.disciplineGrid}>
						{disciplines.map((discipline) => (
							<li key={discipline.slug}>
								<DisciplineCard
									discipline={discipline}
									image={
										disciplineImages[discipline.slug] ??
										"/images/disciplines/painting.svg"
									}
								/>
							</li>
						))}
					</ul>
				)}
			</main>

			<Footer />
		</>
	);
}
