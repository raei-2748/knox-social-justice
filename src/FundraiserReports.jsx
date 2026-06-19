import { useState } from "react";
import PageChrome, { PageHero } from "./PageChrome.jsx";
import { P } from "./theme.js";
import { REPORTS, AUD } from "./reportsData.js";

function StatCard({ value, label }) {
  return (
    <div className="hm-panel" style={{ background:P.panel, padding:"28px 26px", boxShadow:"6px 6px 0 #211710" }}>
      <div className="display" style={{ fontSize:42, fontWeight:900, color:P.sun, letterSpacing:"-1.5px", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12.5, color:"rgba(251,244,232,0.6)", marginTop:10, letterSpacing:"0.4px", fontWeight:500 }}>{label}</div>
    </div>
  );
}

function ReportCard({ r }) {
  const pct = r.goal > 0 ? Math.min(100, Math.round((r.raised / r.goal) * 100)) : null;
  return (
    <a href={`#/fundraisers/${r.id}`} className="hm-card" style={{ display:"block", background:P.paper2, padding:"28px", color:P.ink }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 240px" }}>
          <span className="hm-tag" style={{ display:"inline-block", background:r.color, color:"#fff", fontSize:10.5, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", padding:"4px 10px", marginBottom:12 }}>{r.term} · {r.date}</span>
          <h3 className="display" style={{ fontSize:26, fontWeight:800, letterSpacing:"-1px", lineHeight:1.1, color:P.ink, marginBottom:10 }}>{r.title}</h3>
          <p style={{ fontSize:14.5, color:P.inkSoft, lineHeight:1.7, marginBottom:16, fontWeight:500 }}>{r.summary}</p>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap", marginBottom:16 }}>
            {[["Beneficiary", r.beneficiary], ["Took part", r.participants]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize:10.5, color:P.inkSoft, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", marginBottom:3 }}>{k}</div>
                <div style={{ fontSize:13.5, color:P.ink, fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>
          <span style={{ fontSize:13, color:r.color, fontWeight:800 }}>Read the full report →</span>
        </div>

        {/* Raised panel */}
        <div style={{ flex:"0 0 200px", background:r.raised > 0 ? r.color : P.paper, border:"2.5px solid #211710", borderRadius:14, padding:"20px 22px", color: r.raised > 0 ? "#fff" : P.ink, boxShadow:"4px 4px 0 #211710" }}>
          {r.raised > 0 ? (
            <>
              <div style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", opacity:0.9 }}>Raised</div>
              <div className="display" style={{ fontSize:36, fontWeight:900, letterSpacing:"-1.5px", lineHeight:1, margin:"6px 0 12px" }}>{AUD(r.raised)}</div>
              {pct !== null && (
                <>
                  <div style={{ height:10, background:"rgba(255,255,255,0.35)", borderRadius:10, overflow:"hidden", border:"1.5px solid #211710" }}>
                    <div style={{ width:`${pct}%`, height:"100%", background:"#fff" }} />
                  </div>
                  <div style={{ fontSize:12, marginTop:8, fontWeight:700, opacity:0.95 }}>{pct}% of {AUD(r.goal)} goal</div>
                </>
              )}
            </>
          ) : (
            <>
              <div style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"1px" }}>Awareness</div>
              <div className="display" style={{ fontSize:22, fontWeight:800, lineHeight:1.2, marginTop:8 }}>Non-fundraising event</div>
            </>
          )}
        </div>
      </div>
    </a>
  );
}

export default function FundraiserReports() {
  const [term, setTerm] = useState("all");
  const terms = ["all", ...Array.from(new Set(REPORTS.map(r => r.term)))];
  const visible = REPORTS.filter(r => term === "all" || r.term === term);

  const totalRaised = REPORTS.reduce((s, r) => s + r.raised, 0);
  const fundraisers = REPORTS.filter(r => r.raised > 0).length;
  const beneficiaries = new Set(REPORTS.filter(r => r.raised > 0).map(r => r.beneficiary)).size;

  return (
    <PageChrome current="#/fundraisers">
      <PageHero
        eyebrow="The receipts"
        title="Fundraiser"
        accent="reports."
        lead="Where the money went and the difference it made. A running record of every Knox Social Justice fundraiser this year: transparent, partner by partner."
        accentColor={P.forest}
      />

      <section style={{ padding:"0 48px 96px" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>

          {/* Summary stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:44 }}>
            <StatCard value={AUD(totalRaised)} label="Raised across the year so far" />
            <StatCard value={fundraisers} label="Fundraising events completed" />
            <StatCard value={beneficiaries} label="Partner organisations supported" />
          </div>

          {/* Term filter */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
            {terms.map(t => {
              const on = term === t;
              return (
                <button key={t} onClick={() => setTerm(t)} className="hm-tag" style={{
                  background: on ? P.ink : P.paper2,
                  color: on ? P.paper2 : P.ink,
                  padding:"9px 18px", fontSize:13.5, fontWeight:800, cursor:"pointer",
                }}>{t === "all" ? "All terms" : t}</button>
              );
            })}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            {visible.map(r => <ReportCard key={r.id} r={r} />)}
          </div>

          <div className="hm-card" style={{ marginTop:40, padding:"24px 26px", background:P.paper2, fontSize:13.5, color:P.inkSoft, lineHeight:1.6, fontWeight:500 }}>
            Figures are confirmed at the close of each event and may be updated as final banking is reconciled. Questions about a total? Email{" "}
            <a href="mailto:knoxcocurricular@knox.nsw.edu.au" style={{ color:P.forest, fontWeight:600, fontStyle:"normal" }}>knoxcocurricular@knox.nsw.edu.au</a>.
          </div>

        </div>
      </section>
    </PageChrome>
  );
}
