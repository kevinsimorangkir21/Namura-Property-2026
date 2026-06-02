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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* LOGO & ABOUT */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={160}
                height={60}
                className="object-contain"
              />
            </Link>

            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Menyediakan solusi properti modern dengan kualitas terbaik,
              lokasi strategis, dan nilai investasi yang terus berkembang.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0F172A] transition"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0F172A] transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0F172A] transition"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="font-semibold text-lg mb-6">
              Navigasi
            </h3>

            <ul className="space-y-3 text-white/60">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  href="/daftar-properti"
                  className="hover:text-white transition"
                >
                  Daftar Properti
                </Link>
              </li>

              <li>
                <Link
                  href="/tentang-kami"
                  className="hover:text-white transition"
                >
                  Tentang Kami
                </Link>
              </li>

              <li>
                <Link
                  href="/artikel"
                  className="hover:text-white transition"
                >
                  Artikel
                </Link>
              </li>

              <li>
                <Link
                  href="/karir"
                  className="hover:text-white transition"
                >
                  Karir
                </Link>
              </li>

              <li>
                <Link
                  href="/kontak"
                  className="hover:text-white transition"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-lg mb-6">
              Perusahaan
            </h3>

            <ul className="space-y-3 text-white/60">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Tentang Kami
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Layanan
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Kebijakan Privasi
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-lg mb-6">
              Kontak
            </h3>

            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5" />
                <span>+62 813 6938 1111</span>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5" />
                <span>namuraproperty@gmail.com</span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5" />
                <span>
                  Jl. Karimun Sukarame, Bandar Lampung, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>
            © {new Date().getFullYear()} Namura Property. All rights reserved.
          </p>

          <p>
            Designed & Developed with ❤️ by Namura Property
          </p>
        </div>
      </div>
    </footer>
  );
}