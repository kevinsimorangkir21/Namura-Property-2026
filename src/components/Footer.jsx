"use client";

import Link from "next/link";
import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* LOGO + DESKRIPSI */}
        <div>
          <img src="/Logo/Namura.png" alt="Namura Property" className="h-8 mb-4" />

          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Portal properti modern yang memudahkan kamu menemukan hunian terbaik masa kini. Dengan pengalaman lebih dari satu dekade, kami berkomitmen memberikan layanan terbaik dan properti berkualitas untuk setiap pelanggan.
          </p>

          <div className="flex gap-4 text-gray-500">
            <Linkedin className="w-4 h-4 cursor-pointer hover:text-gray-900 transition" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-gray-900 transition" />
            <Facebook className="w-4 h-4 cursor-pointer hover:text-gray-900 transition" />
          </div>
        </div>

        {/* NAVIGASI */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">
            Navigasi
          </h4>

          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/properti">Daftar Properti</Link></li>
            <li><Link href="/tentang-kami">Tentang Kami</Link></li>
            <li><Link href="/artikel">Artikel</Link></li>
            <li><Link href="/karir">Karir</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
          </ul>
        </div>

        {/* PERUSAHAAN */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">
            Perusahaan
          </h4>

          <ul className="space-y-2 text-sm text-gray-500">
            <li>Tentang Kami</li>
            <li>Layanan</li>
            <li>Kebijakan Privasi</li>
            <li>Syarat & Ketentuan</li>
          </ul>
        </div>

        {/* KONTAK */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">
            Kontak
          </h4>

          <ul className="space-y-2 text-sm text-gray-500">
            <li>+6281369381111</li>
            <li>namuraproperty@gmail.com</li>
            <li>
              Lampung Selatan, Indonesia <br />
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-sm text-gray-400 pb-6">
        © {new Date().getFullYear()} Namura Property. All rights reserved.
      </div>

    </footer>
  );
}