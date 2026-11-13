import test from "node:test";
import assert from "node:assert/strict";
import { pageFromPath } from "../src/data/pages.ts";

test("page destinations resolve under the GitHub Pages base", () => {
  const base = "/bengalisofphiladelphia/";
  for (const page of ["events", "photos"]) {
    assert.equal(pageFromPath(`${base}${page}/`, base), page);
    assert.equal(pageFromPath(`${base}${page}/index.html`, base), page);
    assert.equal(pageFromPath(`${base}${page}`, base), page);
  }
  assert.equal(pageFromPath(base, base), "home");
  assert.equal(pageFromPath(`${base}index.html`, base), "home");
});
