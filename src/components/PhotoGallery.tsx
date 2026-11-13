import { useEffect, useRef, useState } from "react";
import { galleryPhotos } from "../data/gallery";
import { imageUrl } from "../data/content";

export function PhotoGallery({ index, onChange, onClose, photos = galleryPhotos, folder = "community", title = "Our community" }: { photos?: { image: string; alt: string; caption: string }[]; folder?: "community" | "events"; title?: string; index: number; onChange: (index: number) => void; onClose: () => void }) {
  const opener = useRef(document.activeElement as HTMLElement | null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState(1);
  const [zoom, setZoom] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const select = (next: number) => {
    setDirection(next >= index ? 1 : -1);
    setZoom(1);
    viewport.current?.scrollTo({ left: 0, top: 0, behavior: "instant" });
    onChange(next);
  };
  const photo = photos[index];
  const move = (step: number) => {
    if (photos.length < 2) return;
    setDirection(step);
    setZoom(1);
    viewport.current?.scrollTo({ left: 0, top: 0, behavior: "instant" });
    onChange((index + step + photos.length) % photos.length);
  };
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
    <dialog ref={dialog} className="photo-gallery" aria-label={title} onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (zoom === 1 && event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (zoom === 1 && event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}>
      <div className="gallery-panel">
        <div className="gallery-top"><span>{title}</span><button type="button" onClick={onClose} autoFocus>Close ×</button></div>
        <div className="gallery-tools" role="group" aria-label="Photo zoom">
          <button type="button" disabled={zoom <= 1} aria-label="Zoom out" onClick={() => setZoom(Math.max(1, zoom - .5))}>−</button>
          <span role="status">{Math.round(zoom * 100)}%</span>
          <button type="button" disabled={zoom >= 3} aria-label="Zoom in" onClick={() => setZoom(Math.min(3, zoom + .5))}>+</button>
          <button type="button" disabled={zoom === 1} onClick={() => { setZoom(1); viewport.current?.scrollTo({ left: 0, top: 0, behavior: "instant" }); }}>Fit photo</button>
        </div>
        <p className="gallery-hint">{zoom > 1 ? "Drag or scroll to explore. Fit photo to browse again." : "Zoom in for details. Use the arrows to browse."}</p>
        <div ref={viewport} tabIndex={0} role="region" aria-label="Photo viewing area" className="gallery-image" data-zoomed={zoom > 1}
          onPointerDown={event => {
            if (zoom === 1 || event.pointerType !== "mouse" || event.button !== 0) return;
            event.preventDefault();
            viewport.current?.focus();
            drag.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            if (!drag.current) return;
            event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
            event.currentTarget.scrollTop = drag.current.top - (event.clientY - drag.current.y);
          }}
          onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} data-direction={direction > 0 ? "next" : "previous"} onTouchStart={event => {
          if (zoom > 1 || event.touches.length !== 1) { touch.current = null; return; }
          touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => {
          const start = touch.current;
          touch.current = null;
          if (!start || !event.changedTouches.length) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        }}>
          <div className="gallery-canvas" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}><img draggable={false} key={photo.image} src={imageUrl(`${folder}/${photo.image}`)} alt={photo.alt} onLoad={event => event.currentTarget.classList.add("gallery-image-ready")} /></div>
        </div>
        {photos.length > 1 && <div className="gallery-filmstrip" role="group" aria-label="Choose a photo">
          {photos.map((item, number) => <button type="button" key={`${item.image}-${number}`} aria-label={`Show photo ${number + 1}: ${item.caption}`} aria-pressed={index === number} onClick={() => select(number)}>
            <img src={imageUrl(`${folder}/${item.image}`)} alt="" loading="lazy" /><span>{String(number + 1).padStart(2, "0")}</span>
          </button>)}
        </div>}
        <div className="gallery-bottom">
          <button type="button" disabled={photos.length < 2} aria-label="Previous photo" onClick={() => move(-1)}>←</button>
          <div aria-live="polite" aria-atomic="true"><p>{photo.caption}</p><span>{index + 1} / {photos.length}</span></div>
          <button type="button" disabled={photos.length < 2} aria-label="Next photo" onClick={() => move(1)}>→</button>
        </div>
      </div>
    </dialog>
  );
}
