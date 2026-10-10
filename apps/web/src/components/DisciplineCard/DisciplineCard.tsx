import Image from "next/image";
import Link from "next/link";
import type { Discipline } from "../../types/discipline";
import styles from "./DisciplineCard.module.css";

type DisciplineCardProps = {
	discipline: Discipline;
	image: string;
};

export default function DisciplineCard({
	discipline,
	image,
}: DisciplineCardProps) {
	return (
		<Link
			className={styles.disciplineCard}
			href={`/disciplines/${discipline.slug}`}
		>
			<Image
				className={styles.disciplineImage}
				src={image}
				alt=""
				width={300}
				height={250}
				sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw"
			/>

			<div className={styles.disciplineContent}>
				<h3 className={styles.disciplineName}>{discipline.name}</h3>

				<p className={styles.disciplineDescription}>
					{discipline.description || "Explore this creative discipline."}
				</p>

				<span className={styles.cardArrow} aria-hidden="true">
					↗
				</span>
			</div>
		</Link>
	);
}
