interface HeaderProps {
  title: string;
  lead: string;
}

export function Header({ title, lead }: HeaderProps) {
  return (
    <header className="page-hero">
      <div className="container">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="row position-relative">
          <div className="col-lg-9">
            <p className="eyebrow">TSINGHUA iGEM 2026</p>
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}
