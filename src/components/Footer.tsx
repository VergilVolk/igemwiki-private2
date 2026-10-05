import { Link } from "react-router-dom";
import { stringToSlug } from "../utils";

export function Footer() {
  const teamYear = import.meta.env.VITE_TEAM_YEAR;
  const teamName = import.meta.env.VITE_TEAM_NAME;
  const teamSlug = stringToSlug(teamName);

  return (
    <footer className="footer py-5 mt-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-6 col-12"><h4 className="mb-3">NucleArk</h4><p>Tsinghua iGEM 2026. A project exploring nuclear delivery through phase-separating condensates.</p><p className="mb-0"><small>Department of Life Sciences, Tsinghua University<br />Haidian District, Beijing 100084, China<br />+86-10-62788604</small></p></div>
          <div className="col-lg-3 col-12"><h4 className="mt-lg-0 mt-sm-3">Explore</h4><ul className="m-2 p-2"><li><Link to="/description">Project</Link></li><li><Link to="/model">Model</Link></li><li><Link to="/team">Team</Link></li></ul></div>
          <div className="col-lg-3 col-12"><h4 className="mt-lg-0 mt-sm-4 mb-3">Project video</h4><a href="https://video.igem.org/w/gof2hJXkHcuybs2ANY9euE">iGEM Video Universe</a></div>
        </div>
        <hr />
        <div className="row mt-4"><div className="col"><p className="mb-0"><small>© {teamYear} - Content on this site is licensed under a <a className="subfoot" href="https://creativecommons.org/licenses/by/4.0/" rel="license">Creative Commons Attribution 4.0 International license</a>.</small></p><p><small>The repository used to create this website is available at <a href={`https://gitlab.igem.org/${teamYear}/${teamSlug}`}>gitlab.igem.org/{teamYear}/{teamSlug}</a>.</small></p></div></div>
      </div>
    </footer>
  );
}
