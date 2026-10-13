import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window and root elements to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    const main = document.querySelector(".main-content");
    if (main) {
      main.scrollTop = 0;
    }

    const appLayout = document.querySelector(".app-layout");
    if (appLayout) {
      appLayout.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
