import { useState } from "react";
import PageChrome, { PageHero } from "./PageChrome.jsx";
import { P } from "./theme.js";

const GALLERY_ITEMS = [
  { id:1,  tag:"Refugee Week",      caption:"Toy collection day, STARTTS drop-off, Wahroonga",        color:"#FF5B30" },
  { id:2,  tag:"Kokoda",            caption:"Papua New Guinea immersion, May 2025",                    color:"#2F6B47" },
  { id:3,  tag:"Cambodia",          caption:"Community visit, Siem Reap, 2025",                        color:"#E89211" },
  { id:4,  tag:"Walk the Talk",     caption:"DV awareness walk, Knox oval, November 2024",            color:"#B0447E" },
  { id:5,  tag:"Food Drive",        caption:"Wesley Mission delivery, Term 3 2025",                    color:"#2F6B47" },
  { id:6,  tag:"IWD Breakfast",     caption:"International Women's Day breakfast, March 2025",         color:"#D8417A" },
  { id:7,  tag:"Borneo",            caption:"Community build project, East Kalimantan",                color:"#3E78A6" },
  { id:8,  tag:"Far Western NSW",   caption:"Domestic immersion, remote community, Term 3",            color:"#E89211" },
  { id:9,  tag:"Friday Club",       caption:"SJ Club meeting, AGC 112–113, lunchtime",               color:"#FF5B30" },
  { id:10, tag:"Legacy Day",        caption:"Badge selling on campus, September 2025",                 color:"#3E78A6" },
  { id:11, tag:"Day of Peace",      caption:"Student-led assembly, UN International Day of Peace",     color:"#2F6B47" },
  { id:12, tag:"Refugee Week",      caption:"Student reflections, morning assembly, June 2025",      color:"#FF5B30" },
];

const ALL_TAGS = ["All", ...Array.from(new Set(GALLERY_ITEMS.map(g => g.tag)))];

function CameraIcon({ color, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
         style={{ opacity:0.55 }}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

function GalleryCard({ tag, caption, color }) {
  return (
    <div className="hm-card" style={{
      background:P.paper2, overflow:"hidden",
      display:"flex", flexDirection:"column",
      borderTop:`5px solid ${color}`,
    }}>
      {/* placeholder image area */}
      <div style={{
        aspectRatio:"4/3",
        background:`${color}12`,
        border:`2px dashed ${color}55`,
        borderRadius:10,
        margin:"16px 16px 0",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:10,
      }}>
        <CameraIcon color={color} />
        <span style={{
          fontSize:10, color, fontWeight:800,
          letterSpacing:"1.5px", textTransform:"uppercase", opacity:0.7,
        }}>Photo coming soon</span>
      </div>

      {/* card footer */}
      <div style={{ padding:"14px 18px 18px", display:"flex", flexDirection:"column", gap:8, flex:1 }}>
        <span className="hm-tag" style={{
          display:"inline-block", background:P.paper, color,
          fontSize:10, fontWeight:800, textTransform:"uppercase",
          letterSpacing:"1px", padding:"3px 10px", alignSelf:"flex-start",
        }}>{tag}</span>
        <p style={{ fontSize:13.5, color:P.inkSoft, fontWeight:600, lineHeight:1.45 }}>{caption}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.tag === active);

  return (
    <PageChrome current="#/gallery">
      <PageHero
        eyebrow="Photos & memories"
        title="Gallery"
        accentColor={P.coral}
        lead="Every immersion, event, drive and march. Photos will be added here each term. Check back often."
      />

      <section className="section" style={{ paddingTop:48 }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>

          {/* filter pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:36 }}>
            {ALL_TAGS.map(t => {
              const on = active === t;
              const itemColor = GALLERY_ITEMS.find(g => g.tag === t)?.color ?? P.coral;
              return (
                <button key={t} onClick={() => setActive(t)} className="hm-tag" style={{
                  background: on ? itemColor : P.paper2,
                  color: on ? "#fff" : P.ink,
                  border: on ? `2px solid ${itemColor}` : undefined,
                  fontSize:13, padding:"8px 16px", fontWeight:700,
                }}>{t}</button>
              );
            })}
          </div>

          {/* photo grid */}
          <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
            {filtered.map(item => <GalleryCard key={item.id} {...item} />)}
          </div>

          {/* upload nudge */}
          <div className="hm-panel" style={{
            marginTop:56, background:P.ink, padding:"36px 40px",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            flexWrap:"wrap", gap:24,
          }}>
            <div>
              <div style={{ fontSize:11, color:P.sun, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", marginBottom:8 }}>
                SJ Club members
              </div>
              <h2 className="display" style={{ fontSize:26, fontWeight:900, color:P.paper2, letterSpacing:"-0.6px" }}>
                Have a photo from a past event?
              </h2>
              <p style={{ fontSize:15, color:"rgba(251,244,232,0.6)", marginTop:6, fontWeight:500 }}>
                Bring it to the SJ room on Friday or email the team and we'll add it here.
              </p>
            </div>
            <a href="mailto:knoxcocurricular@knox.nsw.edu.au" className="hm-btn"
               style={{ background:P.coral, color:"#fff", padding:"13px 22px", fontSize:15, flexShrink:0 }}>
              Send a photo <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
