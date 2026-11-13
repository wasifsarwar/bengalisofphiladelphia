import { flushSync } from "react-dom";

// One shared photo name connects the page print to the modal image.
export function galleryTransition(update: () => void, trigger: HTMLElement | null, closing = false) {
  const image = trigger?.querySelector<HTMLImageElement>("img") ?? trigger?.parentElement?.querySelector<HTMLImageElement>("img");
  const supportsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || !supportsMotion || !image || !image.isConnected) {
    update();
    return;
  }
  if (!closing) trigger?.focus({ preventScroll: true });
  const previousName = image.style.viewTransitionName;
  let applied = false;
  const apply = () => {
    if (applied) return;
    applied = true;
    image.style.viewTransitionName = previousName;
    flushSync(update);
    if (closing) image.style.viewTransitionName = "bop-photo";
  };
  if (!closing) image.style.viewTransitionName = "bop-photo";
  try {
    const transition = document.startViewTransition(apply);
    void transition.finished.catch(() => {}).finally(() => {
      image.style.viewTransitionName = previousName;
    });
  } catch {
    image.style.viewTransitionName = previousName;
    apply();
  }
}
