import PageChrome from "./PageChrome.jsx";
import { AboutSection, LeadersSection } from "./sections.jsx";

// Standalone "About the program" page. Shares the AboutSection used on home,
// plus the prefect-leaders grid.
export default function About() {
  return (
    <PageChrome current="#/about">
      <AboutSection standalone />
      <LeadersSection />
    </PageChrome>
  );
}
