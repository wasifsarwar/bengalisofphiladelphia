import { readFile, mkdir, writeFile } from "node:fs/promises";

// GitHub Pages serves real HTML entries, including direct visits and refreshes.
const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
for (const page of ["events", "photos"]) {
  const directory = new URL(`../dist/${page}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  const title = page === "events" ? "Events" : "Photos";
  await writeFile(new URL("index.html", directory), html.replace("<title>Bengalis of Philadelphia</title>", `<title>${title} | Bengalis of Philadelphia</title>`));
}
