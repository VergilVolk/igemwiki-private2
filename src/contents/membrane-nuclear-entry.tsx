// Page: Dry Lab > Model > Part 02 · Membrane / nuclear entry simulation
// Content transcribed from the team's corrected modeling manuscripts
// (src/1002/入膜动力学方程组_修正版(1).md and 入核动力学模型_修正版(2).md,
// both v2, 2026-09-13). Equations, numbers, honest declarations, and the
// pending-confirmation lists are carried over verbatim in meaning; every
// <FigureSlot> marks a planned image position. The manuscripts remain
// "awaiting team confirmation" — the open items are listed at the end.

import { Link } from "react-router-dom";

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

const overviewRows: Row[] = [
  ["A · Membrane entry", "How does a condensate cross the plasma membrane?", "Langmuir adsorption + wrapping-angle gradient flow (Helfrich energy) + dual-gated penetration; two-compartment ODEs", "Cytoplasmic droplet concentration C_cyto(t), per-route η(t)"],
  ["B · Nuclear entry", "How does it then cross the nuclear pore?", "Two-state perinuclear trapping (reaction–diffusion) + FG-Nup mass action + Cahn–Hilliard partitioning with Allen–Cahn interface + Onsager release", "Nuclear efficiency η_nuclear(t), equilibrium ceiling η(∞), t₉₅"],
];

const wiringRows: Row[] = [
  ["C_ex", "Free droplets in the medium", "Input of module A"],
  ["C_b", "Droplets adsorbed at the membrane", "Consumed by both internalization routes"],
  ["C_cyto", "Droplets in the cytoplasm", "Output of module A = initial condition C_f(r, 0) of module B"],
  ["C_f, C_t", "Free / trapped droplets around the nucleus", "Perinuclear shell, enrichment 1 + K_trap"],
  ["C_bound", "Droplets bound to FG-Nups", "Gateway into the NPC phase"],
  ["C_NPC", "Droplets inside the NPC / FG phase", "Partition-limited"],
  ["C_nuc, C_target", "Free / target-bound droplets in the nucleoplasm", "Readout: η_nuclear"],
];

const membraneParamRows: Row[] = [
  ["κ_bend", "Membrane bending modulus", "~20 kBT", "Literature (Helfrich)"],
  ["σ", "Membrane tension", "0.01–0.3 mN/m (1 mN/m = 0.243 kBT/nm² at 298 K)", "Literature; effective σ may be lower in cells (area reserve)"],
  ["Δζ", "Droplet–membrane Zeta potential difference", "mV, gate centered at 35 mV, window [25, 45] mV", "Calibrated on Lu et al. 2023"],
  ["K_p^lipid", "Lipid partition coefficient", "≈ 0 below 10; saturates above 75", "Experiment / Lu et al. 2023"],
  ["R", "Droplet radius", "nm", "Our wet-lab droplet characterization (DLS / microscopy)"],
  ["γ_d", "Droplet interfacial tension (validity criterion)", "kBT/nm²", "Pending measurement — see open items"],
  ["R_min", "Minimum radius for complete wrapping", "√(2κ_bend/(w_total − σ))", "Derived, Eq. (4)"],
  ["τ_Gao", "Wrapping time scale", "(R/(α·√D_rec))²", "Gao–Freund 2005; α = 0.01–0.1"],
  ["η_escape", "Endosomal escape efficiency", "≪ 1 typically", "Literature — pending"],
  ["k_ads⁰, k_des, k_pen", "Adsorption / desorption / penetration rates", "(a.u.)⁻¹·min⁻¹, min⁻¹, min⁻¹", "Experiment fit — pending"],
];

const gatingRows: Row[] = [
  ["Electrostatic gate g_Δζ", "exp(−(Δζ − 35)² / 200)", "Gaussian window; supported inside Δζ ∈ [25, 45] mV only"],
  ["Lipid gate g_Kp", "1 / (1 + exp(−(K_p^lipid − 75)/5))", "Logistic; K_p^lipid < 10 ≈ 0, > 75 saturates"],
  ["Adhesion w_elec", "w_elec,0 · exp(−(Δζ − 35)²/200)", "Same window; outside is extrapolation"],
  ["Adhesion w_lipid", "w_lipid,0 · K_p^lipid/(K_p^lipid + K_p,0)", "Langmuir form; Hill alternative to be checked (sensitivity)"],
];

