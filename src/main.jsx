import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import KnoxSJ from "../KnoxSJ.jsx";
import Causes from "./Causes.jsx";
import Impact from "./Impact.jsx";
import Calendar from "./Calendar.jsx";
import About from "./About.jsx";
import UpcomingEvents from "./UpcomingEvents.jsx";
import FundraiserReports from "./FundraiserReports.jsx";
import ReportDetail from "./ReportDetail.jsx";
import Gallery from "./Gallery.jsx";

// Lightweight hash router. Every nav destination is its own standalone page,
// routed by a "#/" hash so nothing scrolls within the current page.
const ROUTES = {
  "#/causes": Causes,
  "#/impact": Impact,
  "#/calendar": Calendar,
  "#/about": About,
  "#/events": UpcomingEvents,
  "#/fundraisers": FundraiserReports,
  "#/gallery": Gallery,
};

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const fn = () => {
      setHash(window.location.hash);
      // Scroll to top when switching to a subpage route.
      if (window.location.hash.startsWith("#/")) window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  // When a section anchor (#causes, #impact, ...) is hit, including from a
  // subpage, where the target only exists after home re-renders, scroll to it.
  useEffect(() => {
    if (!hash || hash === "#" || hash.startsWith("#/")) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  const Page = ROUTES[hash];
  if (Page) return <Page />;
  // Dynamic route: a single fundraiser detail page, #/fundraisers/<id>
  if (hash.startsWith("#/fundraisers/")) {
    return <ReportDetail id={hash.slice("#/fundraisers/".length)} />;
  }
  return <KnoxSJ />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
