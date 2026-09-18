import { Link } from "react-router-dom";

export function Collaboration() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Engagement · Collaboration</p>
        <h2>Problems get smaller when they are shared.</h2>
        <p>
          No iGEM project is built by one team alone. This page collects the
          exchanges that made NucleArk better than we could have made it
          ourselves — with other iGEM teams, with the labs and facilities
          around us, and with the people who tested our ideas against
          reality.
        </p>
      </section>
      <section className="content-section row g-4">
        <div className="col-md-4">
          <article className="info-card">
            <span>01</span>
            <h3>With other teams</h3>
            <p>
              Exchanges with other iGEM teams — shared protocols, mutual
              feedback, and joint activities carried out during the season.
            </p>
          </article>
        </div>
        <div className="col-md-4">
          <article className="info-card">
            <span>02</span>
            <h3>With labs and facilities</h3>
            <p>
              Support from the labs, core facilities, and institutions that
              host and advise our work, credited in detail on the{" "}
              <Link to="/attributions">Attributions</Link> page.
            </p>
          </article>
        </div>
        <div className="col-md-4">
          <article className="info-card">
            <span>03</span>
            <h3>With the community</h3>
            <p>
              Dialogues with audiences outside synthetic biology that returned
              questions we could not have asked ourselves.
            </p>
          </article>
        </div>
      </section>
      <section className="section-pending">
        <p className="eyebrow">Partnership log</p>
        <h2>Collaboration records are being collected.</h2>
        <p>
          Each partnership will be listed with what we provided, what we
          received, and what came out of it, after confirmation with the
          collaborators involved.
        </p>
      </section>
    </>
  );
}
