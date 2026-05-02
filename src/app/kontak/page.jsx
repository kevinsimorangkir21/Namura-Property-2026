"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function KontakPage() {
  return (
    <section className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* ================= HEADER ================= */}
        <div className="text-center md:text-left mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Kontak Kami
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto md:mx-0 text-sm md:text-base">
            Punya pertanyaan atau ingin konsultasi properti? Hubungi kami sekarang.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* ================= FORM ================= */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">

            <h3 className="font-semibold text-gray-900 mb-6">
              Kirim Pesan
            </h3>

            <div className="space-y-4">

              <input
                placeholder="Nama"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-sm outline-none focus:ring-0 border-none"
              />

              <input
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-sm outline-none focus:ring-0 border-none"
              />

              <textarea
                placeholder="Pesan"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-sm outline-none focus:ring-0 border-none"
              />

              <button className="w-full bg-[var(--primary)] text-white py-3 rounded-full text-sm hover:opacity-90 transition">
                Kirim Pesan
              </button>

            </div>

          </div>

          {/* ================= INFO ================= */}
          <div className="flex flex-col justify-between gap-8">

            <div className="space-y-6">

              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-[var(--primary)] mt-1" />
                <div>
                  <p className="font-medium text-gray-900">
                    Alamat
                  </p>
                  <p className="text-gray-500 text-sm">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-[var(--primary)] mt-1" />
                <div>
                  <p className="font-medium text-gray-900">
                    Email
                  </p>
                  <p className="text-gray-500 text-sm">
                    info@namura.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="w-5 h-5 text-[var(--primary)] mt-1" />
                <div>
                  <p className="font-medium text-gray-900">
                    Telepon
                  </p>
                  <p className="text-gray-500 text-sm">
                    +62 812 3456 7890
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= MAP ================= */}
      <div className="w-full h-[300px] md:h-[400px]">
        <iframe
          src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

    </section>
  );
}