export function Description() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Project overview</p>
        <h2>Why nuclear delivery?</h2>
        <p>Efficient nuclear delivery into slowly dividing cells remains a major challenge, particularly for large nucleic acids such as plasmids. Yet, many such cells—including retinal cells, cardiomyocytes, and neurons—are critical therapeutic targets in the human body. This delivery bottleneck has significantly hindered genetic therapies targeting these cell types. By leveraging the high biocompatibility, low biotoxicity, and efficient cargo encapsulation capacity of phase-separated droplets, we aim to establish a safe and effective platform for plasmid nuclear delivery.</p>
      </section>
      <section className="content-section row g-4">
        <div className="col-md-4"><article className="info-card"><span>A</span><h3>Light response</h3><p>A light-sensitive module provides a controllable trigger for condensate formation.</p></article></div>
        <div className="col-md-4"><article className="info-card"><span>B</span><h3>Cargo binding</h3><p>Zinc-finger proteins are used to associate the delivery system with nucleic-acid cargo.</p></article></div>
        <div className="col-md-4"><article className="info-card"><span>C</span><h3>Nuclear targeting</h3><p>A nuclear localization sequence is incorporated to explore transport across the nuclear barrier.</p></article></div>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Design premise</p>
        <h2>From dispersed components to a localized vessel.</h2>
        <p>NucleArk combines phase separation with cargo binding and nuclear targeting. Blue-light stimulation is intended to cluster the components into small condensates, creating a route for investigating nuclear delivery without relying on cell division.</p>
      </section>
    </>
  );
}
