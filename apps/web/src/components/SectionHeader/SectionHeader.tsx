import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
	title: string;
	id?: string;
	description?: string;
	action?: ReactNode;
};

export default function SectionHeader({
	title,
	id,
	description,
	action,
}: SectionHeaderProps) {
	return (
		<div className={styles.sectionHeader}>
			<div>
				<h2 className={styles.sectionTitle} id={id}>
					{title}
				</h2>

				{description && (
					<p className={styles.sectionDescription}>{description}</p>
				)}
			</div>

			{action && <div className={styles.sectionAction}>{action}</div>}
		</div>
	);
}
