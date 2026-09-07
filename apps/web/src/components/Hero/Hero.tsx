import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.hero}>
			<p className={styles.eyebrow}>Visual artist</p>

			<h1>Artist Name</h1>

			<p className={styles.introduction}>
				Exploring nature, memory, and light through painting and drawing.
			</p>
		</section>
	);
}
