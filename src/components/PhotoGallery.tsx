import { useEffect, useRef } from "react";
import { galleryPhotos } from "../data/gallery";
import { imageUrl } from "../data/content";

export function PhotoGallery({ index, onChange, onClose }: { index: number; onChange: (index: number) => void; onClose: () => void }) {
  const opener = useRef(document.activeElement as HTMLElement | null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const photo = galleryPhotos[index];
  const move = (step: number) => onChange((index + step + galleryPhotos.length) % galleryPhotos.length);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.current?.close();
      opener.current?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog ref={dialog} className="photo-gallery" aria-label="Community photo gallery" onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}>
      <div className="gallery-panel">
        <div className="gallery-top"><span>Our community</span><button type="button" onClick={onClose} autoFocus>Close ×</button></div>
        <div className="gallery-image" onTouchStart={event => {
          if (event.touches.length !== 1) { touch.current = null; return; }
          touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => {
          const start = touch.current;
          touch.current = null;
          if (!start || !event.changedTouches.length) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        }}>
          <img key={photo.image} src={imageUrl(`community/${photo.image}`)} alt={photo.alt} />
        </div>
        <div className="gallery-bottom">
          <button type="button" aria-label="Previous photo" onClick={() => move(-1)}>←</button>
          <div aria-live="polite" aria-atomic="true"><p>{photo.caption}</p><span>{index + 1} / {galleryPhotos.length}</span></div>
          <button type="button" aria-label="Next photo" onClick={() => move(1)}>→</button>
        </div>
      </div>
    </dialog>
  );
}
