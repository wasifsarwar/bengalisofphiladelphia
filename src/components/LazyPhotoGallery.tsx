import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";

const Viewer = lazy(() => import("./PhotoGallery").then(module => ({ default: module.PhotoGallery })));

export function PhotoGallery(props: ComponentProps<typeof Viewer>) {
  return <Suspense fallback={null}><Viewer {...props} /></Suspense>;
}
