"use client";

export default function KarirPage() {
  return (
    <section className="bg-white">

      {/* ================= HERO ================= */}
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">

        <p className="text-sm text-gray-400 uppercase mb-3">
          Karir
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
          Bangun Karir Bersama <br className="hidden md:block" />
          Namura Property
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mb-10">
          Kami percaya tim yang hebat menciptakan properti berkualitas.
          Tumbuh bersama kami dan wujudkan masa depan yang lebih baik.
        </p>

        <a
          href="https://your-career-page.com"
          target="_blank"
          className="inline-block px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm hover:opacity-90 transition"
        >
          Lihat Lowongan
        </a>

      </div>

      {/* ================= TEAM PHOTO ================= */}
      <div className="max-w-6xl mx-auto px-6 pb-24">

        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img
            src="/team.jpg"
            alt="Tim Namura"
            className="w-full h-[300px] md:h-[450px] object-cover"
          />
        </div>

      </div>

      {/* ================= CULTURE VIDEO ================= */}
      <div className="max-w-5xl mx-auto px-6 pb-24 text-center">

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Budaya Kami
        </h2>

        <p className="text-gray-500 text-sm mb-10">
          Lihat bagaimana kami bekerja dan berkembang bersama.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-sm">
          <iframe
            className="w-full h-[220px] md:h-[420px]"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Company Culture"
            allowFullScreen
          />
        </div>

      </div>

      {/* ================= VALUES ================= */}
      <div className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-8 text-center">

          {[
            {
              title: "Kolaboratif",
              desc: "Kami bekerja sebagai satu tim untuk mencapai tujuan bersama.",
            },
            {
              title: "Bertumbuh",
              desc: "Kami mendukung perkembangan karir setiap individu.",
            },
            {
              title: "Profesional",
              desc: "Kami menjunjung tinggi kualitas dan integritas.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition duration-300"
            >
              <h3 className="font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* ================= GLASS CTA ================= */}
      <div className="max-w-5xl mx-auto px-6 pb-24">

        <div className="relative rounded-3xl p-10 text-center overflow-hidden">

          {/* GLASS EFFECT */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl"></div>

          {/* CONTENT */}
          <div className="relative z-10">

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Siap Bergabung?
            </h2>

            <p className="text-gray-600 text-sm mb-6">
              Temukan posisi yang cocok dan mulai perjalanan karirmu bersama kami.
            </p>

            <a
              href="https://your-career-page.com"
              target="_blank"
              className="inline-block px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm hover:opacity-90 transition"
            >
              Buka Halaman Karir
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}