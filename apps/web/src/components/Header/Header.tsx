import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo}>
				Artist Platform
			</Link>

			<nav className={styles.nav} aria-label="Main navigation">
				<Link href="/">Discover</Link>
			</nav>
		</header>
	);
}
