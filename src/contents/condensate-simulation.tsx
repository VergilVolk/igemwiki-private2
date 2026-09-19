import { Link } from "react-router-dom";

// Page: Dry Lab > Model > Part 01 · Condensate simulation
// Content transcribed from condensate_page.md — the integration of the
// condensate/ (Cahn-Hilliard field simulations) and THUiGEM_modeling/
// (systems-level ODE / logistic / Boolean models) campaigns.
// Every <FigureSlot> marks a planned image position (no image inserted yet):
// it carries the figure number, caption, and the source file for upload.

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

const Equation = ({ tex }: { tex: string }) => <p className="math-block">{tex}</p>;

const FigureSlot = ({ id, source, caption }: { id: string; source: string; caption: string }) => (
  <figure className="figure-slot">
    <p className="figure-tag">[ Figure {id} — image placeholder ]</p>
    <p>{caption}</p>
    <p className="figure-source">Source file: <code>{source}</code></p>
  </figure>
);

const levelRows: Row[] = [
  ["Field (PDE)", "Morphology, cargo, ageing, and light response in space", "Cahn–Hilliard equation with reversible binding, glassifying mobility, and finite-rate photo-switching, solved by semi-implicit Fourier spectral methods", "condensate/"],
  ["Systems (ODE / Boolean)", "Protocol design and measurement strategy", "Lumped recruitment/release ODE, logistic ageing, Boolean multivalency network, weighted protocol optimization, local + eigenvalue sensitivity", "THUiGEM_modeling/"],
];

const overviewCards = [
  { id: "01", title: "Field level", text: "Cahn–Hilliard simulations resolve concentration fields, cargo partitioning, virtual FRAP, and light cycles in a 128 × 128 periodic domain." },
  { id: "02", title: "Systems level", text: "ODE, logistic, and Boolean models turn field-level physics into an illumination protocol and a measurement priority list." },
  { id: "03", title: "Shared observables", text: "Activation fraction, τ½, fluidity, and k_on / k_off connect the two levels and let them cross-validate each other." },
];

const simRows: Row[] = [
  ["S1", "Formation & coarsening", "Field", "When and how do droplets appear?", "Spinodal decomposition → discrete droplets; mean radius grows with the coarsening law while free energy decreases monotonically", "FIG 1"],
  ["S2", "Concentration scan", "Field", "Which expression level yields discrete droplets?", "Many small droplets at low mean; bicontinuous maze near mean = 1; phase inversion above", "FIG 2–3"],
  ["S3", "DNA partitioning (1 site)", "Field", "Does DNA cargo enter droplets?", "Total DNA enriched ≈ 4× inside condensates; binding tracks the protein field", "FIG 4–6"],
  ["S4", "DNA partitioning (3 sites)", "Field", "Does multivalent binding change partitioning?", "Mean bound count 2.39 inside vs 0.80 outside; DNA enrichment ≈ 2.3×; ~49% of all DNA bound inside", "FIG 7–8"],
  ["S5", "Controlled 1:1 vs 1:3 comparison", "Field", "Stoichiometry or mobility — which effect dominates?", "Stoichiometry: n̄ 0.64 → 1.56 (×2.4); bound-protein mobility: −8% condensation; DNA dose: −27% condensed protein", "FIG 9–10"],
  ["S6", "Virtual FRAP", "Field", "How fluid are the droplets?", "τ½ = 0.731 on fresh droplets; fluidity −10% for 1:3 binding, −25% at the highest DNA dose", "FIG 11–13"],
  ["S7", "Glassification ageing", "Field", "Do droplets age?", "With ageing on, fluidity falls 72.3% (τ½ 0.731 → 2.640); control run flat to 0.1%", "FIG 14–17"],
  ["S8", "Light ON/OFF cycles", "Field", "Which light windows switch droplets?", "ON ≥ 5τ needed to nucleate; OFF ≥ 3τ to dissolve; 1.2τ OFF leaves droplets undissolved; finite switching raises the nucleation threshold", "FIG 18–19"],
  ["S9", "Light-switch ODE", "Systems", "How fast do proteins recruit/release?", "Recruitment τ ≈ 0.7 s; release t½ = 5.5 min (literature-calibrated)", "FIG 20"],
  ["S10", "Logistic ageing", "Systems", "When does mobility fail?", "Below failure threshold (M = 0.3) at ≈ 25 min continuous light vs ≈ 45 min pulsed", "FIG 21"],
  ["S11", "Boolean multivalency", "Systems", "Does pulsed light avoid over-clustering?", "Continuous light: more than 80% of cells reach 3 exposed sites (ageing-prone); pulsed keeps 1–2", "FIG 22"],
  ["S12", "Protocol optimization", "Systems", "Which illumination pattern is best?", "2 min ON / 3 min OFF maximizes the weighted score at α = 0.7, robust across α", "FIG 23"],
  ["S13", "Sensitivity analysis", "Systems", "Which parameter must be measured first?", "k_off (102.5%) ≫ k_on (85.1%) > ageing rate r (15.4%); eigenvalues of the coupled system are set by k_off alone", "FIG 24–25"],
];

const setupRows: Row[] = [
  ["N × N", "128 × 128, periodic, side L = 100", "Simulation grid"],
  ["D", "2.2", "Effective diffusivity (linear mobility)"],
  ["l", "0.05", "Potential depth scale"],
  ["κ (kappa)", "0.035", "Interface penalty — interface thickness and droplet scale"],
  ["w, m₀", "1.5, 1.0", "Double-well half-width and conserved mean"],
  ["dt", "0.5", "Time step of the semi-implicit solver"],
  ["Potential", "quartic double well", "Bounded potential → real droplets + Ostwald ripening"],
  ["steps", "20 000 (t = 10 000)", "Standard evolution length"],
];

const phaseRows: Row[] = [
  ["Dilute", "0.05 – ~0.5", "< ~0.33", "Rich phase is the minority: sparse isolated small droplets", "Many"],
  ["Intermediate", "~0.5 – ~0.9", "~0.33 – ~0.47", "Droplets coarsen / merge (Ostwald ripening)", "Decreasing"],
  ["Bicontinuous", "→ 1.0", "→ 0.5", "Maze-like connected rich phase", "Sudden drop"],
  ["Inverted", "> 1.0", "> 0.5", "Rich phase becomes the majority (wet foam)", "≈ 1 — droplet loses meaning"],
];

