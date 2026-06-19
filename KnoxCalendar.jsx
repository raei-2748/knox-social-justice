import { useState } from "react";

const CAL_CSS = `
  @keyframes calSlide { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .cal-ev { animation: calSlide .35s cubic-bezier(.22,1,.36,1) both; }
  .ev-row { transition: background .15s, transform .15s; cursor:default; border-radius:10px; }
  .ev-row:hover { background: rgba(33,23,16,0.05) !important; transform: translateX(3px); }
  .term-tab { transition: transform .12s ease, box-shadow .12s ease; }
  .term-tab:hover { transform: translate(-1px,-1px); box-shadow: 5px 5px 0 #211710 !important; }
  .term-tab:active { transform: translate(2px,2px); box-shadow: 0 0 0 #211710 !important; }
  .cause-chip { transition: transform .12s ease; }
  .cause-chip:hover { transform: translate(-1px,-1px); }
`;

const CAUSE = {
  core:        { label: "Social Justice",  bg: "#FF5B30", icon: "✊" },
  gender:      { label: "Gender Equality", bg: "#C2507E", icon: "💜" },
  refugees:    { label: "Refugees",        bg: "#D05A20", icon: "🌏" },
  environment: { label: "Environment",     bg: "#2F6B47", icon: "🌿" },
  community:   { label: "Community",       bg: "#3E78A6", icon: "🤝" },
  food:        { label: "Homelessness",    bg: "#C27B10", icon: "🏠" },
  health:      { label: "Wellbeing",       bg: "#7B5EA7", icon: "💪" },
};

const TERMS = [
  { num:1, label:"Term 1", short:"T1", range:"28 Jan – 2 Apr",   color:"#FF5B30", lightBg:"#FBE3D6" },
  { num:2, label:"Term 2", short:"T2", range:"21 Apr – 26 Jun",  color:"#E89211", lightBg:"#FBF0D6" },
  { num:3, label:"Term 3", short:"T3", range:"21 Jul – 25 Sep",  color:"#2F6B47", lightBg:"#DEEBE1" },
  { num:4, label:"Term 4", short:"T4", range:"13 Oct – 3 Dec",   color:"#C2507E", lightBg:"#F3E0EC" },
];

const EVENTS = [
  { term:1, date:"27 Jan",     day:"Tue",  title:"Co-Curricular Expo",                     cause:"community",   featured:false },
  { term:1, date:"20 Feb",     day:"Fri",  title:"World Day for Social Justice Assembly",   cause:"core",        featured:true  },
  { term:1, date:"8 Mar",      day:"Sun",  title:"IWD Lunch with Pymble (Yr 11)",           cause:"gender",      featured:false },
  { term:1, date:"10 Mar",     day:"Tue",  title:"International Women's Day Breakfast",     cause:"gender",      featured:true  },
  { term:1, date:"17 Mar",     day:"Tue",  title:"Harmony Day",                             cause:"community",   featured:false },
  { term:1, date:"20 Mar",     day:"Fri",  title:"World's Greatest Shave",                  cause:"health",      featured:true  },
  { term:1, date:"Late Mar",   day:"",     title:"Easter Egg & Instant Noodle Drive",       cause:"food",        featured:true  },
  { term:2, date:"5 Jun",      day:"Fri",  title:"World Environment Day",                   cause:"environment", featured:false },
  { term:2, date:"14 Jun",     day:"Sun",  title:"Special Olympics Fun Run / Walk",         cause:"community",   featured:true  },
  { term:2, date:"14–20 Jun",  day:"",     title:"Refugee Week: Toys for STARTTS",         cause:"refugees",    featured:true  },
  { term:2, date:"Hols",       day:"",     title:"Lifeline Book Fair",                      cause:"community",   featured:false },
  { term:3, date:"4 Sep",      day:"Fri",  title:"Legacy Day",                              cause:"community",   featured:true  },
  { term:3, date:"4 Sep",      day:"Fri",  title:"Jersey Day",                              cause:"community",   featured:true  },
  { term:3, date:"21 Sep",     day:"Mon",  title:"International Day of Peace",              cause:"core",        featured:true  },
  { term:4, date:"November",   day:"",     title:"DFV Walk the Talk",                       cause:"gender",      featured:true  },
  { term:4, date:"Late Nov",   day:"",     title:"Toys for STARTTS",                        cause:"refugees",    featured:true  },
  { term:4, date:"Late Nov",   day:"",     title:"Food Drive: Wesley Mission & Ku-ring-gai",cause:"food",      featured:true  },
  { term:4, date:"4–7 Dec",    day:"",     title:"ABBOX Camp",                              cause:"community",   featured:true  },
];

