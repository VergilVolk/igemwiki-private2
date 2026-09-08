import {
  AlternativePlatform, Attributions, Contribution, Description, Education,
  Engineering, Entrepreneurship, Experiments, Hardware, Home, HumanPractices,
  Inclusivity, Measurement, Members, Model, Notebook, Results,
  SafetyAndSecurity, Software, Sustainability,
} from "./contents";

interface Base { name: string | undefined; }
class Folder implements Base { name: string | undefined; folder: Page[] | undefined; }
class Page implements Base { name: string | undefined; title: string | undefined; path: string | undefined; component: React.FC | undefined; lead: string | undefined; }

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
    { name: "Model", title: "Model", path: "/model", component: Model, lead: "A computational study of condensate formation and ageing." },
    { name: "Software", title: "Software", path: "/software", component: Software, lead: "" },
    { name: "Hardware", title: "Hardware", path: "/hardware", component: Hardware, lead: "" },
  ]},
  { name: "Engagement", folder: [
    { name: "Entrepreneurship", title: "Entrepreneurship", path: "/entrepreneurship", component: Entrepreneurship, lead: "" },
    { name: "Human Practices", title: "Human practices", path: "/human-practices", component: HumanPractices, lead: "" },
    { name: "Education", title: "Education", path: "/education", component: Education, lead: "" },
    { name: "Diversity and Inclusion", title: "Diversity and inclusion", path: "/inclusivity", component: Inclusivity, lead: "" },
    { name: "Sustainability", title: "Sustainability", path: "/sustainability", component: Sustainability, lead: "" },
  ]},
];

export default Pages;
