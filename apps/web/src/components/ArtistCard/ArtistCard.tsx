import Image from "next/image";
import Link from "next/link";
import type { Artist } from "../../types/artist";
import styles from "./ArtistCard.module.css";

type ArtistCardProps = {
	artist: Artist;
};

export default function ArtistCard({ artist }: ArtistCardProps) {
	return (
		<article className={styles.artistCard}>
			<Link className={styles.artistImageLink} href={`/artists/${artist.id}`}>
				{artist.cover_image ? (
					<Image
						className={styles.artistImage}
						src={artist.cover_image}
						alt={`Cover image for ${artist.name}`}
						width={600}
						height={450}
					/>
				) : (
					<div className={styles.artistImagePlaceholder}>
						<span>No cover image yet</span>
					</div>
				)}
			</Link>

			<h3 className={styles.artistName}>
				<Link className={styles.artistLink} href={`/artists/${artist.id}`}>
					{artist.name}
				</Link>
			</h3>

			{artist.bio && <p className={styles.artistBio}>{artist.bio}</p>}

			<p className={styles.artistMeta}>
				{artist.artworks.length}{" "}
				{artist.artworks.length === 1 ? "artwork" : "artworks"}
			</p>
		</article>
	);
}
