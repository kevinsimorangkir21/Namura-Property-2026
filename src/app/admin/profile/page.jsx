"use client";

import { useState } from "react";
import { User, Mail, Lock, Camera, Save, ShieldAlert } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Administrator");
  const [email, setEmail] = useState("admin@namura.com");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-7">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Profil Saya</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Kelola informasi akun administrator.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* SIDEBAR CARD */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 h-fit flex flex-col gap-6">

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#0F6A6A] text-white flex items-center justify-center text-3xl font-semibold select-none">
                A
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-black/[0.08] flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                <Camera size={14} className="text-gray-500" />
              </button>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 text-sm">{name}</p>
              <p className="text-xs text-gray-400 mt-0.5">Super Admin</p>
            </div>
          </div>

          {/* META */}
          <div className="flex flex-col gap-2">
            {[
              { label: "Role", value: "Administrator", color: "text-gray-900" },
              { label: "Status", value: "Aktif", color: "text-emerald-600" },
              { label: "Bergabung", value: "Mei 2026", color: "text-gray-900" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-black/[0.04]"
              >
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className={`text-xs font-medium ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* FORM CARD */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-black/[0.06] overflow-hidden">

          <div className="px-6 py-4 border-b border-black/[0.05]">
            <p className="text-sm font-medium text-gray-800">Informasi Akun</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Perbarui nama, email, dan password akun Anda.
            </p>
          </div>

          <div className="p-6 flex flex-col gap-5">

            {/* NAME */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <User size={15} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 transition placeholder-gray-400"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail size={15} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 transition placeholder-gray-400"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">
                Password Baru
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock size={15} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 transition placeholder-gray-400"
                />
              </div>
              <p className="text-[11px] text-gray-400">
                Minimal 8 karakter. Gunakan kombinasi huruf, angka, dan simbol.
              </p>
            </div>

            {/* SUBMIT */}
            <div className="flex items-center justify-end pt-1">
              <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
                <Save size={15} />
                Simpan Perubahan
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* DANGER ZONE */}
      <div className="bg-white rounded-2xl border border-red-200/70 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2">
          <ShieldAlert size={16} className="text-red-500" />
          <p className="text-sm font-medium text-red-600">Zona Berbahaya</p>
        </div>
        <div className="p-6 flex items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-gray-900">Hapus Akun</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Akun dan seluruh data akan dihapus secara permanen dan tidak dapat dikembalikan.
            </p>
          </div>
          <button className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition">
            Hapus Akun
          </button>
        </div>
      </div>

    </div>
  );
}