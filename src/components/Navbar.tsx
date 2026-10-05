import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Pages from "../pages.ts";

type NavItem = (typeof Pages)[number];

export function Navbar() {
  // Logo is served from static.igem.wiki via the iGEM uploads tool (see .env).
  const logoUrl = import.meta.env.VITE_TEAM_LOGO_URL;

  // Renders folder entries (pages and nested folders) inside a dropdown menu.
  const renderFolderItems = (
    items: NavItem[] | undefined,
    keyPrefix: string,
  ) => {
    if (!items) return null;
    return items.map((item, itemIndex) => {
      if ("folder" in item && item.folder) {
        return (
          <NavDropdown
            key={`${keyPrefix}-${itemIndex}`}
            title={item.name}
            id={`${keyPrefix}-${itemIndex}`}
            drop="end"
          >
            {renderFolderItems(item.folder, `${keyPrefix}-${itemIndex}`)}
          </NavDropdown>
        );
      }
      if ("path" in item && item.path) {
        return (
          <NavDropdown.Item
            key={`${keyPrefix}-${itemIndex}`}
            as={Link}
            to={item.path}
            className={item.indent ? "subpage-item" : undefined}
          >
            {item.name}
          </NavDropdown.Item>
        );
      }
    });
  };

  const pages = Pages.map((item, pageIndex) => {
    if ("folder" in item && item.folder) {
      return (
        <NavDropdown
          key={`page-${pageIndex}`}
          title={item.name}
          id={`page-${pageIndex}`}
        >
          {renderFolderItems(item.folder, `page-${pageIndex}`)}
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
