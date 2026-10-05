// All images on this wiki must be served from static.igem.wiki through the
// official uploads tool: https://teams.igem.org/go/deliverables/wiki/uploads
//
// 1. Upload the file with the tool; it returns a URL like
//    https://static.igem.wiki/teams/6195/2026/<file>.png
// 2. Paste that URL into the matching entry below.
//
// Any entry left as an empty string renders as a placeholder on the wiki and
// switches to the real image automatically once the URL is filled in.
// Source files waiting for upload are collected in uploads-staging/ (never
// bundled into the site — bundling images in src/ is not allowed).
export const UPLOADS = {
  // Wet-lab engineering cycle (uploaded to static.igem.wiki 2026-10)
  // File 4 is reserved for the pending purification-dataset figure (Figure 36).
  wetConstructPrediction: "https://static.igem.wiki/teams/6195/wiki/wiki-wetfig/1.avif", // Figure 32 · D1.1 structure prediction
  wetPmalDesign: "https://static.igem.wiki/teams/6195/wiki/wiki-wetfig/2.avif",          // Figure 34 · pMAL-c5x construct map
  wetProteaseScheme: "https://static.igem.wiki/teams/6195/wiki/wiki-wetfig/3.avif",      // Figure 35 · protease-site architecture
  wetSecGel: "https://static.igem.wiki/teams/6195/wiki/wiki-wetfig/5.avif",              // Figure 37 · purification / gel record
  wetConfocal: "https://static.igem.wiki/teams/6195/wiki/wiki-wetfig/6.avif",            // Figure 38 · confocal record

  // Official graphics
  villageFoundationalAdvance: "", // Figure 39 · official Foundational Advance village graphic
} as const;
