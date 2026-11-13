export type CommunityEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD, Philadelphia local date. Visible through this day.
  time: string; // Visitor-facing time, e.g. "6–8 PM ET".
  location: string;
  description: string;
  flyer?: string; // Filename under public/images/events/.
  url?: string; // HTTPS event details or RSVP link.
};

// Add confirmed events here. See docs/events.md for the monthly editing workflow.
export const events: CommunityEvent[] = [{
  id: "pumpkin-carving-2026-10-22",
  title: "Pumpkin carving",
  date: "2026-10-22",
  time: "5:30–8 PM ET",
  location: "Morgan’s Pier (Fall Fest)",
  description: "Pumpkin carving at Morgan’s Pier Fall Fest. RSVP was required.",
  flyer: "BOP_Pumpkin_Carving.png",
}];
