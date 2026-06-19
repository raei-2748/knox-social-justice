import PageChrome from "./PageChrome.jsx";
import KnoxCalendar from "../KnoxCalendar.jsx";

// Standalone "2026 Calendar" page. Wraps the KnoxCalendar in the shared chrome.
export default function Calendar() {
  return (
    <PageChrome current="#/calendar">
      <KnoxCalendar />
    </PageChrome>
  );
}
