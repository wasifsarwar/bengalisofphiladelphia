import { galleryPhotos } from "../data/gallery";
import { PhotoSpace } from "./PhotoSpace";

export function CommunityAlbum({ onOpen, fullPage = false }: { onOpen: (index: number) => void; fullPage?: boolean }) {
  const Heading = fullPage ? "h1" : "h2";
  return <section className="album wrap" aria-labelledby="album-heading">
    <div className="album-heading"><Heading id="album-heading">Our community album.</Heading><p>A few moments together. Pick a photo to take a closer look.</p></div>
    <div className="album-prints" role="group" aria-label="Community photos">
      {galleryPhotos.map((photo, index) => <PhotoSpace key={photo.image} {...photo}
        className={`album-print album-print-${index + 1}`} onOpen={() => onOpen(index)} />)}
    </div>
  </section>;
}
