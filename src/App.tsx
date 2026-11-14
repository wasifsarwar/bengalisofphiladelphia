import { pageFromPath } from "./data/pages";
import { CommunityAlbum } from "./components/CommunityAlbum";
import { HeroPrints } from "./components/HeroPrints";
import { EtchedSignature } from "./components/EtchedSignature";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { imageUrl, links } from "./data/content";
import { Flower } from "./components/Flower";
import { PhotoSpace } from "./components/PhotoSpace";
import { PhotoGallery } from "./components/LazyPhotoGallery";
import { galleryPhotos } from "./data/gallery";
import { Events } from "./components/Events";
import { Wordmark } from "./components/Wordmark";

export function App() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const base = import.meta.env.BASE_URL;
  const page = pageFromPath(location.pathname, base);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    let lastHeaderHeight = -1;
    const update = () => {
      frame = 0;
      const height = header.current?.getBoundingClientRect().height ?? 100;
      if (height !== lastHeaderHeight) {
        document.documentElement.style.setProperty("--header-height", `${height}px`);
        lastHeaderHeight = height;
      }

    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    if (header.current) resize.observe(header.current);
    document.title = `${page === "home" ? "" : page === "events" ? "Events | " : "Photos | "}Bengalis of Philadelphia`;
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();

      window.removeEventListener("resize", schedule);
      document.documentElement.style.removeProperty("--header-height");
    };
  }, [page]);
  useEffect(() => {
    let cancelled = false;
    const target = location.hash.slice(1);
    if (target) {
      // Native fragment navigation happens before React creates the section.
      document.fonts.ready.then(() => {
        if (!cancelled) document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
      });
    }
    return () => { cancelled = true; };
  }, [page]);
  const main = useRef<HTMLElement>(null);
  useScrollReveal(main);
  return (
    <>
      <a className="skip-link" href="#main" onClick={() => main.current?.focus()}>Skip to content</a>
      <header ref={header} className="header">
        <div className="wrap header-inner">
          <a className="brand" href={base} aria-label="Bengalis of Philadelphia home"><Wordmark /></a>
          <nav id="navigation" className="navigation" aria-label="Main navigation">
            <a href={base} aria-current={page === "home" ? "page" : undefined}>Home</a>
            <a href={`${base}events/`} aria-current={page === "events" ? "page" : undefined}>Events</a>
            <a href={`${base}photos/`} aria-current={page === "photos" ? "page" : undefined}>Photos</a>
          </nav>
          <a className="button header-join" href={links.heylo} aria-label="Join BOP on Heylo">Join BOP <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main id="main" ref={main} tabIndex={-1} className={`page-${page}`}>
        {page === "home" && <>
        <section className="hero wrap" id="home" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="location-note"><span aria-hidden="true">✳</span> A Bengali community in Philadelphia</p>
            <h1 id="hero-heading"><span className="hero-line">A little</span><span className="hero-line">Bangladesh.</span><em><span className="hero-line">A lot of</span><span className="hero-line">Philadelphia.</span></em></h1>
            <div className="hero-actions"><a className="button" href={links.heylo}>Join BOP on Heylo <span aria-hidden="true">↗</span></a><a className="quiet-link" href="#our-story">Get to know us <span aria-hidden="true">↓</span></a></div>
            <p className="join-context">Find community plans and gathering details on Heylo.</p>
            <p className="welcome-note"><Flower />Bengalis & honorary Bengalis welcome.</p>
          </div>
          <HeroPrints />
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
            <a className="text-link events-link" href={`${base}events/`}>Explore upcoming and past events <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <div className="wrap home-destinations" aria-label="Explore BOP">
          <a className="home-album-link" href={`${base}photos/`}>
            <span className="album-mini" aria-hidden="true">{["BOP_Hike", "BOP_Game_Night", "BOP_Craft_Event"].map(name => <img key={name} src={imageUrl(`community/previews/${name}-480.webp`)} alt="" loading="lazy" />)}</span>
            <span>Explore our community album</span><span className="album-link-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <section className="involvement wrap" id="get-involved" aria-labelledby="involvement-heading">
          <Flower className="involvement-flower" />
          <div className="involvement-copy"><p className="section-label">Help shape BOP</p><h2 id="involvement-heading">Bring an idea.<br /><em>Bring yourself.</em></h2><p>Know a good cha spot? Have a walk, game night, or gathering in mind? Help make it happen.</p></div>
          <div className="involvement-actions"><a className="involvement-link" href={links.host}><span><strong>Open social host form</strong><span>Interested in hosting? Tell us through our Google Form.</span></span><span className="round-arrow" aria-hidden="true">↗</span></a><a className="involvement-link" href={links.email}><span><strong>Email an idea</strong><span>Have a gathering in mind? Send us an email.</span></span><span className="round-arrow" aria-hidden="true">↗</span></a></div>
        </section>

        </>}
        {page === "events" && <><Events /><div className="wrap event-host-link"><a className="text-link" href={`${base}#get-involved`}>Have an idea for a gathering? <span aria-hidden="true">↗</span></a></div></>}
        {page === "photos" && <CommunityAlbum onOpen={setPhotoIndex} fullPage />}

        {page === "home" && <section className="join" aria-labelledby="join-heading">
          <div className="wrap join-inner"><EtchedSignature variant="closing" label="bop." /><Flower /><h2 id="join-heading">Come for the cha.<br /><em>Stay for the adda.</em></h2><a className="button button-cream" href={links.heylo}>Join BOP on Heylo <span aria-hidden="true">↗</span></a></div>
        </section>}
      </main>

      {photoIndex !== null && <PhotoGallery index={photoIndex} onChange={setPhotoIndex} onClose={() => setPhotoIndex(null)} />}
      <footer className="footer wrap"><div className="footer-top"><a className="brand" href={base} aria-label="Bengalis of Philadelphia home"><Wordmark /></a><p>Rooted in Bangladesh.<br />Together in Philly.</p><div className="footer-links"><a href={links.instagram}>Instagram <span aria-hidden="true">↗</span></a><a href={links.email}>Email BOP <span aria-hidden="true">↗</span></a></div></div><div className="footer-bottom"><span>Bengalis of Philadelphia</span><a href="#main">Back to top ↑</a></div></footer>
    </>
  );
}

