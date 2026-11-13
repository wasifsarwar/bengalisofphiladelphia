import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { signatures } from "../data/signatures";

type SignatureProps = { variant: "closing"; label: string };

export function EtchedSignature({ variant, label }: SignatureProps) {
  const root = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const signature = signatures[variant];
  useEffect(() => {
    const target = root.current;
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: .4 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className={`etched-signature etch-${variant}${started ? " is-etched" : ""}`}>
    <span className="signature-label">{label}</span>
    <svg viewBox={signature.viewBox} aria-hidden="true" className="signature-art">
      {signature.paths.map((path, index) => <g key={index} style={{ "--etch-delay": `${index * 180}ms` } as CSSProperties}>
        <path className="etch-ink" d={path} />
        <path className="etch-trace" d={path} pathLength="1" />
      </g>)}
      <path className="etch-rule" d={signature.rule} pathLength="1" />
      <circle className="etch-tip" r={1.6} style={{ offsetPath: `path("${signature.rule}")` }} />
    </svg>
  </div>;
}