const selfCheckRows: Row[] = [
  ["E_bend(π) = 8π·κ_bend ≈ 503 kBT", "κ_bend = 20 kBT, C₀ = 0", "Closed-form limit of the wrapping energy"],
  ["E_tension(π) = σ·4πR² ≈ 1220 kBT at R = 200 nm, σ = 0.01 mN/m", "Exceeds the bending term", "Tension is not negligible — must stay in the energy"],
  ["Complete wrapping needs w_total > 2κ_bend/R² + σ ≈ 3.4×10⁻³ kBT/nm² at R = 200 nm", "Threshold", "Compare against literature adhesion magnitudes"],
  ["d(C_ex + C_b + C_cyto)/dt = 0", "Machine precision", "All rates are inter-compartment transfers"],
  ["φ dynamics started from φ₀ > 0", "φ = 0 is a fixed point", "Initial contact angle required"],
  ["w_total ≡ ξ_l·(ε + ln ξ₀)", "Mapping", "Consistency between w-language and ligand-language parameterizations"],
];

const nuclearSystemRows: Row[] = [
  ["(1a)", "∂C_f/∂t = ∂_r[D₀·∂_r C_f] − k_on^trap(r)·C_f + k_off^trap·C_t − J_bind", "Perinuclear accumulation, free state"],
  ["(1b)", "∂C_t/∂t = k_on^trap(r)·C_f − k_off^trap·C_t", "Trapped state"],
  ["(2)", "dC_bound/dt = J_bind − k_off^FG·C_bound − J_partition", "FG-Nup binding, mass action"],
  ["(3)", "J_partition = k_relax(A)·(K_p^NPC·C_bound − C_NPC)", "Exchange flux into the NPC phase"],
  ["(4)", "dC_NPC/dt = J_partition − J_release", "NPC-phase compartment"],
  ["(5)", "dA/dt = k_deform·(A_eq(C_NPC) − A)", "Droplet–FG contact area relaxation"],
  ["(6)", "J_release = k_release·(C_NPC − C_nuc/K_p^nuc)", "Release into the nucleoplasm (Onsager)"],
  ["(7)", "dC_nuc/dt = J_release − k_target·C_nuc", "Nucleoplasm, free droplets"],
  ["(8)", "dC_target/dt = k_target·C_nuc", "Nucleoplasm, target-bound (optional ratchet)"],
  ["(9)", "J_bind = k_on^FG·C_FG-Nup·C_f(R_N, t)", "Binding flux at the nuclear membrane"],
  ["(10)", "η_nuclear = (C_nuc + C_target)/C_total", "Delivery efficiency readout"],
];

const equilibriumRows: Row[] = [
  ["Trapping", "C_t = K_trap·C_f", "Perinuclear enrichment ratio 1 + K_trap"],
  ["FG binding", "C_bound = K_FG*·C_f", "K_FG* ≡ k_on^FG·C_FG-Nup/k_off^FG"],
  ["NPC partitioning", "C_NPC = K_p^NPC·C_bound", "Partition coefficient as equilibrium ratio"],
  ["Nucleoplasm", "C_nuc = K_p^nuc·C_NPC", "Second partition coefficient"],
];

const paramSourceRows: Row[] = [
  ["D₀, k_on^trap, k_off^trap", "Literature + experiment fit", "Chae et al., iScience, 2024 — trap mechanism pending verification; K_trap invertible from steady-state fluorescence ratios"],
  ["k_on^FG, k_off^FG, C_FG-Nup", "Experiment / literature", "Mass action; Chen et al., 2026 gives qualitative support (docking-predicted direct binding, Nup62 N-terminal 1–289 aa). Docking scores are NOT quantitative: the −57 kcal/mol value would imply K_p ≈ 10⁴¹ via ln K_p = −ΔG/kBT — unphysical, forbidden for quantitative use (typical PPI: −10 to −20)"],
  ["κ_CH, γ, M_CH, M_n, k_relax, k_deform", "Literature + numerical calibration", "Cahn & Hilliard 1958; γ = 3.3×10⁻³ nN/µm; mobilities not directly measurable — labeled numerical calibration"],
  ["K_p^NPC, K_p^nuc", "Fluorescence partition experiments", "Frey et al., Cell, 2018 framework — pending"],
  ["k_release", "Calibrated on t₉₅ = 120 s", "Only after conservation closure is verified"],
  ["k_target", "Pending / hypothesis", "ALKBH5–m⁶A target RNA sink; may be set to 0 (pure equilibrium)"],
  ["η_escape", "Literature / experiment", "Handoff from the membrane-entry module"],
];

