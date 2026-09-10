export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container section">
        {/* Header Skeleton */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-7 w-36 animate-pulse rounded-full bg-[var(--surface-muted)]" />

          <div className="mx-auto mt-6 h-12 w-72 animate-pulse rounded-xl bg-[var(--surface-muted)] sm:h-14 sm:w-96" />

          <div className="mx-auto mt-4 h-4 w-full max-w-xl animate-pulse rounded-md bg-[var(--surface-muted)]" />

          <div className="mx-auto mt-2 h-4 w-4/5 max-w-md animate-pulse rounded-md bg-[var(--surface-muted)]" />
        </div>

        {/* Search Skeleton */}
        <div className="mx-auto mt-10 max-w-5xl sm:mt-12">
          <div
            className="
              rounded-[var(--radius-xl)]
              border border-[var(--border)]
              bg-white
              p-3
              shadow-[var(--shadow-md)]
              sm:p-4
            "
          >
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="h-14 flex-1 animate-pulse rounded-2xl bg-[var(--surface-muted)]" />

              <div className="flex gap-2">
                <div className="h-11 w-20 animate-pulse rounded-xl bg-[var(--surface-muted)]" />
                <div className="h-11 w-20 animate-pulse rounded-xl bg-[var(--surface-muted)]" />
                <div className="h-11 w-20 animate-pulse rounded-xl bg-[var(--surface-muted)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Result Header Skeleton */}
        <div className="mt-10 flex items-center justify-between border-b border-[var(--border-soft)] pb-6">
          <div className="h-4 w-40 animate-pulse rounded-md bg-[var(--surface-muted)]" />
          <div className="hidden h-4 w-24 animate-pulse rounded-md bg-[var(--surface-muted)] sm:block" />
        </div>

        {/* Property Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-[var(--radius-lg)]
                border border-[var(--border)]
                bg-white
                shadow-[var(--shadow-sm)]
              "
            >
              {/* Image */}
              <div className="aspect-[4/3] animate-pulse bg-[var(--surface-muted)]" />

              {/* Content */}
              <div className="space-y-4 p-5 sm:p-6">
                {/* Type */}
                <div className="h-3.5 w-20 animate-pulse rounded-full bg-[var(--surface-muted)]" />

                {/* Title */}
                <div className="h-5 w-4/5 animate-pulse rounded-md bg-[var(--surface-muted)]" />

                {/* Price */}
                <div className="h-5 w-2/5 animate-pulse rounded-md bg-[var(--surface-muted)]" />

                {/* Location */}
                <div className="h-4 w-3/5 animate-pulse rounded-md bg-[var(--surface-muted)]" />

                {/* Button */}
                <div className="h-10 w-full animate-pulse rounded-xl bg-[var(--surface-muted)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info Skeleton */}
        <div className="mt-12 flex justify-center border-t border-[var(--border-soft)] pt-8">
          <div className="h-4 w-72 animate-pulse rounded-md bg-[var(--surface-muted)]" />
        </div>
      </div>
    </main>
  );
}