import { useState } from "react";
import PageChrome, { PageHero } from "./PageChrome.jsx";
import { P } from "./theme.js";

// Cause styling, matching the keys used across the site.
const CAUSE = {
  core:        { label:"Social Justice", bg:"#FF5B30", icon:"✊" },
  gender:      { label:"Gender Equality", bg:"#C2507E", icon:"💜" },
  refugees:    { label:"Refugees",        bg:"#D05A20", icon:"🌏" },
  environment: { label:"Environment",     bg:"#2F6B47", icon:"🌿" },
  community:   { label:"Community",       bg:"#3E78A6", icon:"🤝" },
  food:        { label:"Homelessness",    bg:"#C27B10", icon:"🏠" },
  health:      { label:"Wellbeing",       bg:"#7B5EA7", icon:"💪" },
};

// Forward-looking events for the rest of the 2026 program year.
const UPCOMING = [
  { id:"refugee-week", date:"14–20 Jun 2026", term:"T2", title:"Refugee Week: Toys for STARTTS", cause:"refugees", live:true,
    where:"AGC 112–113 collection point", time:"All week, drop off at lunch",
    desc:"Knox collects new toys, books, and funds for STARTTS, who support refugee children recovering from trauma. Bring a wrapped toy to the SJ room any day this week.",
    cta:"How to contribute" },
  { id:"book-fair", date:"Jul Holidays 2026", term:"T2–T3", title:"Lifeline Book Fair", cause:"community", live:false,
    where:"Off-site: Lifeline Harbour to Hawkesbury", time:"Holiday volunteering",
    desc:"Students volunteer at the Lifeline Book Fair, sorting and selling donated books to fund crisis support and suicide-prevention services.",
    cta:"Register interest" },
  { id:"legacy-day", date:"4 Sep 2026", term:"T3", title:"Legacy Day", cause:"community", live:false,
    where:"Across campus", time:"All day Friday",
    desc:"Knox sells Legacy badges and pins to support the families of veterans who have given their lives in service. A long-standing partnership for the SJ program.",
    cta:"Volunteer to sell" },
  { id:"jersey-day", date:"4 Sep 2026", term:"T3", title:"Jersey Day", cause:"community", live:false,
    where:"Whole school", time:"Wear your jersey",
    desc:"Wear a sports jersey to raise awareness for organ and tissue donation: one donor can save the lives of up to ten people.",
    cta:"Learn more" },
  { id:"day-of-peace", date:"21 Sep 2026", term:"T3", title:"International Day of Peace", cause:"core", live:false,
    where:"Assembly + SJ room", time:"Morning assembly",
    desc:"A student-led assembly marking the UN International Day of Peace, with reflections from the SJ Club on conflict, reconciliation, and the work ahead.",
    cta:"Get the brief" },
  { id:"walk-the-talk", date:"November 2026", term:"T4", title:"DFV Walk the Talk", cause:"gender", live:false,
    where:"Knox oval", time:"TBC, November",
    desc:"A community walk in support of the Hornsby Ku-ring-gai Women's Shelter, raising funds and starting the conversation about domestic and family violence.",
    cta:"Register interest" },
  { id:"toys-startts-t4", date:"Late Nov 2026", term:"T4", title:"Toys for STARTTS (Summer)", cause:"refugees", live:false,
    where:"AGC 112–113", time:"Final weeks of term",
    desc:"The end-of-year toy drive for STARTTS, timed so refugee children have gifts over the summer break.",
    cta:"How to contribute" },
  { id:"food-drive", date:"Late Nov 2026", term:"T4", title:"Food Drive: Wesley Mission & Ku-ring-gai", cause:"food", live:false,
    where:"House collection bins", time:"Final weeks of term",
    desc:"A house-based non-perishable food drive supporting Wesley Mission and the Ku-ring-gai Neighbourhood Centre ahead of the holidays.",
    cta:"What to donate" },
  { id:"abbox", date:"4–7 Dec 2026", term:"T4", title:"ABBOX Camp", cause:"community", live:false,
    where:"Off-site camp", time:"4-day immersion",
    desc:"A leadership and service immersion camp closing out the SJ year, building the next group of student leaders for the program.",
    cta:"Apply" },
];

function CausePill({ causeKey }) {
  const c = CAUSE[causeKey];
  return (
    <span className="hm-tag" style={{
      background:c.bg, color:"#fff", fontSize:11.5, fontWeight:800,
      padding:"4px 11px", display:"inline-flex", alignItems:"center", gap:4, whiteSpace:"nowrap",
    }}>{c.icon} {c.label}</span>
  );
}

