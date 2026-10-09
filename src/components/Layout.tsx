import { useEffect, useRef, useState } from "react";
import { imageUrl, links } from "../data/content";
import type { Page } from "../data/content";
export function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [page]);
  const navigation = [
    { page: "events", href: "#/", label: "Upcoming events" },
    { page: "our-story", href: "#/our-story", label: "Our story" },
    { page: "get-involved", href: "#/get-involved", label: "Get involved" },
  ];
  return (
    <>
      <div className="community-strip">
        <a href={links.heylo}>
          <span className="strip-copy">★ Register for meetups via Heylo ★</span>
          {page === "events" && (
            <span className="strip-repeat" aria-hidden="true">
              {" "}
              Register for meetups via Heylo ★ Register for meetups via Heylo ★
            </span>
          )}
        </a>
      </div>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="container header-inner">
          <a
            href="#/"
            className="brand"
            aria-label="Bengalis of Philadelphia home"
          >
            <img src={imageUrl("bop-logo.jpg")} width="58" height="58" alt="" />
            <span>
              Bengalis of
              <br />
              Philadelphia
            </span>
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}{" "}
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
          <nav
            id="main-navigation"
            className={open ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.page}
                href={item.href}
                aria-current={page === item.page ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="instagram-nav"
              href={links.instagram}
              aria-label="Bengalis of Philadelphia on Instagram"
            >
              <InstagramIcon />
            </a>
          </nav>
          <a className="button button-rust header-join" href={links.heylo}>
            Join the community <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#/" className="footer-brand">
          Bengalis of Philadelphia
        </a>
        <p>Rooted in Bangladesh. Together in Philly.</p>
        <a href={links.instagram} className="instagram-link">
          <InstagramIcon /> Instagram <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
export function Updates() {
  return (
    <section className="updates">
      <div className="container updates-inner">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Get event updates</h2>
          <p>Find the next meetup and register on Heylo.</p>
        </div>
        <a className="button" href={links.heylo}>
          Join on Heylo <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
export function Artwork({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      className={`artwork ${className}`}
      src={imageUrl(name)}
      alt={alt}
      loading="lazy"
      width="600"
      height="300"
    />
  );
}
