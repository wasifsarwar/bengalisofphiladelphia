import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { links } from "./data/content";
import { Flower } from "./components/Flower";
import { PhotoSpace } from "./components/PhotoSpace";
import { PhotoGallery } from "./components/PhotoGallery";
import { galleryPhotos } from "./data/gallery";
import { Events } from "./components/Events";
import { Wordmark } from "./components/Wordmark";

export function App() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const sections = ["our-story", "events", "gatherings", "get-involved"]
      .map(id => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = header.current?.getBoundingClientRect().height ?? 100;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
      const readingLine = height + 60;
      const current = sections.find(section => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      setActiveSection(current?.id ?? "");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    if (header.current) resize.observe(header.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);
  const menuButton = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  useScrollReveal(main);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <a className="skip-link" href="#main" onClick={() => main.current?.focus()}>Skip to content</a>
      <header ref={header} className="header" onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); }
      }}>
        <div className="wrap header-inner">
          <a className="brand" href="#home" aria-label="Bengalis of Philadelphia home" onClick={closeMenu}><Wordmark /></a>
          <button className="menu-button" ref={menuButton} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
          <nav id="navigation" className={menuOpen ? "navigation open" : "navigation"} aria-label="Main navigation">
            <a href="#our-story" aria-current={activeSection === "our-story" ? "location" : undefined} onClick={closeMenu}>Our story</a>
            <a href="#events" aria-current={activeSection === "events" ? "location" : undefined} onClick={closeMenu}>Events</a>
            <a href="#gatherings" aria-current={activeSection === "gatherings" ? "location" : undefined} onClick={closeMenu}>Gatherings</a>
            <a href="#get-involved" aria-current={activeSection === "get-involved" ? "location" : undefined} onClick={closeMenu}>Get involved</a>
          </nav>
          <a className="button header-join" href={links.heylo}>Join BOP <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main id="main" ref={main} tabIndex={-1}>
        <section className="hero wrap" id="home" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="location-note"><span aria-hidden="true">✳</span> A Bengali community in Philadelphia</p>
            <h1 id="hero-heading">A little<br />Bangladesh.<br /><em>A lot of<br />Philadelphia.</em></h1>
            <p className="hero-description">Familiar roots. New friendships. A place to meet,<br className="desktop-break" /> share some cha, and make this city feel like home.</p>
            <div className="hero-actions"><a className="button" href={links.heylo}>Join the community <span aria-hidden="true">↗</span></a><a className="quiet-link" href="#our-story">Get to know us <span aria-hidden="true">↓</span></a></div>
            <p className="welcome-note">Bengalis & honorary Bengalis welcome.</p>
          </div>
          <div className="hero-collage">
            <PhotoSpace {...galleryPhotos[0]} onOpen={() => setPhotoIndex(0)} loading="eager" className="hero-photo-main" />
            <PhotoSpace {...galleryPhotos[1]} onOpen={() => setPhotoIndex(1)} loading="eager" className="hero-photo-small" tone="rose" />
          </div>
        </section>

        <div className="community-ribbon" aria-label="Cha and adda, familiar roots, new friendships, Philly plans">
          <span>Cha & adda</span><Flower /><span>Familiar roots</span><Flower /><span>New friendships</span><Flower /><span>Philly plans</span><Flower />
        </div>

        <section className="story wrap" id="our-story" aria-labelledby="story-heading">
          <div className="story-image"><PhotoSpace {...galleryPhotos[2]} onOpen={() => setPhotoIndex(2)} tone="olive" /></div>
          <div className="story-copy">
            <p className="section-label">Meet Bengalis of Philadelphia</p>
            <h2 id="story-heading">There’s always<br />room for<br /><em>one more.</em></h2>
            <p>We’re building a Bengali community in Philadelphia, rooted in Bangladesh and open to honorary Bengalis, too.</p>
            <p>Think cha and adda, a walk around the city, or a good reason to get together. Whether you’re new to Philly or have called it home for years, you’re welcome here.</p>
            <a className="text-link" href={links.heylo}>Come say hello <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <Events />

        <section className="gatherings" id="gatherings" aria-labelledby="gatherings-heading">
          <div className="wrap">
            <div className="gatherings-heading">
              <div><p className="section-label">Things we’re planning</p><h2 id="gatherings-heading">Let’s make <em>a plan.</em></h2></div>
              <div className="gatherings-note"><p>A few ideas to get us together.<br />Confirmed dates and details will be shared on Heylo.</p><a className="text-link" href={links.heylo}>Follow the plans on Heylo <span aria-hidden="true">↗</span></a></div>
            </div>
            <div className="gathering-grid">
              <article className="gathering"><PhotoSpace {...galleryPhotos[3]} onOpen={() => setPhotoIndex(3)} tone="rose" /><div className="gathering-copy"><p className="idea-label">Gathering idea</p><h3>Cha & adda</h3><p>A cup of cha, something to snack on, and plenty to catch up about.</p></div></article>
              <article className="gathering"><PhotoSpace {...galleryPhotos[4]} onOpen={() => setPhotoIndex(4)} tone="sand" /><div className="gathering-copy"><p className="idea-label">Gathering idea</p><h3>Out around Philly</h3><p>Riverside walks, museum days, and a few new favorite corners of the city.</p></div></article>
              <article className="gathering"><PhotoSpace {...galleryPhotos[5]} onOpen={() => setPhotoIndex(5)} className="photo-game" tone="olive" /><div className="gathering-copy"><p className="idea-label">Gathering idea</p><h3>Games & good company</h3><p>Bring your competitive side, a game suggestion, or just yourself.</p></div></article>
            </div>
          </div>
        </section>

        <section className="involvement wrap" id="get-involved" aria-labelledby="involvement-heading">
          <Flower className="involvement-flower" />
          <div className="involvement-copy"><p className="section-label">Help shape BOP</p><h2 id="involvement-heading">Bring an idea.<br /><em>Bring yourself.</em></h2><p>Know a good cha spot? Have a walk, game night, or gathering in mind? Help make it happen.</p></div>
          <div className="involvement-actions"><a className="involvement-link" href={links.host}><span><strong>Become a social host</strong><span>Help bring people together.</span></span><span className="round-arrow" aria-hidden="true">↗</span></a><a className="involvement-link" href={links.email}><span><strong>Share an idea</strong><span>We’d love to hear what you have in mind.</span></span><span className="round-arrow" aria-hidden="true">↗</span></a></div>
        </section>

        <section className="join" aria-labelledby="join-heading">
          <div className="wrap join-inner"><Flower /><p>A little connection goes a long way.</p><h2 id="join-heading">Come for the cha.<br /><em>Stay for the adda.</em></h2><a className="button button-cream" href={links.heylo}>Join BOP on Heylo <span aria-hidden="true">↗</span></a><p className="join-note">Your next hello starts here.</p></div>
        </section>
      </main>

      {photoIndex !== null && <PhotoGallery index={photoIndex} onChange={setPhotoIndex} onClose={() => setPhotoIndex(null)} />}
      <footer className="footer wrap"><div className="footer-top"><a className="brand" href="#home" aria-label="Bengalis of Philadelphia home"><Wordmark /></a><p>Rooted in Bangladesh.<br />Together in Philly.</p><div className="footer-links"><a href={links.instagram}>Instagram <span aria-hidden="true">↗</span></a><a href={links.email}>Say hello <span aria-hidden="true">↗</span></a></div></div><div className="footer-bottom"><span>Bengalis of Philadelphia</span><a href="#home">Back to top ↑</a></div></footer>
    </>
  );
}

