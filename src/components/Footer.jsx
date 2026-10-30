import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const navigation = [
  {
    title: "Navigasi",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Daftar Properti", href: "/daftar-properti" },
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Artikel", href: "/artikel" },
      { label: "Karir", href: "/karir" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Layanan", href: "/layanan" },
      { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
      { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    ],
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
];

const contacts = [
  {
    label: "Telepon",
    value: "+62 813 6938 1111",
    href: "tel:+6281369381111",
    icon: Phone,
  },
  {
    label: "Email",
    value: "namuraproperty@gmail.com",
    href: "mailto:namuraproperty@gmail.com",
    icon: Mail,
  },
  {
    label: "Alamat",
    value: "Jl. Karimun Sukarame, Bandar Lampung, Indonesia",
    href: "https://www.google.com/maps/search/?api=1&query=Jl.+Karimun+Sukarame+Bandar+Lampung",
    icon: MapPin,
    external: true,
  },
];

const glassSurface =
  "border border-white/10 bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B1717] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#0F6A6A]/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#0F6A6A]/20 blur-[110px]"
      />

      <div className="container relative pt-16 sm:pt-20 lg:pt-24">
        <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_45%),#0F6A6A] px-6 py-10 shadow-[0_20px_60px_rgba(15,106,106,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] sm:rounded-[32px] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Temukan Properti Anda
              </span>

              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[42px]">
                Siap menemukan hunian yang tepat?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                Jelajahi pilihan properti Namura dan temukan hunian yang sesuai
                dengan kebutuhan, lokasi, dan rencana masa depan Anda.
              </p>
            </div>

            <Link
              href="/daftar-properti"
              className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#0F6A6A] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F4FAF9] hover:shadow-xl sm:h-14 sm:w-auto"
            >
              Lihat Properti
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="container relative pt-16 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_0.75fr_1.1fr] lg:gap-12 lg:pb-16">
          <div className="max-w-[390px] md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Namura Property - Beranda"
            >
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={160}
                height={60}
                className="h-auto w-[145px] object-contain sm:w-[160px]"
              />
            </Link>

            <p className="mt-6 max-w-[360px] text-sm leading-7 text-white/55">
              Menghadirkan solusi properti modern dengan pilihan hunian yang
              berkualitas, lokasi strategis, dan nilai yang tumbuh bersama
              masa depan Anda.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`${glassSurface} flex h-11 w-11 items-center justify-center rounded-full text-white/65 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white hover:text-[#0B1717]`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>

            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Partner Pembiayaan
              </p>

              <div className="mt-3 inline-flex items-center rounded-2xl border border-white/60 bg-white/90 px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
                <Image
                  src="/Logo/btn.png"
                  alt="BTN"
                  width={100}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:contents">
            {navigation.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-sm font-semibold text-white">
                  {column.title}
                </h3>

                <ul className="mt-4 space-y-1 sm:mt-5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex min-h-10 items-center gap-1 text-sm text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          strokeWidth={1.8}
                          className="hidden opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70 sm:block"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white">Hubungi Kami</h3>

            <ul className="mt-4 space-y-3 sm:mt-5">
              {contacts.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`${glassSurface} group flex items-start gap-3 rounded-2xl p-3.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09]`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0F6A6A]/30 text-[#69C2C2]">
                        <Icon size={16} strokeWidth={1.8} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                          {item.label}
                        </span>
                        <span className="mt-1 block break-words text-sm leading-6 text-white/70 transition-colors duration-200 group-hover:text-white">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col gap-2 border-t border-white/10 pt-7 text-xs text-white/40 sm:text-sm md:flex-row md:items-center md:justify-between"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 28px)" }}
        >
          <p>
            © {new Date().getFullYear()} Namura Property. All rights reserved.
          </p>
          <p className="text-white/50">Dev by Namura Team</p>
        </div>
      </div>
    </footer>
  );
}