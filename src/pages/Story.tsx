import { Artwork, Updates } from "../components/Layout";
import { links } from "../data/content";
export function Story() {
  return (
    <>
      <section className="story-hero section">
        <div className="container story-hero-grid">
          <div>
            <p className="eyebrow">Bengalis of Philadelphia</p>
            <h1>IRL Connections</h1>
            <p className="intro">
              We’re an inclusive social club connecting people through Bengali
              culture, meetups, and shared interests. Bangladeshis in Philly and
              honorary Bengalis are welcome.
            </p>
            <p className="build-together">
              <span className="star" aria-hidden="true">
                ✷
              </span>{" "}
              Let’s build this together.
            </p>
            <div className="story-photo photo-empty">
              <span aria-hidden="true">✷</span>
              <p>Our people. Our city.</p>
              <span>Community photos coming soon.</span>
            </div>
          </div>
          <div className="story-art">
            <Artwork
              name="cha.png"
              alt="Cha. Adda. Again. Two cups on a gold background."
            />
            <div className="story-notes">
              <p>Come for the cha.</p>
              <p>Stay for the adda.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="checker checker-blue" aria-hidden="true" />
      <section className="section story-content">
        <div className="container">
          <div className="section-heading">
            <h2>From “Are you Bengali?” to adda.</h2>
            <a className="button button-gold" href={links.heylo}>
              Join on Heylo <span aria-hidden="true">↗</span>
            </a>
          </div>
          <article className="story-feature">
            <Artwork name="cha.png" alt="Cha. Adda. Again." />
            <div className="cream-body">
              <p className="eyebrow">Why BOP exists</p>
              <h3>More reasons to say hello.</h3>
              <p>
                Sometimes you hear Bangla across a coffee shop. Sometimes you
                want to join a game but feel awkward saying hi. We want BOP to
                make that first hello easier, with plans that bring Bangladeshis
                in Philly together.
              </p>
              <p>Cha, adda, and familiar company.</p>
            </div>
          </article>
          <div className="dot-divider" aria-hidden="true" />
          <h2 className="subheading">What we’re looking forward to</h2>
          <div className="two-columns">
            <article className="story-card">
              <Artwork
                name="walk.png"
                alt="Take the scenic route. Philadelphia skyline by the river."
              />
              <div className="cream-body">
                <p className="eyebrow">Around Philly</p>
                <h3>Let’s get out together.</h3>
                <p>
                  Walks and hikes, museum days, and bookstore crawls. A reason
                  to explore Philly with other Bangladeshis and keep the adda
                  going along the way.
                </p>
                <p>Bring a friend. Make a few more.</p>
              </div>
            </article>
            <article className="story-card">
              <Artwork
                name="games.png"
                alt="Let the games begin. A pair of dice."
              />
              <div className="cream-body">
                <p className="eyebrow">Culture & community</p>
                <h3>A little friendly competition.</h3>
                <p>
                  Pick-up games, cultural events, and plenty of cha. We also
                  want to share stories from our community. Have a game you love
                  or an idea for a gathering? We’d like to hear it.
                </p>
                <a className="text-link" href="#/get-involved">
                  Share an idea <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
      <div className="checker" aria-hidden="true" />
      <Updates />
    </>
  );
}