const openItemRows: Row[] = [
  ["A1", "Measure γ_d (droplet interfacial tension) to verify the spherical-droplet criterion w_total ≪ γ_d", "Membrane §2.3 geometry"],
  ["A2", "Check the original form of the neck-closing barrier in Agudo-Canalejo & Lipowsky 2018", "Membrane Eq. (6)"],
  ["A3", "Fix w_elec,0, w_lipid,0, K_p,0, k_ads⁰, k_des, k_pen, η_escape", "All quantitative membrane results"],
  ["A4", "C₀ (membrane spontaneous curvature): 0 for symmetric membranes, or literature value", "Membrane §2.3"],
  ["A5", "Phenomenological-form sensitivity (Gaussian vs parabolic window; Langmuir vs Hill)", "Robustness of gating conclusions"],
  ["B1", "Verify whether Chae et al. 2024 traps are binding sites or slow-diffusion zones", "Nuclear §2.1 premise"],
  ["B2", "Check Chen et al. 2026 time-series: droplets shrinking (monomer shuttling) vs passing intact (wetting)", "Nuclear §7 variant choice"],
  ["B3", "Specify A_eq(C_NPC) and the double-well f(C)", "Nuclear Eqs. (3), (5)"],
  ["B4", "k_target: 0 (pure equilibrium) or > 0 (ratchet)", "Efficiency ceiling"],
];

const references = [
  "Helfrich, W. (1973). Elastic properties of lipid bilayers: theory and possible experiments. Zeitschrift für Naturforschung C, 28(11), 693–703.",
  "Gao, H., Shi, W. & Freund, L. B. (2005). Mechanics of receptor-mediated endocytosis. PNAS, 102(27), 9469–9474.",
  "Yuan, H. & Zhang, S. (2010). Effects of particle size and ligand density on the kinetics of receptor-mediated endocytosis of nanoparticles. Applied Physics Letters, 96(3), 033704.",
  "Agudo-Canalejo, J. & Lipowsky, R. (2018). Domes and cones: adhesion-induced fission of membranes by ESCRT proteins. PLoS Computational Biology, 14(8), e1006422.",
  "Lu, T., Liese, S., Schoenmakers, L., Weber, C. A., Suzuki, H., Huck, W. T. S. & Spruijt, E. (2022). Endocytosis of Coacervates into Liposomes. JACS, 144(30), 13451–13455.",
  "Lu, T., Hu, X., van Haren, M. H. I., Spruijt, E. & Huck, W. T. S. (2023). Structure-Property Relationships Governing Membrane-Penetrating Behaviour of Complex Coacervates. Small, 19(38), 2303138.",
  "Lipowsky, R. (2018). Understanding membranes and vesicles. In Physics of Biological Membranes (pp. 3–44). Springer.",
  "Chae et al. (2024). iScience. — Perinuclear trapping; mechanism pending verification.",
  "Chen, L. et al. (2026). Reversible ALKBH5 cytosolic aggregation accelerates cellular senescence. Cell Death & Differentiation, 33, 171–187.",
  "Cahn, J. W. & Hilliard, J. E. (1958). Free energy of a nonuniform system. I. Interfacial free energy. Journal of Chemical Physics, 28, 258.",
  "Cahn, J. W. (1961). On spinodal decomposition. Acta Metallurgica, 9, 795.",
  "Frey, S. et al. (2018). Surface properties determining passage rates of proteins through nuclear pores. Cell, 174, 202–217.",
  "Wang, J. et al. (2023). Phase separation of the nuclear pore complex facilitates selective nuclear transport to regulate plant defense against pathogen and pest invasion. Molecular Plant, 16, 1016–1030.",
  "Izaurralde, E. et al. (1997). The asymmetric distribution of the constituents of the Ran system is essential for transport into and out of the nucleus. EMBO Journal, 16, 6783–6792.",
];

