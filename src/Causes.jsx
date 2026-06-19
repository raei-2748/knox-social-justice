import PageChrome from "./PageChrome.jsx";
import { CausesSection } from "./sections.jsx";

// Standalone "Our causes" page. Shares the CausesSection used on the home page.
export default function Causes() {
  return (
    <PageChrome current="#/causes">
      <CausesSection standalone />
    </PageChrome>
  );
}
