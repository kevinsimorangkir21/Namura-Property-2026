"use client";

import { useState } from "react";
import { Save, User, Mail, Lock, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ================= FIELD COMPONENTS ================= */

function Label({ children }) {
  return (
    <label className="block text-xs font-medium text-gray-600 mb-1.5">
      {children}
    </label>
  );
}

function Input({ placeholder, value, onChange, type = "text", icon }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-9" : "pl-4"} pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition`}
      />
    </div>
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
    >
      {children}
    </select>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.05]">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function TambahUserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
    status: "Aktif",
  });

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/user"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition"
          >
            <ArrowLeft size={14} />
            Kembali ke User
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">
            Tambah User
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Buat akun baru untuk admin atau marketing.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/admin/user"
            className="px-4 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
          >
            Batal
          </Link>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
            <Save size={15} />
            Simpan User
          </button>
        </div>
      </div>

      {/* INFORMASI AKUN */}
      <SectionCard
        title="Informasi Akun"
        description="Isi data lengkap pengguna baru."
      >
        <div className="grid md:grid-cols-2 gap-5">

          <div className="md:col-span-2">
            <Label>Nama Lengkap</Label>
            <Input
              placeholder="Contoh: Budi Santoso"
              value={form.name}
              onChange={set("name")}
              icon={<User size={15} />}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Contoh: budi@namura.com"
              value={form.email}
              onChange={set("email")}
              icon={<Mail size={15} />}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Minimal 8 karakter"
              value={form.password}
              onChange={set("password")}
              icon={<Lock size={15} />}
            />
            <p className="text-xs text-gray-400 mt-1.5">
              Gunakan kombinasi huruf, angka, dan simbol untuk keamanan.
            </p>
          </div>

        </div>
      </SectionCard>

      {/* ROLE & STATUS */}
      <SectionCard
        title="Role & Status"
        description="Tentukan hak akses dan status akun pengguna."
      >
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <Label>Role</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <Shield size={15} />
              </div>
              <Select value={form.role} onChange={set("role")}>
                <option value="Admin">Admin</option>
                <option value="Marketing">Marketing</option>
              </Select>
            </div>
          </div>

          <div>
            <Label>Status</Label>
            <Select value={form.status} onChange={set("status")}>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </Select>
          </div>

        </div>

        {/* ROLE DESCRIPTION */}
        <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-black/[0.04]">
          {form.role === "Admin" ? (
            <div>
              <p className="text-xs font-medium text-gray-700">Admin</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Akses penuh ke seluruh fitur dashboard termasuk manajemen
                properti, artikel, user, dan notifikasi.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-medium text-gray-700">Marketing</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Akses terbatas untuk mengelola properti dan artikel.
                Tidak dapat mengakses manajemen user.
              </p>
            </div>
          )}
        </div>

      </SectionCard>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pb-2">
        <Link
          href="/admin/user"
          className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
        >
          Batal
        </Link>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
          <Save size={15} />
          Simpan User
        </button>
      </div>

    </div>
  );
}