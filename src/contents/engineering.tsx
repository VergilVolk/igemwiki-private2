// Page: Project > Engineering
// Content transcribed from the team's wet-lab DBTL record (src/1002/wet 循环.docx,
// 2026-09-30 revision): cycle 1 = prokaryotic expression & purification of the
// light-gated fusion protein. Numbers are copied verbatim from the lab record.
// Figures are rendered through UploadFigure: per iGEM policy every image is
// uploaded through the official uploads tool and referenced by its returned
// static.igem.wiki URL (filled in src/uploads.ts) — images are never bundled
// from src/. Entries without a URL yet show an upload placeholder.

import { Link } from "react-router-dom";
import { UPLOADS } from "../uploads";
import { UploadFigure } from "../components/UploadFigure";

type Row = string[];

const DataTable = ({ head, rows }: { head: string[]; rows: Row[] }) => (
  <div className="table-wrap">
    <table>
      <thead>
        <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, i) => <td key={head[i]}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FigureSlot = ({ id, source, caption }: { id: string; source: string; caption: string }) => (
  <figure className="figure-slot">
    <p className="figure-tag">[ Figure {id} — image placeholder ]</p>
    <p>{caption}</p>
    <p className="figure-source">Source file: <code>{source}</code></p>
  </figure>
);

// Five restriction-editing designs specified in Design 1 for later controls.
const editDesigns: Row[] = [
  ["A", "SalI", "single digest, vector self-ligation", "NLS removed", "No nuclear-localization control"],
  ["B", "KpnI", "single digest, vector self-ligation", "ZF removed", "No cargo-binding control"],
  ["C", "SalI + AvrII", "double digest, insert re-ligation", "NLS replaced", "Swap in alternative NLS variants"],
  ["D", "SalI + AvrII", "double digest, insert re-ligation", "ZF replaced", "Swap in alternative ZF arrays"],
  ["E", "SalI + KpnI", "double digest, insert re-ligation", "NLS + ZF replaced", "Combined replacement"],
];

// First induction protocol (Test 1).
const inductionRows: Row[] = [
  ["Starter culture", "overnight", "small-scale seed culture"],
  ["Scale-up", "37 °C, 200 rpm, 4 h", "growth before induction"],
  ["Induction", "1 mM IPTG, 16 °C, 120 rpm, 16 h", "light-protected throughout"],
  ["Hosts tested", "BL21 and DH5α", "both hosts carried the design construct"],
];

// Design 2: cofactor supplementation and gentler induction.
const rescueRows: Row[] = [
  ["FAD or riboflavin (Vb2)", "250 µM", "CRY2 needs bound FAD for its correct conformation; E. coli FAD is often limiting"],
  ["ZnCl₂", "1 mM", "zinc-finger folding and DNA binding"],
  ["IPTG", "1 mM → 0.5 mM", "weaker induction, slower translation"],
  ["Induction temperature", "16 °C → 14 °C", "folding-friendly conditions"],
  ["Induction time", "16 h → 20 h", "compensate the slower expression"],
];

// Design 3: protease sites of the MBP fusion.
const proteaseRows: Row[] = [
  ["Factor Xa site", "MBP only", "restores the phase-separation capacity of the full fusion"],
  ["Thrombin site", "MBP + His tag", "tag-free full-length protein"],
  ["TEV site", "all components outside the light-controlled phase-separation core", "minimal core for phase-separation assays"],
];

// One-line summary of the three iterations.
const cycleRows: Row[] = [
  ["1", "pET-15b 6×His fusion, codon-optimized CDS, long flexible linkers", "initial construct assembled to the D1.1 design", "protein expressed, but mCherry fluorescence sits in the pellet — inclusion bodies", "CRY2 requires FAD; ZF requires Zn²⁺"],
  ["2", "cofactor supplementation + gentler induction", "re-run expression with the amended protocol", "fluorescence still in the pellet", "fuse a soluble tag (MBP) to stabilize the protein"],
  ["3", "pMAL-c5x MBP fusion with three protease exits", "construct outsourced; Ni-column purification, then size exclusion", "an optimal condition set found; cleavage fragments at the linkers removed by SEC", "relocate the His tag to the C terminus"],
];

