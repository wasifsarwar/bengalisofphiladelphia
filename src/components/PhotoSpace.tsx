import { imageUrl } from "../data/content";
import { Flower } from "./Flower";

type PhotoSpaceProps = { className?: string; caption: string; tone?: string; image?: string; alt?: string; onOpen?: () => void; loading?: "eager" | "lazy" };
export function PhotoSpace({ className = "", caption, tone = "sand", image, alt, loading = "lazy", onOpen }: PhotoSpaceProps) {
  return (
    <figure className={`photo-space photo-${tone} ${className}`}>
      <div className="photo-surface" role={image ? undefined : "img"} aria-label={image ? undefined : `Photo placeholder: ${caption}`}>
        {image ? <><img src={imageUrl(`community/${image}`)} alt={alt ?? caption} loading={loading} decoding="async" />{onOpen && <button className="photo-open" type="button" onClick={onOpen} aria-label={`View photo: ${caption}`} />}</> : <>
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

