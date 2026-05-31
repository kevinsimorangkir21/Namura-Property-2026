export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      <div className="flex flex-col items-center gap-4">

        {/* SPINNER */}
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--primary)] rounded-full animate-spin" />

        <p className="text-sm text-gray-400">
          Memuat halaman...
        </p>

      </div>

    </div>
  );
}