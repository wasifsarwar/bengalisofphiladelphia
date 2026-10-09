import { useState } from "react";
import { CommunityArchive } from "../components/CommunityArchive";
import { Artwork, Updates } from "../components/Layout";
import { categories, eventIdeas, imageUrl, links } from "../data/content";
import type { Category } from "../data/content";
export function Home() {
  const [category, setCategory] = useState<Category>("All events");
  const ideas = eventIdeas.filter(
    (event) => category === "All events" || event.category === category,
  );
  return (
    <>
      <a className="mobile-host" href={links.host}>
        <img
          src={imageUrl("social-host.png")}
          alt="Call for BOP social hosts. Apply to host a meetup."
          width="480"
          height="640"
        />
      </a>
      <section className="home-hero">
        <div className="container">
          <p className="eyebrow">Bengalis of Philadelphia / Est. 2026</p>
          <h1>
            Culture.
            <br />
            Community. Philly.
          </h1>
          <p className="intro">
            We’re Bangladeshis in Philly getting together for cha, adda, and
            time around the city. We’re planning walks and hikes, museum days,
            pick-up games, cultural events, and bookstore crawls. Honorary
            Bengalis are welcome, too.
          </p>
          <a className="button" href="#/get-involved">
            <span className="star" aria-hidden="true">
              ✷
            </span>{" "}
            Let’s build this together
          </a>
        </div>
      </section>
      <CommunityArchive />
      <section className="events section" aria-labelledby="events-heading">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Mark your calendars</p>
              <h2 id="events-heading">Upcoming events</h2>
            </div>
            <a className="button button-outline" href={links.heylo}>
              Join on Heylo <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="events-note">
            Here’s what we’re planning. Dates and locations are still to come.
            Check Heylo for confirmed meetups and registration.
          </p>
          <div className="filters" role="group" aria-label="Filter event ideas">
            {categories.map((item) => (
              <button
                key={item}
                aria-pressed={item === category}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {ideas.length} event {ideas.length === 1 ? "idea" : "ideas"} shown
          </p>
          <p className="event-group-label">
            {category === "All events" ? "The next get-together" : category}
          </p>
          <div className="event-grid">
            {ideas.map((event, index) => (
              <article
                className={`event-card ${index === 0 && category === "All events" ? "featured" : ""}`}
                key={event.id}
              >
                <Artwork name={event.image} alt={event.alt} />
                <div className="event-body">
                  <p className="eyebrow">Event idea · Date to come</p>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p className="venue">Philadelphia · Venue to be confirmed</p>
                  <div className="event-bottom">
                    <span>Details to come</span>
                    <a
                      className="button button-small"
                      href={links.heylo}
                      aria-label={`Register on Heylo: ${event.title}`}
                    >
                      Register on Heylo <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="section-end">
            <a className="button button-rust" href={links.heylo}>
              See the latest plans on Heylo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <Updates />
    </>
  );
}
