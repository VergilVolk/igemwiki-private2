import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const top = frameRef.current?.getBoundingClientRect().top ?? window.innerHeight;
      const travelled = Math.max(0, Math.min(1, (window.innerHeight - top) / (window.innerHeight * 0.75)));
      setProgress(travelled);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="video-frame"
      ref={frameRef}
      style={{ opacity: 1 - progress * 0.92, transform: `translateY(${progress * -30}px) scale(${1 - progress * 0.04})` }}
    >
      <iframe
        src="https://video.igem.org/videos/embed/gof2hJXkHcuybs2ANY9euE?autoplay=1&muted=1"
        title="NucleArk project promotion"
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>
  );
}
