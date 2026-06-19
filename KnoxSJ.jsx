import KnoxCalendar from "./KnoxCalendar.jsx";
import { P, THEME_CSS, SiteNav, SiteFooter, Squiggle } from "./src/theme.jsx";
import { CausesSection, ImpactSection, AboutSection } from "./src/sections.jsx";

const TICKER = ["Refugees","Climate Action","Family Violence","Homelessness","Gender Equality","Education","Legacy","Community Service","Human Rights","Reconciliation"];

const HERO_STICKERS = [
  { icon:"★",  t:"Capital Finance Club", sub:"Built this site", c:"#211710", bg:"#FBB915", top:"-4%", left:"2%",  r:"-5deg" },
  { icon:"🌏", t:"Refugees",       sub:"Toys for STARTTS",  c:"#FF5B30", bg:"#FBE3D6", top:"15%", left:"44%", r:"5deg"  },
  { icon:"🏠", t:"Shelter",        sub:"Wesley Mission",    c:"#2F6B47", bg:"#DEEBE1", top:"34%", left:"0%",  r:"3deg"  },
  { icon:"💜", t:"Respect",        sub:"Family violence",   c:"#B0447E", bg:"#F3E0EC", top:"53%", left:"42%", r:"-4deg" },
  { icon:"✊", t:"Equality",       sub:"Gender equity",     c:"#E89211", bg:"#FBF0D6", top:"70%", left:"2%",  r:"6deg"  },
  { icon:"🤝", t:"Fridays @ lunch", sub:"AGC 112–113",      c:"#FBB915", bg:"#211710", dark:true, top:"88%", left:"40%", r:"-3deg" },
];

