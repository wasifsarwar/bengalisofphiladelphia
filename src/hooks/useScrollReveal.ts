import { useEffect } from "react";
import type { RefObject } from "react";

/** Progressive enhancement: content starts visible and never depends on motion. */
export function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(container.querySelectorAll<HTMLElement>(
      ".album, .stitched-divider, .story-image, .story-copy, .gatherings-heading, .gathering, .involvement-copy, .involvement-actions, .join-inner",
    ));
    let observer: IntersectionObserver | undefined;
    let exitObserver: IntersectionObserver | undefined;
    const reset = () => {
      observer?.disconnect();
      exitObserver?.disconnect();
      targets.forEach((element) => element.classList.remove("scroll-reveal", "is-revealed"));
    };
    const setup = () => {
      reset();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
            entry.target.classList.add("is-revealed");
          }
        });
      }, { threshold: 0.08 });
      // Reset only well outside the viewport. The gap is larger than the CSS
      // translation, preventing flicker as animated bounds cross an edge.
      exitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) entry.target.classList.remove("is-revealed");
        });
      }, { rootMargin: "80px 0px", threshold: 0 });
      targets.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        element.classList.add("scroll-reveal");
        // Keep initial content and anchor destinations visible, but observe
        // them too so revisiting from either direction replays the transition.
        element.classList.toggle("is-revealed", bounds.bottom > 0 && bounds.top < window.innerHeight);
        observer?.observe(element);
        exitObserver?.observe(element);
      });
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { reset(); preference.removeEventListener("change", setup); };
  }, [root]);
}
