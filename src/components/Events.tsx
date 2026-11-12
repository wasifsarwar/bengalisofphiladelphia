import { useEffect, useRef, useState } from "react";
import { events } from "../data/events";
import { philadelphiaDate, upcomingEvents } from "../data/eventDates";
import { links } from "../data/content";

const monthLabel = (month: string) => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T12:00:00Z`));

export function Events() {
  const [today, setToday] = useState(philadelphiaDate);
  const [chosenMonth, setChosenMonth] = useState("");
  const track = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const refresh = () => setToday(philadelphiaDate());
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    return () => { clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, []);
  const upcoming = upcomingEvents(events, today);
  const months = [...new Set([today.slice(0, 7), ...upcoming.map(event => event.date.slice(0, 7))])].sort();
  const month = months.includes(chosenMonth) ? chosenMonth : months[0];
  const visible = upcoming.filter(event => event.date.startsWith(month));
  const scroll = (direction: number) => {
    if (!track.current) return;
    const card = track.current.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? track.current.clientWidth) + 24;
    track.current.scrollBy({ left: direction * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section className="events wrap" id="events" aria-labelledby="events-heading">
    <div className="events-heading">
      <div><h2 id="events-heading">Upcoming events</h2><p>Make time for good company.</p></div>
      <label className="events-month">Month<select value={month} onChange={event => { setChosenMonth(event.target.value); track.current?.scrollTo({ left: 0, behavior: "instant" }); }}>
        {months.map(value => <option key={value} value={value}>{monthLabel(value)}</option>)}
      </select></label>
    </div>
    <p className="events-count" role="status">{visible.length ? `${visible.length} upcoming ${visible.length === 1 ? "event" : "events"} in ${monthLabel(month)}` : `No upcoming events listed for ${monthLabel(month)}.`}</p>
    {visible.length ? <>
      <ul ref={track} className={`events-track${visible.length <= 3 ? " events-centered" : ""}`} aria-label={`${monthLabel(month)} events`} tabIndex={0}>
        {visible.map(event => <li className="event-card" key={event.id}>
          <time dateTime={event.date}>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", weekday: "short", timeZone: "UTC" }).format(new Date(`${event.date}T12:00:00Z`))}</time>
          <h3>{event.title}</h3><p className="event-details">{event.time}<br />{event.location}</p>
          <p>{event.description}</p><a className="text-link" href={event.url} aria-label={`Details and RSVP: ${event.title}`}>Details & RSVP <span aria-hidden="true">↗</span></a>
        </li>)}
      </ul>
      {visible.length > 1 && <div className={`events-controls${visible.length <= 3 ? " events-controls-small" : ""}`}>
        <button type="button" onClick={() => scroll(-1)} aria-label="Scroll events left">←</button><span>Browse events</span><button type="button" onClick={() => scroll(1)} aria-label="Scroll events right">→</button>
      </div>}
    </> : <div className="events-empty"><p>New plans will be shared here when they’re confirmed.</p><a className="text-link" href={links.heylo}>Visit BOP on Heylo <span aria-hidden="true">↗</span></a></div>}
  </section>;
}