const modelARows: Row[] = [
  ["u", "Total protein (CH order parameter; free and bound protein phase-separate identically)", "∫u conserved"],
  ["A", "Free DNA, diffusing with D_dna", "∫(A + B) conserved"],
  ["B", "Bound complex P·D (1:1)", "transferred by binding"],
];

const modelBRows: Row[] = [
  ["u", "Total protein (CH order parameter), free + bound; ∫u conserved"],
  ["C₀, C₁, C₂, C₃", "DNA carrying 0 / 1 / 2 / 3 proteins (C₀ = free DNA)"],
  ["T = ΣCᵢ", "Total DNA; ∫T conserved"],
  ["b = C₁ + 2C₂ + 3C₃", "Bound protein amount"],
];

const frapParamRows: Row[] = [
  ["D_μ, τ (tracer diffusion / exchange)", "0.5, 2.0"],
  ["Partition contrast p, steepness α", "8.0, 3.0"],
  ["dt, pre-equilibration, cap", "0.05, 50, 300"],
];

const partitionRows: Row[] = [
  ["Inside condensates", "2.386", "0.246", "1.6%", "9.8%", "37.0%", "51.6%"],
  ["Outside condensates", "0.802", "0.108", "46.2%", "32.8%", "15.5%", "5.4%"],
];

const compareRows: Row[] = [
  ["1:1, ⟨DNA⟩ = 0.15", "0.8845", "0.0964", "0.0853", "0.643"],
  ["1:3, ⟨DNA⟩ = 0.15 (M_bound = 0.2)", "0.8130", "0.1140", "0.0736", "1.592"],
  ["1:3, ⟨DNA⟩ = 0.15 (M_bound = 1.0 control)", "0.8845", "0.1050", "0.0801", "1.562"],
  ["1:3, ⟨DNA⟩ = 0.05", "0.8614", "0.0375", "0.0262", "1.668"],
  ["1:3, ⟨DNA⟩ = 0.30", "0.7473", "0.2251", "0.1339", "1.448"],
  ["1:3, ⟨DNA⟩ = 0.50", "0.6308", "0.3606", "0.1825", "1.235"],
];

const fluidityRows: Row[] = [
  ["1:1, ⟨DNA⟩ = 0.15", "0.0963", "0.5000", "0.7311", "1.368"],
  ["1:3, ⟨DNA⟩ = 0.15 (control, M_bound = 1.0)", "0.2215", "0.5000", "0.7311", "1.368"],
  ["1:3, ⟨DNA⟩ = 0.15 (M_bound = 0.2)", "0.2197", "0.4121", "0.8125", "1.231"],
  ["1:3, ⟨DNA⟩ = 0.05", "0.0763", "0.4695", "0.7572", "1.321"],
  ["1:3, ⟨DNA⟩ = 0.30", "0.4076", "0.3369", "0.8994", "1.112"],
  ["1:3, ⟨DNA⟩ = 0.50", "0.5918", "0.2633", "1.0070", "0.993"],
];

const ageingRows: Row[] = [
  ["No ageing (control)", "0.000", "1.000", "7.925", "0.731 → 0.731", "0.1% (flat)"],
  ["Ageing (glassification)", "0.853", "0.275", "7.915", "0.731 → 2.640", "72.3%"],
];

const lightParamRows: Row[] = [
  ["K_ON = K_OFF", "0.02", "Switching rates; timescale τ = 1/k = 50"],
  ["D_off", "0.1", "Free diffusivity of inactive protein"],
  ["reinit_noise", "0.01", "Zero-mean perturbation injected at each light-on transition (thermal fluctuation proxy)"],
  ["Cycles", "3", "ON / OFF cycles per condition"],
];

const cycleRows: Row[] = [
  ["on400_off300", "400 (8τ)", "300 (6τ)", "Full activation + full dissolution: periodic form–dissolve oscillation"],
  ["on250_off150", "250 (5τ)", "150 (3τ)", "Intermediate: switching essentially complete, slight per-cycle decay"],
  ["on250_off60", "250 (5τ)", "60 (1.2τ)", "Long ON / short OFF: dissolution cannot finish, droplets survive across cycles"],
  ["on150_off150", "150 (3τ)", "150 (3τ)", "Short ON: incomplete activation + insufficient nucleation time"],
];

const lightSummaryRows: Row[] = [
  ["on400_off300", "0.9997", "153", "0.0025", "0", "204", "0.293"],
  ["on250_off150", "0.9933", "171", "0.0495", "0", "176", "0.215"],
  ["on250_off60", "0.9933", "171", "0.2992", "116", "176", "0.298"],
  ["on150_off150", "0.9502", "0", "0.0473", "0", "0", "0.000"],
];

const patternRows: Row[] = [
  ["A", "0.5 min", "10%"],
  ["B", "1.0 min", "20%"],
  ["C", "1.5 min", "30%"],
  ["D — selected", "2.0 min", "40%"],
  ["E", "2.5 min", "50%"],
  ["F", "continuous", "100%"],
];

const sensitivityRows: Row[] = [
  ["1", "k_off (release rate)", "102.5%", "Highest"],
  ["2", "k_on (recruitment rate)", "85.1%", "Medium"],
  ["3", "r (ageing rate)", "15.4%", "Low"],
];

const conclusionRows: Row[] = [
  ["Droplets form and coarsen; mass and energy behave exactly", "S1", "Maturation timeline for imaging; solver trustworthiness"],
  ["Discrete droplets exist only below the bicontinuous threshold", "S2", "Expression window; working point mean = 0.5 (φ ≈ 0.33)"],
  ["DNA enriched 2.3–4× inside droplets; inside, doubly / triply bound", "S3–S4", "The vessel loads itself; multivalent binding works as designed"],
  ["But cargo sequesters protein: −27% condensation and −25% fluidity at the highest dose", "S5–S6", "Payload ceiling; titrate the DNA:protein ratio to the interior optimum"],
  ["Droplets age: fluidity −72.3% with glassification, flat without", "S7", "Ageing is real, measurable by FRAP, slow enough to work with"],
  ["ON ≥ 5τ to nucleate, OFF ≥ 3τ to dissolve; finite switching raises the bar", "S8", "Hard constraints on any light protocol"],
  ["Pulsed light roughly doubles usable lifetime and prevents over-clustering", "S9–S12", "2 min ON / 3 min OFF optimal at α = 0.7, robust to priorities"],
  ["k_off is the parameter that matters (102.5% ≫ 85.1% > 15.4%)", "S13", "Measure the light-off decay first; everything else second"],
];

