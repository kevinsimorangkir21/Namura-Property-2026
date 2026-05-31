export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">

      <div className="h-[400px] bg-gray-200 rounded-xl mb-10" />

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 w-3/4 rounded" />
          <div className="h-4 bg-gray-200 w-1/2 rounded" />
          <div className="h-4 bg-gray-200 w-full rounded" />
        </div>

        <div className="h-[200px] bg-gray-200 rounded-xl" />
      </div>

    </div>
  );
}