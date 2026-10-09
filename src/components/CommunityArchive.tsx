import { InstagramIcon } from "./Layout";
import { links } from "../data/content";

function MediaIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="9" cy="8" r="1.5" />
      <path d="m4 17 5-5 3 3 4-5 4 5" />
    </svg>
  );
}

export function CommunityArchive() {
  return (
    <section className="archive section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Archive</p>
            <h2>IRL Connections</h2>
          </div>
          <a className="button button-rust" href={links.heylo}>
            Join on Heylo <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="archive-heading">
          <h3>What we’ve been up to</h3>
          <p>Photos and flyers from our community.</p>
        </div>
        <div className="archive-grid">
          <article className="archive-card">
            <div className="archive-placeholder archive-photos">
              <span className="media-icon">
                <MediaIcon />
              </span>
              <h4>Past-event photos</h4>
              <p>Photos from our gatherings will appear here.</p>
            </div>
            <p className="archive-caption">
              Cha, days out, and time together around Philly.
            </p>
          </article>
          <article className="archive-card">
            <div className="archive-placeholder archive-flyers">
              <span className="media-icon">
                <MediaIcon />
              </span>
              <h4>Previous event flyers</h4>
              <p>Past meetup flyers will appear here.</p>
            </div>
            <p className="archive-caption">
              A place to look back at the plans we’ve shared.
            </p>
          </article>
          <aside className="archive-note">
            <span className="media-icon">
              <MediaIcon />
            </span>
            <h3>From the community</h3>
            <p>
              We’re putting this album together. In the meantime, you can find
              BOP updates on Instagram.
            </p>
            <a className="text-link" href={links.instagram}>
              <InstagramIcon /> Follow along <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
        <div
          className="archive-mosaic"
          aria-label="Community gallery awaiting photos"
        >
          <div className="archive-tile community-tile">
            <MediaIcon />
            <h4>Our people, around Philly</h4>
            <p>Community photos coming soon.</p>
          </div>
          <div className="archive-tile moments-tile">
            <MediaIcon />
            <h4>Moments together</h4>
          </div>
          <div className="archive-tile art-tile">
            <MediaIcon />
            <h4>Art from our community</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
