import { Flower } from "./Flower";
import { PhotoGallery } from "./PhotoGallery";
import { useEffect, useRef, useState } from "react";
import { events } from "../data/events";
import { philadelphiaDate, upcomingEvents } from "../data/eventDates";
import { imageUrl, links } from "../data/content";

const monthLabel = (month: string) => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T12:00:00Z`));

export function Events() {
  const [flyerIndex, setFlyerIndex] = useState<number | null>(null);
  const [past, setPast] = useState(false);
  const [today, setToday] = useState(philadelphiaDate);
  const [chosenMonth, setChosenMonth] = useState("");
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const track = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const refresh = () => setToday(philadelphiaDate());
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    return () => { clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, []);
  const upcoming = upcomingEvents(events, today, past);
  const months = [...new Set([...(past ? [] : [today.slice(0, 7)]), ...upcoming.map(event => event.date.slice(0, 7))])].sort();
  const month = months.includes(chosenMonth) ? chosenMonth : (past ? months.at(-1) : months[0]) ?? today.slice(0, 7);
  const visible = upcoming.filter(event => event.date.startsWith(month));
  const flyers = visible.filter(event => event.flyer).map(event => ({ image: event.flyer!, alt: `${event.title} flyer`, caption: `${event.title} · ${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${event.date}T12:00:00Z`))}` }));
  useEffect(() => {
    const row = track.current;
    if (!row) { setCanScroll({ left: false, right: false }); return; }
    const measure = () => setCanScroll({ left: row.scrollLeft > 2, right: row.scrollLeft < row.scrollWidth - row.clientWidth - 2 });
    row.scrollTo({ left: 0, behavior: "instant" });
    row.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    measure();
    return () => { row.removeEventListener("scroll", measure); observer.disconnect(); };
  }, [month, past, visible.length]);
  const scroll = (direction: number) => {
    if (!track.current) return;
    const card = track.current.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? track.current.clientWidth) + 24;
    track.current.scrollBy({ left: direction * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section className="events wrap" id="events" aria-labelledby="events-heading">
    <div className="stitched-divider" aria-hidden="true"><span /><Flower /><span /></div>
    <div className="events-heading">
      <div key={`heading-${past}`} className="events-view-heading"><h2 id="events-heading">{past ? "Past events" : "Upcoming events"}</h2><p>{past ? "A look back at time spent together." : "Make time for good company."}</p></div>

    </div>
    <div className="events-toolbar">
    <div className="events-controls event-history-switch" data-view={past ? "past" : "upcoming"} role="group" aria-label="Event history">
      <button type="button" aria-pressed={!past} onClick={() => { setPast(false); setChosenMonth(""); }}>Upcoming</button>
      <button type="button" aria-pressed={past} onClick={() => { setPast(true); setChosenMonth(""); }}>Past events</button>
    </div>
      <label className="events-month"><span>Month</span><select disabled={!months.length} aria-label="Month" value={month} onChange={event => { setChosenMonth(event.target.value); track.current?.scrollTo({ left: 0, behavior: "instant" }); }}>
        {!months.length && <option value={month}>{monthLabel(month)}</option>}
        {months.map(value => <option key={value} value={value}>{monthLabel(value)}</option>)}
      </select></label>
    </div>
    <p className="events-count" role="status">{visible.length ? `${visible.length} ${past ? "past" : "upcoming"} ${visible.length === 1 ? "event" : "events"} in ${monthLabel(month)}` : `No ${past ? "past" : "upcoming"} events listed for ${monthLabel(month)}.`}</p>
    {visible.length ? <>
      <ul ref={track} className={`events-track${visible.length <= 3 ? " events-centered" : ""}`} aria-label={`${monthLabel(month)} events`} tabIndex={0}>
        {visible.map(event => <li className="event-card" key={event.id}>
          {event.flyer && <button type="button" className="event-flyer-open" onClick={() => setFlyerIndex(flyers.findIndex(photo => photo.image === event.flyer))} aria-label={`Open flyer: ${event.title}`}><img className="event-flyer" src={imageUrl(`events/${event.flyer}`)} alt={`${event.title} flyer`} loading="lazy" /></button>}
          <div className="event-ticket"><span className="event-state">{past ? "From the album" : "Coming up"}</span><time dateTime={event.date}>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", weekday: "short", timeZone: "UTC" }).format(new Date(`${event.date}T12:00:00Z`))}</time></div>
          <h3>{event.title}</h3><p className="event-details">{event.time}<br />{event.location}</p>
          <p>{event.description}</p>{event.url && <a className="text-link" href={event.url} aria-label={`${past ? "View details" : "Details and RSVP"}: ${event.title}`}>{past ? "View details" : "Details & RSVP"} <span aria-hidden="true">↗</span></a>}
        </li>)}
      </ul>
      {visible.length > 1 && <div className={`events-controls${visible.length <= 3 ? " events-controls-small" : ""}`}>
        <button type="button" disabled={!canScroll.left} onClick={() => scroll(-1)} aria-label="Scroll events left">←</button><span>Browse events</span><button type="button" disabled={!canScroll.right} onClick={() => scroll(1)} aria-label="Scroll events right">→</button>
      </div>}
    </> : <div key={`empty-${past}-${month}`} className="events-empty"><p>{past ? "No past events have been added for this month." : "New plans will be shared here when they’re confirmed."}</p><a className="text-link" href={links.heylo}>Visit BOP on Heylo <span aria-hidden="true">↗</span></a></div>}
    {flyerIndex !== null && flyers[flyerIndex] && <PhotoGallery photos={flyers} folder="events" title="Event flyers" index={flyerIndex} onChange={setFlyerIndex} onClose={() => setFlyerIndex(null)} />}
  </section>;
}
