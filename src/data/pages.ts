export type Page = "home" | "events" | "photos";

export function pageFromPath(pathname: string, base: string): Page {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const segment = path.replace(/^\/+|\/+$/g, "").replace(/\/index\.html$/, "");
  return segment === "events" || segment === "photos" ? segment : "home";
}
