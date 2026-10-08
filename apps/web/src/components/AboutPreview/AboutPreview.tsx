import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
	return (
		<section className={styles.about}>
			<p className={styles.label}>About</p>

			<div className={styles.content}>
				<h2>Artist Name</h2>

				<p>
					Artist Name is a visual artist exploring nature, memory, and light
					through a range of creative practices.
				</p>

				<a href="/about">Read more →</a>
			</div>
		</section>
	);
}
