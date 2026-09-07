import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<a href="/" className={styles.logo}>
				Artist Name
			</a>

			<nav className={styles.nav}>
				<a href="/">Work</a>
				<a href="/about">About</a>
			</nav>
		</header>
	);
}
