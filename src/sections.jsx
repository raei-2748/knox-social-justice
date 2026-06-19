import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { P, Squiggle, Label } from "./theme.jsx";

// ---------------------------------------------------------------------------
// The three rich content sections (Causes, Impact map, About) live here so the
// home page and their dedicated standalone pages share a single source.
// Pass `standalone` when a section is the top item on its own page; it adds
// enough top padding to clear the fixed nav.
// ---------------------------------------------------------------------------

const CAUSES = [
  { id:"refugees", color:"#FF5B30", tint:"#FBE3D6", icon:"🌏", tag:"Refugees", live:true,
    title:"Every person deserves safety.",
    body:"STARTTS supports refugee survivors of torture and trauma, many of them children. Knox collects toys, food, and funds across the year.",
    cta:"Refugee Week · June 14–20" },
  { id:"dfv", color:"#B0447E", tint:"#F3E0EC", icon:"💜", tag:"Family Violence", live:false,
    title:"Silence enables violence.",
    body:"Through the Respectful Relationships program, Knox works with the Hornsby Ku-ring-gai Women's Shelter and starts the conversation in its own community first.",
    cta:"Walk the Talk · November" },
  { id:"home", color:"#2F6B47", tint:"#DEEBE1", icon:"🏠", tag:"Homelessness", live:false,
    title:"Home is not guaranteed.",
    body:"Wesley Mission and the Ku-ring-gai Neighbourhood Centre rely on Knox food drives to support people experiencing homelessness across Sydney.",
    cta:"Food Drive · End of term" },
  { id:"women", color:"#D8417A", tint:"#FBE0EA", icon:"✊", tag:"Gender Equality", live:false,
    title:"Half the world. All the rights.",
    body:"From the IWD Breakfast to joint events with Pymble, Knox advocates for gender equality through education, events, and lasting culture change.",
    cta:"International Women's Day · March" },
];

// Home base. Immersion journeys radiate out from Sydney to each destination.
const HOME = [-33.8688, 151.2093];

const PINS = [
  { id:"cambodia", label:"Cambodia", sub:"Overseas Immersion", pos:[11.5564, 104.9282],
    desc:"Knox students travel to Cambodia on immersion. The reflections of the boys who went will live here. Talk to the SJ team to add yours." },
  { id:"borneo", label:"Borneo", sub:"Overseas Immersion", pos:[0.9619, 114.5548],
    desc:"Knox runs an immersion in Borneo. This space is held for the stories and photos of the students who took part." },
  { id:"png", label:"Papua New Guinea", sub:"Kokoda Immersion", pos:[-8.8814, 147.7405],
    desc:"Knox boys walk the Kokoda Track. Their accounts of the journey will be collected here after each trip." },
  { id:"nsw", label:"Far Western NSW", sub:"Domestic Immersion", pos:[-31.9530, 141.4535],
    desc:"Knox connects with remote communities across far western New South Wales. Student reflections are being gathered now." },
  { id:"sydney", label:"Sydney", sub:"Local Partnerships", pos:HOME,
    desc:"Wesley Mission, STARTTS, the Ku-ring-gai Neighbourhood Centre, Legacy, and the Sony Foundation: the partners Knox works with year round." },
];

// Bounds that comfortably frame every pin (Borneo NW → Sydney/NSW SE).
const MAP_BOUNDS = [[7, 100], [-37, 154]];

// Stadia Maps "Alidade Smooth Dark" basemap. The key is supplied at build time
// via VITE_STADIA_API_KEY (.env, never committed). When the site is served from
// a domain registered in the Stadia dashboard the key is optional, so we only
// append it when present, keeping local dev working too.
// Stadia needs a registered domain or API key. When a key is supplied we use
// Stadia's dark theme; otherwise we fall back to CARTO's keyless dark basemap
// so the map works out of the box on GitHub Pages (no secret required).
const STADIA_KEY = import.meta.env.VITE_STADIA_API_KEY;
const TILE_URL = STADIA_KEY
  ? `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${STADIA_KEY}`
  : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION = STADIA_KEY
  ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> ' +
    '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  : '&copy; <a href="https://carto.com/">CARTO</a> ' +
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Custom map pin built with HTML so no marker image assets are needed.
function pinIcon(active) {
  const color = active ? P.sun : P.coral;
  const d = active ? 22 : 17;
  return L.divIcon({
    className: "sj-pin",
    html: `<span class="sj-pin-dot${active ? " on" : ""}" style="
      width:${d}px;height:${d}px;background:${color};
      border:3px solid #FBF4E8;border-radius:50%;display:block;
      box-shadow:0 2px 6px rgba(0,0,0,0.5);"></span>`,
    iconSize: [d, d],
    iconAnchor: [d / 2, d / 2],
  });
}

