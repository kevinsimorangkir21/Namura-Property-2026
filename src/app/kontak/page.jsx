"use client";

import { useState } from "react";

import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  Clock,
  ArrowUpRight,
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
    <main className="overflow-hidden bg-white text-[var(--foreground)]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="bg-white">
        <div className="container py-12 sm:py-14 lg:py-16">
          <div className="max-w-[760px]">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Hubungi Kami
            </span>

            <h1 className="heading-xl mt-4">
              Mari bicarakan
              <span className="block text-[var(--primary)]">
                kebutuhan properti Anda.
              </span>
            </h1>

            <p className="text-body mt-5 max-w-[650px]">
              Punya pertanyaan, ingin konsultasi, atau sedang mencari
              properti? Tim Namura Property siap membantu Anda menemukan
              pilihan yang sesuai dengan kebutuhan.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT CONTENT
      ========================================================= */}
      <section className="bg-white">
        <div className="container pb-14 sm:pb-16 lg:pb-20">
          <div className="grid items-start gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
            {/* =================================================
                FORM
            ================================================= */}
            <div className="rounded-[26px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-8 lg:p-9">
              {/* HEADER */}
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <MessageCircle size={20} />
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Konsultasi via WhatsApp
                </h2>

                <p className="mt-2 max-w-[560px] text-sm leading-6 text-[var(--muted)] sm:text-base">
                  Isi data singkat di bawah ini. Setelah dikirim, Anda akan
                  diarahkan langsung ke WhatsApp tim Namura Property.
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4.5"
              >
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
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
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--soft)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
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
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--soft)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
                  >
                    Pesan
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Contoh: Saya tertarik dengan rumah di Lampung Selatan..."
                    className="w-full resize-none rounded-xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--soft)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="btn btn-primary group h-12 w-full justify-center rounded-xl"
                >
                  <MessageCircle size={17} />

                  Kirim via WhatsApp

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[var(--soft)]">
                  <CheckCircle2
                    size={14}
                    className="text-[var(--primary)]"
                  />

                  <span>
                    Pesan akan diteruskan langsung ke WhatsApp Namura Property
                  </span>
                </div>
              </form>
            </div>

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}
            <div className="space-y-4">
              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:shadow-[var(--shadow-lg)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                    <MessageCircle size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                          WhatsApp
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
                          +62 813 6938 1111
                        </h3>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-[var(--soft)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                      />
                    </div>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      Chat langsung dengan tim Namura Property.
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]">
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
                className="group block rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:shadow-[var(--shadow-lg)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                    <Phone size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                          Telepon
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
                          +62 813 6938 1111
                        </h3>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-[var(--soft)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                      />
                    </div>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      Hubungi kami untuk kebutuhan informasi properti.
                    </p>
                  </div>
                </div>
              </a>

              {/* OFFICE */}
              <div className="rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                      Alamat
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
                      Kantor Namura Property
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      Jl. Karimun Sukarame,
                      <br />
                      Bandar Lampung, Indonesia
                    </p>
                  </div>
                </div>
              </div>

              {/* OFFICE HOURS */}
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--primary)]">
                    <Clock size={19} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                      Layanan
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
                      Konsultasi Properti
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      Hubungi tim kami melalui WhatsApp untuk mendapatkan
                      informasi lebih lanjut.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              MAP
          ===================================================== */}
          <div className="mt-8 overflow-hidden rounded-[26px] border border-[var(--border)] bg-[var(--surface-muted)] shadow-[var(--shadow-sm)] sm:mt-10 sm:rounded-[28px]">
            <div className="flex flex-col gap-3 border-b border-[var(--border)] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                  <MapPin size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[var(--foreground)] sm:text-base">
                    Lokasi Namura Property
                  </h2>

                  <p className="text-xs text-[var(--muted)]">
                    Bandar Lampung, Indonesia
                  </p>
                </div>
              </div>

              <span className="text-xs font-medium text-[var(--primary)]">
                Jl. Karimun Sukarame
              </span>
            </div>

            <div className="relative h-[280px] sm:h-[360px] lg:h-[420px]">
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