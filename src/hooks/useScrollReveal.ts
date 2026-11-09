import { useEffect } from "react";
import type { RefObject } from "react";

/** Progressive enhancement: content starts visible and never depends on motion. */
export function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(container.querySelectorAll<HTMLElement>(
      ".story-image, .story-copy, .gatherings-heading, .gathering, .involvement-copy, .involvement-actions, .join-inner",
    ));
    let observer: IntersectionObserver | undefined;
    const reset = () => {
      observer?.disconnect();
      targets.forEach((element) => element.classList.remove("scroll-reveal", "is-revealed"));
    };
    const setup = () => {
      reset();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      targets.forEach((element) => {
        // Leave anchor destinations and anything already onscreen visible.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("scroll-reveal");
        observer?.observe(element);
      });
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { reset(); preference.removeEventListener("change", setup); };
  }, [root]);
}
