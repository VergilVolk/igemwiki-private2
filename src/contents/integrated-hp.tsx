import { Link } from "react-router-dom";

export function IntegratedHP() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Engagement · Integrated human practices</p>
        <h2>The project that emerged from its conversations.</h2>
        <p>
          Integrated human practices is the loop at the centre of NucleArk. We
          bring the work to our PI, advisors, and stakeholders; listen to what
          they challenge; and let the feedback reshape the project before it
          hardens into experiments. This page documents that loop — how
          dialogue restructured the project's purpose and design — and points
          to where its effects on the bench are recorded.
        </p>
      </section>
      <section className="content-section row g-4">
        <div className="col-md-4">
          <article className="info-card">
            <span>01</span>
            <h3>Listen</h3>
            <p>
              Discussions with our PI, advisors, and outside stakeholders
              surface concerns about safety, feasibility, and relevance that
              the team cannot see from the inside.
            </p>
          </article>
        </div>
        <div className="col-md-4">
          <article className="info-card">
            <span>02</span>
            <h3>Integrate</h3>
            <p>
              Each round of feedback is sorted by what it touches — the
              project's direction, or the way an experiment is executed — so
              every change has a home and a reason.
            </p>
          </article>
        </div>
        <div className="col-md-4">
          <article className="info-card">
            <span>03</span>
            <h3>Rebuild</h3>
            <p>
              Direction-level changes are folded back into the project design
              and documented here; execution-level changes are folded into the
              wet-lab plans and documented there.
            </p>
          </article>
        </div>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Two directions, two homes</p>
        <h2>Where each kind of change is documented.</h2>
        <p>
          Feedback changed NucleArk in two different ways, and each is
          documented where a reader would look for it:
        </p>
        <ul>
          <li>
            How dialogue <strong>reshaped the project itself</strong> — its
            purpose, direction, and design — is documented on this page.
          </li>
          <li>
            How <strong>discussions with our PI shaped wet-lab execution</strong>{" "}
            — protocols, measurement plans, and experimental decisions — is
            documented on the Wet Lab pages:{" "}
            <Link to="/experiments">Experiments</Link> and{" "}
            <Link to="/notebook">Notebook</Link>. Those pages link back here,
            so the two halves of the loop can be read in either order.
          </li>
        </ul>
      </section>
      <section className="section-pending">
        <p className="eyebrow">Dialogue log</p>
        <h2>Conversation records are being compiled.</h2>
        <p>
          Meeting notes, interview summaries, and the decision trail of each
          feedback round will be added here after review, together with the
          specific design changes they produced.
        </p>
      </section>
    </>
  );
}
