import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getDiscipline } from "../../lib/api";
import type { DisciplineDetail } from "../../types/discipline-detail";

type DisciplinePageProps = {
	discipline: DisciplineDetail;
};

export const getServerSideProps: GetServerSideProps<
	DisciplinePageProps
> = async (context) => {
	const slug = context.params?.slug;

	if (typeof slug !== "string") {
		return { notFound: true };
	}

	const discipline = await getDiscipline(slug);

	if (!discipline) {
		return { notFound: true };
	}

	return {
		props: { discipline },
	};
};

export default function DisciplinePage({ discipline }: DisciplinePageProps) {
	return (
		<main>
			<header>
				<Link href="/">← Back to discover</Link>

				<h1>{discipline.name}</h1>

				{discipline.description && <p>{discipline.description}</p>}
			</header>

			<section>
				<h2>Artists</h2>

				{discipline.artists.length === 0 ? (
					<p>No artists have been added to this discipline yet.</p>
				) : (
					<ul>
						{discipline.artists.map((artist) => (
							<li key={artist.id}>
								<Link href={`/artists/${artist.id}`}>
									<h3>{artist.name}</h3>
								</Link>
								{artist.bio && <p>{artist.bio}</p>}
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}