const SUPPORT = ["Ride with Richter","Push-up Challenge","RUOK? Day","Nedd's Uncomfortable Challenge"];

const P = {
  paper:"#F4EADB", paper2:"#FBF4E8", ink:"#211710", inkSoft:"#5C4D40", coral:"#FF5B30",
};

function Squiggle({ color = "#FF5B30", width = 200 }) {
  return (
    <svg className="squig" width={width} height="16" viewBox="0 0 260 16" fill="none" aria-hidden="true" style={{ display:"block" }}>
      <path d="M3 10 C 28 3, 50 13, 78 8 S 130 3, 158 9 S 215 14, 257 5" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function CausePill({ causeKey, small }) {
  const c = CAUSE[causeKey];
  return (
    <span className="hm-tag" style={{
      background: c.bg,
      color: "#fff",
      fontSize: small ? 10.5 : 11.5,
      fontWeight: 800,
      padding: small ? "3px 9px" : "4px 11px",
      display:"inline-flex",
      alignItems:"center",
      gap:4,
      whiteSpace:"nowrap",
      letterSpacing:"0.2px",
      boxShadow:"2px 2px 0 #211710",
    }}>
      {c.icon} {c.label}
    </span>
  );
}

function EventRow({ ev, delay }) {
  const term = TERMS.find(t => t.num === ev.term);
  return (
    <div
      className="ev-row cal-ev"
      style={{
        display:"grid",
        gridTemplateColumns:"92px 1fr auto",
        gap:12,
        alignItems:"center",
        padding:"13px 16px",
        background:"transparent",
        animationDelay:`${delay * 0.04}s`,
      }}
    >
      {/* Date */}
      <div>
        <div style={{
          fontFamily:"'Hanken Grotesk',sans-serif",
          fontSize:15,
          fontWeight:900,
          color: term.color,
          lineHeight:1.1,
          letterSpacing:"-0.4px",
        }}>{ev.date}</div>
        {ev.day && <div style={{ fontSize:10.5, color:P.inkSoft, fontWeight:700, letterSpacing:"0.4px" }}>{ev.day}</div>}
      </div>

      {/* Title */}
      <div style={{ fontSize:15, fontWeight: ev.featured ? 700 : 500, color:P.ink, lineHeight:1.3 }}>
        {ev.title}
        {ev.featured && (
          <span className="hm-tag" style={{ marginLeft:8, fontSize:9.5, background:term.lightBg, color:term.color, padding:"2px 7px", fontWeight:800, verticalAlign:"middle", letterSpacing:"0.4px", boxShadow:"1.5px 1.5px 0 #211710" }}>KEY</span>
        )}
      </div>

      {/* Cause */}
      <CausePill causeKey={ev.cause} small />
    </div>
  );
}

export default function KnoxCalendar() {
  const [activeTerm,  setActiveTerm]  = useState(0);
  const [activeCause, setActiveCause] = useState("all");

  const termEventsCount = (n) => EVENTS.filter(e => e.term === n && (activeCause === "all" || e.cause === activeCause)).length;

  const visible = EVENTS.filter(e =>
    (activeTerm === 0 || e.term === activeTerm) &&
    (activeCause === "all" || e.cause === activeCause)
  );

  const grouped = TERMS.map(t => ({
    term: t,
    events: visible.filter(e => e.term === t.num),
  })).filter(g => g.events.length > 0 && (activeTerm === 0 || activeTerm === g.term.num));

  let rowIndex = 0;

  const tabBase = {
    border:"2.5px solid #211710",
    borderRadius:28,
    boxShadow:"3px 3px 0 #211710",
    padding:"10px 18px",
    fontSize:14,
    fontWeight:800,
    fontFamily:"'Hanken Grotesk',sans-serif",
    cursor:"pointer",
    display:"flex",
    alignItems:"center",
    gap:8,
  };

  return (
    <section id="calendar" className="grid-bg" style={{
      padding:"88px 48px",
      borderTop:"3px solid #211710",
    }}>
      <style>{CAL_CSS}</style>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:40 }}>
          <span className="hm-tag" style={{ display:"inline-block", background:P.paper2, color:P.ink, fontSize:11.5, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", padding:"6px 13px", marginBottom:16 }}>
            What's coming up
          </span>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <h2 className="display" style={{ fontSize:"clamp(40px,5.5vw,64px)", fontWeight:900, letterSpacing:"-2.5px", lineHeight:0.95, color:P.ink }}>
                2026 Calendar
              </h2>
              <div style={{ marginTop:8 }}><Squiggle color={P.coral} width={220} /></div>
            </div>
            <span className="hm-tag" style={{ background:P.ink, color:P.paper2, fontSize:14, fontWeight:800, padding:"8px 16px", boxShadow:"3px 3px 0 #FF5B30" }}>
              {visible.length} events
              {activeCause !== "all" && <span style={{ opacity:0.7 }}> · {CAUSE[activeCause].label}</span>}
            </span>
          </div>
        </div>

        {/* Term tabs */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:14 }}>
          <button
            className="term-tab"
            onClick={() => setActiveTerm(0)}
            style={{ ...tabBase, background: activeTerm === 0 ? P.ink : P.paper2, color: activeTerm === 0 ? P.paper2 : P.ink }}
          >All terms</button>

          {TERMS.map(t => {
            const on = activeTerm === t.num;
            const count = termEventsCount(t.num);
            return (
              <button
                key={t.num}
                className="term-tab"
                onClick={() => setActiveTerm(t.num)}
                style={{ ...tabBase, background: on ? t.color : P.paper2, color: on ? "#fff" : P.ink }}
              >
                <span>{t.label}</span>
                <span style={{
                  background: on ? "rgba(255,255,255,0.28)" : t.lightBg,
                  color: on ? "#fff" : t.color,
                  border:"1.5px solid #211710",
                  borderRadius:20,
                  padding:"0px 7px",
                  fontSize:11,
                  fontWeight:800,
                }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Cause filter pills */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:36 }}>
          <button
            className="cause-chip hm-tag"
            onClick={() => setActiveCause("all")}
            style={{
              background: activeCause === "all" ? P.ink : P.paper2,
              color: activeCause === "all" ? P.paper2 : P.ink,
              padding:"6px 14px", fontSize:12, fontWeight:800,
              fontFamily:"'Hanken Grotesk',sans-serif", cursor:"pointer",
            }}
          >All causes</button>

          {Object.entries(CAUSE).map(([key, c]) => {
            const on = activeCause === key;
            return (
              <button
                key={key}
                className="cause-chip hm-tag"
                onClick={() => setActiveCause(on ? "all" : key)}
                style={{
                  background: on ? c.bg : P.paper2,
                  color: on ? "#fff" : P.ink,
                  padding:"6px 14px", fontSize:12, fontWeight:800,
                  fontFamily:"'Hanken Grotesk',sans-serif", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:5,
                }}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Events grouped by term */}
        {grouped.length === 0 ? (
          <div className="hm-card" style={{ textAlign:"center", padding:"56px 0", color:P.inkSoft, fontSize:16, fontWeight:600, background:P.paper2 }}>
            No events match this filter.
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:30 }}>
            {grouped.map(({ term, events }) => {
              const start = rowIndex;
              rowIndex += events.length;
              return (
                <div key={term.num} style={{
                  background:P.paper2,
                  border:"2.5px solid #211710",
                  borderRadius:18,
                  overflow:"hidden",
                  boxShadow:"7px 7px 0 #211710",
                }}>
                  {/* Term header strip */}
                  <div style={{
                    background: term.color,
                    padding:"14px 20px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                    borderBottom:"2.5px solid #211710",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                      <span className="display" style={{ fontSize:17, fontWeight:900, color:"#fff", letterSpacing:"-0.4px" }}>
                        {term.label}
                      </span>
                      <span style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontSize:13.5, fontWeight:700, color:"rgba(255,255,255,0.85)" }}>
                        {term.range}
                      </span>
                    </div>
                    <span style={{
                      background:"rgba(255,255,255,0.25)",
                      color:"#fff",
                      border:"1.5px solid #211710",
                      fontSize:12,
                      fontWeight:800,
                      borderRadius:14,
                      padding:"2px 10px",
                    }}>{events.length}</span>
                  </div>

                  {/* Event rows */}
                  <div style={{ padding:"8px 6px" }}>
                    {events.map((ev, i) => (
                      <EventRow key={i} ev={ev} delay={start + i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Supporting initiatives */}
        <div style={{
          marginTop:40,
          padding:"24px 26px",
          background:P.paper2,
          border:"2.5px solid #211710",
          borderRadius:18,
          boxShadow:"6px 6px 0 #211710",
          display:"flex",
          alignItems:"center",
          gap:14,
          flexWrap:"wrap",
        }}>
          <span style={{ fontSize:12.5, fontWeight:800, color:P.ink, whiteSpace:"nowrap", textTransform:"uppercase", letterSpacing:"1px" }}>Also supporting</span>
          {SUPPORT.map(s => (
            <span key={s} className="hm-tag" style={{
              fontSize:13.5,
              color:P.ink,
              fontWeight:700,
              background:P.paper,
              padding:"6px 14px",
            }}>{s}</span>
          ))}
        </div>

      </div>
    </section>
  );
}
