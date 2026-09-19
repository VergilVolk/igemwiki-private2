import { Link } from "react-router-dom";

export function Collaboration() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Human Practices · Collaboration</p>
        <h2>Collaboration</h2>
        <p>
          This page is reserved for confirmed collaboration records and shared
          outcomes.
        </p>
      </section>
      <section className="section-pending">
        <p className="eyebrow">Planned record</p>
        <h2>Content in preparation.</h2>
        <p>
          Collaborators, activities, and the outcomes of each collaboration
          will be added after confirmation with the people involved.
        </p>
        <div className="context-links">
          <Link to="/attributions">View Attributions <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
