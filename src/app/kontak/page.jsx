"use client";

import { useState } from "react";
import {
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const WHATSAPP_NUMBER = "6281369381111";

export default function KontakPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name || !phone || !message) {
      setError("Mohon lengkapi semua field terlebih dahulu.");
      return;
    }

    const whatsappMessage = [
      "Halo Namura Property,",
      "",
      "Saya ingin mendapatkan informasi mengenai properti.",
      "",
      `Nama: ${name}`,
      `No. WhatsApp: ${phone}`,
      "",
      "Pesan:",
      message,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="mx-auto max-w-[780px] text-center">

            {/* BADGE */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
              <MessageCircle size={13} />
              Hubungi Kami
            </span>

            {/* HEADING */}
            <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl xl:text-[54px]">
              Kami Siap Membantu
              <span className="block text-[#0F6A6A]">
                Kebutuhan Properti Anda
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
              Punya pertanyaan, ingin konsultasi, atau sedang mencari
              properti impian? Hubungi tim Namura Property melalui WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT CONTENT
      ========================================================= */}
      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

            {/* ===================================================
                WHATSAPP FORM
            =================================================== */}
            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F6A6A]/[0.07]">
                  <MessageCircle
                    size={19}
                    className="text-[#0F6A6A]"
                  />
                </span>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-950">
                  Konsultasi via WhatsApp
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
                  Isi data di bawah ini. Setelah menekan tombol, Anda akan
                  diarahkan langsung ke WhatsApp untuk mengirim pesan kepada
                  tim kami.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Nama Lengkap
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    className="h-13 w-full rounded-2xl border border-gray-200 bg-white px-5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.07]"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Nomor WhatsApp
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Contoh: 081234567890"
                    autoComplete="tel"
                    inputMode="tel"
                    className="h-13 w-full rounded-2xl border border-gray-200 bg-white px-5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.07]"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Pesan
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Contoh: Saya tertarik dengan rumah di Lampung Selatan..."
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm leading-6 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.07]"
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#0F6A6A] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,106,106,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0C5A5A] hover:shadow-[0_12px_30px_rgba(15,106,106,0.2)] active:translate-y-0"
                >
                  <MessageCircle size={17} />

                  Kirim via WhatsApp

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  Anda akan diarahkan ke WhatsApp untuk mengirim pesan.
                </p>
              </form>
            </div>

            {/* ===================================================
                CONTACT INFORMATION
            =================================================== */}
            <div className="flex flex-col gap-5">

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F6A6A]/20 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:p-7"
              >
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F6A6A]/[0.07]">
                    <MessageCircle
                      size={21}
                      className="text-[#0F6A6A]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                      WhatsApp
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      +62 813 6938 1111
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Chat langsung dengan tim Namura Property.
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F6A6A]">
                      Mulai Percakapan
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>

                </div>
              </a>

              {/* PHONE */}
              <a
                href="tel:+6281369381111"
                className="group rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F6A6A]/20 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:p-7"
              >
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F6A6A]/[0.07]">
                    <Phone
                      size={20}
                      className="text-[#0F6A6A]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                      Telepon
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      +62 813 6938 1111
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Hubungi kami untuk kebutuhan informasi properti.
                    </p>
                  </div>

                </div>
              </a>

              {/* ADDRESS */}
              <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F6A6A]/[0.07]">
                    <MapPin
                      size={20}
                      className="text-[#0F6A6A]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                      Alamat
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      Kantor Namura Property
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Jl. Karimun Sukarame,
                      <br />
                      Bandar Lampung, Indonesia
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* =====================================================
              MAP
          ===================================================== */}
          <div className="mt-10 overflow-hidden rounded-[28px] border border-gray-100 bg-gray-50 shadow-sm sm:mt-12 sm:rounded-[32px]">

            <div className="relative h-[320px] sm:h-[400px] lg:h-[450px]">
              <iframe
                src="https://maps.google.com/maps?q=-5.3909822,105.3110481&z=17&output=embed"
                title="Lokasi Namura Property"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}