import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

export default function Header() {
	const router = useRouter();
	const pathname = router.pathname;

	const isDiscoverActive = pathname === "/";
	const isDisciplinesActive = pathname.startsWith("/disciplines");
	const isArtistsActive = pathname.startsWith("/artists");

	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo}>
				Artist Platform
			</Link>

			<nav className={styles.nav} aria-label="Main navigation">
				<Link
					href="/"
					className={isDiscoverActive ? styles.active : undefined}
					aria-current={isDiscoverActive ? "page" : undefined}
				>
					Discover
				</Link>

				<Link
					href="/disciplines"
					className={isDisciplinesActive ? styles.active : undefined}
					aria-current={isDisciplinesActive ? "page" : undefined}
				>
					Disciplines
				</Link>

				<Link
					href="/artists"
					className={isArtistsActive ? styles.active : undefined}
					aria-current={isArtistsActive ? "page" : undefined}
				>
					Artists
				</Link>
			</nav>
		</header>
	);
}
