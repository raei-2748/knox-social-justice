import PageChrome from "./PageChrome.jsx";
import { P, Squiggle } from "./theme.js";
import { getReport, AUD } from "./reportsData.js";

// Small heading used to break up the deep-dive analysis.
function AnalysisHeading({ children, color = P.coral, width = 180 }) {
  return (
    <div>
      <h2 className="display" style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:900, letterSpacing:"-1.4px", lineHeight:1 }}>{children}</h2>
      <div style={{ marginTop:8 }}><Squiggle color={color} width={width} /></div>
    </div>
  );
}

// Rich data deep-dive, rendered when a report carries an `analysis` block.
function Analysis({ r }) {
  const a = r.analysis;
  const maxTotal = Math.max(...a.growth.map(g => g.total));
  const maxCount = Math.max(...a.distribution.counts);

  return (
    <>
      {/* Three-year total */}
      <div className="hm-panel" style={{ background:P.panel, padding:"36px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:24, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:11.5, fontWeight:800, textTransform:"uppercase", letterSpacing:"1.2px", color:P.sun }}>{a.threeYearLabel}</div>
          <div className="display" style={{ fontSize:"clamp(48px,8vw,80px)", fontWeight:900, letterSpacing:"-3px", lineHeight:0.95, color:P.paper2 }}>{AUD(a.threeYearTotal)}</div>
        </div>
        <p style={{ fontSize:15.5, color:"rgba(251,244,232,0.7)", lineHeight:1.65, fontWeight:500, maxWidth:380 }}>{a.intro}</p>
      </div>

      {/* Growth story */}
      <div>
        <AnalysisHeading color={r.color} width={200}>The growth story</AnalysisHeading>
        <div className="g2" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20, marginTop:28 }}>
          {a.growth.map(g => (
            <div key={g.year} className="hm-card" style={{ background:P.paper2, padding:"26px 24px", borderTop:`6px solid ${r.color}` }}>
              <span className="hm-tag" style={{ display:"inline-block", background:r.color, color:"#fff", fontSize:12, fontWeight:900, padding:"3px 12px", marginBottom:12 }}>{g.year}</span>
              <div className="display" style={{ fontSize:34, fontWeight:900, letterSpacing:"-1.5px", lineHeight:1, marginBottom:10 }}>{AUD(g.total)}</div>
              <div style={{ height:10, background:"rgba(33,23,16,0.1)", border:"2px solid #211710", borderRadius:8, overflow:"hidden", marginBottom:16 }}>
                <div style={{ width:`${Math.round((g.total / maxTotal) * 100)}%`, height:"100%", background:r.color }} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                {[["Participants", g.participants],["Top-10 share", g.top10],["Median gift", g.median],["Average gift", g.avg]].map(([k,v]) => (
                  <div key={k} style={{ background:P.paper, border:"2px solid #211710", borderRadius:10, padding:"8px 10px" }}>
                    <div style={{ fontSize:9.5, color:P.inkSoft, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>{k}</div>
                    <div className="display" style={{ fontSize:18, fontWeight:900, color:P.ink, letterSpacing:"-0.5px" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="display" style={{ fontSize:15, fontWeight:900, letterSpacing:"-0.3px", marginBottom:5 }}>{g.heading}</div>
              <p style={{ fontSize:13, color:P.inkSoft, lineHeight:1.6, fontWeight:500 }}>{g.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Donation distribution (2026) */}
      <div className="hm-card" style={{ background:P.paper2, padding:"28px 30px" }}>
        <div className="display" style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.5px", marginBottom:4 }}>How 2026 gifts were spread</div>
        <p style={{ fontSize:13.5, color:P.inkSoft, marginBottom:20, fontWeight:500 }}>Number of donors in each gift band. The bulk now sits in the broad middle.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {a.distribution.tiers.map((tier, i) => (
            <div key={tier} style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ width:78, flexShrink:0, fontSize:12, fontWeight:700, color:P.ink, textAlign:"right" }}>{tier}</span>
              <div style={{ flex:1, height:18, background:"rgba(33,23,16,0.07)", border:"2px solid #211710", borderRadius:6, overflow:"hidden" }}>
                <div style={{ width:`${Math.round((a.distribution.counts[i] / maxCount) * 100)}%`, height:"100%", background:r.color }} />
              </div>
              <span className="display" style={{ width:28, flexShrink:0, fontSize:14, fontWeight:900, color:P.ink }}>{a.distribution.counts[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Efficiency */}
      <div className="hm-card" style={{ background:P.paper2, padding:"30px 32px" }}>
        <div className="display" style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:900, letterSpacing:"-1px", marginBottom:6 }}>
          <span className="hm-highlight">{a.efficiency.mission}c of every dollar</span> reaches the mission.
        </div>
        <div style={{ display:"flex", height:34, border:"2.5px solid #211710", borderRadius:10, overflow:"hidden", margin:"18px 0 12px" }}>
          <div style={{ width:`${a.efficiency.mission}%`, background:P.forest, color:"#fff", display:"flex", alignItems:"center", paddingLeft:12, fontSize:12, fontWeight:800 }}>Mission {a.efficiency.mission}%</div>
          <div style={{ width:`${a.efficiency.cost}%`, background:P.paper, color:P.ink, display:"flex", alignItems:"center", paddingLeft:10, fontSize:12, fontWeight:800, borderLeft:"2.5px solid #211710" }}>Cost {a.efficiency.cost}%</div>
        </div>
        <p style={{ fontSize:14, color:P.inkSoft, lineHeight:1.7, fontWeight:500 }}>{a.efficiency.note}</p>
      </div>

      {/* Mission spend breakdown */}
      <div className="hm-card" style={{ background:P.paper2, padding:"28px 30px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:8, marginBottom:20 }}>
          <div className="display" style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.5px" }}>Where the Foundation spends it</div>
          <div style={{ fontSize:12.5, color:P.inkSoft, fontWeight:600 }}>{a.missionSpend.total} total · {a.missionSpend.note}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {a.missionSpend.items.map((m, i) => {
            const shades = [P.forest, P.sky, P.plum];
            return (
              <div key={m.label}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6, gap:10 }}>
                  <span style={{ fontSize:14, fontWeight:800, color:P.ink }}>{m.label}</span>
                  <span className="display" style={{ fontSize:17, fontWeight:900, color:P.ink, flexShrink:0 }}>{m.value} <span style={{ fontSize:12, color:P.inkSoft }}>· {m.pct}%</span></span>
                </div>
                <div style={{ height:14, background:"rgba(33,23,16,0.07)", border:"2px solid #211710", borderRadius:6, overflow:"hidden" }}>
                  <div style={{ width:`${m.pct}%`, height:"100%", background:shades[i % shades.length] }} />
                </div>
                <div style={{ fontSize:12.5, color:P.inkSoft, marginTop:5, fontWeight:500 }}>{m.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact: what the money makes possible */}
      <div>
        <AnalysisHeading color={P.coral} width={220}>What the money makes possible</AnalysisHeading>
        <div className="g2" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20, marginTop:28 }}>
          {a.impact.map((im, i) => {
            const shades = [P.coral, P.amber, P.forest];
            return (
              <div key={im.label} className="hm-card" style={{ background:P.paper2, padding:"26px 24px" }}>
                <div className="display" style={{ fontSize:52, fontWeight:900, letterSpacing:"-2.5px", lineHeight:1, color:shades[i % shades.length] }}>{im.value}</div>
                <div className="display" style={{ fontSize:17, fontWeight:900, letterSpacing:"-0.4px", margin:"6px 0 10px" }}>{im.label}</div>
                <p style={{ fontSize:13.5, color:P.inkSoft, lineHeight:1.6, fontWeight:500 }}>{im.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Context: disproportionate impact */}
      <div>
        <AnalysisHeading color={r.color} width={240}>One school. Outsized impact.</AnalysisHeading>
        <div className="g2" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:20, marginTop:28 }}>
          {a.context.map(c => (
            <div key={c.value} className="hm-card" style={{ background:P.paper2, padding:"24px 24px" }}>
              <div className="display" style={{ fontSize:"clamp(30px,4vw,40px)", fontWeight:900, letterSpacing:"-1.5px", lineHeight:1, color:r.color, marginBottom:10 }}>{c.value}</div>
              <p style={{ fontSize:14, color:P.ink, lineHeight:1.55, fontWeight:600 }}>{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Standalone detail page for a single fundraiser, routed as #/fundraisers/<id>.
export default function ReportDetail({ id }) {
  const r = getReport(id);

  if (!r) {
    return (
      <PageChrome current="#/fundraisers">
        <section style={{ padding:"150px 48px 96px" }}>
          <div className="hm-card" style={{ maxWidth:680, margin:"0 auto", background:P.paper2, padding:"40px", textAlign:"center" }}>
            <h1 className="display" style={{ fontSize:34, fontWeight:900, letterSpacing:"-1px", marginBottom:12 }}>Report not found</h1>
            <p style={{ fontSize:16, color:P.inkSoft, marginBottom:24, fontWeight:500 }}>We couldn't find that fundraiser.</p>
            <a href="#/fundraisers" className="hm-btn" style={{ background:P.coral, color:"#fff", padding:"13px 24px", fontSize:15 }}>← Back to all reports</a>
          </div>
        </section>
      </PageChrome>
    );
  }

  const pct = r.goal > 0 ? Math.min(100, Math.round((r.raised / r.goal) * 100)) : null;

  return (
    <PageChrome current="#/fundraisers">
      <section className="grid-bg" style={{ padding:"130px 48px 40px" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <a href="#/fundraisers" className="hm-tag" style={{ display:"inline-block", background:P.paper2, color:P.ink, fontSize:13, fontWeight:800, padding:"7px 15px", marginBottom:26 }}>
            ← All reports
          </a>
          <span className="hm-tag" style={{ display:"inline-block", background:r.color, color:"#fff", fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", padding:"5px 12px", marginBottom:16, marginLeft:10 }}>
            {r.term} · {r.date}
          </span>
          <h1 className="display" style={{ fontSize:"clamp(40px,6.5vw,76px)", fontWeight:900, letterSpacing:"-3px", lineHeight:0.95, color:P.ink }}>
            {r.title}
          </h1>
          <div style={{ marginTop:12 }}><Squiggle color={r.color} width={260} /></div>
        </div>
      </section>

      <section style={{ padding:"0 48px 96px" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr", gap:24 }}>

          {/* Top row: story + raised panel */}
          <div className="g2" style={{ display:"grid", gridTemplateColumns:"1.4fr 0.8fr", gap:24, alignItems:"start" }}>
            <div className="hm-card" style={{ background:P.paper2, padding:"32px" }}>
              <p style={{ fontSize:17, color:P.ink, lineHeight:1.7, fontWeight:600, marginBottom:18 }}>{r.summary}</p>
              <p style={{ fontSize:15.5, color:P.inkSoft, lineHeight:1.8, fontWeight:500 }}>{r.details}</p>
            </div>

            <div style={{
              background:r.raised > 0 ? r.color : P.panel,
              border:"3px solid #211710", borderRadius:18, padding:"30px 28px",
              color:"#fff", boxShadow:"8px 8px 0 #211710",
            }}>
              {r.raised > 0 ? (
                <>
                  <div style={{ fontSize:11.5, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", opacity:0.9 }}>Total raised</div>
                  <div className="display" style={{ fontSize:52, fontWeight:900, letterSpacing:"-2.5px", lineHeight:1, margin:"8px 0 16px" }}>{AUD(r.raised)}</div>
                  {pct !== null && (
                    <>
                      <div style={{ height:12, background:"rgba(255,255,255,0.35)", borderRadius:10, overflow:"hidden", border:"2px solid #211710" }}>
                        <div style={{ width:`${pct}%`, height:"100%", background:"#fff" }} />
                      </div>
                      <div style={{ fontSize:13, marginTop:10, fontWeight:700, opacity:0.95 }}>{pct}% of {AUD(r.goal)} goal</div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div style={{ fontSize:11.5, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", color:P.sun }}>Awareness</div>
                  <div className="display" style={{ fontSize:26, fontWeight:900, lineHeight:1.2, marginTop:10 }}>Non-fundraising event</div>
                </>
              )}
            </div>
          </div>

          {/* Facts */}
          <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            {[["Beneficiary", r.beneficiary], ["Who took part", r.participants]].map(([k, v]) => (
              <div key={k} className="hm-card" style={{ background:P.paper2, padding:"24px 26px" }}>
                <div style={{ fontSize:10.5, color:P.inkSoft, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", marginBottom:6 }}>{k}</div>
                <div className="display" style={{ fontSize:20, color:P.ink, fontWeight:800, letterSpacing:"-0.4px", lineHeight:1.2 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          {r.highlights && r.highlights.length > 0 && (
            <div className="hm-card" style={{ background:P.paper2, padding:"30px 32px" }}>
              <h2 className="display" style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.8px", marginBottom:18 }}>Highlights</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {r.highlights.map((h, i) => (
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                    <span className="sticker" style={{ width:30, height:30, flexShrink:0, background:r.color, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, borderRadius:9 }}>{i + 1}</span>
                    <span style={{ fontSize:15.5, color:P.ink, lineHeight:1.5, fontWeight:500, paddingTop:4 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rich data deep-dive (only on reports that carry an analysis block) */}
          {r.analysis && <Analysis r={r} />}

          {/* CTA */}
          <div className="hm-panel" style={{ background:P.ink, padding:"32px 36px", boxShadow:`10px 10px 0 ${r.color}`, display:"flex", justifyContent:"space-between", alignItems:"center", gap:20, flexWrap:"wrap" }}>
            <div>
              <h3 className="display" style={{ fontSize:24, fontWeight:900, color:P.paper2, letterSpacing:"-0.6px", marginBottom:6 }}>Want to get involved?</h3>
              <p style={{ fontSize:15, color:"rgba(251,244,232,0.65)", fontWeight:500 }}>Questions about this total, or keen to help next time? Reach the SJ team.</p>
            </div>
            <a href="mailto:knoxcocurricular@knox.nsw.edu.au" className="hm-btn" style={{ background:P.coral, color:"#fff", padding:"14px 24px", fontSize:15, flexShrink:0 }}>
              Get in touch →
            </a>
          </div>

        </div>
      </section>
    </PageChrome>
  );
}
