"use client";

import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function KontakPage() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
            Hubungi Kami
          </span>

          <h1 className="mt-6 text-4xl lg:text-6xl font-bold text-gray-900">
            Kami Siap Membantu
            <br />
            Kebutuhan Properti Anda
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Punya pertanyaan, ingin konsultasi, atau mencari properti
            impian? Tim Namura Property siap membantu Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <div className="border border-gray-100 rounded-[32px] p-8 lg:p-10">
            <h2 className="text-2xl font-semibold text-gray-900">
              Kirim Pesan
            </h2>

            <p className="mt-2 text-gray-500">
              Isi formulir berikut dan tim kami akan segera menghubungi Anda.
            </p>

            <div className="space-y-5 mt-8">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-[#0F6A6A] transition"
              />

              <input
                type="email"
                placeholder="Alamat Email"
                className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-[#0F6A6A] transition"
              />

              <input
                type="text"
                placeholder="Nomor Telepon"
                className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-[#0F6A6A] transition"
              />

              <textarea
                rows={6}
                placeholder="Tulis pesan Anda..."
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#0F6A6A] transition resize-none"
              />

              <button className="w-full h-14 rounded-full bg-[#0F6A6A] text-white font-medium hover:bg-[#0C5A5A] transition">
                Kirim Pesan
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-100 rounded-[28px] p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0F6A6A]/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#0F6A6A]" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Alamat
              </h3>

              <p className="mt-2 text-gray-600">
                Lampung Selatan,
                <br />
                Indonesia
              </p>
            </div>

            <div className="border border-gray-100 rounded-[28px] p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0F6A6A]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#0F6A6A]" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Email
              </h3>

              <p className="mt-2 text-gray-600">
                namuraproperty@gmail.com
              </p>
            </div>

            <div className="border border-gray-100 rounded-[28px] p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0F6A6A]/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#0F6A6A]" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Telepon
              </h3>

              <p className="mt-2 text-gray-600">
                +62 813 6938 1111
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-[32px] border border-gray-100">
          <iframe
            src="https://maps.google.com/maps?q=lampung&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[450px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}