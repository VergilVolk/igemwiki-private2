const wordStats = [
  ["0", "22,378"],
  ["1", "46,566"],
  ["≤ 2", "136,245"],
  ["≤ 5", "383,056"],
  ["≤ 10", "716,720"],
  ["> 50", "5,488,757"],
];

const metricRows = [
  ["Recognition length", "9 bp · 3 fingers", "12 bp · 4 fingers"],
  ["Sites in the human genome", "3,462", "31"],
  ["1-mismatch neighborhood", "267,070", "3,150"],
  ["CpG", "present", "none"],
  ["Sites in E. coli K-12", "91", "0–2"],
];

export function SequenceDesign() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Dry lab · sequence design</p>
        <h2>A recognition sequence the human genome does not contain.</h2>
        <p>The zinc finger that ties our delivery system to its plasmid cargo turned out to bind genomic DNA as well: in E. coli experiments it pulled down large amounts of the host genome. Counting explained why. Its 9-bp target occurs 91 times in the E. coli K-12 genome — and 3,462 times in the human genome, counting both strands. For a module meant to operate inside living cells, a target that common is a safety problem, so we redesigned the recognition sequence from first principles.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Why a longer word</p>
        <h2>Nine bases can never be rare.</h2>
        <p>A 9-bp target spans a word space of only 4⁹ ≈ 2.6 × 10⁵ sequences, while even the 4.6 Mb E. coli genome offers ~4.6 million windows. The rarest 9-mer in the human genome still occurs 125 times (1-mismatch neighborhood: 21,009). Extending recognition to 12 bp with a four-finger array opens a word space of 4¹² ≈ 1.67 × 10⁷, and a genome shaped by repeats and CpG suppression must leave gaps in such a vocabulary. That is where we went looking.</p>
      </section>
      <section className="content-section row g-4">
        <div className="col-md-3"><article className="info-card"><span>01</span><h3>Genome safety</h3><p>Near-absent from the human genome, so off-target binding in live cells stays negligible.</p></article></div>
        <div className="col-md-3"><article className="info-card"><span>02</span><h3>Live-cell chemistry</h3><p>CpG-free, because methylated CpG interferes with recognition in mammalian cells.</p></article></div>
        <div className="col-md-3"><article className="info-card"><span>03</span><h3>Plug-and-play</h3><p>Insertable into common plasmid backbones without colliding with anything already there.</p></article></div>
        <div className="col-md-3"><article className="info-card"><span>04</span><h3>Buildable</h3><p>Every triplet of the tag must be readable by a known C2H2 zinc-finger module.</p></article></div>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Step 1 · Census</p>
        <h2>Counting all 3.1 billion words.</h2>
        <p>We scanned every 12-bp window of the GRCh38 primary chromosomes (chr1–22, X, Y, M), encoding each window as a base-4 integer and tallying ~3.1 billion windows into a 16.7M-slot counter array of 67 MB. Reverse complements were counted in the same integer space, merging both strands. An independent raw-string search, running on a separate code path, re-verified every top candidate.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">The vocabulary of our genome</p>
        <div className="table-wrap"><table><thead><tr><th>Occurrences</th><th>Distinct 12-mers</th></tr></thead><tbody>{wordStats.map(([occurrences, count]) => <tr key={occurrences}><td>{occurrences}</td><td>{count}</td></tr>)}</tbody></table></div>
        <p>Of 8.39M distinct 12-mers observed, 22,378 (0.27%) never occur in the human genome. The distribution is extremely skewed: roughly half of the genome is repeats, which concentrates billions of windows into a small shared vocabulary, and CpG suppression thins out CG-rich words.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Step 2 · The catch</p>
        <h2>Absent means CpG — so we optimized the trade-off.</h2>
        <p>Every single one of the 22,378 absent 12-mers contains CpG: zero-occurrence and CpG-free are strictly mutually exclusive, a direct imprint of CpG suppression on the genome's vocabulary. Since live-cell use requires CpG-free, we optimized within that pool instead. The best candidate, GGTCCACTACTA, occurs 31 times in the human genome with a 1-mismatch neighborhood of 3,150 — more than 100× rarer than the original target on both counts.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">Result at a glance</p>
        <div className="table-wrap"><table><thead><tr><th>Metric</th><th>Original target</th><th>Designed tag</th></tr></thead><tbody>{metricRows.map(([metric, before, after]) => <tr key={metric}><td>{metric}</td><td>{before}</td><td>{after}</td></tr>)}</tbody></table></div>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Step 3 · Buildability</p>
        <h2>Every triplet has a finger.</h2>
        <p>We scored all candidates against the public Princeton B1H zinc-finger module library (Persikov et al., Nucleic Acids Research 2015), which covers all 64 DNA triplets with 1,499 finger modules at 97–100 best-affinity per triplet. Every CpG-free candidate can be spelled out by a four-finger array; ranking candidates by array quality selected GGTCCACTACTA, read by the helix set <code>TAG:RKWTLDL · TAG:RKWTLDL · TGG:RREHLTL · ACC:HLTTLRR</code>.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Step 4 · Compatibility</p>
        <h2>Fifteen backbones, zero hits.</h2>
        <p>All 250 tag–linker variants (top 50 tags in five formats) contain zero occurrences in 15 common plasmid backbones, including the complete second- and third-generation lentiviral packaging set (psPAX2, pMDLg/pRRE, pRSV-Rev, VSV-G) alongside pUC19, the pET family, and pcDNA3.1(+). A parallel check against the E. coli K-12 MG1655 genome confirmed the host adds no constraint: top candidates hit 0–2 sites, while the original target's 91 sites match the pull-down we observed in the bench.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Step 5 · Deliverables</p>
        <h2>Something the bench can order and clone.</h2>
        <p>We screened 12 plasmids against five siting rules — unique single-cutter, common enzymes, outside ORFs and transcription starts, clear of promoters, never inside the MCS — yielding 24 safe insertion sites across 11 restriction enzymes. For each site we designed the oligo overhangs per enzyme geometry (5′ overhang, 3′ overhang, blunt, type IIS) and verified every design with an independent ligation simulation: cut, anneal, ligate, then confirm the tag appears exactly once. All 1,080 designs pass. To strengthen ZF–plasmid binding we also designed multi-copy cassettes (×2–4) with a non-palindromic TTCA spacer between repeats, blocking copy slippage by homologous recombination while inserting in a single ligation round.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Status</p>
        <p>Wet-lab validation is in progress: an EMSA footprint check (12-bp full target vs 9-bp core vs scrambled control), array validation for positional effects, and binding-condition tuning for the highly basic array. Figures will be embedded here once uploaded through the iGEM asset system. The screening pipeline is fully scripted and will be published with its candidate tables.</p>
      </section>
    </>
  );
}
