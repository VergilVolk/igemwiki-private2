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
  // Wet-lab engineering cycle (staged in uploads-staging/wet-cycle/)
  wetConstructPrediction: "", // Figure 32 · D1.1 structure prediction
  wetPmalDesign: "",          // Figure 34 · pMAL-c5x construct map
  wetProteaseScheme: "",      // Figure 35 · protease-site architecture
  wetSecGel: "",              // Figure 37 · purification / gel record
  wetConfocal: "",            // Figure 38 · confocal record

  // Official graphics
  villageFoundationalAdvance: "", // Figure 39 · official Foundational Advance village graphic
} as const;
