import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window back to the top on every navigation, including
 * clicks on links that point to the current page (e.g. clicking "Team"
 * while already on /team). `location.key` changes on every navigation
 * even when the path stays the same. Anchor links (#section) are skipped.
 */
export function ScrollToTop() {
  const { key, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [key, hash]);

  return null;
}
