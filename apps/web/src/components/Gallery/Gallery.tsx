import type { Artwork } from "../../types/artwork";
import ArtworkPreview from "../ArtworkPreview/ArtworkPreview";
import styles from "./Gallery.module.css";

type GalleryProps = {
	artworks: Artwork[];
};

export default function Gallery({ artworks }: GalleryProps) {
	return (
		<section className={styles.gallery}>
			<div className={styles.heading}>
				<p>Selected works</p>
			</div>

			<div className={styles.artworks}>
				{artworks.map((artwork, index) => (
					<div
						key={artwork.id}
						className={
							index % 3 === 0
								? styles.large
								: index % 3 === 1
									? styles.medium
									: styles.small
						}
					>
						<ArtworkPreview artwork={artwork} />
					</div>
				))}
			</div>
		</section>
	);
}
