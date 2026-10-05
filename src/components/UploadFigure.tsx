interface UploadFigureProps {
  id: string;
  url: string;
  label: string;
  caption: string;
}

/**
 * Renders a wiki figure whose image must live on static.igem.wiki (iGEM
 * requirement: images are uploaded through the official uploads tool, which
 * returns the URL). While `url` is empty the figure shows an upload
 * placeholder; as soon as the URL is provided in src/uploads.ts, the real
 * image is displayed.
 */
export function UploadFigure({ id, url, label, caption }: UploadFigureProps) {
  if (!url) {
    return (
      <figure className="figure-slot">
        <p className="figure-tag">[ Figure {id} — awaiting upload ]</p>
        <p>{caption}</p>
        <p className="figure-source">Image to be uploaded via the iGEM uploads tool; the returned static.igem.wiki URL goes into <code>src/uploads.ts</code>.</p>
      </figure>
    );
  }
  return (
    <figure className="figure-media">
      <img src={url} alt={caption} loading="lazy" />
      <figcaption><span>{label}</span>{caption}</figcaption>
    </figure>
  );
}
