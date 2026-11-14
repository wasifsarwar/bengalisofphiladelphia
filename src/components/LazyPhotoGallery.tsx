import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";

const Viewer = lazy(() => import("./PhotoGallery").then(module => ({ default: module.PhotoGallery })));

export function PhotoGallery(props: ComponentProps<typeof Viewer>) {
  return <Suspense fallback={<div className="viewer-loading" role="status"><span>Opening photo viewer…</span><button type="button" onClick={props.onClose}>Cancel</button></div>}><Viewer {...props} /></Suspense>;
}
