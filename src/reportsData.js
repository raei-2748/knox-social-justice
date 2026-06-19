// Shared fundraiser data, used by the Reports list page and each report's
// standalone detail page. Only fundraisers with verified figures are listed.
export const REPORTS = [
  { id:"wgsa", date:"20 Mar 2026", term:"Term 1", title:"World's Greatest Shave", color:"#7B5EA7",
    beneficiary:"Leukaemia Foundation", raised:149348, goal:0, participants:"164 students & staff",
    summary:"Knox's biggest fundraiser of the year, and the result of eight years of compounding generosity. In 2026 the community raised $149,348 for the Leukaemia Foundation, up from $10,000 in 2018.",
    details:"What started in 2018 as a $10,000 effort has become a whole-school institution. In 2026, 164 students and staff shaved or coloured their hair and rallied donors behind them, raising $149,348, the highest total yet. Every dollar goes to the Leukaemia Foundation, funding research and free practical support (accommodation, counselling, transport, and financial assistance) for the 135,000 Australians living with blood cancer. The story below tracks three years of growth and follows exactly where the money goes.",
    highlights:[
      "$149,348 raised in 2026, the highest total in the campaign's history",
      "164 participants, with the top-10 share down to 28%: giving is now broad-based",
      "62.8 cents of every dollar reaches the Foundation's mission directly",
    ],
    analysis: {
      threeYearTotal: 374938,
      threeYearLabel: "Raised across 2024–2026",
      intro: "Knox is not a corporate sponsor; it is a school community whose culture of giving has compounded over eight years. These are the numbers behind that.",
      growth: [
        { year:"2024", total:101678, participants:131, median:"$280", avg:"$593", top10:"38%",
          heading:"The campaign begins to scale.",
          body:"131 participants come together for the first time at this level. The top 10 fundraisers carry 38% of the total, a campaign still driven by a concentrated core." },
        { year:"2025", total:123912, participants:146, median:"$314", avg:"$630", top10:"33%",
          heading:"The base starts to widen.",
          body:"15 more participants join. The top-10 share drops from 38% to 33%, and the median lifts from $280 to $314. This isn't just growth; the base is strengthening." },
        { year:"2026", total:149348, participants:164, median:"$529", avg:"$820", top10:"28%",
          heading:"A community, fully formed.",
          body:"The top-10 share falls to 28%. The median nearly doubles to $529. 33 more participants than 2024. The growth is now broad-based: what a compounding community looks like." },
      ],
      efficiency: { mission:62.8, cost:37.2,
        note:"In FY2024–25 the Leukaemia Foundation raised $29.2M and spent $10.86M on fundraising and operations. That leaves 62.8 cents of every dollar going directly to patient support, research, and advocacy, up sharply from 53.5 cents the year before." },
      impact: [
        { value:"413", label:"Service instances funded",
          desc:"At ~$339 each: counselling, financial support, accommodation, and practical care for people living with blood cancer." },
        { value:"389", label:"Nights of accommodation",
          desc:"At ~$360 a night: families relocating for treatment, so a carer doesn't have to drive 300km home each evening." },
        { value:"215", label:"Financial assistance awards",
          desc:"At ~$650 each: pharmaceuticals not covered by the PBS, specialised equipment, and travel to appointments." },
      ],
      missionSpend: {
        total:"$21.6M", note:"Leukaemia Foundation total mission expenditure, FY25 (audited).",
        items:[
          { label:"Patient support, accommodation & counselling", value:"$13.5M", pct:62.4, sub:"39,800 service instances delivered to 6,881 people" },
          { label:"Research grants & advocacy", value:"$4.36M", pct:20.2, sub:"Funding breakthroughs for 135,000 Australians with blood cancer" },
          { label:"UWA Endowed Chair in Blood Cancer Research", value:"$3M", pct:13.9, sub:"A permanent research position, matched by UWA" },
        ],
      },
      context: [
        { value:"1.2%", label:"of national WGS net revenue comes from Knox, one school, one community." },
        { value:"16", label:"Australians die from blood cancer every day. This work runs against that number." },
        { value:"$10k → $149k", label:"Knox raised $10k in 2018; eight years later, $149,348. Culture, once embedded, compounds." },
        { value:"135k → 275k", label:"Australians living with blood cancer today, reaching 275,000 by 2035." },
      ],
      distribution: {
        tiers:["under $100","$100–250","$250–500","$500–1k","$1k–2k","$2k–5k","$5k+"],
        counts:[27,24,26,43,29,12,3],
      },
    } },
];

export const AUD = n => "$" + n.toLocaleString("en-AU");

export const getReport = id => REPORTS.find(r => r.id === id);
