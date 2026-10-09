import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div>
				<p>Footer info</p>
				<p>© 2026</p>
			</div>

			<nav className={styles.links}>
				<a href="/about">About</a>
			</nav>
		</footer>
	);
}
