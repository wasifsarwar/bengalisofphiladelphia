export const links = {
  heylo: "https://heylo.group/bengalis-of-philadelphia",
  instagram: "https://www.instagram.com/bengalisofphiladelphia/",
  email: "mailto:bengalisofphiladelphia@gmail.com",
  host: "https://docs.google.com/forms/d/e/1FAIpQLSdLrWrejnLScqwjB4nMd3p_Kek9Mv03RlcPOIG63d0_fOUkpQ/viewform",
};
export const imageUrl = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}`;
export type Page = "events" | "our-story" | "get-involved" | "not-found";
export const categories = [
  "All events",
  "Adda & food",
  "Outdoors",
  "Culture & play",
] as const;
export type Category = (typeof categories)[number];
// Proposals only. Add dates and event-specific URLs after organizer confirmation.
export const eventIdeas: {
  id: string;
  category: Category;
  title: string;
  description: string;
  image: string;
  alt: string;
}[] = [
  {
    id: "cha",
    category: "Adda & food",
    title: "Cha, adda & new friends.",
    description:
      "Meet other Bangladeshis in Philly for cha and adda. Come on your own or bring a friend.",
    image: "cha.png",
    alt: "Cha. Adda. Again. Two cups on a gold background.",
  },
  {
    id: "walk",
    category: "Outdoors",
    title: "Riverside adda walk",
    description:
      "Join us for a walk and adda by the river. We’ll share the route and meeting spot once they’re confirmed.",
    image: "walk.png",
    alt: "Take the scenic route. A Philadelphia skyline beside the river.",
  },
  {
    id: "games",
    category: "Culture & play",
    title: "Bengali game night",
    description:
      "A game night with other Bengalis in Philly. We’re planning the games. Suggestions welcome!",
    image: "games.png",
    alt: "Let the games begin. Two dice on a green background.",
  },
];
