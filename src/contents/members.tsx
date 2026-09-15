const students = [
  "Ai Teng", "Aohan Lu", "Jiamu Wang", "Jirou Tan", "Lijie Zhu", "Peiyu Wang", "Pengbo Li", "Qushun Yang", "Simo Yu", "Siyu Yan", "Wenhao Liu", "Xi Huang", "Yixuan Zou", "Zimeng Liu",
];

const advisors = ["Linshan Ye", "Mingyuan Yao", "XU XIN", "Yanpeng Song", "Zhefu Li"];

const memberDescriptions: Record<string, string> = {
  "Qushun Yang": "Our great wet lab leader.",
};

function MemberGrid({ names }: { names: string[] }) {
  return <div className="member-grid">{names.map((name) => <article key={name} className="member-card"><div className="member-initial">{name.slice(0, 1)}</div><h3>{name}</h3><p>{memberDescriptions[name] ?? "Profile and contribution details will be added with member approval."}</p></article>)}</div>;
}

export function Members() {
  return (
    <>
      <section className="content-section narrow"><p className="eyebrow">Tsinghua iGEM 2026</p><h2>Our team</h2><p>The roster below reflects the team information currently supplied through the official iGEM team page. Biographies and photographs will be added only with the relevant member&apos;s approval.</p></section>
      <section className="content-section"><p className="eyebrow">Principal investigator</p><MemberGrid names={["Peng Li"]} /></section>
      <section className="content-section"><p className="eyebrow">Student members</p><MemberGrid names={students} /></section>
      <section className="content-section"><p className="eyebrow">Advisors</p><MemberGrid names={advisors} /></section>
    </>
  );
}