const references = [
  "Cahn, J. W. & Hilliard, J. E. Free energy of a nonuniform system. I. Interfacial free energy. J. Chem. Phys. 28, 258–267 (1958).",
  "Bray, A. J. Theory of phase-ordering kinetics. Adv. Phys. 43, 357–459 (1994).",
  "Berry, J., Brangwynne, C. P. & Haataja, M. Physical principles of intracellular organization via active and passive phase transitions. Rep. Prog. Phys. 81, 046601 (2018).",
  "Hyman, A. A., Weber, C. A. & Jülicher, F. Liquid-liquid phase separation in biology. Annu. Rev. Cell Dev. Biol. 30, 39–58 (2014).",
  "Shen, J. & Yang, X. Numerical approximations of Allen-Cahn and Cahn-Hilliard equations. Discrete Contin. Dyn. Syst. 28, 1669–1691 (2010).",
  "Taylor, N. et al. Biophysical characterization of organelle-based phase separation in Xenopus egg extracts. bioRxiv (2019).",
  "Kennedy, M. J. et al. A rapid and reversible tunable method for regulating protein stability in living cells using synthetic small molecules. Nat. Methods 7, 973–975 (2010).",
  "Shin, Y. & Brangwynne, C. P. Liquid phase condensation in cell physiology and disease. Science 357, eaaf4382 (2017).",
  "Jülicher, F., Weber, C. A. & Sousa, F. S. Chromatin as active matter. Emergent Topics Phys. 4, 011501 (2021).",
  "Zhang, J. et al. RNA polymerase II is an in vitro client of condensates formed by the disordered regions of transcription factors. bioRxiv (2024).",
];

