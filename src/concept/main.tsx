import { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import { imageUrl, links } from "../data/content";
import "./style.css";

function Flower({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="40" cy="21" rx="7" ry="16" transform={`rotate(${i * 45} 40 40)`} stroke="currentColor" strokeWidth="1.3" />
      ))}
      <circle cx="40" cy="40" r="5" fill="currentColor" />
    </svg>
  );
}

type PhotoSpaceProps = { className?: string; caption: string; tone?: string; image?: string; alt?: string };
function PhotoSpace({ className = "", caption, tone = "sand", image, alt }: PhotoSpaceProps) {
  return (
    <figure className={`photo-space photo-${tone} ${className}`}>
      <div className="photo-surface" role={image ? undefined : "img"} aria-label={image ? undefined : `Photo placeholder: ${caption}`}>
        {image ? <img src={imageUrl(`community/${image}`)} alt={alt ?? caption} /> : <>
        <span className="photo-corner corner-tl" aria-hidden="true" />
        <span className="photo-corner corner-tr" aria-hidden="true" />
        <span className="photo-corner corner-bl" aria-hidden="true" />
        <span className="photo-corner corner-br" aria-hidden="true" />
        <span className="photo-label"><Flower />Photo to come</span>
        </>}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Wordmark() {
  return <span className="wordmark"><span className="wordmark-bop">bop<span>.</span></span><span className="wordmark-name">Bengalis of<br />Philadelphia</span></span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <a className="skip-link" href="#main" onClick={() => main.current?.focus()}>Skip to content</a>
      <div className="welcome-strip">Rooted in Bangladesh. Together in Philly.</div>
      <header className="header" onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); }
      }}>
        <div className="wrap header-inner">
          <a className="brand" href="#home" aria-label="Bengalis of Philadelphia home" onClick={closeMenu}><Wordmark /></a>
          <button className="menu-button" ref={menuButton} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
          <nav id="navigation" className={menuOpen ? "navigation open" : "navigation"} aria-label="Main navigation">
            <a href="#our-story" onClick={closeMenu}>Our story</a>
            <a href="#gatherings" onClick={closeMenu}>Gatherings</a>
            <a href="#get-involved" onClick={closeMenu}>Get involved</a>
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
            <PhotoSpace className="hero-photo-main" image="BOP_Hike.png" alt="BOP members gathered on a wooded hiking trail" caption="Good company, out on the trail." />
            <PhotoSpace className="hero-photo-small" image="BOP_Game_Night.png" alt="BOP members posing together at game night" caption="Game night. Good company." tone="rose" />
            <div className="belonging-stamp"><span>There’s room<br />for you here.</span><Flower /></div>
            <p className="collage-note">Making room for new memories.</p>
          </div>
        </section>

        <div className="community-ribbon" aria-label="Cha and adda, familiar roots, new friendships, Philly plans">
          <span>Cha & adda</span><Flower /><span>Familiar roots</span><Flower /><span>New friendships</span><Flower /><span>Philly plans</span><Flower />
        </div>

        <section className="story wrap" id="our-story" aria-labelledby="story-heading">
          <div className="story-image"><PhotoSpace caption="Our people. Our city." tone="olive" /><span className="story-image-note">A place to find your people.</span></div>
          <div className="story-copy">
            <p className="section-label">Meet Bengalis of Philadelphia</p>
            <h2 id="story-heading">There’s always<br />room for<br /><em>one more.</em></h2>
            <p>We’re building a Bengali community in Philadelphia, rooted in Bangladesh and open to honorary Bengalis, too.</p>
            <p>Think cha and adda, a walk around the city, or a good reason to get together. Whether you’re new to Philly or have called it home for years, you’re welcome here.</p>
            <a className="text-link" href={links.heylo}>Come say hello <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="gatherings" id="gatherings" aria-labelledby="gatherings-heading">
          <div className="wrap">
            <div className="gatherings-heading">
              <div><p className="section-label">Things we’re planning</p><h2 id="gatherings-heading">Let’s make <em>a plan.</em></h2></div>
              <div className="gatherings-note"><p>A few ideas to get us together.<br />Confirmed dates and details will be shared on Heylo.</p><a className="text-link" href={links.heylo}>Follow the plans on Heylo <span aria-hidden="true">↗</span></a></div>
            </div>
            <div className="gathering-grid">
              <article className="gathering"><PhotoSpace caption="For the conversations that keep going." tone="rose" /><div className="gathering-copy"><p className="idea-label">Gathering idea</p><h3>Cha & adda</h3><p>A cup of cha, something to snack on, and plenty to catch up about.</p></div></article>
              <article className="gathering"><PhotoSpace caption="For getting to know our city." tone="sand" /><div className="gathering-copy"><p className="idea-label">Gathering idea</p><h3>Out around Philly</h3><p>Riverside walks, museum days, and a few new favorite corners of the city.</p></div></article>
              <article className="gathering"><PhotoSpace caption="For a little friendly competition." tone="olive" /><div className="gathering-copy"><p className="idea-label">Gathering idea</p><h3>Games & good company</h3><p>Bring your competitive side, a game suggestion, or just yourself.</p></div></article>
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

      <footer className="footer wrap"><div className="footer-top"><a className="brand" href="#home" aria-label="Bengalis of Philadelphia home"><Wordmark /></a><p>Rooted in Bangladesh.<br />Together in Philly.</p><div className="footer-links"><a href={links.instagram}>Instagram <span aria-hidden="true">↗</span></a><a href={links.email}>Say hello <span aria-hidden="true">↗</span></a></div></div><div className="footer-bottom"><span>Bengalis of Philadelphia</span><a href="#home">Back to top ↑</a></div></footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
