import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  @keyframes liveRing  { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(3.2);opacity:0} }
  @keyframes tickScroll{ 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pinBeat   { 0%,100%{opacity:0.55} 50%{opacity:1} }

  .a1{animation:fadeUp .6s .05s ease both}
  .a2{animation:fadeUp .6s .20s ease both}
  .a3{animation:fadeUp .6s .35s ease both}
  .a4{animation:fadeUp .6s .50s ease both}
  .a5{animation:fadeUp .6s .65s ease both}

  .card{transition:transform .18s ease, box-shadow .18s ease; cursor:pointer}
  .card:hover{transform:translateY(-4px)}

  .mpin{cursor:pointer}
  .pring{animation:pinBeat 2.2s ease-in-out infinite}
  .tick{animation:tickScroll 32s linear infinite; display:inline-flex; gap:44px; white-space:nowrap; align-items:center}

  .navlink{color:rgba(255,255,255,.55); font-size:14px; font-weight:500; transition:color .15s}
  .navlink:hover{color:#fff}

  button{cursor:pointer; font-family:'Outfit',sans-serif}
  a{text-decoration:none; color:inherit}

  .section{padding:72px 48px}
  .hero{padding:140px 48px 100px}
  .nav{padding:15px 48px}

  :focus-visible{outline:2px solid #E8521A; outline-offset:3px; border-radius:4px}

  @media(max-width:820px){
    .hide-m{display:none!important}
    .g2{grid-template-columns:1fr!important}
    .g2b{grid-template-columns:1fr!important}
    .section{padding:52px 22px}
    .hero{padding:120px 22px 80px}
    .nav{padding:13px 20px}
  }
  @media(prefers-reduced-motion:reduce){
    *{animation:none!important; transition:none!important; scroll-behavior:auto!important}
  }
`;

const P = {
  flame:"#E8521A", sun:"#F5C842", black:"#18140F", white:"#FBF6EE",
  blush:"#EFD9C8", muted:"#9B8B7A", land:"#2A4525", lbord:"#3A5E33", ocean:"#152232",
};

const CAUSES = [
  { id:"refugees", color:"#E8521A", tint:"#FCEEE7", glow:"rgba(232,82,26,.20)", icon:"🌏", tag:"Refugees", live:true,
    title:"Every person deserves safety.",
    body:"STARTTS supports refugee survivors of torture and trauma, many of them children. Knox collects toys, food, and funds across the year.",
    cta:"Refugee Week · June 14–20" },
  { id:"dfv", color:"#9B59B6", tint:"#F3ECF8", glow:"rgba(155,89,182,.20)", icon:"💜", tag:"Family Violence", live:false,
    title:"Silence enables violence.",
    body:"Through the Respectful Relationships program, Knox works with the Hornsby Ku-ring-gai Women's Shelter and starts the conversation in its own community first.",
    cta:"Walk the Talk · November" },
  { id:"home", color:"#2D6A4F", tint:"#E9F1EC", glow:"rgba(45,106,79,.18)", icon:"🏠", tag:"Homelessness", live:false,
    title:"Home is not guaranteed.",
    body:"Wesley Mission and the Ku-ring-gai Neighbourhood Centre rely on Knox food drives to support people experiencing homelessness across Sydney.",
    cta:"Food Drive · End of term" },
  { id:"women", color:"#C2185B", tint:"#FBEAF1", glow:"rgba(194,24,91,.18)", icon:"✊", tag:"Gender Equality", live:false,
    title:"Half the world. All the rights.",
    body:"From the IWD Breakfast to joint events with Pymble, Knox advocates for gender equality through education, events, and lasting culture change.",
    cta:"International Women's Day · March" },
];

const TICKER = ["Refugees","Climate Action","Family Violence","Homelessness","Gender Equality","Education","Legacy","Community Service","Human Rights","Reconciliation"];

const LAND = {
  australia:  "M 280,274 L 320,261 L 410,219 L 460,219 L 460,254 L 500,261 L 510,219 L 550,206 L 620,295 L 635,322 L 612,370 L 562,404 L 502,390 L 420,383 L 360,370 L 262,356 L 252,370 L 242,315 Z",
  tasmania:   "M 557,413 L 577,413 L 578,432 L 557,430 Z",
  newGuinea:  "M 412,143 L 452,155 L 515,161 L 572,193 L 598,208 L 578,208 L 565,196 L 515,185 L 452,168 L 432,158 Z",
  borneo:     "M 192,110 L 262,89 L 298,125 L 277,164 L 232,160 L 192,132 Z",
  sumatra:    "M 52,105 L 92,119 L 142,139 L 162,180 L 132,166 L 102,153 L 62,125 Z",
  java:       "M 162,180 L 217,185 L 247,192 L 217,201 L 162,194 Z",
  malay:      "M 102,92 L 117,89 L 142,112 L 142,132 L 117,139 L 102,125 Z",
  indochina:  "M 112,41 L 162,0 L 187,16 L 187,70 L 162,77 L 150,57 L 102,70 L 92,57 Z",
  sulawesi:   "M 302,132 L 332,119 L 357,139 L 332,173 L 307,166 Z",
  philippines:"M 312,16 L 357,23 L 312,43 L 352,70 L 352,91 L 312,84 L 292,57 Z",
  solomons:   "M 607,215 L 618,208 L 623,221 L 612,222 Z",
};

const PINS = [
  { id:"cambodia", label:"Cambodia", sub:"Overseas Immersion", cx:152, cy:57,
    desc:"Knox students travel to Cambodia on immersion. The reflections of the boys who went will live here. Talk to the SJ team to add yours." },
  { id:"borneo", label:"Borneo", sub:"Overseas Immersion", cx:250, cy:137,
    desc:"Knox runs an immersion in Borneo. This space is held for the stories and photos of the students who took part." },
  { id:"png", label:"Papua New Guinea", sub:"Kokoda Immersion", cx:572, cy:199,
    desc:"Knox boys walk the Kokoda Track. Their accounts of the journey will be collected here after each trip." },
  { id:"nsw", label:"Far Western NSW", sub:"Domestic Immersion", cx:500, cy:357,
    desc:"Knox connects with remote communities across far western New South Wales. Student reflections are being gathered now." },
  { id:"sydney", label:"Sydney", sub:"Local Partnerships", cx:615, cy:372,
    desc:"Wesley Mission, STARTTS, the Ku-ring-gai Neighbourhood Centre, Legacy, and the Sony Foundation: the partners Knox works with year round." },
];

const INFO = [
  ["Where",   "AGC 112–113, Middle Academy"],
  ["When",    "Every Friday, lunchtime"],
  ["Who",     "All Knox students welcome"],
  ["Contact", "knoxcocurricular@knox.nsw.edu.au"],
];

export default function KnoxSJ() {
  const [scrolled,    setScrolled]    = useState(false);
  const [activePin,   setActivePin]   = useState(null);
  const [activeCause, setActiveCause] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const pin = PINS.find(p => p.id === activePin);

  return (
    <div style={{ fontFamily:"'Outfit',system-ui,sans-serif", background:P.white, color:P.black, overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav" style={{
        position:"fixed", top:0, left:0, right:0, zIndex:999,
        background: scrolled ? "rgba(24,20,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        transition:"background .3s, backdrop-filter .3s, border-color .3s",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, background:P.flame, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"white", fontSize:10, fontWeight:800, fontFamily:"'Syne',sans-serif", letterSpacing:"-0.3px" }}>KSJ</span>
          </div>
          <span style={{ color:"white", fontWeight:700, fontSize:15, fontFamily:"'Syne',sans-serif" }}>Knox Social Justice</span>
        </div>
        <div className="hide-m" style={{ display:"flex", gap:32 }}>
          {[["Causes","causes"],["Impact","impact"],["About","about"]].map(([l,id]) => (
            <a key={id} href={"#"+id} className="navlink">{l}</a>
          ))}
        </div>
        <a href="#about" style={{ background:P.flame, color:"white", border:"none", borderRadius:24, padding:"9px 20px", fontSize:13, fontWeight:600, display:"inline-block" }}>
          Join Friday Club
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" style={{
        background:P.black, minHeight:"100vh",
        display:"flex", flexDirection:"column", justifyContent:"center",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse at 12% 65%, rgba(232,82,26,0.13) 0%, transparent 52%), radial-gradient(ellipse at 80% 16%, rgba(245,200,66,0.07) 0%, transparent 44%)",
        }} />

        {/* live badge */}
        <div className="a1" style={{ marginBottom:36 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:9, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"7px 15px" }}>
            <div style={{ position:"relative", width:8, height:8, flexShrink:0 }}>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#4ADE80", animation:"liveRing 2s ease-out infinite" }} />
              <div style={{ position:"absolute", inset:"1px", borderRadius:"50%", background:"#4ADE80" }} />
            </div>
            <span style={{ color:"rgba(255,255,255,0.8)", fontSize:13, fontWeight:500 }}>LIVE — Refugee Week · June 14–20</span>
          </div>
        </div>

        {/* stacked headline */}
        {[["Act.",P.flame,"a2"],["Learn.",P.sun,"a3"],["Serve.",P.white,"a4"]].map(([word,color,cls]) => (
          <div key={word} className={cls} style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(62px,10vw,116px)", fontWeight:800, lineHeight:0.88, color, letterSpacing:"-3px", marginBottom:6 }}>
            {word}
          </div>
        ))}

        <p className="a5" style={{ color:"rgba(255,255,255,0.45)", fontSize:17, maxWidth:440, marginTop:32, lineHeight:1.7 }}>
          Knox Grammar's Social Justice program, developing young men who see the world clearly and have the courage to act.
        </p>
        <div className="a5" style={{ display:"flex", gap:12, marginTop:36, flexWrap:"wrap" }}>
          <a href="#impact" style={{ background:P.flame, color:"white", borderRadius:28, padding:"13px 26px", fontSize:14, fontWeight:600, display:"inline-block" }}>
            See our impact ↓
          </a>
          <a href="#causes" style={{ background:"transparent", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:28, padding:"13px 26px", fontSize:14, fontWeight:500, display:"inline-block" }}>
            Current causes
          </a>
        </div>
        <div className="hide-m" style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)" }}>
          <div style={{ width:1, height:44, background:"linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)", margin:"0 auto" }} />
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:P.flame, padding:"11px 0", overflow:"hidden" }}>
        <div className="tick">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ color:"white", fontWeight:700, fontSize:11, fontFamily:"'Syne',sans-serif", letterSpacing:"1.8px", textTransform:"uppercase", flexShrink:0 }}>
              {t}&nbsp;&nbsp;<span style={{ opacity:0.35 }}>●</span>
            </span>
          ))}
        </div>
      </div>

      {/* CURRENT CAMPAIGN */}
      <section className="section" style={{ background:P.white }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:26 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#4ADE80" }} />
            <span style={{ fontSize:11, fontWeight:600, color:P.muted, letterSpacing:"1.5px", textTransform:"uppercase" }}>Active this week</span>
          </div>
          <div className="g2b" style={{ background:P.black, borderRadius:20, padding:"44px", display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:40, alignItems:"center" }}>
            <div>
              <div style={{ fontSize:11, color:P.flame, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:14 }}>Refugee Week · June 14–20</div>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:800, color:P.white, lineHeight:1.1, letterSpacing:"-1px", marginBottom:18 }}>Toys for STARTTS</h2>
              <p style={{ color:"rgba(255,255,255,0.5)", fontSize:16, lineHeight:1.75, marginBottom:28 }}>
                STARTTS provides psychological support for refugee children who have survived trauma. During Refugee Week, Knox collects toys so these kids have something to call their own.
              </p>
              <a href="#about" style={{ background:P.flame, color:"white", borderRadius:24, padding:"12px 22px", fontSize:14, fontWeight:600, display:"inline-block" }}>
                How to contribute →
              </a>
            </div>
            <div style={{ background:"rgba(232,82,26,0.08)", border:"1px solid rgba(232,82,26,0.16)", borderRadius:14, padding:26 }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:6 }}>Partner organisation</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:P.white, marginBottom:8 }}>STARTTS</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.55, marginBottom:22 }}>Service for the Treatment and Rehabilitation of Torture and Trauma Survivors</div>
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:18, display:"flex", gap:22 }}>
                {[["T3–T4","Collection window"],["2026","Program year"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:P.sun }}>{v}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAUSES */}
      <section id="causes" className="section" style={{ background:P.white }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ marginBottom:40 }}>
            <div style={{ fontSize:11, color:P.muted, fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>What we stand for</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:44, fontWeight:800, letterSpacing:"-1.5px", lineHeight:1.05 }}>Our causes</h2>
          </div>
          <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {CAUSES.map(c => (
              <div key={c.id} className="card" onClick={() => setActiveCause(activeCause===c.id ? null : c.id)} style={{
                background:c.tint, borderRadius:16, padding:"28px 26px",
                borderLeft:`4px solid ${c.color}`,
                boxShadow: activeCause===c.id ? `0 16px 44px ${c.glow}` : "0 2px 10px rgba(0,0,0,0.05)",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                  <div>
                    {c.live && (
                      <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:P.flame, color:"white", fontSize:10, fontWeight:700, borderRadius:10, padding:"3px 8px", marginBottom:7 }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:"white" }} />LIVE
                      </div>
                    )}
                    <div style={{ fontSize:10, color:P.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.2px" }}>{c.tag}</div>
                  </div>
                  <span style={{ width:44, height:44, flexShrink:0, borderRadius:13, background:c.color+"18", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{c.icon}</span>
                </div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:700, letterSpacing:"-0.3px", marginBottom:10 }}>{c.title}</h3>
                <p style={{ fontSize:14, color:"#5A4A3A", lineHeight:1.7, marginBottom:16 }}>{c.body}</p>
                <div style={{ paddingTop:12, borderTop:"1px solid rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:12, color:c.color, fontWeight:600 }}>{c.cta}</span>
                  <span style={{ color:c.color, fontSize:15 }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT MAP */}
      <section id="impact" className="section" style={{ background:P.black }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ marginBottom:40 }}>
            <div style={{ fontSize:11, color:P.flame, fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Our reach</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:44, fontWeight:800, color:P.white, letterSpacing:"-1.5px", lineHeight:1.05, marginBottom:10 }}>Knox goes here.</h2>
            <p style={{ color:"rgba(255,255,255,0.38)", fontSize:15, maxWidth:420 }}>From Kokoda to Cambodia, far western NSW to inner Sydney. Tap a pin to see where the boys go and the stories that will live there.</p>
          </div>
          <div style={{ background:"#0F1A26", border:"1px solid rgba(255,255,255,0.05)", borderRadius:18, padding:20 }}>
            <svg viewBox="0 0 700 480" style={{ width:"100%", height:"auto", display:"block" }}>
              <rect width="700" height="480" fill={P.ocean} rx="10" />

              {[96,137,206,274,343,412].map(y => <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="1" />)}
              {[175,350,525].map(x => <line key={x} x1={x} y1="0" x2={x} y2="480" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />)}

              <line x1="0" y1="137" x2="700" y2="137" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" strokeDasharray="5,5" />
              <text x="10" y="133" fill="rgba(255,255,255,0.22)" fontSize="8.5" fontFamily="Outfit,sans-serif">EQ</text>

              <text x="75" y="362" fill="rgba(255,255,255,0.06)" fontSize="13" fontFamily="'Syne',sans-serif" fontWeight="700" letterSpacing="3">INDIAN OCEAN</text>
              <text x="655" y="438" fill="rgba(255,255,255,0.06)" fontSize="12" fontFamily="'Syne',sans-serif" fontWeight="700" letterSpacing="2" textAnchor="middle">PACIFIC</text>
              <text x="300" y="100" fill="rgba(255,255,255,0.05)" fontSize="11" fontFamily="'Syne',sans-serif" fontWeight="700" letterSpacing="2" textAnchor="middle">SOUTH CHINA SEA</text>

              {Object.entries(LAND).map(([k, d]) => (
                <path key={k} d={d} fill={P.land} stroke={P.lbord} strokeWidth="0.8" />
              ))}

              {PINS.map(p => {
                const on = activePin === p.id;
                return (
                  <g key={p.id} className="mpin" onClick={() => setActivePin(on ? null : p.id)}>
                    <circle cx={p.cx} cy={p.cy} r={on ? 18 : 13} fill={on ? "rgba(245,200,66,0.16)" : "rgba(232,82,26,0.22)"} className="pring" />
                    <circle cx={p.cx} cy={p.cy} r="7" fill={on ? P.sun : P.flame} stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
                    <text x={p.cx} y={p.cy-15} textAnchor="middle" fill={on ? P.sun : "rgba(255,255,255,0.82)"} fontSize="9.5" fontFamily="Outfit,sans-serif" fontWeight="700">
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {pin && (
              <div style={{ marginTop:16, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"20px 22px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
                <div>
                  <div style={{ fontSize:10, color:P.flame, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:5 }}>{pin.sub}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:P.white, marginBottom:7 }}>{pin.label}</div>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.42)", lineHeight:1.65, maxWidth:500 }}>{pin.desc}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); setActivePin(null); }} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.25)", fontSize:16, flexShrink:0, padding:"4px 6px" }}>✕</button>
              </div>
            )}
            {!pin && (
              <div style={{ marginTop:16, textAlign:"center", fontSize:13, color:"rgba(255,255,255,0.3)" }}>
                The map is live. Student reflections from each trip will be added here over time.
              </div>
            )}
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:14 }}>
            {PINS.map(p => (
              <button key={p.id} onClick={() => setActivePin(activePin===p.id ? null : p.id)} style={{
                background: activePin===p.id ? "rgba(232,82,26,0.16)" : "rgba(255,255,255,0.04)",
                border:`1px solid ${activePin===p.id ? "rgba(232,82,26,0.38)" : "rgba(255,255,255,0.07)"}`,
                borderRadius:18, padding:"6px 14px",
                color: activePin===p.id ? P.flame : "rgba(255,255,255,0.4)",
                fontSize:12, fontWeight:500, transition:"all 0.18s",
              }}>{p.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + CONTACT */}
      <section id="about" className="section" style={{ background:P.blush }}>
        <div className="g2" style={{ maxWidth:1080, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color:P.muted, fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 }}>About the program</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:40, fontWeight:800, letterSpacing:"-1.2px", lineHeight:1.05, marginBottom:20 }}>
              This is not a club.<br />It is a commitment.
            </h2>
            <p style={{ fontSize:16, color:"#5A4A3A", lineHeight:1.8, marginBottom:14 }}>
              Knox Social Justice is an integrated program built on awareness, advocacy, and action. It spans immersions to PNG, Cambodia, and Borneo, local partnerships with Wesley Mission, STARTTS, and Legacy, and events that run every single term.
            </p>
            <p style={{ fontSize:16, color:"#5A4A3A", lineHeight:1.8 }}>
              The SJ Club meets every Friday at lunch in AGC 112–113. No experience needed, just the willingness to show up.
            </p>
          </div>
          <div style={{ background:P.black, borderRadius:20, padding:36 }}>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:P.white, marginBottom:24 }}>Join us this Friday.</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:26 }}>
              {INFO.map(([k,v]) => (
                <div key={k} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <span style={{ fontSize:10, color:P.flame, fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", minWidth:56, paddingTop:2, flexShrink:0 }}>{k}</span>
                  <span style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.5 }}>{v}</span>
                </div>
              ))}
            </div>
            <a href="mailto:knoxcocurricular@knox.nsw.edu.au" style={{ background:P.flame, color:"white", borderRadius:24, padding:"13px 20px", fontSize:14, fontWeight:600, width:"100%", display:"block", textAlign:"center" }}>
              Get in touch →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:P.black, padding:"26px 48px", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:26, height:26, background:P.flame, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"white", fontSize:10, fontWeight:800, fontFamily:"'Syne',sans-serif" }}>KSJ</span>
            </div>
            <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>Knox Social Justice · Knox Grammar School</span>
          </div>
          <span style={{ color:"rgba(255,255,255,0.18)", fontSize:12 }}>Built by Knox Capital Finance Club</span>
        </div>
      </footer>
    </div>
  );
}
