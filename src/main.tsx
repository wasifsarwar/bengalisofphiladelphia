import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/oswald/latin-500.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import { Header, Footer } from "./components/Layout";
import { Home } from "./pages/Home";
import { Story } from "./pages/Story";
import { Involved } from "./pages/Involved";
import type { Page } from "./data/content";
import "./style.css";

function currentPage(): Page {
  const route = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (!route || route === "events") return "events";
  if (route === "our-story" || route === "get-involved") return route;
  return "not-found";
}
function App() {
  const [page, setPage] = useState<Page>(currentPage);
  const previous = useRef(page);
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const navigate = () => setPage(currentPage());
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  useEffect(() => {
    const title = {
      events: "Upcoming events",
      "our-story": "Our story",
      "get-involved": "Get involved",
      "not-found": "Page not found",
    }[page];
    document.title = `${title} | Bengalis of Philadelphia`;
    if (previous.current !== page) {
      main.current?.focus();
      window.scrollTo({ top: 0, behavior: "instant" });
      previous.current = page;
    }
  }, [page]);
  return (
    <div className={`site page-${page}`}>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
          main.current?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <Header page={page} />
      <main id="main" ref={main} tabIndex={-1}>
        {page === "events" && <Home />}
        {page === "our-story" && <Story />}
        {page === "get-involved" && <Involved />}
        {page === "not-found" && (
          <section className="container section">
            <h1>That page isn’t here.</h1>
            <a className="button" href="#/">
              Back to upcoming events
            </a>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
