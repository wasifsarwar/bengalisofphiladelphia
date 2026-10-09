import { Artwork, InstagramIcon } from "../components/Layout";
import { imageUrl, links } from "../data/content";
export function Involved() {
  return (
    <>
      <section className="involved-hero">
        <div className="container involved-hero-grid">
          <a className="host-poster" href={links.host}>
            <img
              src={imageUrl("social-host.png")}
              alt="Call for social hosts. Love meeting new people? BOP handles the planning. Apply through the social-host form."
              width="852"
              height="1069"
            />
          </a>
          <div className="involved-intro">
            <p className="eyebrow">
              <span className="star" aria-hidden="true">
                ✷
              </span>{" "}
              Get involved / Bengalis of Philadelphia
            </p>
            <h1>
              Got an idea?
              <br />
              Let’s make plans.
            </h1>
            <p className="intro">
              Join us for a meetup, suggest somewhere to go, or lend a hand at
              the next gathering. You don’t need to know anyone already.
              Bangladeshis and honorary Bengalis are welcome.
            </p>
            <a className="button button-rust" href={links.host}>
              Become a social host <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <div className="checker checker-rust" aria-hidden="true" />
      <section className="section involved-content">
        <div className="container">
          <div className="section-heading">
            <h2>Come to the next one.</h2>
            <a className="button button-rust" href={links.heylo}>
              Join on Heylo <span aria-hidden="true">↗</span>
            </a>
          </div>
          <article className="story-feature dark-card">
            <Artwork name="cha.png" alt="Cha. Adda. Again." />
            <div className="card-body">
              <p className="eyebrow">Start here</p>
              <h3>Join us on Heylo.</h3>
              <p>
                See what’s coming up, register for a meetup, and get to know the
                group. Come for cha, a walk, or a game. You can come on your own
                or bring a friend.
              </p>
              <p>Our events and group updates are on Heylo.</p>
            </div>
          </article>
          <div className="dot-divider" aria-hidden="true" />
          <h2 className="subheading">
            There’s more than one way to take part.
          </h2>
          <div className="involvement-grid">
            <article className="involvement-card">
              <Artwork
                name="walk.png"
                alt="Take the scenic route. Philadelphia skyline."
              />
              <div className="card-body">
                <p className="eyebrow">Suggest a plan</p>
                <h3>Where should we go next?</h3>
                <p>
                  Know a good cha spot, a hiking trail, or a museum worth a
                  visit? Tell us what you have in mind. If you’d like to
                  organize it with us, say so.
                </p>
                <a
                  className="text-link"
                  href={`${links.email}?subject=A%20BOP%20meetup%20idea`}
                >
                  Email us your idea <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            <article className="involvement-card">
              <Artwork name="games.png" alt="Let the games begin." />
              <div className="card-body">
                <p className="eyebrow">Host with BOP</p>
                <h3>Become a BOP social host.</h3>
                <p>
                  Want to bring people together for cha, a walk, or a game? Tell
                  us a bit about yourself and the gatherings you’d like to host
                  through the BOP social host form.
                </p>
                <a className="text-link" href={links.host}>
                  Fill out the social-host form{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            <article className="involvement-card belonging-card">
              <div className="belonging-message">
                <span aria-hidden="true">📷</span>
                <p>Community photos coming soon.</p>
              </div>
              <div className="card-body">
                <p className="eyebrow">Our community</p>
                <h3>Built on belonging.</h3>
                <p>
                  Bangladeshis and honorary Bengalis. Come on your own or bring
                  a friend. Everyone is welcome here.
                </p>
                <a className="text-link" href="#/our-story">
                  Read our story <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
      <div className="checker checker-rust" aria-hidden="true" />
      <section className="contact section">
        <div className="container two-columns">
          <div>
            <p className="eyebrow">Say hello</p>
            <h2>Stay in touch.</h2>
            <p>Questions, ideas, or want to help?</p>
            <a className="text-link email-link" href={links.email}>
              bengalisofphiladelphia@gmail.com
            </a>
          </div>
          <div>
            <p className="eyebrow">Follow along</p>
            <h2>Find us on Instagram</h2>
            <p>Photos, community updates, and what we’re planning next.</p>
            <a className="text-link" href={links.instagram}>
              <InstagramIcon /> @bengalisofphiladelphia{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <div className="checker" aria-hidden="true" />
    </>
  );
}
