"use client";

import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const WHATSAPP_NUMBER = "6281369381111";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=-5.3909822,105.3110481";

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--foreground-soft)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-[var(--foreground)]";

const eyebrowClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-muted)]";

const iconBoxClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white";

const notchIconClass =
  "text-[var(--foreground)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]";

const PHONE_PATTERN = /^[0-9+\s-]{9,16}$/;

function InfoLink({ href, external, icon: Icon, label, title, desc, cta }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="notch-wrap notch-lift group block motion-reduce:hover:translate-y-0"
    >
      <div className="notch flex flex-col rounded-[24px] bg-[var(--surface-soft)] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className={iconBoxClass}>
            <Icon size={20} aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className={eyebrowClass}>{label}</p>
            <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
              {desc}
            </p>
          </div>
        </div>

        <span className="mt-4 flex min-h-11 items-center pr-20 text-sm font-semibold text-[var(--primary)]">
          {cta}
        </span>
      </div>

      <span className="notch-btn" aria-hidden="true">
        <ArrowUpRight size={26} strokeWidth={2.25} className={notchIconClass} />
      </span>
    </a>
  );
}

export default function KontakPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
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

    if (!PHONE_PATTERN.test(phone)) {
      setError("Nomor WhatsApp tidak valid. Gunakan angka, contoh: 081234567890.");
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
    <main className="overflow-x-clip bg-[var(--surface)] text-[var(--foreground)]">
      <section>
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
              Punya pertanyaan, ingin konsultasi, atau sedang mencari properti?
              Tim Namura Property siap membantu Anda menemukan pilihan yang
              sesuai dengan kebutuhan.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container pb-14 sm:pb-16 lg:pb-20">
          <div className="grid items-start gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-9">
            <div className="notch-wrap">
              <div className="notch rounded-[26px] bg-[var(--surface-soft)] p-6 sm:p-8 lg:p-9">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <MessageCircle size={20} aria-hidden="true" />
                </span>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Konsultasi via WhatsApp
                </h2>

                <p className="mt-2 max-w-[560px] text-sm leading-6 text-[var(--foreground-muted)] sm:text-base">
                  Isi data singkat di bawah ini. Setelah dikirim, Anda akan
                  diarahkan langsung ke WhatsApp tim Namura Property.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
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
                      className={`${inputClass} h-12`}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
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
                      className={`${inputClass} h-12`}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Contoh: Saya tertarik dengan rumah di Lampung Selatan..."
                      className={`${inputClass} resize-none py-3.5 leading-6`}
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--danger)]" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary group h-12 w-full justify-center rounded-xl"
                  >
                    <MessageCircle size={17} aria-hidden="true" />
                    Kirim via WhatsApp
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>

                  <p className="flex min-h-[48px] items-center gap-2 pr-20 text-xs leading-5 text-[var(--foreground-soft)]">
                    <CheckCircle2
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--primary)]"
                    />
                    Pesan akan diteruskan langsung ke WhatsApp Namura Property
                  </p>
                </form>
              </div>

              <span className="notch-btn" aria-hidden="true">
                <MessageCircle
                  size={24}
                  strokeWidth={2}
                  className="text-[var(--foreground)]"
                />
              </span>
            </div>

            <div className="space-y-4 lg:space-y-5">
              <InfoLink
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                external
                icon={MessageCircle}
                label="WhatsApp"
                title="+62 813 6938 1111"
                desc="Chat langsung dengan tim Namura Property."
                cta="Mulai Percakapan"
              />

              <InfoLink
                href="tel:+6281369381111"
                icon={Phone}
                label="Telepon"
                title="+62 813 6938 1111"
                desc="Hubungi kami untuk kebutuhan informasi properti."
                cta="Telepon Sekarang"
              />

              <InfoLink
                href={MAPS_URL}
                external
                icon={MapPin}
                label="Alamat"
                title="Kantor Namura Property"
                desc="Jl. Karimun Sukarame, Bandar Lampung, Indonesia"
                cta="Buka di Google Maps"
              />

              <div className="notch-wrap group">
                <div className="notch flex flex-col rounded-[24px] bg-[var(--surface-muted)] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--primary)]">
                      <Clock size={19} aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <p className={eyebrowClass}>Layanan</p>
                      <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
                        Konsultasi Properti
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                        Hubungi tim kami melalui WhatsApp untuk mendapatkan
                        informasi lebih lanjut.
                      </p>
                    </div>
                  </div>

                  <div className="min-h-11 pr-20" />
                </div>

                <span className="notch-btn" aria-hidden="true">
                  <CheckCircle2
                    size={24}
                    strokeWidth={2}
                    className="text-[var(--primary)]"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}