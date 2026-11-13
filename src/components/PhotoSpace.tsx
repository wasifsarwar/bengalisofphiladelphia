import { photoPreviews } from "../data/photoPreviews";
import { galleryTransition } from "../utils/galleryTransition";
import { imageUrl } from "../data/content";
import { Flower } from "./Flower";

type PhotoSpaceProps = { onActivate?: () => void; actionLabel?: string; className?: string; caption: string; tone?: string; image?: string; alt?: string; onOpen?: () => void; loading?: "eager" | "lazy" };
export function PhotoSpace({ className = "", caption, tone = "sand", image, alt, loading = "lazy", onOpen, onActivate, actionLabel }: PhotoSpaceProps) {
  const previews = image ? photoPreviews[image] : undefined;
  return (
    <figure className={`photo-space photo-${tone} ${className}`}>
      <div className="photo-surface" role={image ? undefined : "img"} aria-label={image ? undefined : `Photo placeholder: ${caption}`}>
        {image ? <><img src={imageUrl(previews?.at(-1)?.src ?? `community/${image}`)} srcSet={previews?.map(preview => `${imageUrl(preview.src)} ${preview.width}w`).join(", ")} sizes="(max-width: 600px) 75vw, (max-width: 850px) 50vw, 640px" alt={alt ?? caption} loading={loading} decoding="async" />{(onOpen || onActivate) && <button className="photo-open" type="button" onClick={event => onActivate ? onActivate() : onOpen && galleryTransition(onOpen, event.currentTarget)} aria-label={actionLabel ?? `View photo: ${caption}`} />}</> : <>
        <span className="photo-corner corner-tl" aria-hidden="true" />
        <span className="photo-corner corner-tr" aria-hidden="true" />
        <span className="photo-corner corner-bl" aria-hidden="true" />
        <span className="photo-corner corner-br" aria-hidden="true" />
        <span className="photo-label"><Flower />Photo to come</span>
        </>}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

