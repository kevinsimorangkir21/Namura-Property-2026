"use client";

import Link from "next/link";
import { Mail, Shield, Pencil, ArrowLeft, Calendar, Activity } from "lucide-react";

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.05]">
        <p className="text-sm font-medium text-gray-800">{title}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function DetailUserPage() {
  const user = {
    id: 1,
    name: "Administrator",
    email: "admin@namura.com",
    role: "Admin",
    status: "Aktif",
    joined: "Mei 2026",
    lastActive: "Hari ini",
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
            Detail User
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${
                user.role === "Admin"
                  ? "bg-sky-50 text-sky-700 ring-sky-200/80"
                  : "bg-purple-50 text-purple-700 ring-purple-200/80"
              }`}
            >
              {user.role}
            </span>
            <span
              className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${
                user.status === "Aktif"
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80"
                  : "bg-red-50 text-red-600 ring-red-200/80"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
        <Link
          href={`/admin/user/${user.id}/edit`}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition flex-shrink-0"
        >
          <Pencil size={15} />
          Edit User
        </Link>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] px-6 py-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#0F6A6A] text-white flex items-center justify-center text-2xl font-semibold flex-shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Role</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{user.role}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
            <Mail size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5 truncate">{user.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Bergabung</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{user.joined}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Terakhir Aktif</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{user.lastActive}</p>
          </div>
        </div>

      </div>

      {/* DANGER ZONE */}
      <div className="bg-white rounded-2xl border border-red-200/70 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100">
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

    </div>
  );
}