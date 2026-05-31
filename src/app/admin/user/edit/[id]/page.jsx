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

export default function EditUserPage() {
  const [form, setForm] = useState({
    name: "Administrator",
    email: "admin@namura.com",
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
            Edit User
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Perbarui informasi akun pengguna.
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
            Update User
          </button>
        </div>
      </div>

      {/* AVATAR PREVIEW */}
      <div className="bg-white rounded-2xl border border-black/[0.06] px-6 py-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#0F6A6A] text-white flex items-center justify-center font-semibold text-lg flex-shrink-0">
          {form.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {form.name || "Nama User"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {form.email || "email@namura.com"}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span
            className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${
              form.role === "Admin"
                ? "bg-sky-50 text-sky-700 ring-sky-200/80"
                : "bg-purple-50 text-purple-700 ring-purple-200/80"
            }`}
          >
            {form.role}
          </span>
          <span
            className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${
              form.status === "Aktif"
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80"
                : "bg-red-50 text-red-600 ring-red-200/80"
            }`}
          >
            {form.status}
          </span>
        </div>
      </div>

      {/* INFORMASI AKUN */}
      <SectionCard
        title="Informasi Akun"
        description="Perbarui data lengkap pengguna."
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
            <Label>Password Baru</Label>
            <Input
              type="password"
              placeholder="Kosongkan jika tidak ingin mengubah password"
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
              <select
                value={form.role}
                onChange={set("role")}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
              >
                <option value="Admin">Admin</option>
                <option value="Marketing">Marketing</option>
              </select>
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

      {/* DANGER ZONE */}
      <div className="bg-white rounded-2xl border border-red-200/70 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2">
          <p className="text-sm font-medium text-red-600">Zona Berbahaya</p>
        </div>
        <div className="p-6 flex items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-gray-900">Hapus Akun</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Akun ini akan dihapus secara permanen dan tidak dapat dikembalikan.
            </p>
          </div>
          <button className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition">
            Hapus Akun
          </button>
        </div>
      </div>

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
          Update User
        </button>
      </div>

    </div>
  );
}