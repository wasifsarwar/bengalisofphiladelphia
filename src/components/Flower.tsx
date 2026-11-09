export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="40" cy="21" rx="7" ry="16" transform={`rotate(${i * 45} 40 40)`} stroke="currentColor" strokeWidth="1.3" />
      ))}
      <circle cx="40" cy="40" r="5" fill="currentColor" />
    </svg>
  );
}