export default function KnoxSJ() {
  return (
    <div style={{ fontFamily:"'Hanken Grotesk',system-ui,sans-serif", background:P.paper, color:P.ink, overflowX:"hidden" }}>
      <style>{THEME_CSS}</style>

      <SiteNav current="#/" />

      {/* HERO */}
      <section className="hero grid-bg" style={{
        minHeight:"100vh",
        display:"flex", flexDirection:"column", justifyContent:"center",
        position:"relative", overflow:"hidden",
      }}>
        {/* ghost watermark */}
        <div aria-hidden="true" style={{
          position:"absolute", bottom:"-8%", right:"-2%",
          fontSize:"clamp(200px,30vw,420px)", fontWeight:900, lineHeight:0.82,
          color:P.ink, opacity:0.038, letterSpacing:"-16px",
          pointerEvents:"none", userSelect:"none",
          fontFamily:"'Hanken Grotesk',system-ui,sans-serif",
        }}>KSJ</div>

        <div style={{ position:"relative", maxWidth:1080, margin:"0 auto", width:"100%" }}>

          {/* sticker collage */}
          <div className="hide-m" style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:380, height:440, pointerEvents:"none" }}>
            {HERO_STICKERS.map((s, i) => (
              <div key={i} className="sticker floaty" style={{
                position:"absolute", top:s.top, left:s.left,
                "--r": s.r, animationDelay:`${i * 0.45}s`,
                background:s.bg, padding:"11px 16px 11px 11px",
                display:"inline-flex", alignItems:"center", gap:11, whiteSpace:"nowrap",
              }}>
                <span style={{
                  width:38, height:38, borderRadius:11, flexShrink:0, fontSize:19,
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  background: s.dark ? "rgba(251,244,232,0.12)" : "#fff",
                  border: `2px solid ${s.dark ? "rgba(251,244,232,0.28)" : "#211710"}`,
                }}>{s.icon}</span>
                <span style={{ display:"flex", flexDirection:"column", gap:3 }}>
                  <span className="display" style={{ fontSize:15, fontWeight:800, letterSpacing:"-0.3px", lineHeight:1, color: s.dark ? "#FBF4E8" : "#211710" }}>{s.t}</span>
                  <span style={{ fontSize:11.5, fontWeight:700, lineHeight:1, color: s.dark ? "rgba(251,244,232,0.6)" : s.c }}>{s.sub}</span>
                </span>
              </div>
            ))}
          </div>

          {/* live badge */}
          <div className="a1" style={{ marginBottom:30 }}>
            <span className="hm-tag" style={{ display:"inline-flex", alignItems:"center", gap:9, background:P.paper2, padding:"8px 15px", transform:"rotate(-1.5deg)" }}>
              <span className="live-dot" style={{ width:9, height:9, borderRadius:"50%", background:P.forest, flexShrink:0, border:"1.5px solid #211710" }} />
              <span style={{ color:P.ink, fontSize:13.5, fontWeight:700 }}>Live now · Refugee Week · June 14–20</span>
            </span>
          </div>

          {/* stacked headline */}
          <div style={{ maxWidth:640 }}>
            {[["Act.",P.coral,"a2"],["Learn.",P.ink,"a3"],["Serve.",P.forest,"a4"]].map(([word,color,cls]) => (
              <div key={word} className={`display ${cls}`} style={{
                fontSize:"clamp(64px,11vw,140px)", fontWeight:900, lineHeight:0.9, color,
                letterSpacing:"-4px",
              }}>
                {word}
              </div>
            ))}
            <div className="a4" style={{ marginTop:6, marginLeft:4 }}>
              <Squiggle color={P.coral} width={300} />
            </div>

            <p className="a5" style={{ color:P.inkSoft, fontSize:19, maxWidth:480, marginTop:30, lineHeight:1.65, fontWeight:500 }}>
              Knox Grammar's Social Justice program, developing young men who see the world clearly and have the courage to act.
            </p>
            <div className="a5" style={{ display:"flex", gap:14, marginTop:36, flexWrap:"wrap" }}>
              <a href="#/impact" className="hm-btn" style={{ background:P.coral, color:"#fff", padding:"15px 28px", fontSize:15 }}>
                See our impact <span className="arr">→</span>
              </a>
              <a href="#/causes" className="hm-btn" style={{ background:P.paper2, color:P.ink, padding:"15px 28px", fontSize:15 }}>
                Current causes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:P.sun, padding:"13px 0", overflow:"hidden", borderTop:"3px solid #211710", borderBottom:"3px solid #211710" }}>
        <div className="tick">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="display" style={{ color:P.ink, fontWeight:800, fontSize:15, letterSpacing:"-0.2px", flexShrink:0, padding:"0 26px", display:"inline-flex", alignItems:"center", gap:26 }}>
              {t}<span style={{ color:P.coral }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* CURRENT CAMPAIGN */}
      <section className="section grid-bg">
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ marginBottom:24 }}>
            <span className="hm-tag" style={{ display:"inline-block", background:P.paper2, color:P.forest, fontSize:11.5, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", padding:"6px 13px" }}>● Active this week</span>
          </div>
          <div className="g2b hm-panel" style={{ background:P.panel, padding:"48px", display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:44, alignItems:"center" }}>
            <div>
              <span className="hm-tag" style={{ display:"inline-block", background:P.sun, color:P.ink, fontSize:12, fontWeight:800, letterSpacing:"1px", textTransform:"uppercase", padding:"5px 12px", marginBottom:18 }}>Refugee Week · June 14–20</span>
              <h2 className="display" style={{ fontSize:46, fontWeight:900, color:P.paper2, lineHeight:1.02, letterSpacing:"-1.6px", marginBottom:18 }}>Toys for STARTTS</h2>
              <p style={{ color:"rgba(251,244,232,0.66)", fontSize:17, lineHeight:1.72, marginBottom:30, fontWeight:500 }}>
                STARTTS provides psychological support for refugee children who have survived trauma. During Refugee Week, Knox collects toys so these kids have something to call their own.
              </p>
              <a href="#/about" className="hm-btn" style={{ background:P.coral, color:"#fff", padding:"13px 24px", fontSize:15 }}>
                How to contribute <span className="arr">→</span>
              </a>
            </div>
            <div className="lift" style={{ background:"rgba(251,244,232,0.06)", border:"2.5px solid #FBF4E8", borderRadius:16, padding:26, boxShadow:"5px 5px 0 rgba(0,0,0,0.35)" }}>
              <div style={{ fontSize:10.5, color:"rgba(251,244,232,0.5)", letterSpacing:"1.4px", textTransform:"uppercase", marginBottom:7, fontWeight:700 }}>Partner organisation</div>
              <div className="display" style={{ fontSize:28, fontWeight:900, color:P.paper2, marginBottom:9, letterSpacing:"-0.6px" }}>STARTTS</div>
              <div style={{ fontSize:13.5, color:"rgba(251,244,232,0.55)", lineHeight:1.55, marginBottom:24, fontWeight:500 }}>Service for the Treatment and Rehabilitation of Torture and Trauma Survivors</div>
              <div style={{ borderTop:"2px solid rgba(251,244,232,0.18)", paddingTop:20, display:"flex", gap:24 }}>
                {[["T3–T4","Collection window"],["2026","Program year"]].map(([v,l]) => (
                  <div key={l}>
                    <div className="display" style={{ fontSize:24, fontWeight:900, color:P.sun }}>{v}</div>
                    <div style={{ fontSize:11.5, color:"rgba(251,244,232,0.5)", marginTop:4, fontWeight:500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared content sections, each also lives on its own standalone page */}
      <CausesSection />
      <ImpactSection />
      <AboutSection />

      <KnoxCalendar />

      <SiteFooter />
    </div>
  );
}
