import {
  AlternativePlatform, Attributions, Collaboration, Contribution, Description,
  EngagementSummary, Engineering, Experiments, Hardware, Home, Inclusivity,
  IntegratedHP, Measurement, Members, Model, CondensateSimulation,
  MembraneNuclearEntry, Notebook, Results, SafetyAndSecurity,
  SequenceDesign, StructureBindingPrediction, Software,
} from "./contents";

interface Base { name: string | undefined; }
class Folder implements Base { name: string | undefined; folder: (Page | Folder)[] | undefined; }
class Page implements Base { name: string | undefined; title: string | undefined; path: string | undefined; component: React.FC | undefined; lead: string | undefined; indent?: boolean | undefined; }

const Pages: (Page | Folder)[] = [
  { name: "Home", title: "NucleArk", path: "/", component: Home, lead: "A nuclear delivery system based on phase-separating condensates." },
  { name: "Team", title: "Meet our team", path: "/team", component: Members, lead: "The people behind Tsinghua iGEM 2026." },
  { name: "Attributions", title: "Attributions", path: "/attributions", component: Attributions, lead: "A transparent record of project contributions." },
  { name: "Project", folder: [
    { name: "Description", title: "Project description", path: "/description", component: Description, lead: "The design premise behind NucleArk." },
    { name: "Engineering", title: "Engineering", path: "/engineering", component: Engineering, lead: "" },
    { name: "Results", title: "Results", path: "/results", component: Results, lead: "" },
    { name: "Contribution", title: "Contribution", path: "/contribution", component: Contribution, lead: "" },
  ]},
  { name: "Wet Lab", folder: [
    { name: "Experiments", title: "Experiments", path: "/experiments", component: Experiments, lead: "" },
    { name: "Notebook", title: "Notebook", path: "/notebook", component: Notebook, lead: "" },
    { name: "Measurement", title: "Measurement", path: "/measurement", component: Measurement, lead: "" },
    { name: "Alternative Platform", title: "Alternative platform", path: "/alternative-platform", component: AlternativePlatform, lead: "" },
    { name: "Safety and Security", title: "Safety and security", path: "/safety-and-security", component: SafetyAndSecurity, lead: "" },
  ]},
  { name: "Dry Lab", folder: [
    { name: "Model", title: "Model", path: "/model", component: Model, lead: "A multi-scale modeling framework for NucleArk, from condensate physics to sequence design." },
    { name: "Condensate Simulation", title: "Condensate simulation", path: "/model/condensate-simulation", component: CondensateSimulation, lead: "Field-level Cahn-Hilliard simulations and systems-level ODE / Boolean models of the light-gated condensate: formation, cargo loading, ageing, and light control.", indent: true },
    { name: "Membrane / Nuclear Entry", title: "Membrane / nuclear entry simulation", path: "/model/membrane-nuclear-entry", component: MembraneNuclearEntry, lead: "", indent: true },
    { name: "Structure / Binding", title: "Structure / binding prediction", path: "/model/structure-binding-prediction", component: StructureBindingPrediction, lead: "", indent: true },
    { name: "Sequence Design", title: "Sequence design", path: "/model/sequence-design", component: SequenceDesign, lead: "A CpG-free DNA tag the human genome does not contain, and the four-finger array that reads it.", indent: true },
    { name: "Software", title: "Software", path: "/software", component: Software, lead: "" },
    { name: "Hardware", title: "Hardware", path: "/hardware", component: Hardware, lead: "" },
  ]},
  { name: "Human Practices", folder: [
    { name: "Summary", title: "Human Practices", path: "/engagement", component: EngagementSummary, lead: "How NucleArk reached beyond the bench — and what came back." },
    { name: "Integrated HP", title: "Integrated human practices", path: "/engagement/integrated-hp", component: IntegratedHP, lead: "How conversations with our PI, advisors, and stakeholders reshaped the project — and where each change is documented." },
    { name: "Inclusivity", title: "Inclusivity", path: "/engagement/inclusivity", component: Inclusivity, lead: "Lowering the barriers that keep people out of the scientific conversation." },
    { name: "Collaboration", title: "Collaboration", path: "/engagement/collaboration", component: Collaboration, lead: "The exchanges, shared work, and partnerships behind NucleArk." },
  ]},
];

export default Pages;
