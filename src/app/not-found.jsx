import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">

        <h1 className="text-6xl font-semibold text-gray-900 mb-4">
          404
        </h1>

        <h2 className="text-xl font-medium text-gray-800 mb-3">
          Halaman tidak ditemukan
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm hover:opacity-90 transition"
        >
          Kembali ke Beranda
        </Link>

      </div>
    </section>
  );
}