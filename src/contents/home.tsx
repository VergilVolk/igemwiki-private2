export function Home() {
  return (
    <>
      <section className="home-intro row align-items-center g-5">
        <div className="col-lg-6">
          <p className="eyebrow">Phase-separating condensates</p>
          <h2>A tiny vessel through the nuclear barrier.</h2>
          <p className="lead-text">
            NucleArk explores a nuclear delivery system based on phase-separating
            condensates. The project focuses on the challenge of delivering
            nucleic-acid cargo into slowly dividing cells.
          </p>
          <a className="button-link" href="/description">Explore the project</a>
        </div>
        <div className="col-lg-6">
          <div className="video-frame">
            <iframe
              src="https://video.igem.org/videos/embed/gof2hJXkHcuybs2ANY9euE"
              title="NucleArk project promotion"
              allow="fullscreen"
            />
          </div>
        </div>
      </section>
      <section className="home-grid row g-4">
        <div className="col-md-4"><article className="info-card"><span>01</span><h3>Condense</h3><p>Use a light-responsive module to assemble proteins into localized condensates.</p></article></div>
        <div className="col-md-4"><article className="info-card"><span>02</span><h3>Carry</h3><p>Use zinc-finger proteins to bind nucleic-acid cargo for delivery.</p></article></div>
        <div className="col-md-4"><article className="info-card"><span>03</span><h3>Enter</h3><p>Pair the system with a nuclear localization sequence to explore nuclear delivery.</p></article></div>
      </section>
    </>
  );
}