// Smoothly flies the map to the selected pin, and back out to the full view
// when the selection is cleared. Skips the very first render so the map opens
// already framed (no intro lurch).
function MapController({ activePin }) {
  const map = useMap();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (activePin) {
      const p = PINS.find(x => x.id === activePin);
      const zoom = Math.max(map.getZoom(), 4);
      if (reduce) map.setView(p.pos, zoom);
      else map.flyTo(p.pos, zoom, { duration: 0.9, easeLinearity: 0.25 });
    } else {
      if (reduce) map.fitBounds(MAP_BOUNDS);
      else map.flyToBounds(MAP_BOUNDS, { duration: 0.8 });
    }
  }, [activePin, map]);
  return null;
}

const INFO = [
  ["Where",   "AGC 112–113, Middle Academy"],
  ["When",    "Every Friday, lunchtime"],
  ["Who",     "All Knox students welcome"],
  ["Contact", "knoxcocurricular@knox.nsw.edu.au"],
];

export function CausesSection({ standalone = false }) {
  const [activeCause, setActiveCause] = useState(null);
  return (
    <section id="causes" className="section grid-bg" style={{ paddingTop: standalone ? 140 : 24 }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div style={{ marginBottom:46 }}>
          <Label>What we stand for</Label>
          <h2 className="display" style={{ fontSize:"clamp(44px,6vw,68px)", fontWeight:900, letterSpacing:"-2.5px", lineHeight:0.98 }}>
            Our causes
          </h2>
          <div style={{ marginTop:8 }}><Squiggle color={P.coral} width={200} /></div>
        </div>
        <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
          {CAUSES.map((c) => {
            const on = activeCause === c.id;
            return (
              <div key={c.id} className="hm-card" onClick={() => setActiveCause(on ? null : c.id)} style={{
                background:c.tint, padding:"30px 28px", cursor:"pointer",
                borderTop: `5px solid ${c.color}`,
                boxShadow: on ? `9px 9px 0 ${c.color}` : "6px 6px 0 #211710",
                transform: on ? "translate(-3px,-3px)" : "none",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <span className="hm-tag" style={{ background:P.paper2, color:P.ink, fontSize:10.5, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", padding:"4px 10px" }}>{c.tag}</span>
                    {c.live && (
                      <span className="hm-stamp" style={{ color:c.color, fontSize:9 }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:c.color, flexShrink:0 }} />LIVE
                      </span>
                    )}
                  </div>
                  <span className="sticker" style={{ width:54, height:54, flexShrink:0, background:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:26, borderRadius:14 }}>{c.icon}</span>
                </div>
                <h3 className="display" style={{ fontSize:25, fontWeight:800, letterSpacing:"-0.8px", marginBottom:11, lineHeight:1.1 }}>{c.title}</h3>
                <p style={{ fontSize:14.5, color:P.inkSoft, lineHeight:1.7, marginBottom:18, fontWeight:500 }}>{c.body}</p>
                <hr className="hm-rule" style={{ marginBottom:14 }} />
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, color:c.color, fontWeight:800 }}>{c.cta}</span>
                  <span style={{ color:c.color, fontSize:18, fontWeight:800 }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ImpactSection({ standalone = false }) {
  const [activePin, setActivePin] = useState(null);
  const pin = PINS.find(p => p.id === activePin);
  return (
    <section id="impact" className="section grid-bg" style={standalone ? { paddingTop:140 } : undefined}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, alignItems:"end", marginBottom:42 }}>
          <div>
            <Label color={P.coral}>Our reach</Label>
            <h2 className="display" style={{ fontSize:"clamp(44px,6vw,68px)", fontWeight:900, letterSpacing:"-2.5px", lineHeight:0.98 }}>
              Knox goes here.
            </h2>
            <div style={{ marginTop:8 }}><Squiggle color={P.forest} width={210} /></div>
          </div>
          <p style={{ color:P.inkSoft, fontSize:16, lineHeight:1.65, maxWidth:440, fontWeight:500 }}>
            From Kokoda to Cambodia, far western NSW to inner Sydney. Tap a pin to see where the boys go and the stories that will live there.
          </p>
        </div>

        <div className="hm-panel" style={{ background:P.panel, padding:20 }}>
          <MapContainer
            bounds={MAP_BOUNDS}
            minZoom={2}
            maxZoom={12}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            zoomControl={true}
            style={{ width:"100%", height:460, borderRadius:12, background:P.ocean }}
          >
            <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
            <MapController activePin={activePin} />

            {/* immersion journeys from Sydney to each destination */}
            {PINS.filter(p => p.id !== "sydney").map(p => {
              const lit = activePin === p.id;
              return (
                <Polyline
                  key={`route-${p.id}`}
                  positions={[HOME, p.pos]}
                  pathOptions={{ className:"mroute", color:P.sun, weight:lit ? 2.6 : 1.6, opacity:lit ? 0.85 : 0.45, dashArray:"2 7" }}
                />
              );
            })}

            {PINS.map(p => {
              const on = activePin === p.id;
              return (
                <Marker
                  key={p.id}
                  position={p.pos}
                  icon={pinIcon(on)}
                  eventHandlers={{ click: () => setActivePin(on ? null : p.id) }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={on}>
                    {p.label}
                  </Tooltip>
                </Marker>
              );
            })}
          </MapContainer>

          {pin && (
            <div key={pin.id} style={{ marginTop:18, background:"rgba(251,244,232,0.05)", border:"2.5px solid #FBF4E8", borderRadius:14, padding:"20px 22px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, animation:"fadeUp .45s cubic-bezier(.22,1,.36,1) both" }}>
              <div>
                <div style={{ fontSize:10.5, color:P.sun, fontWeight:800, textTransform:"uppercase", letterSpacing:"1.3px", marginBottom:6 }}>{pin.sub}</div>
                <div className="display" style={{ fontSize:22, fontWeight:900, color:P.paper2, marginBottom:8 }}>{pin.label}</div>
                <p style={{ fontSize:13.5, color:"rgba(251,244,232,0.6)", lineHeight:1.65, maxWidth:500, fontWeight:500 }}>{pin.desc}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); setActivePin(null); }} style={{ background:"none", border:"none", color:"rgba(251,244,232,0.45)", fontSize:18, flexShrink:0, padding:"4px 6px" }}>✕</button>
            </div>
          )}
          {!pin && (
            <div style={{ marginTop:18, textAlign:"center", fontSize:13.5, color:"rgba(251,244,232,0.4)", fontWeight:600 }}>
              The map is live. Student reflections from each trip will be added here over time.
            </div>
          )}
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:18 }}>
          {PINS.map(p => {
            const on = activePin === p.id;
            return (
              <button key={p.id} onClick={() => setActivePin(on ? null : p.id)} className="hm-tag" style={{
                background: on ? P.coral : P.paper2,
                color: on ? "#fff" : P.ink,
                padding:"8px 16px", fontSize:13, cursor:"pointer",
              }}>{p.label}</button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Six prefect leaders. Placeholders; fill in name, role, and bio as confirmed.
const LEADERS = [
  { name:"", role:"Social Justice Prefect", color:"#FF5B30" },
  { name:"", role:"Social Justice Prefect", color:"#B0447E" },
  { name:"", role:"Social Justice Prefect", color:"#2F6B47" },
  { name:"", role:"Social Justice Prefect", color:"#E89211" },
  { name:"", role:"Social Justice Prefect", color:"#3E78A6" },
  { name:"", role:"Social Justice Prefect", color:"#7B5EA7" },
];

const initials = name => name
  ? name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase()
  : "";

export function LeadersSection({ standalone = false }) {
  return (
    <section id="leaders" className="section grid-bg" style={standalone ? { paddingTop:140 } : undefined}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <Label color={P.plum}>Who runs it</Label>
        <h2 className="display" style={{ fontSize:"clamp(38px,5vw,56px)", fontWeight:900, letterSpacing:"-2px", lineHeight:1.0 }}>
          Our prefect leaders
        </h2>
        <div style={{ marginTop:8, marginBottom:14 }}><Squiggle color={P.plum} width={220} /></div>
        <p style={{ fontSize:16, color:P.inkSoft, lineHeight:1.65, fontWeight:500, maxWidth:520, marginBottom:40 }}>
          Six student prefects lead Knox Social Justice, running the events, partnerships, and Friday meetings.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:22 }}>
          {LEADERS.map((l, i) => (
            <div key={i} className="hm-card" style={{ background:P.paper2, padding:"28px 24px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
              <span className="sticker" style={{
                width:80, height:80, borderRadius:"50%", background:l.color, color:"#fff",
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Hanken Grotesk',sans-serif", fontSize:28, fontWeight:900, marginBottom:18,
                boxShadow:"4px 4px 0 #211710",
              }}>
                {initials(l.name) || (i + 1)}
              </span>
              <h3 className="display" style={{ fontSize:19, fontWeight:900, letterSpacing:"-0.4px", color: l.name ? P.ink : P.inkSoft, marginBottom:8 }}>
                {l.name || "Name to be confirmed"}
              </h3>
              <span className="hm-tag" style={{ background:P.paper, color:P.ink, fontSize:10.5, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.8px", padding:"4px 11px" }}>
                {l.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ standalone = false }) {
  return (
    <section id="about" className="section" style={{ background:P.paper2, borderTop:"3px solid #211710", ...(standalone ? { paddingTop:140 } : null) }}>
      <div className="g2" style={{ maxWidth:1080, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
        <div>
          <Label>About the program</Label>
          <h2 className="display" style={{ fontSize:"clamp(38px,5vw,56px)", fontWeight:900, letterSpacing:"-2px", lineHeight:1.0, marginBottom:8 }}>
            This is not a club.<br />It is a <span className="hm-highlight">commitment.</span>
          </h2>
          <div style={{ marginBottom:24 }}><Squiggle color={P.coral} width={240} /></div>
          <p style={{ fontSize:17, color:P.inkSoft, lineHeight:1.8, marginBottom:16, fontWeight:500 }}>
            Knox Social Justice is an integrated program built on awareness, advocacy, and action. It spans immersions to PNG, Cambodia, and Borneo, local partnerships with Wesley Mission, STARTTS, and Legacy, and events that run every single term.
          </p>
          <p style={{ fontSize:17, color:P.inkSoft, lineHeight:1.8, fontWeight:500 }}>
            The SJ Club meets every Friday at lunch in AGC 112–113. No experience needed, just the willingness to show up.
          </p>
        </div>
        <div className="hm-panel" style={{ background:P.ink, padding:40, boxShadow:"12px 12px 0 #FF5B30" }}>
          <h3 className="display" style={{ fontSize:28, fontWeight:900, color:P.paper2, marginBottom:26, letterSpacing:"-0.8px" }}>Join us this Friday.</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:30 }}>
            {INFO.map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                <span style={{ fontSize:10.5, color:P.sun, fontWeight:800, textTransform:"uppercase", letterSpacing:"1.1px", minWidth:58, paddingTop:3, flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:15, color:"rgba(251,244,232,0.7)", lineHeight:1.5, fontWeight:500 }}>{v}</span>
              </div>
            ))}
          </div>
          <a href="mailto:knoxcocurricular@knox.nsw.edu.au" className="hm-btn" style={{ background:P.coral, color:"#fff", padding:"14px 22px", fontSize:15, width:"100%", textAlign:"center" }}>
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  );
}
