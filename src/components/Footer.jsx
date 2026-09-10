"use client";

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
  {
    label: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "#",
    icon: Facebook,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1717] text-white">
      {/* =====================================================
          CTA
      ====================================================== */}
      <div className="container pt-16 sm:pt-20 lg:pt-24">
        <div
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-white/[0.08]
            bg-[#0F6A6A]
            px-6 py-10
            sm:rounded-[32px]
            sm:px-10 sm:py-12
            lg:px-14 lg:py-14
          "
        >
          {/* Decorative glow */}
          <div
            className="
              pointer-events-none
              absolute -right-24 -top-32
              h-72 w-72
              rounded-full
              bg-white/[0.08]
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute -bottom-32 -left-20
              h-64 w-64
              rounded-full
              bg-black/[0.08]
              blur-3xl
            "
          />

          <div
            className="
              relative z-10
              flex flex-col gap-8
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* CTA Content */}
            <div className="max-w-2xl">
              <span
                className="
                  inline-flex items-center gap-2
                  text-xs font-semibold
                  uppercase tracking-[0.16em]
                  text-white/70
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Temukan Properti Anda
              </span>

              <h2
                className="
                  mt-4 max-w-xl
                  text-3xl font-bold
                  leading-tight tracking-tight
                  sm:text-4xl
                  lg:text-[42px]
                "
              >
                Siap menemukan hunian yang tepat?
              </h2>

              <p
                className="
                  mt-4 max-w-xl
                  text-sm leading-6
                  text-white/75
                  sm:text-base
                "
              >
                Jelajahi pilihan properti Namura dan temukan hunian yang sesuai
                dengan kebutuhan, lokasi, dan rencana masa depan Anda.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/daftar-properti"
              className="
                group
                inline-flex
                h-12
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-6
                text-sm
                font-semibold
                text-[#0F6A6A]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#F4FAF9]
                hover:shadow-xl
                sm:h-13
                sm:px-7
              "
            >
              Lihat Properti

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <div className="container pt-16 sm:pt-20 lg:pt-24">
        <div
          className="
            grid
            gap-12
            pb-14
            lg:grid-cols-[1.5fr_0.75fr_0.75fr_1fr]
            lg:gap-12
            lg:pb-16
          "
        >
          {/* =================================================
              BRAND
          ================================================== */}
          <div className="max-w-[390px]">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Namura Property"
            >
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={160}
                height={60}
                priority
                className="h-auto w-[145px] object-contain sm:w-[160px]"
              />
            </Link>

            <p
              className="
                mt-6 max-w-[360px]
                text-sm leading-7
                text-white/50
              "
            >
              Menghadirkan solusi properti modern dengan pilihan hunian yang
              berkualitas, lokasi strategis, dan nilai yang tumbuh bersama
              masa depan Anda.
            </p>

            {/* Social Media */}
            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      border border-white/[0.08]
                      bg-white/[0.04]
                      text-white/55
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-white/20
                      hover:bg-white
                      hover:text-[#0B1717]
                    "
                  >
                    <Icon size={17} strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>

            {/* Financing Partner */}
            <div className="mt-8 border-t border-white/[0.08] pt-7">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
              >
                Partner Pembiayaan
              </p>

              <div className="mt-3 inline-flex items-center rounded-xl bg-white px-5 py-3">
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

          {/* =================================================
              NAVIGATION
          ================================================== */}
          {navigation.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        text-white/45
                        transition-colors
                        duration-200
                        hover:text-white
                      "
                    >
                      {link.label}

                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.8}
                        className="
                          opacity-0
                          transition-all
                          duration-200
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:opacity-70
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* =================================================
              CONTACT
          ================================================== */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Hubungi Kami
            </h3>

            <ul className="mt-5 space-y-5">
              {/* Phone */}
              <li className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex h-9 w-9
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-[#0F6A6A]/20
                    text-[#69C2C2]
                  "
                >
                  <Phone size={15} strokeWidth={1.8} />
                </span>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-white/25
                    "
                  >
                    Telepon
                  </p>

                  <a
                    href="tel:+6281369381111"
                    className="
                      mt-1
                      block
                      text-sm
                      text-white/60
                      transition-colors
                      duration-200
                      hover:text-white
                    "
                  >
                    +62 813 6938 1111
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex h-9 w-9
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-[#0F6A6A]/20
                    text-[#69C2C2]
                  "
                >
                  <Mail size={15} strokeWidth={1.8} />
                </span>

                <div className="min-w-0">
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-white/25
                    "
                  >
                    Email
                  </p>

                  <a
                    href="mailto:namuraproperty@gmail.com"
                    className="
                      mt-1
                      block
                      truncate
                      text-sm
                      text-white/60
                      transition-colors
                      duration-200
                      hover:text-white
                    "
                  >
                    namuraproperty@gmail.com
                  </a>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex h-9 w-9
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-[#0F6A6A]/20
                    text-[#69C2C2]
                  "
                >
                  <MapPin size={15} strokeWidth={1.8} />
                </span>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-white/25
                    "
                  >
                    Alamat
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/60">
                    Jl. Karimun Sukarame,
                    <br />
                    Bandar Lampung, Indonesia
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* =================================================
            BOTTOM BAR
        ================================================== */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-white/[0.08]
            py-7
            text-xs
            text-white/30
            sm:text-sm
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} Namura Property. All rights reserved.
          </p>

          <p className="text-white/40">
            Dev by Namura Team
          </p>
        </div>
      </div>
    </footer>
  );
}