export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 h-[420px] animate-pulse rounded-3xl bg-surface" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass overflow-hidden rounded-2xl">
            <div className="aspect-[4/3] animate-pulse bg-surface" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-surface" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-surface" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
