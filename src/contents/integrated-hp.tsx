import { Link } from "react-router-dom";

export function IntegratedHP() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Human Practices · Integrated HP</p>
        <h2>Integrated Human Practices</h2>
        <p>
          This page will document confirmed dialogue records and the project
          decisions connected to them. Content is currently being reviewed.
        </p>
      </section>
      <section className="section-pending">
        <p className="eyebrow">Planned record</p>
        <h2>Materials in preparation.</h2>
        <p>
          Meeting notes, feedback summaries, and any resulting changes will be
          added here once the team has confirmed the source material.
        </p>
        <div className="context-links">
          <Link to="/experiments">Wet Lab · Experiments <span aria-hidden="true">→</span></Link>
          <Link to="/notebook">Wet Lab · Notebook <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
