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

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="mx-auto max-w-[1280px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8">

        {/* MAIN FOOTER */}
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-16 lg:pb-16">

          {/* BRAND */}
          <div className="max-w-[380px]">
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

            <p className="mt-6 max-w-[350px] text-sm leading-7 text-white/55">
              Menyediakan solusi properti modern dengan kualitas terbaik,
              lokasi strategis, dan nilai investasi yang terus berkembang
              untuk kebutuhan hunian Anda.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-7 flex items-center gap-2.5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white hover:text-[#0F172A]"
              >
                <Linkedin size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white hover:text-[#0F172A]"
              >
                <Instagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white hover:text-[#0F172A]"
              >
                <Facebook size={17} />
              </a>
            </div>

            {/* PARTNER PEMBIAYAAN */}
            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Partner Pembiayaan
              </p>

              <div className="mt-3 inline-flex items-center rounded-xl border border-white/10 bg-white px-5 py-3 shadow-sm">
                <Image
                  src="/Partner/btn.png"
                  alt="BTN"
                  width={100}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          {navigation.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold tracking-wide text-white">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}

                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Hubungi Kami
            </h3>

            <ul className="mt-5 space-y-4">

              {/* PHONE */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F6A6A]/15 text-[#5FB8B8]">
                  <Phone size={15} />
                </span>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                    Telepon
                  </p>

                  <a
                    href="tel:+6281369381111"
                    className="mt-0.5 block text-sm text-white/65 transition hover:text-white"
                  >
                    +62 813 6938 1111
                  </a>
                </div>
              </li>

              {/* EMAIL */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F6A6A]/15 text-[#5FB8B8]">
                  <Mail size={15} />
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                    Email
                  </p>

                  <a
                    href="mailto:namuraproperty@gmail.com"
                    className="mt-0.5 block truncate text-sm text-white/65 transition hover:text-white"
                  >
                    namuraproperty@gmail.com
                  </a>
                </div>
              </li>

              {/* ADDRESS */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F6A6A]/15 text-[#5FB8B8]">
                  <MapPin size={15} />
                </span>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                    Alamat
                  </p>

                  <p className="mt-0.5 text-sm leading-6 text-white/65">
                    Jl. Karimun Sukarame,
                    <br />
                    Bandar Lampung, Indonesia
                  </p>
                </div>
              </li>

            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-white/35 sm:text-sm md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Namura Property.
            All rights reserved.
          </p>

          <p className="text-white/30">
            Designed & Developed with{" "}
            <span className="text-white/50">♥</span>{" "}
            by Namura Property
          </p>

        </div>
      </div>
    </footer>
  );
}