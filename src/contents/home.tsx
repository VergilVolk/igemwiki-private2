import { HeroVideo } from "../components/HeroVideo";

const logoUrl =
  import.meta.env.VITE_TEAM_LOGO_URL ||
  `${import.meta.env.BASE_URL}data/logo/7a78c898c4af6cad4707892637d2adde.png`;

export function Home() {
  return (
    <>
      <section className="home-banner">
        <p className="eyebrow">Tsinghua iGEM 2026</p>
        <h1>NucleArk</h1>
        <p>A nuclear delivery system based on phase-separating condensates.</p>
        <img className="home-banner-mark" src={logoUrl} alt="NucleArk logo" />
      </section>
      <div className="container home-content">
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
        <div className="col-lg-6"><HeroVideo /></div>
      </section>
      <section className="home-story row align-items-center g-5">
        <div className="col-lg-5"><p className="eyebrow">The Ark</p><h2>The vessel is the idea.</h2></div>
        <div className="col-lg-7"><p className="lead-text">NucleArk places the condensate at the centre of the story: a small, controllable vessel designed to carry nucleic-acid cargo toward the nucleus.</p></div>
      </section>
      <section className="home-model row g-4">
        <div className="col-lg-7"><article className="feature-panel"><p className="eyebrow">Model preview</p><h2>Watch droplets form, change, and age.</h2><p>The dry-lab model studies phase separation, morphology across a parameter landscape, and a glassification-coupled virtual FRAP experiment.</p><a className="button-link" href="/model">Visit the model</a></article></div>
        <div className="col-lg-5"><article className="feature-panel feature-panel-dark"><p className="eyebrow">Documentation</p><h3>Evidence before claims.</h3><p>Wet-lab methods and results will be added as reviewed records become available.</p></article></div>
      </section>
      </div>
    </>
  );
}
