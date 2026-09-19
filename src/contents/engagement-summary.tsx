import { Link } from "react-router-dom";

const hpPages = [
  ["Integrated HP", "/engagement/integrated-hp"],
  ["Inclusivity", "/engagement/inclusivity"],
  ["Collaboration", "/engagement/collaboration"],
] as const;

export function EngagementSummary() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Human Practices · Summary</p>
        <h2>Human Practices</h2>
        <p>
          This section is being organized. Confirmed records, materials, and
          outcomes will be added to the relevant pages as they are finalized.
        </p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Sections</p>
        <div className="context-links">
          {hpPages.map(([label, path]) => (
            <Link key={path} to={path}>
              {label} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
