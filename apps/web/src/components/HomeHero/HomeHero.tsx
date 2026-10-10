import styles from "./HomeHero.module.css";

export default function HomeHero() {
	return (
		<section className={styles.hero} aria-labelledby="hero-heading">
			<p className={styles.eyebrow}>A space for independent creativity</p>

			<h1 className={styles.heroTitle} id="hero-heading">
				Find your kind of art.
			</h1>

			<p className={styles.heroDescription}>
				Discover artists and explore creative work across disciplines, materials
				and ideas.
			</p>
		</section>
	);
}