export function CondensateSimulation() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Dry lab · model · condensate simulation</p>
        <h2>One condensate, two modeling levels.</h2>
        <p>NucleArk's delivery vessel is a light-gated condensate. Before building it at the bench we needed quantitative answers to four questions: when and where do droplets form; does DNA cargo partition into them; how fast do they age and lose fluidity; and which illumination protocol switches them without freezing them. We answered these with two complementary modeling campaigns that share one codebase philosophy — conserve mass, resolve the field, and measure only what the wet lab can also measure.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">The two campaigns</p>
        <DataTable head={["Level", "Question it answers", "Formalism", "Codebase"]} rows={levelRows} />
        <p>The two levels are coupled by shared observables — activation fraction, half-recovery time τ½, fluidity 1/τ½, and the rates k_on / k_off — so each level cross-validates the other: the systems-level pulsed-light recommendation is independently reproduced by the field-level light-cycle simulations, and the systems-level ageing curve is the lumped counterpart of the field-level glassification dynamics.</p>
      </section>
      <section className="content-section row g-4">
        {overviewCards.map((card) => (
          <div className="col-md-4" key={card.id}>
            <article className="info-card"><span>{card.id}</span><h3>{card.title}</h3><p>{card.text}</p></article>
          </div>
        ))}
      </section>
      <section className="content-section">
        <p className="eyebrow">Simulation inventory — what we ran and what came out</p>
        <DataTable head={["#", "Simulation", "Level", "Question", "Key result", "Figure"]} rows={simRows} />
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">The shared engine</p>
        <h2>One Cahn–Hilliard solver, every field simulation.</h2>
        <p>All field-level simulations are built on one core: the Cahn–Hilliard (CH) equation, the standard continuum description of liquid–liquid phase separation of a binary fluid, here for the conserved protein concentration field u(x, t):</p>
        <Equation tex="∂u/∂t = ∇²·[ l·(D_eff·u + μ_nl(u)) − κ·∇²u ]      — the bracket is the chemical potential μ" />
        <p>The thermodynamics are set by a bounded quartic double-well potential,</p>
        <Equation tex="f(u) = (l/4) · [ (u − m₀)² − w² ]²" />
        <p>whose two minima m₀ ± w = −0.5 and 2.5 correspond to the dilute and condensed phases; the rich-phase volume fraction follows φ ≈ (⟨u⟩ + 0.5) / 3. The gradient term κ penalizes interfaces and sets the interface thickness together with the characteristic droplet scale.</p>
        <p>We solve the equation with a semi-implicit (IMEX) Fourier spectral method — linear terms implicit, the nonlinear term μ_nl(u) explicit:</p>
        <Equation tex="ûⁿ⁺¹ = ( ûⁿ − dt·K²·μ̂_nl(uⁿ) ) / ( 1 + dt·K²·( l·D_eff + κ·K² ) )" />
        <p>The scheme is unconditionally stable (dt can be 1–2 orders of magnitude larger than for an explicit scheme), and zeroing the k = 0 mode keeps total mass strictly conserved — the measured mass drift is at the 10⁻¹⁶ level across all runs — while the free energy decreases monotonically. Droplets are identified by threshold segmentation (u above m₀) plus connected-component labelling, yielding the mean equivalent radius ⟨R⟩ and droplet counts used throughout this page.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">Numerical setup — shared by all field simulations</p>
        <DataTable head={["Parameter", "Value", "Role"]} rows={setupRows} />
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Simulation 1 · Formation and coarsening</p>
        <h2>From uniform noise to discrete droplets.</h2>
        <p>Starting from a uniform field plus 0.1-amplitude Gaussian noise (mean = 0.5, i.e. φ ≈ 0.33), the simulation shows the full life cycle of a condensate population: the homogeneous state is unstable, small random fluctuations amplify into a mottled spinodal pattern, which breaks up into discrete droplets that then coarsen — small droplets shrink and disappear while large ones grow (Ostwald ripening), occasionally merging.</p>
        <FigureSlot id="1" source="condensate/droplets.gif" caption="Time-lapse of the concentration field evolving from uniform noise to phase-separated, coarsening droplets. Upload this GIF through iGEM Uploads, then replace this slot with its static.igem.wiki address." />
        <p>The time series written to droplet_rt.csv (columns t, R_mean, n_droplets, free_energy, mass_drift) confirms the movie quantitatively: the free energy decreases monotonically, the droplet count falls as the mean radius grows, and the mass drift stays at machine precision (~10⁻¹⁶) — the signatures of a well-resolved, conservative phase-separation dynamics. The mean droplet radius follows the classic coarsening expectation ⟨R⟩ ~ t^(1/3), so most structural change happens early and the late-time morphology evolves only gradually.</p>
        <p><strong>How this guides the wet lab.</strong> The simulation sets expectations for the microscope: after blue-light activation, texture should appear within the early spinodal window, droplets should be visible as discrete objects soon after, and their number should slowly decrease as they mature. It also defines the maturation timescale over which any ageing measurement (Simulation 5) should be scheduled.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Simulation 2 · The concentration landscape</p>
        <h2>Which expression level yields discrete droplets?</h2>
        <p>Expression level is the one knob the wet lab controls most directly. To map it onto morphology, we fixed every CH parameter and scanned the initial mean concentration from 0.05 to 1.60 in steps of 0.05 (extended to 2.00 for the area analysis); each run was evolved for 10 000 steps from a random initial field, then scored on final-state droplet count (threshold m₀) and two-phase area statistics.</p>
        <FigureSlot id="2" source="condensate/fig_of_phase/condensate_phase.png" caption="Final droplet count versus initial mean concentration, with a grey dashed marker at mean = 1.0 where the bicontinuous transition and phase inversion occur." />
        <FigureSlot id="3" source="condensate/fig_of_phase/condensate_area.png" caption="Two-phase area balance versus initial mean concentration; theory predicts the imbalance Δf = |2φ − 1| = 2·|mean − 1|/3, extremal at mean = 1 where the two phases are present in equal measure. (Read with the code's phase-equality convention, which peaks at mean = 1.)" />
        <FigureSlot id="parameter sweep" source="condensate/sweep_mean_kappa_long.gif" caption="A visual sweep across mean concentration and κ, showing how the model morphology changes across the parameter landscape. Upload through iGEM Uploads, then replace this slot with its static.igem.wiki address." />
      </section>
      <section className="content-section">
        <p className="eyebrow">Four regimes</p>
        <DataTable head={["Regime", "Mean concentration", "Rich-phase fraction φ", "Morphology", "Droplet count"]} rows={phaseRows} />
        <p>The area analysis is consistent: the two phases balance exactly at mean = 1 (φ = 0.5), matching the theoretical V / inverted-V shape Δf = 2·|mean − 1|/3.</p>
      </section>
      <section className="content-section narrow">
        <p><strong>How this guides the wet lab.</strong> Discrete, cargo-carrying droplets exist only in the dilute-to-intermediate regime; too much expression produces a connected bicontinuous phase that no longer behaves as a deliverable object. All subsequent simulations therefore operate at mean = 0.5 (φ ≈ 0.33) — safely inside the droplet regime — and the same logic defines the expression window for construct titration experiments.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Simulation 3 · DNA cargo partitioning</p>
        <h2>The vessel must load itself.</h2>
        <p>We coupled the CH field to reversible protein–DNA binding in two steps of increasing realism: first one binding site per DNA (1:1), then three independent sites (1:3) with binding-state-dependent transport, matching the multivalent zinc-finger design. Both extensions evolve three (respectively five) coupled fields with the same operator-splitting philosophy: first protein phase separation, then DNA diffusion, then local binding equilibration — each substep strictly conserving its mass.</p>
        <h3 className="subsection">Model A — one protein per DNA (1:1)</h3>
      </section>
      <section className="content-section">
        <DataTable head={["Field", "Meaning", "Conservation"]} rows={modelARows} />
        <p>Binding relaxes toward the local equilibrium of P_free + D_free ⇌ P·D with K_d = [P_free]·[D_free] / [P·D]; given grid totals, the equilibrium solves a quadratic (small root), and each step relaxes exponentially toward it with time constant τ_b while keeping A + B exactly conserved. Local free protein follows p = max(u + w − m₀, 0) — approximately 0 in the dilute phase and 3 in droplets. Parameters: D_dna = 0.5, Kd = 0.5, tau_b = 1.0, mean_dna = 0.3, noise = 0.02.</p>
        <FigureSlot id="4" source="condensate/fig_of_dna/condensate_with_dna.png" caption="Final-state 2×2 panel — total protein u / free DNA A / bound DNA B / total DNA A + B (Model A)." />
        <FigureSlot id="5" source="condensate/fig_of_dna/condensate_with_dna.gif" caption="Side-by-side movie, protein field (left) vs total DNA (right), showing DNA partitioning into droplets as they form." />
        <FigureSlot id="6" source="condensate/fig_of_dna/dna_bound_in_condensate_ratio.png" caption="Fraction of all DNA that is bound inside condensates, versus time (Model A)." />
        <p>DNA is swept into the droplets by binding: the total-DNA field develops the same droplet pattern as the protein, with an enrichment ratio of ≈ 4 between condensate interior and exterior. Binding follows phase separation rather than fighting it — exactly the loading behavior the delivery design requires.</p>
      </section>
      <section className="content-section">
        <h3 className="subsection">Model B — three independent sites per DNA (1:3, multivalent)</h3>
        <p>Model B upgrades Model A with the three conditions of the design document DNA模拟修改.md: (1) one DNA can reversibly bind up to three proteins; (2) the three sites bind and unbind independently (stepwise); (3) bound protein transports differently from free protein.</p>
        <DataTable head={["Field", "Meaning"]} rows={modelBRows} />
        <p>Stepwise kinetics with the correct statistical factors (3 / 2 / 1 empty sites on the binding side, 1 / 2 / 3 occupied sites on the release side):</p>
        <Equation tex="R₁ = k_on·(3·C₀)·p_free − k_off·C₁        R₂ = k_on·(2·C₁)·p_free − 2·k_off·C₂        R₃ = k_on·C₂·p_free − 3·k_off·C₃" />
        <p>The local equilibrium is the binomial distribution Cᵢ = T·B(3, i, θ) with θ = p_free / (K_d + p_free), and self-consistency with the protein total collapses to a closed quadratic — no iteration needed. A conservation-preserving non-negativity correction (proportional rescaling of the Cᵢ) removes Gibbs-ringing negatives from spectral diffusion without creating DNA: raw clipping was measured to add up to 1.7×10⁻³ relative DNA, while the rescaled scheme keeps total drift at or below 2×10⁻¹³.</p>
        <p>Condition (3) enters twice: species-dependent diffusion D_C0 = 0.50 &gt; D_C1 = 0.30 &gt; D_C2 = 0.18 &gt; D_C3 = 0.10 (bigger complexes move slower), and binding-modulated phase-separation mobility</p>
        <Equation tex="M_eff = (1 − φ_b)·M_P + φ_b·M_b        with        φ_b = b / p_tot        and        M_b / M_P = 0.20" />
        <p>implemented so that setting M_bound = 1.0 reproduces the plain CH step bit-for-bit (verified: identical to machine zero) — which is what makes the controlled comparison below possible.</p>
        <h3 className="subsection">Where does the cargo sit? Final-state partitioning (Model B, t = 10 000)</h3>
        <FigureSlot id="7" source="condensate/fig_dna_multi/condensate_dna_multi.png" caption="Final-state 2×2 panel — total protein u / free DNA C₀ / bound DNA C₁+C₂+C₃ / total DNA T. A movie version exists (condensate_dna_multi.gif)." />
        <FigureSlot id="8" source="condensate/fig_dna_multi/dna_bound_in_condensate_ratio.png" caption="Fraction of all DNA bound inside condensates, versus time (Model B)." />
        <DataTable head={["Region", "Mean bound number n̄", "⟨Total DNA⟩", "C₀", "C₁", "C₂", "C₃"]} rows={partitionRows} />
        <p>The two phases are chemically different worlds. Inside droplets the local protein concentration pushes binding toward saturation — DNA carries on average 2.4 of its 3 sites occupied, dominated by the doubly and triply bound species (C₂ + C₃ ≈ 89%). Outside, nearly half of all DNA is fully free. Total DNA is enriched ≈ 2.3× in the condensates, and ≈ 49% of all DNA in the system ends up bound inside droplets — the vessel loads itself. (Mass drift for protein and DNA both at the 10⁻¹⁵ level; a startup self-check verifies the reaction rates vanish exactly at the binomial equilibrium, max |R| ≈ 4×10⁻¹⁶.)</p>
      </section>
      <section className="content-section">
        <h3 className="subsection">Controlled comparison — stoichiometry vs mobility vs dose</h3>
        <p>Because Model A and Model B differ in more than one way, the comparison script re-runs both cores with identical CH parameters, initial conditions and random seed, and adds a controlled third arm: Model B with M_bound = 1.0, which disables only the bound-protein mobility effect. This isolates the pure stoichiometry effect (1:1 ↔ 1:3 control) from the pure mobility effect (1:3 control ↔ 1:3).</p>
        <FigureSlot id="9" source="condensate/compare_dna/compare_dna_1to1_vs_1to3.png" caption="2×2 panel of the four comparison metrics for 1:1, 1:3 (M_bound = 0.2), and the 1:3 control (M_bound = 1.0)." />
        <FigureSlot id="10" source="condensate/compare_dna/compare_dna_1to3_concentration.png" caption="The same four metrics for Model B at DNA doses 0.05 / 0.15 / 0.30 / 0.50." />
        <p>Final-state values (t = 10 000, from compare_dna_timeseries.csv):</p>
        <DataTable head={["Case", "Condensed protein", "Bound DNA (total)", "Bound DNA inside", "Mean binding n̄"]} rows={compareRows} />
        <ol>
          <li><strong>Consistency check passes.</strong> The 1:3 control (M_bound = 1.0) reproduces the 1:1 condensed-protein curve exactly (identical CH evolution, printed max difference = 0) — the comparison machinery is sound.</li>
          <li><strong>Pure stoichiometry effect.</strong> Going from 1 to 3 sites raises the mean binding number from 0.64 to 1.56 (×2.4) and total bound DNA by +9%, but the bound DNA inside droplets slightly decreases (−6%): complexes in Model B diffuse (each with its own D), so a fraction leaks back out of droplets, unlike Model A's non-diffusing complex.</li>
          <li><strong>Pure mobility effect.</strong> Lowering bound-protein mobility (M_bound 1.0 → 0.2) suppresses condensation by 8% (condensed protein and bound-DNA-inside both −8%): protein dragged by slow complexes condenses less efficiently.</li>
          <li><strong>Dose effect.</strong> Raising DNA from 0.05 to 0.50 lowers condensed protein monotonically by 27% and dilutes per-DNA binding (n̄ 1.67 → 1.24, ligand competition). DNA binding sequesters protein and inhibits phase separation, increasingly with dose.</li>
        </ol>
        <p><strong>How this guides the wet lab.</strong> Multivalent binding is a double-edged sword: it concentrates cargo inside droplets (good) but consumes condensation driving force and slows the machinery (costly). The simulations define a practical payload ceiling — at the highest dose tested, a quarter of the condensate is lost and fluidity drops 25% (Simulation 4) — and predict an optimal intermediate DNA:protein ratio, which the titration series can verify directly.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Simulation 4 · Virtual FRAP</p>
        <h2>Fluidity, measured the way the bench measures it.</h2>
        <p>Fluidity decides whether a condensate can still exchange material — and whether it can release cargo. We measure it in silico exactly the way the wet lab measures it in vitro: form first, bleach later.</p>
        <h3 className="subsection">The virtual FRAP protocol</h3>
        <p>A fluorescent tracer μ with an equilibrium distribution that tracks the concentration field (μ_eq = c₀·[1 + (p − 1)·σ(α·(u − u_th))], i.e. bright in droplets) obeys</p>
        <Equation tex="∂μ/∂t = D_μ·∇²μ − ( μ − μ_eq(u) ) / τ" />
        <p>solved with implicit diffusion and explicit reaction. The protocol: run a formation simulation (seed = spot, so a droplet sits at the grid center), freeze the field at 81 logarithmically spaced ages, and for each frozen field pre-equilibrate the tracer, bleach the central 3×3 patch to zero, then integrate until the center recovers to 50% of its pre-bleach value — with linear interpolation for the exact half-recovery time τ½. Fluidity is defined as 1/τ½.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">FRAP parameters</p>
        <DataTable head={["FRAP parameter", "Value"]} rows={frapParamRows} />
        <h3 className="subsection">Fluidity versus cargo binding</h3>
        <p>For the cargo-coupled models, the tracer's effective diffusivity inside droplets is reduced exactly as the model's own mobility: D_μ,eff = [(1 − φ_in) + φ_in·M_bound]·D_μ, where φ_in is the bound-protein fraction inside the condensate. Model A's premise (bound = free properties) sets M_bound = 1 there, recovering the reference protocol — again enabling a clean comparison.</p>
        <FigureSlot id="11" source="condensate/fig_of_FRAP/FRAP_by_time.png" caption="Half-recovery time τ½ versus droplet age for the cargo-free reference; the bleach–recover movie is condensate/frap.gif." />
        <FigureSlot id="12" source="condensate/compare_dna/fluidity_1to1_vs_1to3.png" caption="2×2 panel — bound fraction φ_in(t), D_eff(t), τ½(t), fluidity 1/τ½(t) for 1:1, 1:3, and the 1:3 control." />
        <FigureSlot id="13" source="condensate/compare_dna/fluidity_1to3_concentration.png" caption="The same four panels for Model B across DNA doses 0.05 / 0.15 / 0.30 / 0.50." />
        <p>Final-state fluidity (t = 10 000, from fluidity_timeseries.csv):</p>
        <DataTable head={["Case", "φ_in", "D_μ,eff", "τ½", "Fluidity 1/τ½"]} rows={fluidityRows} />
        <p>Three facts stand out. The 1:3 control curve is identical to 1:1 to the last digit (difference 0.000e+00) — a numerical control that the fluidity changes below are physical, not numerical. At equal dose, switching from 1:1 to 1:3 binding costs 10% of the fluidity (1.368 → 1.231), entirely attributable to the bound-protein mobility effect. And across doses, φ_in climbs from 0.076 to 0.592 while fluidity falls monotonically by 25% (1.321 → 0.993): every unit of cargo ties up protein and slows the droplet proportionally.</p>
        <p><strong>How this guides the wet lab.</strong> The virtual FRAP pipeline is a ready-made analysis template for the team's real FRAP data — same pre-equilibration, same 50% criterion, same fluidity metric — so wet and dry numbers will be directly comparable. It also establishes the cargo-fluidity budget that the dose experiments should reproduce.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Simulation 5 · Ageing and glassification</p>
        <h2>Condensates do not stay liquid forever.</h2>
        <p>We model this with a second IMEX solver family whose mobility depends on concentration — M(u) = M₀·exp(−α·((u − u_high)/w)²) — so that dense regions flow exponentially less: glassification as kinetic arrest. Side-by-side runs (glass off vs glass on) show normal coarsening versus frozen configurations where coarsening stalls.</p>
        <h3 className="subsection">Why a naive ageing model fails — and the age-field fix</h3>
        <p>A first implementation produced a flat τ½(t) — no ageing at all. The diagnosis (documented in the code) identified three flaws: the mobility was averaged over space (washing out local slowdown into a constant factor), the mobility depended only on u (which saturates inside droplets within tens of time units, leaving no age dimension), and FRAP used constant D_μ and τ, decoupled from droplet state.</p>
        <p>The fix introduces an explicit Eulerian ageing field q(x, t) ∈ [0, 1] that accumulates only inside the condensed phase:</p>
        <Equation tex="dq/dt = k_age·(1 − q)·σ( α_q·(u − m₀) )        g(q) = (1 − q) + q·M_glass" />
        <p>The mobility ratio g is wired into both the formation dynamics — via an under-relaxed CH step u ← u + g(x)·(u_CH − u) − (ū_new − ū_old) that slows the entire local evolution rate (interior reorganization and interface motion alike) with an exact mass compensation, preserving the aged morphology — and the FRAP readout, with D_μ(x) = D_μ·g(q) and τ(x) = τ / g(q). Parameters: k_age = 3×10⁻⁴ (ageing timescale 1/k_age ≈ 3333), M_glass = 0.15, α_q = 6; control run with k_age = 0 and M_glass = 1 (q ≡ 0).</p>
      </section>
      <section className="content-section">
        <h3 className="subsection">Results — droplets age, and FRAP sees it</h3>
        <FigureSlot id="14" source="condensate/aging_test/imex_no_glass.gif and condensate/aging_test/imex_glass.gif (≈26 MB each — compress before upload)" caption="Paired movies: normal coarsening vs glassified freezing of the droplet pattern." />
        <FigureSlot id="15" source="condensate/aging_FRAP/fluidity_by_time_glass.png (control: fluidity_by_time_no_glass.png)" caption="2×2 panel — q_in(t) / g_in(t) / τ½(t) / fluidity 1/τ½(t)." />
        <FigureSlot id="16" source="condensate/aging_FRAP/fluidity_comparison.png" caption="Three-panel comparison — τ½, fluidity, and normalized fluidity, no ageing vs ageing. The τ½ overlay alone is FRAP_by_time_comparison.png." />
        <FigureSlot id="17" source="condensate/aging_FRAP/FRAP_by_time_glass_final.png (control: FRAP_by_time_no_glass_final.png)" caption="End-state FRAP snapshot — final u field, bleach moment, recovered state, and the central recovery curve." />
        <DataTable head={["Condition", "q_in (final)", "g_in (final)", "Central μ₀", "τ½ (start → end)", "Fluidity drop"]} rows={ageingRows} />
        <p>The ageing run evolves completely monotonically: q_in climbs to 0.853, the internal mobility ratio collapses to 0.275, τ½ rises from 0.731 to 2.640, and fluidity falls from 1.369 to 0.379 (normalized: 0.28). The control stays flat to within 0.1%. The central pre-bleach intensity μ₀ ≈ 7.9 in both runs at all times, confirming the 3×3 measurement patch never leaves the condensed phase — the readout is valid throughout. (Numerical hygiene: the implicit FRAP scheme deviates from a fully explicit variable-coefficient alternative by a printed 6.74% check value; the explicit stability parameter is 0.809, below the stability bound of 2.)</p>
        <p><strong>How this guides the wet lab.</strong> The simulation makes a concrete, falsifiable prediction for the FRAP time course: as droplets age, the mobile fraction stays high but τ½ should grow severalfold — a slowdown signature, not a loss of material. It also tells the team when to measure: scheduled FRAP at multiple ages after activation (the parameter list schedules 0 / 10 / 30 / 60 / 90 min) maps directly onto the q(t) curve for calibration.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Simulation 6 · Light-controlled cycles</p>
        <h2>Which light windows actually switch the condensate?</h2>
        <p>The final field-level question is the one the project literally runs on. Earlier prototypes toggled droplets instantly with the light; here we upgrade to finite-rate, one-way first-order switching between inactive (A) and active (B) protein, governed by a local activation fraction φ ∈ [0, 1]:</p>
        <Equation tex="light ON:  dφ/dt = +k_on·(1 − φ)  ⟹  φ ← 1 − (1 − φ)·e^(−k_on·dt)        light OFF:  dφ/dt = −k_off·φ  ⟹  φ ← φ·e^(−k_off·dt)" />
        <p>The rates are spatially uniform, so φ(x, t) = φ(t) exactly — the ODE integrates analytically, unconditionally stable. The activation fraction then weights the phase-separation driving force in a mean-field interpolation between the two exact limits:</p>
        <Equation tex="u(t + dt) = φ·u_CH + (1 − φ)·u_diff" />
        <p>At φ = 1 this reproduces the full Cahn–Hilliard step; at φ = 0 it reduces to free diffusion (droplets dissolve); in between, drive and dissolution compete. Both limits conserve mass, and so does the interpolation (measured drift ~10⁻¹⁶).</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">Light-cycle parameters</p>
        <DataTable head={["Parameter", "Value", "Meaning"]} rows={lightParamRows} />
        <h3 className="subsection">Four regimes of light cycling</h3>
        <DataTable head={["Tag", "ON window", "OFF window", "Design intent"]} rows={cycleRows} />
        <FigureSlot id="18" source="condensate/light_off/light_cycles/light_cycles_comparison.png" caption="All conditions overlaid — φ(t), droplet count, and condensed-fraction time series, with grey lights-off shading and the theoretical rich-phase fraction φ ≈ 0.33 reference line." />
        <FigureSlot id="19" source="condensate/light_off/light_cycles/light_cycle_on250_off60.png (movie: light_cycle_on250_off60.gif)" caption="The triple-panel time series for the short-OFF condition; the movie shows the concentration field with a live light-state / φ annotation." />
        <p>Summary metrics (from light_cycles_summary.csv):</p>
        <DataTable head={["Tag", "φ at end of ON", "Droplets at end of ON", "φ at end of OFF", "Droplets at end of OFF", "Peak droplets", "Peak condensed fraction"]} rows={lightSummaryRows} />
        <p>Two effects are invisible to instantaneous-switching models and matter for any real protocol. First, when the OFF window shrinks to 1.2τ, φ only decays to 0.30 and 116 droplets persist — the system settles into a standing small-droplet steady state that never fully dissolves; light-off must be given at least 3τ to clear the field. Second, an ON window of 150 steps was sufficient to nucleate (188 droplets) under the old instant-switch model (τ = 20), but under finite-rate switching (τ = 50) the same window yields zero droplets — finite switching kinetics raise the minimum ON window. The underlying physics: after full dissolution, re-nucleation from numerical noise alone takes ~140–200 time units, so too-short ON windows lose the race between activation and nucleation.</p>
        <p><strong>How this guides the wet lab.</strong> The map above is a direct design constraint for the illumination protocol: ON and OFF windows must each be measured against the switching timescale 1/k and the re-nucleation lag, not just against light on / light off. It motivates the pulsed protocols optimized at systems level in Simulation 7 — and independently reproduces their conclusion that continuous or near-continuous light is neither necessary nor desirable.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Simulation 7 · Systems-level protocol design</p>
        <h2>From fields to decisions.</h2>
        <p>The field-level simulations resolve space; the systems-level campaign (THUiGEM_modeling/) resolves decisions. Its modules are deliberately lightweight — ODEs and logic rules that run in seconds — so that protocol variants can be swept exhaustively and handed to the wet lab as schedules.</p>
        <h3 className="subsection">Module 1 — Light-switch recruitment dynamics (ODE)</h3>
        <p>Protein in droplets follows first-order recruitment against a finite pool:</p>
        <Equation tex="dP/dt = k_on · Light · (P_total − P) − k_off · P" />
        <p>Parameters are anchored to the optogenetics literature (CRY2 / CIBN kinetics, Kennedy et al. 2010): k_on = 50 min⁻¹ (activation τ ≈ 0.7 s), k_off = 0.126 min⁻¹ (release t½ = 5.5 min), P_total = 10 a.u. — all flagged for re-fitting to our own construct once light-on / light-off fluorescence time courses arrive.</p>
        <FigureSlot id="20" source="THUiGEM_modeling/THUiGEM_modeling/03_outputs/figures/light_switch_result.png" caption="One 5-min cycle (1 min ON / 4 min OFF) — droplet protein trajectory and the light schedule." />
        <p>Recruitment is nearly instantaneous on the minute scale (well under 1 s), while release is slow (t½ = 5.5 min). The asymmetry is the design opportunity: brief light pulses capture almost all recruitable protein, and darkness — not light — sets the duty-cycle budget. This ODE is the systems-level twin of the finite-rate φ switching in Simulation 6.</p>
        <h3 className="subsection">Module 2 — Logistic ageing prediction</h3>
        <p>Droplet mobility (1 = liquid, 0 = solid) decays as a logistic in cumulative light exposure:</p>
        <Equation tex="M(t) = M₀ / ( 1 + exp( r·(t − t_mid) ) )" />
        <p>with continuous light parameterized by r = 0.2, t_mid = 25 min and pulsed light (1 min ON / 4 min OFF) by r = 0.12, t_mid = 45 min — light accelerates ageing.</p>
        <FigureSlot id="21" source="THUiGEM_modeling/THUiGEM_modeling/03_outputs/figures/aging_model_comparison.png" caption="Mobility index vs time for continuous vs pulsed light, with the failure threshold M = 0.3." />
        <p>Under continuous light, mobility crosses the failure threshold (M = 0.3, below which droplets behave solid-like and can no longer exchange cargo) at ≈ 25 min; under pulsed light the system stays functional until ≈ 45 min. This is the lumped counterpart of Simulation 5's field-level glassification: both say the vessel has a finite liquid lifetime that pulsed operation roughly doubles.</p>
      </section>
      <section className="content-section">
        <h3 className="subsection">Module 3 — Boolean multivalency network</h3>
        <p>Why does pulsed light delay ageing? A Boolean network of three interaction sites — A (photo-sensor): A = Light; B (scaffold): B = A AND Light_high; C (client): C = A AND B — tracks how many binding sites stand exposed simultaneously, a proxy for aggregate size and ageing risk.</p>
        <FigureSlot id="22" source="THUiGEM_modeling/THUiGEM_modeling/03_outputs/figures/boolean_network_results.png" caption="Distribution of exposed-site counts (0–3) across 500 simulated cells under dark, pulsed, and continuous light." />
        <p>In the dark, no sites open (no droplets). Under pulsed light, cells predominantly sit at 1–2 exposed sites — small, dynamic droplets. Under continuous light, more than 80% of cells reach all 3 exposed sites: large, ageing-prone aggregates. Pulsed illumination prevents over-clustering, which is exactly the microscopic mechanism behind Module 2's delayed failure and Simulation 5's slower glassification.</p>
        <h3 className="subsection">Module 4 — Virtual experiment: optimizing the light pattern</h3>
        <p>Finally, the modules are combined into a virtual experiment that scores six candidate light patterns on a 5-minute cycle, balancing performance (steady-state protein retained in droplets, from Module 1) against sustainability (time to ageing failure, from Module 2 with duty-cycle-accelerated ageing rate r_eff = r_base·(1 + 2·duty)):</p>
        <DataTable head={["Pattern", "ON window (5-min cycle)", "Duty cycle"]} rows={patternRows} />
        <p>The composite score is Score = α·P̂ + (1 − α)·T̂_fail (both metrics min–max normalized), with default weight α = 0.7 favoring protein retention; the average protein level is taken over the last 10 min of a 60-min simulation (steady state), and the failure time from the logistic model above.</p>
        <FigureSlot id="23" source="THUiGEM_modeling/THUiGEM_modeling/03_outputs/figures/light_pattern_optimization.png (per-pattern traces: virtual_experiment_light_patterns.png)" caption="Four panels — protein trajectories per pattern, performance vs sustainability bars, normalized metrics with the weighted score (best pattern highlighted), and the score's sensitivity to the weight α." />
        <p>Performance grows with duty cycle and sustainability shrinks with it, so the optimum is interior: pattern D — 2 min ON / 3 min OFF — wins at α = 0.7, and the ranking is robust across the practically relevant weight range (for α above 0.8 the highest-protein pattern takes over; below α ≈ 0.5 the longest-survival pattern does — the figure's fourth panel maps this trade-off explicitly so the team can re-decide with one glance if priorities change).</p>
        <p><strong>Cross-validation with the field level.</strong> Two independent model chains — the PDE light cycles of Simulation 6 and the ODE / logistic / Boolean stack here — converge on the same operating doctrine: pulsed light with ON windows long enough to nucleate (at least 5 switching times) and OFF windows long enough to partially release (at least 3 switching times), with a duty cycle near 40%. Neither chain was tuned to the other; the agreement is evidence that the recommendation is a property of the physics, not of one formalism.</p>
        <p><strong>How this guides the wet lab.</strong> The virtual experiment outputs a ready-to-run schedule: 2 min ON / 3 min OFF, 5-minute cycle. It comes with an explicit sensitivity map, so when measured k_on / k_off replace the literature values (see the sensitivity analysis below), re-running the script regenerates the recommendation in seconds.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Sensitivity analysis</p>
        <h2>Which parameter must be measured first?</h2>
        <p>Model-based protocols are only as good as their parameters, so we asked which parameter the system actually cares about. In a local scan, each key parameter was scaled from 0.5× to 2.0× its baseline (16 steps) while holding the rest fixed; the outputs were the steady-state droplet protein level (averaged over a full light cycle, second cycle onward to remove transients) for k_on and k_off, and the time-to-failure for the ageing rate r.</p>
      </section>
      <section className="content-section">
        <DataTable head={["Rank", "Parameter", "Max output change (0.5×–2×)", "Priority"]} rows={sensitivityRows} />
        <p>Why k_off dominates: in a pulsed protocol the system spends most of its time in darkness (80% for the 1-min-ON / 4-min-OFF schedule) — and during darkness, k_off is the only knob controlling how much protein remains in droplets. Recruitment errors wash out because τ_on is sub-second; release errors accumulate for minutes.</p>
        <h3 className="subsection">Eigenvalue check</h3>
        <p>For the coupled droplet–nucleus system at steady light,</p>
        <Equation tex="A = [ −k_off        0 ; k_in·P_perm   −k_off ]        λ₁ = λ₂ = −k_off" />
        <p>both eigenvalues equal −k_off regardless of import parameters: the system's relaxation timescale is set by the release rate alone, and left / right eigenvector condition numbers quantify the stiffness of that separation as k_in varies from passive (0.01) to active (2.0) import.</p>
        <FigureSlot id="24" source="THUiGEM_modeling/THUiGEM_modeling/03_outputs/figures/sensitivity_analysis.png" caption="Three panels — relative output change vs scaling factor for k_on, k_off, and ageing rate r." />
        <FigureSlot id="25" source="THUiGEM_modeling/THUiGEM_modeling/03_outputs/figures/eigen_sensitivity_analysis.png" caption="Eigenvalues and condition numbers versus k_in, from the eigen-sensitivity script." />
        <p>The sensitivity spectrum is strongly hierarchical: the two binding-rate parameters dominate, the ageing rate is secondary, and everything else is negligible. A 2× error in k_off moves the model output by more than 100% — the difference between a protocol that works and one that does not — while the same error in r costs ~15%.</p>
        <p><strong>How this guides the wet lab.</strong> Measurement effort should follow sensitivity: the single most valuable dataset is a light-off fluorescence decay time course (a direct k_off measurement); second is the light-on recruitment transient (k_on); FRAP at multiple ages to pin down r comes third. The PARAMETERS_NEEDED.md tracker lists all ten calibration targets — including P_total, C_crit, nuclear permeabilities, and import / export rates — each with its data source, fitting method, and status.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Integrated conclusions</p>
        <h2>One argument, assembled piece by piece.</h2>
        <p>The two campaigns were not run in isolation — they form one argument:</p>
      </section>
      <section className="content-section">
        <DataTable head={["Model finding", "Where", "Design guidance delivered"]} rows={conclusionRows} />
        <p><strong>Where this page sits in the modeling story.</strong> The condensate simulations described here are Part 01 of the model section. The systems-level framework's fourth module — the two-compartment nuclear-import model with the four-group blocking assay (±NLS × ±inhibitor, predicting near-zero nuclear enrichment only when both NLS is absent and pores are blocked) — is presented on the Membrane / Nuclear Entry Simulation page together with the delivery-side models; structure / binding prediction and sequence design have their own pages.</p>
        <p><strong>What remains for the loop to close.</strong> All kinetic parameters are currently literature-anchored or dimensionless simulation values. The wet-lab data streams specified above — light-on / light-off fluorescence time courses, FRAP at scheduled ages, titration series — will be fitted into fitted_params.json, after which every simulation and the protocol recommendation regenerate automatically with calibrated numbers.</p>
        <aside className="context-links">
          <p>Related validation</p>
          <Link to="/experiments">Go to Wet Lab · Experiments</Link>
          <Link to="/measurement">Go to Wet Lab · Measurement</Link>
        </aside>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">References</p>
        <ol>
          {references.map((ref) => <li key={ref.slice(0, 60)}>{ref}</li>)}
        </ol>
        <p><strong>Figures.</strong> All figure panels above are placeholders: each dashed block marks the exact insertion point and carries the caption and source file. Final images, movies, and compressed GIFs will be embedded here once uploaded through the iGEM asset system.</p>
      </section>
    </>
  );
}
