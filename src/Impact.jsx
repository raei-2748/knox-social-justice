import PageChrome from "./PageChrome.jsx";
import { ImpactSection } from "./sections.jsx";

// Standalone "Our reach" impact-map page. Shares the ImpactSection used on home.
export default function Impact() {
  return (
    <PageChrome current="#/impact">
      <ImpactSection standalone />
    </PageChrome>
  );
}
