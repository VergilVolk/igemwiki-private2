const parameterRows = [
  ["mean", "0.1–1.0", "Initial uniform concentration; controls rich-phase volume fraction."],
  ["kappa", "0.02–0.3 scan", "Interfacial term; controls interface thickness and characteristic scale."],
  ["N × N", "128 × 128", "Simulation grid; the parameter scan uses 64 × 64."],
  ["dt", "0.5", "Time step used by the semi-implicit spectral solver."],
];

export function Model() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Dry lab · phase separation</p>
        <h2>How can condensates form, coarsen, and age?</h2>
        <p>We model condensate formation in a two-dimensional periodic domain with the Cahn–Hilliard equation and a symmetric double-well potential. A semi-implicit Fourier spectral method evolves the conserved concentration field while retaining mass conservation and a monotonic decrease in free energy.</p>
      </section>
      <section className="content-section row g-4">
        <div className="col-md-4"><article className="info-card"><span>01</span><h3>Formation</h3><p>Small fluctuations grow into spinodal patterns and then separate into coexisting phases.</p></article></div>
        <div className="col-md-4"><article className="info-card"><span>02</span><h3>Landscape</h3><p>A 10 × 10 scan across mean concentration and kappa compares final morphologies.</p></article></div>
        <div className="col-md-4"><article className="info-card"><span>03</span><h3>Ageing</h3><p>A glassification factor is coupled to a virtual FRAP measurement of condensate mobility.</p></article></div>
      </section>
      <section className="content-section">
        <p className="eyebrow">Numerical setup</p>
        <div className="table-wrap"><table><thead><tr><th>Parameter</th><th>Value</th><th>Role</th></tr></thead><tbody>{parameterRows.map(([parameter, value, role]) => <tr key={parameter}><td>{parameter}</td><td>{value}</td><td>{role}</td></tr>)}</tbody></table></div>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Current findings</p>
        <h2>Two routes to droplet formation.</h2>
        <p>Across the scan, mean concentration changes the morphology from isolated droplets to bicontinuous structures, while kappa changes the interface and droplet scale. At mean = 0.1, the homogeneous state remains metastable under small perturbations; an added supercritical seed initiates nucleation and growth.</p>
        <p>In the virtual FRAP experiment, coupling transport to glassification makes the half-recovery time increase with condensate age. The underlying data, figures, and code will be added after final review and upload through the iGEM asset system.</p>
      </section>
    </>
  );
}
