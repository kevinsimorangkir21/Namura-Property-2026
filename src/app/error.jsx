"use client";

export default function Error({ error, reset }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="text-center max-w-md">

        <h1 className="text-4xl font-semibold text-gray-900 mb-4">
          Terjadi Kesalahan
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          Maaf, terjadi kesalahan saat memuat halaman.
        </p>

        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm"
        >
          Coba Lagi
        </button>

      </div>
    </section>
  );
}