function EventCard({ ev }) {
  const c = CAUSE[ev.cause];
  return (
    <div className="hm-card" style={{
      background:P.paper2, padding:"28px 28px 24px",
      boxShadow: ev.live ? `6px 6px 0 ${c.bg}` : "6px 6px 0 #211710",
      display:"flex", flexDirection:"column", gap:16,
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <div>
          {ev.live && (
            <span className="hm-tag" style={{ display:"inline-flex", alignItems:"center", gap:5, background:c.bg, color:"#fff", fontSize:10, fontWeight:800, padding:"4px 9px", marginBottom:10, letterSpacing:"0.5px" }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff" }} />LIVE NOW
            </span>
          )}
          <div className="display" style={{ fontSize:23, fontWeight:900, color:c.bg, lineHeight:1, letterSpacing:"-0.6px" }}>{ev.date}</div>
          <div style={{ fontSize:11, color:P.inkSoft, fontWeight:700, letterSpacing:"0.6px", marginTop:4 }}>{ev.term}</div>
        </div>
        <CausePill causeKey={ev.cause} />
      </div>

      <h3 className="display" style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.8px", lineHeight:1.12, color:P.ink }}>{ev.title}</h3>
      <p style={{ fontSize:14.5, color:P.inkSoft, lineHeight:1.7, fontWeight:500 }}>{ev.desc}</p>

      <div style={{ display:"flex", flexDirection:"column", gap:8, paddingTop:14, borderTop:"2px solid rgba(33,23,16,0.12)" }}>
        {[["📍", ev.where], ["🕑", ev.time]].map(([ic, v]) => (
          <div key={ic} style={{ display:"flex", gap:9, alignItems:"center", fontSize:13.5, color:P.inkSoft, fontWeight:500 }}>
            <span style={{ flexShrink:0 }}>{ic}</span><span>{v}</span>
          </div>
        ))}
      </div>

      <a href="mailto:knoxcocurricular@knox.nsw.edu.au" className="hm-btn" style={{
        marginTop:2, alignSelf:"flex-start", background:c.bg, color:"#fff",
        padding:"11px 20px", fontSize:14,
      }}>{ev.cta} →</a>
    </div>
  );
}

export default function UpcomingEvents() {
  const causeKeys = ["all", ...Object.keys(CAUSE)];
  const [filter, setFilter] = useState("all");
  const visible = UPCOMING.filter(e => filter === "all" || e.cause === filter);

  return (
    <PageChrome current="#/events">
      <PageHero
        eyebrow="What's coming up"
        title="Upcoming"
        accent="events."
        lead="Every drive, walk, and assembly on the Knox Social Justice calendar from now through the end of the year. Turn up, lend a hand, make it count."
      />

      <section style={{ padding:"0 48px 96px" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>

          {/* Cause filter */}
          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:36 }}>
            {causeKeys.map(key => {
              const on = filter === key;
              const c = key === "all" ? null : CAUSE[key];
              return (
                <button key={key} onClick={() => setFilter(key)} className="hm-tag" style={{
                  background: on ? (c ? c.bg : P.ink) : P.paper2,
                  color: on ? "#fff" : P.ink,
                  padding:"6px 14px", fontSize:12.5, fontWeight:800, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  {c ? <><span>{c.icon}</span><span>{c.label}</span></> : "All events"}
                </button>
              );
            })}
          </div>

          {visible.length === 0 ? (
            <div className="hm-card" style={{ textAlign:"center", padding:"56px 0", color:P.inkSoft, fontSize:16, fontWeight:600, background:P.paper2 }}>No upcoming events match this filter.</div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:22 }}>
              {visible.map(ev => <EventCard key={ev.id} ev={ev} />)}
            </div>
          )}

          <div className="hm-card" style={{ marginTop:40, padding:"24px 26px", background:P.paper2, fontSize:14.5, color:P.inkSoft, lineHeight:1.6, fontWeight:500 }}>
            Looking for the full year at a glance? See the <a href="#/calendar" style={{ color:P.coral, fontWeight:600 }}>2026 calendar</a>, or email{" "}
            <a href="mailto:knoxcocurricular@knox.nsw.edu.au" style={{ color:P.coral, fontWeight:600 }}>knoxcocurricular@knox.nsw.edu.au</a> to get involved.
          </div>

        </div>
      </section>
    </PageChrome>
  );
}
