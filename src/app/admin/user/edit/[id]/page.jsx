"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, User, Mail, Lock, Shield, ArrowLeft } from "lucide-react";
import { apiFetch } from "@/lib/api";

/* ================= PAGE ================= */

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    status: "active",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const users = await apiFetch("/api/users");
        const user = (users || []).find((u) => String(u.id) === String(id));
        if (!user) {
          setError("User tidak ditemukan.");
          return;
        }
        setForm({
          name: user.name || "",
          email: user.email || "",
          password: "",
          role: user.role || "admin",
          status: user.status || "active",
        });
      } catch (err) {
        setError(err.message || "Gagal memuat data user.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

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
    if (form.password && form.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
        status: form.status,
      };
      // Only include password if user wants to change it
      if (form.password) {
        payload.password = form.password;
      }
      await apiFetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      router.push("/admin/user");
    } catch (err) {
      if (err.status === 409) {
        setError("Email sudah terdaftar. Gunakan email lain.");
      } else {
        setError(err.message || "Gagal menyimpan perubahan.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Link
            href="/admin/user"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition"
          >
            <ArrowLeft size={14} />
            Kembali ke User
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">Edit User</h1>
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center text-sm text-gray-400">
          Memuat data...
        </div>
      </div>
    );
  }

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
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
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
              Perbarui data pengguna.
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
                Password Baru (opsional)
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <Lock size={15} />
                </div>
                <input
                  type="password"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  value={form.password}
                  onChange={set("password")}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">
                Kosongkan jika tidak ingin mengubah password. Minimal 8 karakter.
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
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
