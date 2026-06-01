"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, User, Mail, Lock, Shield, ArrowLeft } from "lucide-react";
import { apiFetch } from "@/lib/api";

/* ================= PAGE ================= */

export default function TambahUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Nama wajib diisi.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email wajib diisi.");
      return;
    }
    if (!form.password || form.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    try {
      setLoading(true);
      await apiFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          status: form.status,
        }),
      });
      router.push("/admin/user");
    } catch (err) {
      if (err.status === 409) {
        setError("Email sudah terdaftar. Gunakan email lain.");
      } else {
        setError(err.message || "Gagal menyimpan user.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {loading ? "Menyimpan..." : "Simpan User"}
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* INFORMASI AKUN */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
          <div className="px-6 py-4 border-b border-black/[0.05]">
            <p className="text-sm font-medium text-gray-800">Informasi Akun</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Isi data lengkap pengguna baru.
            </p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <User size={15} />
                </div>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={form.name}
                  onChange={set("name")}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  placeholder="Contoh: budi@namura.com"
                  value={form.email}
                  onChange={set("email")}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <Lock size={15} />
                </div>
                <input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={form.password}
                  onChange={set("password")}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">
                Gunakan kombinasi huruf, angka, dan simbol untuk keamanan.
              </p>
            </div>
          </div>
        </div>

        {/* ROLE & STATUS */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
          <div className="px-6 py-4 border-b border-black/[0.05]">
            <p className="text-sm font-medium text-gray-800">Role & Status</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Tentukan hak akses dan status akun pengguna.
            </p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Role
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <Shield size={15} />
                </div>
                <select
                  value={form.role}
                  onChange={set("role")}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
                >
                  <option value="admin">Admin</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={set("status")}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* ROLE DESCRIPTION */}
          <div className="px-6 pb-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-black/[0.04]">
              {form.role === "admin" ? (
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
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="flex items-center justify-end gap-3 pb-2">
          <Link
            href="/admin/user"
            className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {loading ? "Menyimpan..." : "Simpan User"}
          </button>
        </div>
      </form>
    </div>
  );
}
