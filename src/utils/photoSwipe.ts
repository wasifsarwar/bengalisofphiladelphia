/** Ignore taps and vertical scrolling; return the horizontal browse direction. */
export function photoSwipe(dx: number, dy: number, threshold = 48): -1 | 0 | 1 {
  if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy) * 1.4) return 0;
  return dx < 0 ? 1 : -1;
}
