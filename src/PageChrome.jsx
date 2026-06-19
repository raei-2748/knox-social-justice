import { P, THEME_CSS, SiteNav, SiteFooter } from "./theme.jsx";

// Shared nav + footer wrapper for the subpages. Nav, footer and the whole
// handmade design system come from theme.jsx so subpages are identical to home.
export { PageHero } from "./theme.jsx";

export default function PageChrome({ current, children }) {
  return (
    <div style={{ fontFamily:"'Hanken Grotesk',system-ui,sans-serif", background:P.paper, color:P.ink, overflowX:"hidden", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <style>{THEME_CSS}</style>
      <SiteNav current={current} />
      <main className="grid-bg" style={{ flex:1 }}>{children}</main>
      <SiteFooter />
    </div>
  );
}
