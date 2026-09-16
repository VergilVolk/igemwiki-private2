import { Link } from "react-router-dom";

const modelPages = [
  {
    eyebrow: "Part 01 · Condensate simulation",
    heading: "How can condensates form, coarsen, and age?",
    description:
      "Cahn–Hilliard field simulations reproduce droplet formation, DNA cargo partitioning, and glassification-driven ageing probed by a virtual FRAP experiment — the quantitative core of NucleArk.",
    path: "/model/condensate-simulation",
    action: "Explore condensate simulation",
  },
  {
    eyebrow: "Part 02 · Membrane / nuclear entry simulation",
    heading: "Is nuclear enrichment phase-separation-mediated?",
    description:
      "Two-compartment models of membrane translocation and nuclear import ask how active NLS import and condensation acting as a passive sink combine — and design the blocking assay that discriminates between the two mechanisms.",
    path: "/model/membrane-nuclear-entry",
    action: "Explore entry simulations",
  },
  {
    eyebrow: "Part 03 · Structure / binding prediction",
    heading: "Which folds and interactions make the vessel work?",
    description:
      "Structure prediction and binding calculations on the zinc-finger-DNA interface, linker geometries, and fusion constructs quantify affinity and specificity before anything is ordered for the bench.",
    path: "/model/structure-binding-prediction",
    action: "Explore structure and binding",
  },
  {
    eyebrow: "Part 04 · Sequence design",
    heading: "A recognition sequence the human genome does not contain.",
    description:
      "A genome-scale census of 12-bp words yields a CpG-free tag more than 100× rarer than the original target, spelled out by a buildable four-finger array and compatible with common plasmid backbones.",
    path: "/model/sequence-design",
    action: "Explore sequence design",
  },
];

export function Model() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Dry lab · model</p>
        <h2>A multi-scale look at the vessel.</h2>
        <p>
          Our modeling connects molecular-scale binding physics to whole-cell
          delivery performance. It operates at two complementary levels —
          field-level Cahn–Hilliard simulations of condensate formation and
          ageing, and systems-level ODE and Boolean models of light-switch
          dynamics and nuclear import — that share quantities and
          cross-validate each other. The work is organized into the four
          pages below.
        </p>
      </section>
      {modelPages.map((page) => (
        <section className="content-section narrow" key={page.path}>
          <p className="eyebrow">{page.eyebrow}</p>
          <h2>{page.heading}</h2>
          <p>{page.description}</p>
          <Link className="button-link" to={page.path}>
            {page.action}
          </Link>
        </section>
      ))}
    </>
  );
}

