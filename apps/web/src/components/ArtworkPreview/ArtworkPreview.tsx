import Image from "next/image";

import type { Artwork } from "../../types/artwork";
import styles from "./ArtworkPreview.module.css";

type ArtworkPreviewProps = {
	artwork: Artwork;
};

export default function ArtworkPreview({ artwork }: ArtworkPreviewProps) {
	return (
		<article className={styles.preview}>
			<Image
				src={artwork.image}
				alt={artwork.title}
				width={800}
				height={800}
				priority
			/>

			<div className={styles.info}>
				<h2>{artwork.title}</h2>
				<p>
					{artwork.year} · {artwork.medium}
				</p>
			</div>
		</article>
	);
}
