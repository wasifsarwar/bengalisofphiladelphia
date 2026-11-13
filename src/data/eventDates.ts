import type { CommunityEvent } from "./events";

export function philadelphiaDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  return ["year", "month", "day"].map(type => parts.find(part => part.type === type)!.value).join("-");
}

export function upcomingEvents(events: CommunityEvent[], today: string, past = false) {
  return events.filter(event => {
    const date = new Date(`${event.date}T12:00:00Z`);
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(event.date) && !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === event.date;
    return valid && (past ? event.date < today : event.date >= today) && (!event.url || /^https:\/\//i.test(event.url));
  }).sort((a, b) => a.date.localeCompare(b.date));
}
