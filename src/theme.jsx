import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Single source of truth for the Knox Social Justice "handmade" design system.
// Palette, the shared CSS (outlines + hard offset shadows + dot-grid texture),
// and the shared chrome (nav, footer, page hero) all live here so every page,
// home and subpages, looks and behaves identically.
// ---------------------------------------------------------------------------

export const P = {
  paper:"#F4EADB", paper2:"#FBF4E8", ink:"#211710", inkSoft:"#5C4D40",
  coral:"#FF5B30", amber:"#E89211", sun:"#FBB915", forest:"#2F6B47", plum:"#B0447E", sky:"#3E78A6",
  panel:"#16241D", panelLine:"#2C453A", ocean:"#10211B", land:"#2C4D3B", lbord:"#3D6650",
  border:"rgba(33,23,16,0.12)",
};

export const THEME_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  @keyframes tickScroll{ 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pinBeat   { 0%,100%{opacity:0.5} 50%{opacity:1} }
  @keyframes drawIn    { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }
  @keyframes routeFlow { to{ stroke-dashoffset:-18 } }
  @keyframes floaty    { 0%,100%{ transform:rotate(var(--r,0deg)) translateY(0) } 50%{ transform:rotate(var(--r,0deg)) translateY(-9px) } }
  @keyframes pulseRing { 0%{ box-shadow:0 0 0 0 rgba(47,107,71,0.45) } 70%{ box-shadow:0 0 0 7px rgba(47,107,71,0) } 100%{ box-shadow:0 0 0 0 rgba(47,107,71,0) } }

  .a1{animation:fadeUp .7s .05s cubic-bezier(.22,1,.36,1) both}
  .a2{animation:fadeUp .7s .18s cubic-bezier(.22,1,.36,1) both}
  .a3{animation:fadeUp .7s .30s cubic-bezier(.22,1,.36,1) both}
  .a4{animation:fadeUp .7s .42s cubic-bezier(.22,1,.36,1) both}
  .a5{animation:fadeUp .7s .56s cubic-bezier(.22,1,.36,1) both}

  .display{ font-family:'Hanken Grotesk',system-ui,sans-serif; }

  /* ---- handmade / outlined design system ---- */
  .grid-bg{
    background-color:#F4EADB;
    background-image:radial-gradient(rgba(33,23,16,0.07) 1.3px, transparent 1.3px);
    background-size:24px 24px;
  }
  .hm-card{
    border:2.5px solid #211710; border-radius:16px;
    box-shadow:6px 6px 0 #211710;
    transition:transform .16s cubic-bezier(.22,1,.36,1), box-shadow .16s ease;
  }
  .hm-card:hover{ transform:translate(-3px,-3px); box-shadow:9px 9px 0 #211710; }

  .hm-btn{
    position:relative; overflow:hidden; isolation:isolate;
    border:2.5px solid #211710; border-radius:30px;
    box-shadow:3px 3px 0 #211710; font-weight:700;
    transition:transform .14s cubic-bezier(.34,1.56,.64,1), box-shadow .14s ease;
    display:inline-block;
  }
  /* light sheen that sweeps across on hover */
  .hm-btn::before{
    content:""; position:absolute; top:0; left:-130%; z-index:-1;
    width:55%; height:100%; transform:skewX(-20deg); pointer-events:none;
    background:linear-gradient(100deg, transparent, rgba(255,255,255,0.4), transparent);
    transition:left .6s cubic-bezier(.22,1,.36,1);
  }
  .hm-btn:hover{ transform:translate(-2px,-2px); box-shadow:6px 6px 0 #211710; }
  .hm-btn:hover::before{ left:150%; }
  .hm-btn:active{ transform:translate(3px,3px); box-shadow:0 0 0 #211710; transition-duration:.05s; }
  /* trailing arrow nudges forward on hover */
  .hm-btn .arr{ display:inline-block; transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
  .hm-btn:hover .arr{ transform:translateX(4px); }

  /* continuously floating hero stickers */
  .floaty{ transform:rotate(var(--r,0deg)); animation:floaty 5.5s ease-in-out infinite; will-change:transform; }
  .floaty:nth-child(2n){ animation-duration:6.5s; }
  .floaty:nth-child(3n){ animation-duration:7.2s; }

  /* pulsing "live" status dot */
  .live-dot{ animation:pulseRing 2.2s ease-out infinite; }

  /* generic hover lift for cards/panels */
  .lift{ transition:transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease; }
  .lift:hover{ transform:translateY(-5px); }

  .hm-tag{ border:2px solid #211710; border-radius:24px; box-shadow:2px 2px 0 #211710; font-weight:700; }
  .hm-panel{ border:3px solid #211710; border-radius:22px; box-shadow:12px 12px 0 #211710; }
  .sticker{ border:2.5px solid #211710; border-radius:14px; box-shadow:4px 4px 0 #211710; }

  /* ---- Leaflet map (Our reach) ---- */
  .mroute{ animation:routeFlow 1.4s linear infinite; transition:stroke-width .25s ease, stroke-opacity .25s ease; }
  .sj-pin{ cursor:pointer; }
  .sj-pin-dot{ transition:transform .15s ease; }
  .sj-pin:hover .sj-pin-dot{ transform:scale(1.18); }
  .sj-pin-dot.on{ animation:pinBeat 2s ease-in-out infinite; }
  .leaflet-container{ font-family:'Hanken Grotesk',system-ui,sans-serif; }
  .leaflet-tooltip{
    background:#211710; color:#FBF4E8; border:2px solid #FBF4E8; border-radius:8px;
    font-size:11px; font-weight:800; letter-spacing:.3px; padding:3px 9px;
    box-shadow:2px 2px 0 rgba(0,0,0,0.4);
  }
  .leaflet-tooltip-top::before{ border-top-color:#FBF4E8; }
  .leaflet-control-attribution{
    background:rgba(22,36,29,0.82); color:rgba(251,244,232,0.5); font-size:9px;
  }
  .leaflet-control-attribution a{ color:rgba(251,185,21,0.7); }
  .leaflet-bar a{
    background:#211710; color:#FBF4E8; border-bottom:1px solid #3D6650;
  }
  .leaflet-bar a:hover{ background:#2C453A; color:#FBF4E8; }
  .tick{ animation:tickScroll 36s linear infinite; display:inline-flex; gap:0; white-space:nowrap; align-items:center; }
  .tick:hover{ animation-play-state:paused; }
  .squig path{ stroke-dasharray:400; animation:drawIn 1s .6s ease both; }

  .hm-stamp{
    display:inline-flex; align-items:center; gap:5px;
    border:2px solid currentColor; border-radius:3px;
    padding:3px 9px; transform:rotate(-2deg);
    line-height:1; font-weight:900; letter-spacing:2px; text-transform:uppercase;
  }
  .hm-highlight{
    background:linear-gradient(180deg, transparent 52%, rgba(251,185,21,0.55) 52%);
    padding-bottom:1px;
  }
  .hm-rule{ border:none; border-top:2px dashed rgba(33,23,16,0.16); }

  /* ---- unified nav ---- */
  .navbar-pill{
    display:flex; gap:4px; align-items:center;
    background:#FBF4E8; border:2.5px solid #211710; border-radius:30px;
    padding:5px; box-shadow:3px 3px 0 #211710;
  }
  .navlink{
    color:#211710; font-size:14px; font-weight:700;
    padding:8px 15px; border-radius:22px; line-height:1;
    transition:background .15s, color .15s;
  }
  .navlink:hover{ background:rgba(33,23,16,0.08); }
  .navlink.active{ background:#FF5B30; color:#fff; }

  button{ cursor:pointer; font-family:'Hanken Grotesk',sans-serif; }
  a{ text-decoration:none; color:inherit; }

  /* ---- footer (black banner) ---- */
  .foot{ background:#16241D; border-top:3px solid #211710; }
  .foot-grid{
    max-width:1080px; margin:0 auto;
    display:grid; grid-template-columns:1.6fr 1fr 1fr 1.2fr; gap:40px;
  }
  .foot-h{
    color:#FBB915; font-size:12px; font-weight:800; letter-spacing:1.6px;
    text-transform:uppercase; margin-bottom:18px;
  }
  .foot-link{
    display:block; color:rgba(251,244,232,0.62); font-size:14.5px; font-weight:500;
    padding:6px 0; width:fit-content; transition:color .15s, transform .15s;
  }
  .foot-link:hover{ color:#fff; transform:translateX(4px); }
  .foot-link .fdot{ color:#FF5B30; opacity:0; margin-right:6px; transition:opacity .15s; }
  .foot-link:hover .fdot{ opacity:1; }
  .foot-info dt{ color:rgba(251,244,232,0.4); font-size:11px; font-weight:800; letter-spacing:1px; text-transform:uppercase; }
  .foot-info dd{ color:rgba(251,244,232,0.82); font-size:14px; font-weight:600; margin:2px 0 14px; }
  .foot-bottom{
    max-width:1080px; margin:36px auto 0; padding-top:24px;
    border-top:1px solid rgba(251,244,232,0.12);
    display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;
  }
  .foot-soc{
    display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px;
    border:2px solid rgba(251,244,232,0.22); border-radius:9px; color:rgba(251,244,232,0.7);
    transition:background .15s, color .15s, border-color .15s, transform .15s;
  }
  .foot-soc:hover{ background:#FF5B30; color:#fff; border-color:#FF5B30; transform:translateY(-2px); }
  @media(max-width:820px){
    .foot-grid{ grid-template-columns:1fr 1fr; gap:32px; }
    .foot-brand-col{ grid-column:1 / -1; }
  }
  @media(max-width:520px){
    .foot-grid{ grid-template-columns:1fr; }
    .foot-bottom{ justify-content:center; text-align:center; }
  }

  .section{ padding:96px 48px; }
  .hero{ padding:150px 48px 110px; }
  .nav{ padding:14px 40px; }

  :focus-visible{ outline:2.5px solid #FF5B30; outline-offset:3px; border-radius:6px; }

  @media(max-width:980px){
    .navbar-pill{ display:none!important; }
  }
  @media(max-width:820px){
    .hide-m{ display:none!important; }
    .g2{ grid-template-columns:1fr!important; }
    .g2b{ grid-template-columns:1fr!important; }
    .g3{ grid-template-columns:1fr 1fr!important; }
    .section{ padding:64px 20px; }
    .hero{ padding:120px 20px 72px; }
    .nav{ padding:12px 18px; }
  }
  @media(max-width:520px){
    .g3{ grid-template-columns:1fr!important; }
  }
  @media(prefers-reduced-motion:reduce){
    *{ animation:none!important; transition:none!important; scroll-behavior:auto!important; }
  }
`;

// Hand-drawn squiggle underline
export function Squiggle({ color = P.coral, width = 260, strokeWidth = 5 }) {
  return (
    <svg className="squig" width={width} height="16" viewBox="0 0 260 16" fill="none" aria-hidden="true" style={{ display:"block" }}>
      <path d="M3 10 C 28 3, 50 13, 78 8 S 130 3, 158 9 S 215 14, 257 5"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

// Outlined section-label tag
export function Label({ children, color = P.ink }) {
  return (
    <span className="hm-tag" style={{
      display:"inline-block", background:P.paper2, color,
      fontSize:11.5, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase",
      padding:"6px 13px", marginBottom:18,
    }}>{children}</span>
  );
}

// One nav used on every page. Every link is a "#/" route to a standalone page,
// swapped by the router in main.jsx, no link scrolls within the current page.
const NAV_LINKS = [
  ["Home",     "#/"],
  ["Gallery",  "#/gallery"],
  ["Events",   "#/events"],
  ["Reports",  "#/fundraisers"],
  ["About",    "#/about"],
];

export function SiteNav({ current }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="nav" style={{
      position:"fixed", top:0, left:0, right:0, zIndex:999,
      background: scrolled ? "rgba(244,234,219,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "2.5px solid #211710" : "2.5px solid transparent",
      display:"flex", alignItems:"center", justifyContent:"space-between", gap:16,
      transition:"background .3s, backdrop-filter .3s, border-color .3s",
    }}>
      <a href="#/" style={{ display:"flex", alignItems:"center", gap:11, flexShrink:0 }}>
        <span className="sticker" style={{ width:36, height:36, background:P.coral, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"3px 3px 0 #211710" }}>
          <span className="display" style={{ color:"#fff", fontSize:12, fontWeight:900, letterSpacing:"-0.3px" }}>KSJ</span>
        </span>
        <span className="display hide-m" style={{ color:P.ink, fontWeight:800, fontSize:19, letterSpacing:"-0.5px" }}>Knox Social Justice</span>
      </a>

      <div className="navbar-pill">
        {NAV_LINKS.map(([l, href]) => (
          <a key={href} href={href} className={`navlink${current === href ? " active" : ""}`}>{l}</a>
        ))}
      </div>

      <a href="#/about" className="hm-btn" style={{ background:P.coral, color:"#fff", padding:"10px 20px", fontSize:14, flexShrink:0 }}>
        Join Friday Club
      </a>
    </nav>
  );
}

const FOOT_EXPLORE = [
  ["Home",              "#/"],
  ["Gallery",           "#/gallery"],
  ["Upcoming events",   "#/events"],
  ["Fundraiser reports","#/fundraisers"],
  ["About the club",    "#/about"],
];

const FOOT_CAUSES = [
  ["Refugee & asylum support", "#/about"],
  ["Indigenous justice",       "#/about"],
  ["Overseas immersions",      "#/about"],
  ["Local partnerships",       "#/about"],
];

const FOOT_INFO = [
  ["Meets",   "Every Friday, lunchtime"],
  ["Where",   "AGC 112–113, Middle Academy"],
  ["Who",     "All Knox students welcome"],
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot" style={{ padding:"64px 48px 36px" }}>
      <div className="foot-grid">
        {/* Brand + mission */}
        <div className="foot-brand-col">
          <a href="#/" style={{ display:"flex", alignItems:"center", gap:11, marginBottom:18 }}>
            <span style={{ width:38, height:38, background:P.coral, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #FBF4E8", boxShadow:"3px 3px 0 rgba(0,0,0,0.35)" }}>
              <span className="display" style={{ color:"#fff", fontSize:12, fontWeight:900 }}>KSJ</span>
            </span>
            <span className="display" style={{ color:P.paper2, fontWeight:800, fontSize:19, letterSpacing:"-0.5px" }}>Knox Social Justice</span>
          </a>
          <p style={{ color:"rgba(251,244,232,0.55)", fontSize:14.5, lineHeight:1.7, maxWidth:330, fontWeight:500 }}>
            A student-led program at Knox Grammar School built on awareness, advocacy, and action, from overseas immersions to local partnerships and fundraisers that run every term.
          </p>
          <div style={{ display:"flex", gap:10, marginTop:22 }}>
            <a className="foot-soc" href="https://instagram.com/knoxgrammar" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>
            </a>
            <a className="foot-soc" href="mailto:knoxcocurricular@knox.nsw.edu.au" aria-label="Email">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m3 6 9 7 9-7"/></svg>
            </a>
            <a className="foot-soc" href="https://www.knox.nsw.edu.au" target="_blank" rel="noopener noreferrer" aria-label="Knox Grammar website">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.6 4 5.9 4 9.5s-1.4 6.9-4 9.5c-2.6-2.6-4-5.9-4-9.5s1.4-6.9 4-9.5Z"/></svg>
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <div className="foot-h">Explore</div>
          {FOOT_EXPLORE.map(([l, href]) => (
            <a key={l} href={href} className="foot-link"><span className="fdot">›</span>{l}</a>
          ))}
        </div>

        {/* Causes */}
        <div>
          <div className="foot-h">Our causes</div>
          {FOOT_CAUSES.map(([l, href]) => (
            <a key={l} href={href} className="foot-link"><span className="fdot">›</span>{l}</a>
          ))}
        </div>

        {/* Get involved */}
        <div>
          <div className="foot-h">Get involved</div>
          <dl className="foot-info">
            {FOOT_INFO.map(([dt, dd]) => (
              <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
            ))}
          </dl>
          <a href="mailto:knoxcocurricular@knox.nsw.edu.au" className="hm-btn" style={{ background:P.coral, color:"#fff", padding:"11px 18px", fontSize:13.5, marginTop:2 }}>
            Join Friday Club <span className="arr">→</span>
          </a>
        </div>
      </div>

      <div className="foot-bottom">
        <span style={{ color:"rgba(251,244,232,0.4)", fontSize:13, fontWeight:500 }}>
          © {year} Knox Social Justice · Knox Grammar School, Wahroonga NSW
        </span>
        <span style={{ display:"inline-flex", alignItems:"center", gap:8, color:"rgba(251,244,232,0.55)", fontSize:13, fontWeight:600 }}>
          Designed &amp; built by the
          <span className="hm-tag" style={{ background:P.sun, color:P.ink, fontSize:12, fontWeight:900, letterSpacing:"0.3px", padding:"4px 11px" }}>
            Knox Capital Finance Club
          </span>
        </span>
      </div>
    </footer>
  );
}

// Shared page hero for subpages.
export function PageHero({ eyebrow, title, accent, lead, accentColor = P.coral }) {
  return (
    <section className="grid-bg" style={{ padding:"150px 48px 56px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"relative", maxWidth:1080, margin:"0 auto", width:"100%", animation:"fadeUp .7s cubic-bezier(.22,1,.36,1) both" }}>
        <Label color={accentColor}>{eyebrow}</Label>
        <h1 className="display" style={{ fontSize:"clamp(46px,8vw,92px)", fontWeight:900, letterSpacing:"-3px", lineHeight:0.92, color:P.ink }}>
          {title} {accent && <span style={{ color:accentColor }}>{accent}</span>}
        </h1>
        <div style={{ marginTop:12 }}><Squiggle color={accentColor} width={260} /></div>
        {lead && (
          <p style={{ color:P.inkSoft, fontSize:19, maxWidth:560, marginTop:24, lineHeight:1.65, fontWeight:500 }}>{lead}</p>
        )}
      </div>
    </section>
  );
}
