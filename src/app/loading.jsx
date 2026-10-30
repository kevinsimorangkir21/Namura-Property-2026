export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Memuat"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[var(--background)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(15,106,106,0.18), transparent 40%), radial-gradient(circle at 80% 85%, rgba(15,106,106,0.12), transparent 42%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl motion-safe:animate-pulse"
      />

      <div
        aria-hidden="true"
        className="glass-strong relative flex h-28 w-28 items-center justify-center rounded-[var(--radius-xl)]"
      >
        <span className="absolute h-14 w-14 rounded-full bg-[var(--primary)]/20 motion-safe:animate-ping" />

        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-[3px] border-[var(--primary)]/15" />
          <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[var(--primary)] motion-safe:animate-spin" />
          <span className="absolute inset-[9px] rounded-full border-[3px] border-transparent border-b-[var(--primary)]/45 motion-safe:animate-[spin_1.4s_linear_infinite_reverse]" />
        </div>
      </div>
    </div>
  );
}