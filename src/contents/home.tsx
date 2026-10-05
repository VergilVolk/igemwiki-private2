import { Link } from "react-router-dom";
import { HeroVideo } from "../components/HeroVideo";
import { UploadFigure } from "../components/UploadFigure";
import { UPLOADS } from "../uploads";
import nucleArkLogo from "../assets/nucleark-logo-original.jpg";

const logoUrl =
  import.meta.env.VITE_TEAM_LOGO_URL ||
  nucleArkLogo;

// Official project description, as registered with iGEM. Do not paraphrase.
const OFFICIAL_TITLE =
  "NucleArk — A Nuclear Delivery System Based on Phase-Separating Condensates";
const OFFICIAL_DESCRIPTION =
  "Efficient nuclear delivery into slowly dividing cells remains a major challenge, particularly for large nucleic acids such as plasmids. Yet, many such cells—including retinal cells, cardiomyocytes, and neurons—are critical therapeutic targets in the human body. This delivery bottleneck has significantly hindered genetic therapies targeting these cell types. By leveraging the high biocompatibility, low biotoxicity, and efficient cargo encapsulation capacity of phase-separated droplets, we aim to establish a safe and effective platform for plasmid nuclear delivery.";

const mechanismCards = [
  {
    id: "01",
    title: "Light response",
    text: "A blue-light photoreceptor module drives condensate formation on demand: droplets nucleate under illumination and dissolve in the dark, so cargo loading, transport, and release all remain under experimental control.",
  },
  {
    id: "02",
    title: "Cargo binding",
    text: "Zinc-finger domains tether the nucleic-acid cargo to the condensate. In our Cahn–Hilliard cargo simulations, multivalent three-site binding enriches DNA 2.3–4× inside the droplets.",
  },
  {
    id: "03",
    title: "Nuclear targeting",
    text: "A triplicated nuclear localization signal directs the loaded vessel toward the nuclear pore, whose crossing we model from FG-nucleoporin binding through to nucleoplasmic release.",
  },
];

const modelCards = [
  {
    id: "01",
    title: "Condensate physics",
    text: "Field-level Cahn–Hilliard simulations reproduce droplet formation, coarsening, cargo partitioning, glassification-driven ageing, and a virtual FRAP experiment — including the pulsed-light protocol (2 min ON / 3 min OFF) that roughly doubles the vessel's usable liquid lifetime.",
    path: "/model/condensate-simulation",
    action: "Condensate simulation",
  },
  {
    id: "02",
    title: "Membrane and nuclear entry",
    text: "Serial kinetic models chain adsorption and wrapping at the plasma membrane to perinuclear trapping, FG-phase partitioning, and release into the nucleoplasm — ending in one falsifiable nuclear-entry efficiency and a four-group blocking assay.",
    path: "/model/membrane-nuclear-entry",
    action: "Entry simulations",
  },
  {
    id: "03",
    title: "Sequence design",
    text: "A genome-scale census of every 12-bp word in GRCh38 yields a CpG-free recognition tag more than 100× rarer in the human genome than the original target — 31 sites versus 3,462 — spelled out by a buildable four-finger zinc array.",
    path: "/model/sequence-design",
    action: "Sequence design",
  },
];

const statusItems = [
  {
    title: "The fusion protein is expressed and purified.",
    text: "A full Design–Build–Test–Learn cycle took the construct from inclusion-body failure to a single-fraction MBP-fusion preparation in E. coli.",
    path: "/engineering",
    link: "Engineering cycle",
  },
  {
    title: "Phase separation and cargo binding are confirmed in vitro.",
    text: "Under the confocal microscope the purified system forms condensates and binds its nucleic-acid cargo; the zinc-finger-deleted control isolates the binding.",
    path: "/engineering",
    link: "Engineering cycle",
  },
  {
    title: "The recognition sequence is genome-safe by design.",
    text: "The redesigned CpG-free 12-bp tag hits 31 sites in the human genome (versus 3,462 for the original 9-bp target), with validated insertion sites across 15 common plasmid backbones.",
    path: "/model/sequence-design",
    link: "Sequence design",
  },
  {
    title: "Nuclear-entry characterization is ongoing.",
    text: "The four-group blocking assay (±NLS × ±importin inhibition) is designed to separate active NLS-driven import from condensation acting as a passive nuclear sink.",
    path: "/model/membrane-nuclear-entry",
    link: "Entry simulations",
  },
];

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
            <p className="eyebrow">Project overview · official abstract</p>
            <h2>{OFFICIAL_TITLE}</h2>
            <p className="lead-text">{OFFICIAL_DESCRIPTION}</p>
            <Link className="button-link" to="/description">Read the project description</Link>
          </div>
          <div className="col-lg-6"><HeroVideo /></div>
        </section>

        <section className="content-section">
          <p className="eyebrow">How it works</p>
          <h2>One delivery vessel, three coupled modules.</h2>
          <div className="row g-4 mt-0">
            {mechanismCards.map((card) => (
              <div className="col-md-4" key={card.id}>
                <article className="info-card">
                  <span>{card.id}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <p className="eyebrow">Designed with models before the bench</p>
          <h2>Every design choice is model-checked.</h2>
          <div className="row g-4 mt-0">
            {modelCards.map((card) => (
              <div className="col-md-4" key={card.id}>
                <article className="info-card">
                  <span>{card.id}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <Link to={card.path}>{card.action} →</Link>
                </article>
              </div>
            ))}
          </div>
          <p className="mt-3"><Link className="button-link" to="/model">Visit the model overview</Link></p>
        </section>

        <section className="content-section">
          <p className="eyebrow">Where the project stands</p>
          <h2>What works so far — and what is being tested.</h2>
          <div className="row g-4 mt-0">
            {statusItems.map((item) => (
              <div className="col-md-6" key={item.title}>
                <article className="info-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link to={item.path}>{item.link} →</Link>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="home-story row align-items-center g-5">
          <div className="col-lg-5">
            <p className="eyebrow">Our village</p>
            <h2>Foundational Advance.</h2>
            <p className="lead-text">
              NucleArk is entered in the Foundational Advance village. The official village description is published by iGEM on the villages page and will be quoted here; the official village graphic goes in the slot below once uploaded.
            </p>
            <p><a href="https://competition.igem.org/judging/villages">See the official iGEM villages page →</a></p>
          </div>
          <div className="col-lg-7">
            <UploadFigure id="39" url={UPLOADS.villageFoundationalAdvance} label="Figure 39 · Foundational Advance village" caption="Official iGEM Foundational Advance village graphic." />
          </div>
        </section>

        <section className="home-model row g-4">
          <div className="col-lg-7">
            <article className="feature-panel">
              <p className="eyebrow">The aim</p>
              <h2>A safe and effective platform for plasmid nuclear delivery.</h2>
              <p>
                By leveraging the high biocompatibility, low biotoxicity, and efficient cargo encapsulation capacity of phase-separated droplets.
              </p>
              <Link className="button-link" to="/description">Explore the project</Link>
            </article>
          </div>
          <div className="col-lg-5">
            <article className="feature-panel feature-panel-dark">
              <p className="eyebrow">The team</p>
              <h3>Built by Tsinghua iGEM 2026.</h3>
              <p>
                Fourteen students, five advisors, and one principal investigator across wet lab, dry lab, and human practices — the people behind the vessel.
              </p>
              <Link className="button-link" to="/team">Meet the team</Link>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}
