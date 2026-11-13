import { useLayoutEffect, useRef, useState } from "react";
import { galleryPhotos } from "../data/gallery";
import { PhotoSpace } from "./PhotoSpace";

export function HeroPrints() {
  const [front, setFront] = useState(1);
  const stack = useRef<HTMLDivElement>(null);
  const previous = useRef<{ left: number; top: number; front: boolean }[] | null>(null);
  const busy = useRef(false);

  const swap = () => {
    if (busy.current || !stack.current) return;
    previous.current = [...stack.current.querySelectorAll<HTMLElement>("figure")].map((el, index) => ({
      left: el.offsetLeft, top: el.offsetTop, front: index === front,
    }));
    setFront(current => 1 - current);
  };

  useLayoutEffect(() => {
    const before = previous.current;
    previous.current = null;
    if (!before || !stack.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    busy.current = true;
    const animations = [...stack.current.querySelectorAll<HTMLElement>("figure")].map((el, index) => {
      const old = before[index];
      const dx = old.left - el.offsetLeft;
      const dy = old.top - el.offsetTop;
      const angle = old.front ? -9 : 5;
      const endAngle = index === front ? -9 : 5;
      return el.animate([
        { transform: `translate(${dx}px, ${dy}px) rotate(${angle}deg)`, zIndex: old.front ? 2 : 1 },
        { transform: `translate(${dx + (old.front ? -45 : 35)}px, ${dy - 22}px) rotate(${old.front ? -15 : 10}deg)`, zIndex: old.front ? 2 : 1, offset: .45 },
        { transform: `rotate(${endAngle}deg)`, zIndex: index === front ? 2 : 1 },
      ], { duration: 650, easing: "cubic-bezier(.22,.7,.2,1)" });
    });
    Promise.all(animations.map(animation => animation.finished.catch(() => {}))).then(() => { busy.current = false; });
    return () => { animations.forEach(animation => animation.cancel()); busy.current = false; };
  }, [front]);

  return <div ref={stack} className="hero-collage hero-print-stack" aria-label="Community photo prints">
    {galleryPhotos.slice(0, 2).map((photo, index) => <PhotoSpace key={photo.image} {...photo}
      onActivate={swap} actionLabel={`Shuffle prints: ${photo.caption}`} loading="eager"
      className={index === front ? "hero-photo-small" : "hero-photo-main"} />)}
    <span className="signature-label" role="status">{galleryPhotos[front].caption} is in front.</span>
  </div>;
}
