# Updating events

Edit `src/data/events.ts`. Add confirmed events to the `events` array. Each entry
needs a unique id, title, Philadelphia-local date (`YYYY-MM-DD`), time label,
location, short description, and HTTPS details/RSVP URL. Event dates stay visible
through the event's local calendar day. Multi-day events are not supported yet.

Example structure only, not a confirmed event:

```ts
{
  id: "unique-event-id",
  title: "Confirmed event title",
  date: "2027-01-15",
  time: "6–8 PM ET",
  location: "Confirmed venue",
  description: "A short description of the gathering.",
  url: "https://example.com/replace-with-real-event-link",
}
```

The site sorts upcoming events by date. The selector includes the current month
and future months with events. Past events disappear according to Philadelphia's
calendar date; an open page refreshes its date each minute and when refocused.
A selected future month stays selected until unavailable. New visitors start on
the current month. Empty months show an honest message and a Heylo link.

Desktop shows three cards across; one or two remain centered at the same width.
More cards scroll horizontally with arrow buttons, a scrollbar, or touch gestures.
Tablet uses two columns; phone uses one card with a glimpse of the next. There
is no autoplay. Keyboard users can focus the row and scroll or tab to each RSVP.

Save the file for local preview. Run `npm run build` and
`node --experimental-strip-types --test tests/events.test.mjs`, then commit/push
and verify the GitHub Pages deployment to publish changes. Editing the local
file does not update the public website by itself. No CMS/feed integration exists.
