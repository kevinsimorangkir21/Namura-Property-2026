export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container py-8 lg:py-10 animate-pulse">
        {/* =====================================================
            BREADCRUMB
        ====================================================== */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-16 rounded bg-[var(--surface-muted)]" />
          <div className="h-4 w-3 rounded bg-[var(--surface-muted)]" />
          <div className="h-4 w-20 rounded bg-[var(--surface-muted)]" />
          <div className="h-4 w-3 rounded bg-[var(--surface-muted)]" />
          <div className="h-4 w-40 rounded bg-[var(--surface-muted)]" />
        </div>

        {/* =====================================================
            PROPERTY IMAGE
        ====================================================== */}
        <div className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[var(--surface-muted)] h-[300px] sm:h-[420px] lg:h-[580px]">
          {/* Status */}
          <div className="absolute top-5 left-5 lg:top-7 lg:left-7">
            <div className="h-10 w-24 rounded-full bg-white/60" />
          </div>

          {/* Verified */}
          <div className="absolute top-5 right-5 lg:top-7 lg:right-7">
            <div className="h-10 w-36 rounded-full bg-white/40" />
          </div>

          {/* Bottom image content */}
          <div className="absolute left-5 right-5 bottom-5 lg:left-7 lg:right-7 lg:bottom-7">
            <div className="space-y-3">
              <div className="h-4 w-32 rounded bg-white/40" />

              <div className="h-9 sm:h-11 lg:h-14 w-3/4 max-w-2xl rounded bg-white/50" />

              <div className="h-5 w-48 rounded bg-white/40" />
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-12 lg:gap-16 items-start mt-14 lg:mt-20">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div className="min-w-0">
            {/* Status */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-20 rounded-full bg-[var(--surface-muted)]" />
              <div className="h-4 w-32 rounded bg-[var(--surface-muted)]" />
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="h-10 lg:h-12 w-4/5 rounded bg-[var(--surface-muted)]" />
              <div className="h-10 lg:h-12 w-2/5 rounded bg-[var(--surface-muted)]" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-5">
              <div className="w-5 h-5 rounded bg-[var(--surface-muted)]" />
              <div className="h-5 w-56 rounded bg-[var(--surface-muted)]" />
            </div>

            {/* =================================================
                PROPERTY SPECS
            ================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-10">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="p-5 rounded-[20px] border border-[var(--border)] bg-white"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-muted)]" />

                  <div className="h-3 w-20 rounded bg-[var(--surface-muted)] mt-4" />

                  <div className="h-4 w-12 rounded bg-[var(--surface-muted)] mt-2" />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border-soft)] my-12" />

            {/* =================================================
                DESCRIPTION
            ================================================== */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[var(--surface-muted)]" />

                <div className="h-7 w-48 rounded bg-[var(--surface-muted)]" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-[var(--surface-muted)]" />
                <div className="h-4 w-full rounded bg-[var(--surface-muted)]" />
                <div className="h-4 w-5/6 rounded bg-[var(--surface-muted)]" />
                <div className="h-4 w-4/6 rounded bg-[var(--surface-muted)]" />
              </div>
            </div>

            {/* =================================================
                SUMMARY
            ================================================== */}
            <div className="mt-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[var(--surface-muted)]" />

                <div>
                  <div className="h-6 w-52 rounded bg-[var(--surface-muted)]" />

                  <div className="h-3 w-64 rounded bg-[var(--surface-muted)] mt-2" />
                </div>
              </div>

              <div className="border border-[var(--border)] rounded-[24px] overflow-hidden">
                <div className="grid sm:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div
                      key={item}
                      className={`flex items-center justify-between gap-6 px-5 py-5 border-[var(--border-soft)]
                        ${
                          item % 2 === 1
                            ? "sm:border-r"
                            : ""
                        }
                        ${
                          item < 8
                            ? "border-b"
                            : ""
                        }
                      `}
                    >
                      <div className="h-4 w-24 rounded bg-[var(--surface-muted)]" />

                      <div className="h-4 w-20 rounded bg-[var(--surface-muted)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                TRUST BOX
            ================================================== */}
            <div className="mt-14 p-6 sm:p-8 rounded-[24px] bg-[var(--surface-muted)] border border-[var(--border)]">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white shrink-0" />

                <div className="flex-1">
                  <div className="h-5 w-56 rounded bg-white" />

                  <div className="h-4 w-full rounded bg-white mt-3" />

                  <div className="h-4 w-4/5 rounded bg-white mt-2" />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              CONTACT CARD
          ================================================== */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[28px] border border-[var(--border)] bg-white shadow-[var(--shadow-lg)] p-6 sm:p-7">
              <div className="h-4 w-40 rounded bg-[var(--surface-muted)]" />

              <div className="h-7 w-64 rounded bg-[var(--surface-muted)] mt-3" />

              <div className="space-y-2 mt-4">
                <div className="h-4 w-full rounded bg-[var(--surface-muted)]" />
                <div className="h-4 w-5/6 rounded bg-[var(--surface-muted)]" />
                <div className="h-4 w-4/6 rounded bg-[var(--surface-muted)]" />
              </div>

              {/* Price */}
              <div className="mt-7 p-5 rounded-2xl bg-[var(--surface-muted)]">
                <div className="h-3 w-24 rounded bg-white" />

                <div className="h-7 w-40 rounded bg-white mt-2" />
              </div>

              {/* CTA */}
              <div className="h-12 w-full rounded-xl bg-[var(--surface-muted)] mt-5" />

              <div className="h-12 w-full rounded-xl bg-[var(--surface-muted)] mt-3" />

              {/* Trust */}
              <div className="mt-7 pt-6 border-t border-[var(--border-soft)] space-y-5">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[var(--surface-muted)] shrink-0" />

                    <div className="flex-1">
                      <div className="h-4 w-40 rounded bg-[var(--surface-muted)]" />

                      <div className="h-3 w-32 rounded bg-[var(--surface-muted)] mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back link */}
            <div className="flex justify-center mt-5">
              <div className="h-4 w-44 rounded bg-[var(--surface-muted)]" />
            </div>
          </aside>
        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}
        <div className="mt-20 lg:mt-28 rounded-[28px] bg-[var(--surface-muted)] h-56 sm:h-48" />
      </div>
    </main>
  );
}