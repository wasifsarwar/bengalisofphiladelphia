import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { photoSwipe } from "../utils/photoSwipe";
import { galleryPhotos } from "../data/gallery";
import { PhotoSpace } from "./PhotoSpace";

export function HeroPrints({ onOpen }: { onOpen: (index: number) => void }) {
  const [front, setFront] = useState(1);
  const stack = useRef<HTMLDivElement>(null);
  const previous = useRef<{ left: number; top: number; front: boolean; transform: string }[] | null>(null);
  const busy = useRef(false);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const suppressClick = useRef(false);
  const mouseCleanup = useRef<(() => void) | null>(null);
  const returnPrint = () => {
    const print = stack.current?.querySelector<HTMLElement>(".hero-photo-small");
    if (!print) return;
    const from = getComputedStyle(print).transform;
    print.style.removeProperty("transform");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      print.animate([{ transform: from }, { transform: getComputedStyle(print).transform }], { duration: 220, easing: "ease-out" });
    }
  };

  useEffect(() => {
    const surface = stack.current;
    if (!surface) return;
    const enabled = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      surface.style.removeProperty("--paper-x");
      surface.style.removeProperty("--paper-y");
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse" || gesture.current) return;
      const bounds = surface.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (gesture.current) return;
        surface.style.setProperty("--paper-x", `${-y * 2}deg`);
        surface.style.setProperty("--paper-y", `${x * 2}deg`);
      });
    };
    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", reset);
    enabled.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    return () => {
      mouseCleanup.current?.();
      reset();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", reset);
      enabled.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
    };
  }, []);

  const swap = () => {
    if (busy.current || !stack.current) return;
    previous.current = [...stack.current.querySelectorAll<HTMLElement>("figure")].map((el, index) => ({
      left: el.offsetLeft, top: el.offsetTop, front: index === front, transform: getComputedStyle(el).transform,
    }));
    stack.current.querySelectorAll<HTMLElement>("figure").forEach(el => el.style.removeProperty("transform"));
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
      const endAngle = index === front ? -9 : 5;
      return el.animate([
        { transform: `translate(${dx}px, ${dy}px) ${old.transform}`, zIndex: old.front ? 2 : 1 },
        { transform: `rotate(${endAngle}deg)`, zIndex: index === front ? 2 : 1 },
      ], { duration: 360, easing: "cubic-bezier(.16,1,.3,1)" });
    });
    Promise.all(animations.map(animation => animation.finished.catch(() => {}))).then(() => { busy.current = false; });
    return () => { animations.forEach(animation => animation.cancel()); busy.current = false; };
  }, [front]);

  const dragPrint = (dx: number, dy: number) => {
    if (Math.abs(dx) <= Math.abs(dy) * 1.4 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const print = stack.current?.querySelector<HTMLElement>(".hero-photo-small");
    if (print) {
      const x = Math.max(-160, Math.min(160, dx));
      print.style.transform = `translateX(${x}px) rotate(${-9 + x / 24}deg)`;
    }
  };

  return <div ref={stack} className="hero-collage hero-print-stack" role="group" aria-label="Community photo prints" aria-description="Swipe or use left and right arrow keys to browse. Activate a photo to open it."
    onDragStart={event => event.preventDefault()}
    onMouseDown={event => {
      if (event.button !== 0 || busy.current || !(event.target instanceof Element) || !event.target.closest(".photo-space")) return;
      event.preventDefault();
      mouseCleanup.current?.();
      suppressClick.current = false;
      const x = event.clientX, y = event.clientY;
      gesture.current = { x, y, id: -1 };
      stack.current?.querySelector(".hero-photo-small")?.getAnimations().forEach(animation => animation.cancel());
      stack.current?.setAttribute("data-dragging", "true");
      const move = (moveEvent: MouseEvent) => dragPrint(moveEvent.clientX - x, moveEvent.clientY - y);
      const cleanup = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        window.removeEventListener("blur", cancel);
        mouseCleanup.current = null;
      };
      const cancel = () => {
        cleanup(); gesture.current = null; suppressClick.current = true;
        stack.current?.removeAttribute("data-dragging"); returnPrint();
      };
      const end = (up: MouseEvent) => {
        cleanup(); gesture.current = null;
        stack.current?.removeAttribute("data-dragging");
        const dx = up.clientX - x, dy = up.clientY - y;
        suppressClick.current = Math.abs(dx) > 8 || Math.abs(dy) > 8;
        if (photoSwipe(dx, dy, 24)) swap();
        else returnPrint();
      };
      mouseCleanup.current = cleanup;
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", end);
      window.addEventListener("blur", cancel);
    }}
    onPointerDown={event => {
      if (event.pointerType === "mouse") return;
      suppressClick.current = false;
      if (busy.current || !event.isPrimary || event.button !== 0 || !(event.target instanceof Element) || !event.target.closest(".photo-space")) return;
      stack.current?.querySelector(".hero-photo-small")?.getAnimations().forEach(animation => animation.cancel());
      stack.current?.setAttribute("data-dragging", "true");
      gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    }}
    onPointerMove={event => {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      dragPrint(event.clientX - start.x, event.clientY - start.y);
    }}
    onPointerUp={event => {
      if (event.pointerType === "mouse") return;
      const start = gesture.current;
      gesture.current = null;
      stack.current?.removeAttribute("data-dragging");
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      suppressClick.current = Math.abs(dx) > 10 || Math.abs(dy) > 10;
      const step = photoSwipe(dx, dy);
      if (step && !busy.current) swap();
      else returnPrint();
    }}
    onPointerCancel={() => { gesture.current = null; stack.current?.removeAttribute("data-dragging"); suppressClick.current = true; returnPrint(); }}
    onLostPointerCapture={() => {
      if (!gesture.current) return;
      gesture.current = null;
      stack.current?.removeAttribute("data-dragging");
      suppressClick.current = true;
      returnPrint();
    }}
    onClickCapture={event => {
      if (suppressClick.current && event.detail > 0) {
        event.preventDefault(); event.stopPropagation(); suppressClick.current = false;
      }
    }}
    onKeyDown={event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault(); swap();
      }
    }}>
    {galleryPhotos.slice(0, 2).map((photo, index) => <PhotoSpace key={photo.image} {...photo}
      onOpen={() => onOpen(index)} loading="eager"
      className={index === front ? "hero-photo-small" : "hero-photo-main"} />)}
    <span className="signature-label" role="status">{galleryPhotos[front].caption} is in front.</span>
  </div>;
}