export function MembraneNuclearEntry() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Dry lab · model · membrane / nuclear entry</p>
        <h2>Is nuclear enrichment phase-separation-mediated?</h2>
        <p>Between the condensate and its nuclear cargo target stand two barriers: the plasma membrane and the nuclear envelope. We model them as one serial kinetic chain — adsorption and internalization at the cell membrane, then perinuclear accumulation, partitioning into the FG-nucleoporin phase, and release into the nucleoplasm — whose end readout is a single, falsifiable nuclear-entry efficiency η_nuclear(t). The same chain motivates a four-group blocking assay that discriminates active NLS-driven import from condensation acting as a passive nuclear sink.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">Two modules, one chain</p>
        <DataTable head={["Module", "Question", "Formalism", "Output"]} rows={overviewRows} />
        <FigureSlot id="26" source="to be drawn · compartment chain schematic" caption="Wiring diagram of the full delivery chain: medium → membrane-adsorbed → cytoplasm → perinuclear → NPC / FG phase → nucleoplasm, with the handoff variable C_cyto marked." />
        <p>The two modules are chained explicitly: the membrane model's output — cytoplasmic droplet concentration C_cyto, including the endosomal-escape factor η_escape — is the initial condition C_f(r, 0) of the nuclear model. Symbols were unified across both manuscripts (K_p^NPC vs K_p^lipid, κ_CH vs κ_bend) so the chain is consistent end to end.</p>
        <DataTable head={["State", "Meaning", "Role in the chain"]} rows={wiringRows} />
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Module A · getting through the cell membrane</p>
        <h2>Adsorb, wrap, or slip through.</h2>
        <p>Free droplets in the medium (C_ex) adsorb onto the membrane (C_b) with Langmuir kinetics, electrostatically gated by the droplet–membrane Zeta-potential difference Δζ:</p>
        <Equation tex="dC_ex/dt = −k_ads⁰·f(Δζ)·C_ex·(n_t − C_b) + k_des·C_b" />
        <Equation tex="dC_b/dt  =  k_ads⁰·f(Δζ)·C_ex·(n_t − C_b) − k_des·C_b − v_endo − v_pen" />
        <p>From the adsorbed state, two internalization routes compete: passive wrapping (endocytosis) and direct penetration.</p>
        <h3 className="subsection">Route 1 — wrapping, as a gradient flow on an energy landscape</h3>
        <p>The wrapping angle φ (0 = no contact, π = fully wrapped) relaxes down the total membrane energy E_total = E_bend + E_tension + E_adhesion, with the membrane conforming to the droplet in the contact region:</p>
        <Equation tex="η_drag·dφ/dt = −∂E_total/∂φ" />
        <Equation tex="E_bend(φ)    = (κ_bend/2)·(2/R − C₀)²·A_contact(φ)          A_contact(φ) = 2πR²·(1 − cos φ)" />
        <Equation tex="E_tension(φ) = σ·πR²·(1 − cos φ)²                            self-check: E_bend(π) = 8π·κ_bend, ΔA(π) = 4πR²" />
        <Equation tex="E_adhesion(φ) = −A_contact(φ)·w_total,   w_total = w_elec(Δζ) + w_lipid(K_p^lipid)" />
        <p>Complete wrapping becomes thermodynamically possible only above a size threshold — the classic Helfrich trade-off between adhesion gain and bending + tension cost:</p>
        <Equation tex="R_min = √( 2·κ_bend / (w_total − σ) )        (requires w_total > σ;  ligand-language mapping: w_total ≡ ξ_l·(ε + ln ξ₀) )" />
        <p>The wrapping itself costs time; its scale is the Gao–Freund estimate τ_Gao = (R/(α·√D_rec))², used here as a timescale calibration for the drag coefficient (η_drag ~ E_char·τ_Gao), not as an independent dynamical law. Once φ reaches π (and R exceeds R_min, and the ligand density its own threshold), the wrapped droplet is internalized at rate</p>
        <Equation tex="v_endo = P_close·(C_b/τ_Gao)·Θ(φ − π)·Θ(R − R_min)·Θ(ξ_l − ξ_l,min)" />
        <Equation tex="P_close = exp(−ΔE_barrier/kBT),   ΔE_barrier = 4π·R_ne·[ −κ_αγ·(M_αγ − m_αγ) − κ_βγ·(M_βγ − m_βγ) + λ/2 ]" />
        <p>where P_close is the membrane-neck closing probability in the ESCRT-fission framework of Agudo-Canalejo & Lipowsky (exact barrier form pending verification against the original paper).</p>
        <h3 className="subsection">Route 2 — direct penetration, behind two gates</h3>
        <p>A droplet may also cross directly, at a rate gated by both the electrostatic window and the lipid affinity — an AND logic:</p>
        <Equation tex="v_pen = g_Δζ·g_Kp·k_pen·C_b,    g_Δζ = exp(−(Δζ − 35)²/200),    g_Kp = 1 / ( 1 + exp(−(K_p^lipid − 75)/5) )" />
        <DataTable head={["Gate / term", "Form", "Calibration"]} rows={gatingRows} />
        <p>Both gates are calibrated within the Lu et al. 2023 data window; behavior outside the window is an extrapolation of the chosen functional form, and shape sensitivity (Gaussian vs parabolic, Langmuir vs Hill) is on the open-items list.</p>
        <h3 className="subsection">Arrival in the cytoplasm</h3>
        <Equation tex="dC_cyto/dt = η_escape·v_endo + v_pen" />
        <p>Endocytosed material reaches the cytoplasm only with the endosomal-escape efficiency η_escape (typically well below 1; pending), whereas the penetration route delivers directly. If the project declares direct penetration as the design path, η_escape may provisionally be set to 1 — stated in limitations.</p>
        <DataTable head={["Parameter", "Meaning", "Value / range", "Source"]} rows={membraneParamRows} />
        <FigureSlot id="27" source="to be generated · E_total(φ) curve family" caption="Total energy E_total(φ) for a family of w_total values, showing how the R_min threshold emerges from the shape of the energy landscape." />
        <FigureSlot id="28" source="to be generated · gating phase diagram" caption="Penetration-rate gate in the (Δζ, K_p^lipid) plane, overlaid with the experimental phase map of Lu et al. 2023." />
        <FigureSlot id="29" source="to be generated · per-route entry curves" caption="η(t) = C_cyto(t)/C_total for one representative parameter set, colored by route (wrapping vs penetration)." />
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Module A · honest scope</p>
        <h2>What this model claims — and does not.</h2>
        <p>Equations (1)–(2) are directly adopted from Langmuir adsorption kinetics. The wrapping dynamics is a passive adhesion–wetting gradient flow calibrated on coacervate–vesicle experiments (Lu et al., 2022, 2023); in living cells, active endocytosis may act on top of this passive path, and our estimate therefore serves as a lower bound. The membrane is assumed to conform to the droplet surface in the contact region, valid when the adhesion energy density is small compared with the droplet interfacial tension (w_total ≪ γ_d); complete wrapping requires R &gt; R_min. The electrostatic adhesion window is calibrated within Δζ ∈ [25, 45] mV; behavior outside this window is an extrapolation of the chosen functional form. Internalized droplets reach the cytoplasm with endosomal-escape efficiency η_escape, whereas the direct-penetration path delivers to the cytoplasm directly.</p>
        <p>Three further declarations: the electrostatic and lipid adhesion channels are assumed independent (linearly additive w_total, consistent with the AND-gated penetration route — both rest on the same independence assumption); φ = 0 is a fixed point, so simulations start from a finite initial contact angle φ₀ &gt; 0; and near threshold, where the barrier is small, thermal fluctuations (a Langevin noise term obeying the fluctuation–dissipation relation) would raise the wrapping probability above what the deterministic equation predicts.</p>
        <h3 className="subsection">Numerical self-checks before any figure is trusted</h3>
        <DataTable head={["Check", "Value / condition", "Why it matters"]} rows={selfCheckRows} />
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Module B · getting through the nuclear pore</p>
        <h2>Four passive steps to a nuclear efficiency.</h2>
        <p>Once in the cytoplasm, the droplet must find the nucleus and cross the FG-nucleoporin mesh of the nuclear pore. We model nuclear entry as four serial kinetic steps — perinuclear accumulation, FG-Nup binding, coupled partitioning and deformation, and release — all passive, so the chain ends at a thermodynamic equilibrium whose nuclear fraction is set entirely by partition coefficients.</p>
        <h3 className="subsection">Step 1 — perinuclear trapping, with a testable signature</h3>
        <p>Organelle-dense perinuclear regions act as reversible traps. A two-state (free / trapped) reaction–diffusion system gives</p>
        <Equation tex="∂C_f/∂t = ∂_r[D₀·∂_r C_f] − k_on^trap(r)·C_f + k_off^trap·C_t − J_bind" />
        <Equation tex="∂C_t/∂t = k_on^trap(r)·C_f − k_off^trap·C_t" />
        <p>with K_trap(r) = k_on^trap/k_off^trap large in the perinuclear shell. At steady state the total (free + trapped) perinuclear-to-cytoplasmic signal ratio equals 1 + K_trap — a directly testable prediction against fluorescence imaging. An honest caveat: the equilibrium free concentration stays uniform everywhere; trapping does not raise the free concentration at the pore, nor directly accelerate FG binding. Its gain is kinetic — a deployable local reservoir near the nuclear membrane that boosts early entry flux on the ~120 s transient scale.</p>
        <h3 className="subsection">Step 2 — FG-Nup binding, by mass action</h3>
        <Equation tex="dC_bound/dt = J_bind − k_off^FG·C_bound − J_partition,        J_bind = k_on^FG·C_FG-Nup·C_f(R_N, t)" />
        <p>C_FG-Nup denotes the cargo-specific FG-nucleoporins (Nup62, Nup98, ...); changing the cargo means swapping this concentration and the two rates — the model's generalization entry point. In the well-mixed limit the pair collapses to a pseudo-first-order strength K_FG* = k_on^FG·C_FG-Nup/k_off^FG.</p>
        <h3 className="subsection">Step 3 — partitioning and deformation, in one free energy</h3>
        <p>Partitioning into the FG phase and the shape of the droplet–FG boundary are two views of one thermodynamics:</p>
        <Equation tex="F = ∫[ f(C) + (κ_CH/2)·|∇C|² ] dV + ∫_∂Ω γ dA" />
        <Equation tex="μ = δF/δC = f′(C) − κ_CH·∇²C,        ∂C/∂t = ∇·( M_CH·∇μ )" />
        <p>The |∇C|² term describes the diffuse concentration transition inside the FG phase; the surface integral tracks the sharp droplet–FG boundary through the contact area A(t) — two different geometric objects, with no double counting of interface energy. That boundary relaxes in Allen–Cahn form, v_n = −M_n·(δF/δn), which cleanly absorbs the curvature driving force that an earlier mixed-form equation could not dimensionally combine. In the well-mixed limit, partitioning reduces to a relaxation exchange flux:</p>
        <Equation tex="J_partition = k_relax(A)·( K_p^NPC·C_bound − C_NPC ),        dA/dt = k_deform·( A_eq(C_NPC) − A )" />
        <p>so that exchange stops exactly at the partition coefficient — C_NPC = K_p^NPC·C_bound — and conservation closes by construction.</p>
        <h3 className="subsection">Step 4 — release, and an optional ratchet</h3>
        <Equation tex="J_release = k_release·( C_NPC − C_nuc/K_p^nuc )" />
        <Equation tex="dC_nuc/dt = J_release − k_target·C_nuc,        dC_target/dt = k_target·C_nuc" />
        <p>Release is driven by the chemical-potential gradient (linear Onsager relation). The nucleoplasmic sink k_target has a direct biological basis — ALKBH5 is an m⁶A demethylase that binds nuclear m⁶A RNA after entry — and when active it acts as an equivalent ratchet, sequestering delivered material out of the mobile pool. Setting k_target = 0 recovers pure equilibrium partitioning; both settings are declared.</p>
      </section>
      <section className="content-section">
        <p className="eyebrow">Module B · the full system</p>
        <DataTable head={["Eq.", "Form", "Meaning"]} rows={nuclearSystemRows} />
        <p>Conservation holds by construction: dC_total/dt = 0 at machine precision, with the k_target term an internal transfer rather than a loss. Before any numerical result is trusted, the implementation must pass: J_partition = 0 ⇔ C_NPC = K_p^NPC·C_bound; J_release = 0 ⇔ C_nuc = K_p^nuc·C_NPC; steady perinuclear enrichment → 1 + K_trap; and no internal maximum in the concentration field when trapping is switched off.</p>
      </section>
      <section className="content-section narrow">
        <p className="eyebrow">Module B · equilibrium ceiling and the 120-second question</p>
        <h2>All steps passive means a partition-set ceiling.</h2>
        <p>Because every step is passive, the chain relaxes to an equilibrium where each adjacent pair sits at its partition ratio:</p>
        <DataTable head={["Step", "Equilibrium", "Note"]} rows={equilibriumRows} />
        <p>With k_target = 0, the long-time nuclear fraction is</p>
        <Equation tex="η(∞) = K_p^NPC · K_p^nuc · K_FG* / [ (1 + K_trap) + K_FG*·( 1 + K_p^NPC + K_p^NPC·K_p^nuc ) ]" />
        <p>which is generally below 1. The experimentally observed "~120 s to complete entry" is therefore restated precisely as: reaching 95% of the equilibrium efficiency takes t₉₅ = 120 s, which calibrates k_release and the relative rate constants. If experiments instead show near-complete entry, two self-consistent readings exist: acknowledge an unmodeled non-equilibrium driver, or activate the k_target &gt; 0 ratchet — we prefer the ratchet, which is physically self-consistent and leaves the framework untouched.</p>
        <h3 className="subsection">What physically crosses the pore</h3>
        <p>Condensate droplets are typically ≥ 100 nm across; the NPC central channel is ~40–50 nm. This model adopts the wetting-through variant: the condensate deforms and traverses the FG phase as a coherent liquid, consistent with the Cahn–Hilliard module above and with Wang et al. 2023. A monomer-shuttling variant — droplets disassemble at the pore, cross as monomers or oligomers, and reassemble in the nucleoplasm (the Frey 2018 framework describes exactly monomer passage) — is kept as a supplement; in it, the partitioning objects become monomer concentrations and the droplet acts as a slow reservoir. The two variants are distinguishable in time-series imaging: droplets shrinking at the pore support monomer shuttling; droplets passing intact (stretched) support wetting-through. Verification pending.</p>
        <FigureSlot id="30" source="to be generated · perinuclear enrichment prediction" caption="Predicted steady-state perinuclear-to-cytoplasmic total signal ratio 1 + K_trap, to be compared directly with fluorescence imaging." />
        <FigureSlot id="31" source="to be generated · nuclear entry time courses" caption="η_nuclear(t) with the t₉₅ = 120 s marker, for k_target = 0 (equilibrium ceiling) and k_target > 0 (ratchet)." />
        <DataTable head={["Parameter group", "Source type", "Notes"]} rows={paramSourceRows} />
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">The discriminating experiment</p>
        <h2>Four groups, one mechanism.</h2>
        <p>The chain distinguishes active NLS-driven import from condensation acting as a passive nuclear sink, and a four-group blocking assay reads the answer off directly: ± NLS crossed with ± pore/importin inhibition. The prediction is near-zero nuclear enrichment only when the NLS is absent and import is blocked at the same time; any single defect still leaves a route in. That signature — an AND, not an OR — is what separates the two mechanisms and is the wet-lab contract this page is written against.</p>
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">Status</p>
        <h2>What is frozen, what is pending.</h2>
        <p>The equation structure, the conservation closure, and the honest declarations above are fixed. All kinetic parameters are literature-anchored or dimensionless simulation values pending measurement; the manuscripts carry an explicit confirmation list that must be cleared before quantitative predictions are frozen:</p>
        <DataTable head={["#", "Open item", "Affects"]} rows={openItemRows} />
        <p><strong>Figures.</strong> All figure panels above are placeholders; each marks the insertion point and the intended content. Final images will be embedded once generated and uploaded through the iGEM asset system.</p>
        <aside className="context-links">
          <p>Related reading</p>
          <Link to="/model/condensate-simulation">
            Dry Lab · Condensate Simulation
          </Link>
          <Link to="/experiments">
            Wet Lab · Experiments
          </Link>
        </aside>
      </section>

      <section className="content-section narrow">
        <p className="eyebrow">References</p>
        <ol>
          {references.map((ref) => <li key={ref.slice(0, 60)}>{ref}</li>)}
        </ol>
      </section>
    </>
  );
}