export function Engineering() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Engineering · design cycle</p>
        <h2>Build it, break it, learn from it.</h2>
        <p>NucleArk's wet lab runs on the engineering design cycle — Design, Build, Test, Learn. This page documents the first completed cycle: expressing and purifying the light-gated phase-separating fusion protein in E. coli, from an initial inclusion-body failure to a single-fraction preparation and a validated cargo-binding control. Further cycles — including the eukaryotic construct, nuclear-entry characterization, and the delivery-route work — will be added here as the team consolidates its records.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">Cycle 1 at a glance</p>
        <DataTable head={["Iter.", "Design", "Build", "Test", "Learn"]} rows={cycleRows} />
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Iteration 1 · Design</p>
        <h2>The initial construct.</h2>
        <p>The CDS of pcDNA3.1_mCherry-CRY2-ePDZ-L(-2)-LOVpep was codon-optimized for bacterial expression. The N terminus carries a triplicated nuclear localization signal (3×NLS) and the zinc-finger cargo-binding element (ZF). The gene was cloned into pET-15b so that the N terminus also carries a 6×His tag for nickel-column purification. Long flexible linkers were placed between the elements so that each keeps folding independently.</p>
        <UploadFigure id="32" url={UPLOADS.wetConstructPrediction} label="Figure 32 · Structure prediction" caption="Structure prediction of the fusion protein: element layout along the chain, with long flexible linkers between elements to preserve independent folding." />
        <h3 className="subsection">Five restriction-editing designs</h3>
        <p>To allow later edits of the key innovative elements without rebuilding from scratch, five enzyme-cut designs were specified up front:</p>
        <DataTable head={["Design", "Enzyme(s)", "Strategy", "Edit result", "Use"]} rows={editDesigns} />
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Iteration 1 · Build / Test</p>
        <h2>Expressed — but into the pellet.</h2>
        <p>The first construct was assembled to the design above and tested straight away for expression:</p>
        <DataTable head={["Step", "Condition", "Note"]} rows={inductionRows} />
        <p>In both BL21 and DH5α the protein was expressed, but the mCherry fluorescence — the readout for correctly folded fusion protein — concentrated in the lysis pellet. Misfolded protein was forming inclusion bodies.</p>
        <FigureSlot id="33" source="pending upload · induction record (pellet vs supernatant fluorescence)" caption="Pellet and supernatant after lysis: red fluorescence concentrates in the pellet, indicating inclusion-body formation." />
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Iteration 1 · Learn</p>
        <h2>Read the cofactors.</h2>
        <p>The CRY2 element must bind FAD to hold its correct conformation, and the intracellular FAD pool of E. coli is often insufficient for flavoprotein folding (quantitative citation pending). FAD therefore has to be supplied externally. The zinc-finger element likewise needs a small amount of ZnCl₂.</p>
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Iteration 2 · Design / Build</p>
        <h2>Rescue the folding environment.</h2>
        <p>Based on that diagnosis, the expression protocol was amended on two fronts — cofactor supplementation and a gentler, slower induction:</p>
        <DataTable head={["Change", "Value", "Reason"]} rows={rescueRows} />
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Iteration 2 · Test / Learn</p>
        <h2>Still in the pellet — the protein itself is the problem.</h2>
        <p>The amended protocol did not move the fluorescence out of the pellet. In discussion with Yidan Yu in Prof. Xiaofeng Fang's group, we learned that phase-separating proteins — even light-controlled ones — have a general tendency to aggregate, and that fusing a soluble tag helps keep them stable during expression and extraction.</p>
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Iteration 3 · Design</p>
        <h2>An MBP fusion with three protease exits.</h2>
        <p>The construct was moved onto the MBP-fusion vector pMAL-c5x. Three protease sites were designed in, so the fusion can be taken apart to three different depths depending on what an assay needs:</p>
        <UploadFigure id="34" url={UPLOADS.wetPmalDesign} label="Figure 34 · pMAL-c5x construct" caption="The pMAL-c5x MBP-fusion construct map carrying the NucleArk fusion protein." />
        <UploadFigure id="35" url={UPLOADS.wetProteaseScheme} label="Figure 35 · Protease-site architecture" caption="Protein-level editing design: Factor Xa, Thrombin, and TEV sites divide the fusion into removable layers." />
        <DataTable head={["Site", "Removes", "Purpose"]} rows={proteaseRows} />
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Iteration 3 · Build / Test</p>
        <h2>A single fraction — and a surprise in the gel.</h2>
        <p>The new plasmid was constructed externally (outsourced), and the purification workflow was run across a screen of conditions.</p>
        <FigureSlot id="36" source="pending upload · purification condition screen" caption="Purification dataset across the screened expression and Ni-column conditions; the optimal condition set was selected from this screen." />
        <p>The screen produced an optimal condition set. However, SDS-PAGE showed considerable cleavage at the junctions between elements, so the preparation was polished by size-exclusion chromatography to obtain a single component.</p>
        <UploadFigure id="37" url={UPLOADS.wetSecGel} label="Figure 37 · Purification record" caption="Gel record of the preparation: cleavage fragments at the inter-element linkers appear on SDS-PAGE, and size-exclusion chromatography yields a single component." />
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Iteration 3 · Learn</p>
        <h2>Long linkers cut both ways.</h2>
        <p>The long linkers that were deliberately designed to let each element fold independently also expose extended peptide segments, and the longer the exposed linker, the more readily it is cleaved — advice we confirmed with Prof. Peng Li. With limited project time, rather than re-engineering the linkers, the His tag was relocated from the N terminus to the C terminus, improving the integrity of the protein recovered after nickel-column purification.</p>
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Parallel edit · cargo-binding control</p>
        <h2>Removing the zinc finger.</h2>
        <p>On the nucleic-acid level, design B from the editing table was executed: KpnI single digestion followed by vector self-ligation removes the ZF element, producing the no-cargo-binding control. Under the confocal microscope the modified system still phase-separates, and the wild-type construct binds the nucleic-acid cargo as designed.</p>
        <UploadFigure id="38" url={UPLOADS.wetConfocal} label="Figure 38 · Confocal record" caption="Confocal microscopy: phase separation is preserved, and cargo nucleic acid is bound by the ZF-carrying construct." />
        <aside className="context-links">
          <p>Related reading</p>
          <Link to="/engagement/integrated-hp">
            How advisor conversations shaped this cycle · Integrated HP
          </Link>
          <Link to="/experiments">
            Wet Lab · Experiments
          </Link>
        </aside>
      </section>
    </>
  );
}
