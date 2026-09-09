import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Pages from "../pages.ts";

export function Navbar() {
  const logoUrl = import.meta.env.VITE_TEAM_LOGO_URL;
  const pages = Pages.map((item, pageIndex) => {
    if ("folder" in item && item.folder) {
      const folderItems = item.folder.map((subpage, subpageIndex) => {
        if (subpage.path) {
          return (
            <NavDropdown.Item
              key={`subpage-${pageIndex}-${subpageIndex}`}
              as={Link}
              to={subpage.path}
            >
              {subpage.name}
            </NavDropdown.Item>
          );
        }
      });
      return (
        <NavDropdown
          key={`page-${pageIndex}`}
          title={item.name}
          id={`page-${pageIndex}`}
        >
          {folderItems}
        </NavDropdown>
      );
    } else if ("path" in item && item.path) {
      return (
        <Nav.Link key={`page-${pageIndex}`} as={Link} to={item.path}>
          {item.name}
        </Nav.Link>
      );
    }
  });

  return (
    <BootstrapNavbar expand="lg" className="site-nav" fixed="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          {logoUrl ? <img className="brand-logo" src={logoUrl} alt="NucleArk logo" /> : <span>NucleArk</span>}
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="left-aligned">{pages}</Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
