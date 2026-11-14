import { readFile, mkdir, writeFile } from "node:fs/promises";

// GitHub Pages serves real HTML entries, including direct visits and refreshes.
const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
for (const page of ["events", "photos"]) {
  const directory = new URL(`../dist/${page}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  const title = page === "events" ? "Events" : "Photos";
  const url = `https://wasifsarwar.github.io/bengalisofphiladelphia/${page}/`;
  const description = page === "events" ? "Explore upcoming BOP events and look back at past gatherings in Philadelphia." : "Explore the Bengalis of Philadelphia community album and view original HD photos.";
  const pageHtml = html
    .replace("<title>Bengalis of Philadelphia</title>", `<title>${title} | Bengalis of Philadelphia</title>`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")Bengalis of Philadelphia/g, `$1${title} | Bengalis of Philadelphia`)
    .replace(/(<(?:link rel="canonical" href|meta property="og:url" content)=")[^"]+"/g, `$1${url}"`)
    .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]+"/g, `$1${description}"`);
  await writeFile(new URL("index.html", directory), pageHtml);
}
