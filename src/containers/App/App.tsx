import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";
import { SectionPending } from "../../components/SectionPending";
import { ScrollToTop } from "../../components/ScrollToTop";

const pendingPaths = new Set([
  "/results", "/contribution", "/experiments", "/notebook",
  "/measurement", "/alternative-platform", "/safety-and-security", "/software",
  "/hardware", "/model/structure-binding-prediction",
]);

// Wet-lab pages documenting how discussions with the PI shaped experimental
// work. Each shows a link back to Integrated Human Practices, which documents
// how dialogue reshaped the project itself (see /engagement/integrated-hp).
const wetLabPaths = new Set([
  "/experiments", "/notebook", "/measurement", "/alternative-platform",
]);

const App = () => {
  const routerLocation = useLocation();
  const pathMapping = getPathMapping();
  const currentPath =
    location.pathname
      .split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`)
      .pop() || "/";

  // Set Page Title
  const title =
    currentPath in pathMapping ? pathMapping[currentPath].title : "Not Found";

  useEffect(() => {
    document.title = `${title || ""} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  return (
    <>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navigation */}
      <Navbar />

      {/* Header and PageContent */}
      <Routes>
        {Object.entries(pathMapping).map(
          ([path, { title, lead, component: Component }]) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  {path !== "/" && <Header title={title || ""} lead={lead || ""} />}
                  <div className={path === "/" ? "page-shell home-page-shell" : "container page-shell"} key={routerLocation.pathname}>
                    {pendingPaths.has(path) ? (
                      <SectionPending>
                        {path === "/hardware" && (
                          <p className="text-center text-body-secondary mt-3">
                            Do we really have hardware ?
                          </p>
                        )}
                        {wetLabPaths.has(path) && (
                          <div className="context-links">
                            <p>Related reading</p>
                            <Link to="/model/condensate-simulation">
                              Return to Dry Lab · Condensate Simulation
                            </Link>
                            <Link to="/engagement/integrated-hp">
                              Read Human Practices · Integrated HP
                            </Link>
                          </div>
                        )}
                      </SectionPending>
                    ) : (
                      <Component />
                    )}
                  </div>
                </>
              }
            />
          ),
        )}
        <Route
          path="*"
          element={
            <>
              <Header
                title="Not Found"
                lead="The requested URL was not found on this server."
              />
              <NotFound />
            </>
          }
        />
      </Routes>

      {/* Footer */}
      {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
      <Footer />
    </>
  );
};

export default App;
