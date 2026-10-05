export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[60vh] place-items-center">
      <span className="font-display text-2xl font-bold text-primary motion-safe:animate-pulse">PSYBET</span>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
