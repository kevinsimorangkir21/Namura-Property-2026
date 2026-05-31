"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Pencil, Trash2, Eye, Users, Shield, UserCheck, UserX } from "lucide-react";

/* ================= STAT CARD ================= */

function StatCard({ label, value, icon, accentIcon }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentIcon}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">
          {value}
        </p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function UserPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const users = [
    {
      id: 1,
      name: "Administrator",
      email: "admin@namura.com",
      role: "Admin",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "marketing1@namura.com",
      role: "Marketing",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Siti Amelia",
      email: "marketing2@namura.com",
      role: "Marketing",
      status: "Nonaktif",
    },
  ];

  const filtered = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="flex flex-col gap-7">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Manage User</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola akun admin dan marketing.
          </p>
        </div>
        <Link
          href="/admin/user/tambah"
          className="
            flex items-center gap-2
            bg-[#0F6A6A]
            text-white
            text-sm
            font-medium
            px-4
            py-2.5
            rounded-xl
            hover:opacity-90
            transition
          "
        >
          <Plus size={16} />
          <span className="hidden sm:inline">
            Tambah User
          </span>
          <span className="sm:hidden">
            Tambah
          </span>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-4 gap-4">
        <StatCard
          label="Total User"
          value={12}
          icon={<Users size={20} />}
          accentIcon="bg-gray-100 text-gray-500"
        />
        <StatCard
          label="Admin"
          value={2}
          icon={<Shield size={20} />}
          accentIcon="bg-sky-50 text-sky-600"
        />
        <StatCard
          label="Marketing"
          value={10}
          icon={<UserCheck size={20} />}
          accentIcon="bg-purple-50 text-purple-600"
        />
        <StatCard
          label="User Aktif"
          value={11}
          icon={<UserX size={20} />}
          accentIcon="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">

        {/* TOOLBAR */}
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">
            Daftar User
          </p>

          {/* SEARCH */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 w-48 sm:w-56 placeholder-gray-400 transition"
            />
          </div>

          {/* ROLE FILTER */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 transition"
          >
            <option value="all">Semua role</option>
            <option value="Admin">Admin</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.05]">
                {["Nama", "Email", "Role", "Status", "Aksi"].map((h, i) => (
                  <th
                    key={i}
                    className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${
                      i === 4 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-black/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-sm text-gray-400"
                  >
                    Tidak ada user ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/70 transition">

                    {/* NAME */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0F6A6A] text-white flex items-center justify-center font-medium text-sm flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">ID #{user.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-5 py-3.5 text-gray-500 text-xs">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${
                          user.role === "Admin"
                            ? "bg-sky-50 text-sky-700 ring-sky-200/80"
                            : "bg-purple-50 text-purple-700 ring-purple-200/80"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${
                          user.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80"
                            : "bg-red-50 text-red-600 ring-red-200/80"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/user/detail/${user.id}`}
                          className="
                            w-8 h-8
                            rounded-lg
                            border border-black/[0.08]
                            flex items-center justify-center
                            text-gray-500
                            hover:bg-gray-100
                            hover:text-gray-900
                            transition
                          "
                        >
                          <Eye size={14} />
                        </Link>

                        <Link
                          href={`/admin/user/edit/${user.id}`}
                          className="
                            w-8 h-8
                            rounded-lg
                            border border-black/[0.08]
                            flex items-center justify-center
                            text-gray-500
                            hover:bg-gray-100
                            hover:text-gray-900
                            transition
                          "
                        >
                          <Pencil size={14} />
                        </Link>

                        <button
                          className="
                            w-8 h-8
                            rounded-lg
                            border border-red-200
                            flex items-center justify-center
                            text-red-400
                            hover:bg-red-50
                            hover:text-red-600
                            transition
                          "
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-gray-400">
          <span>
            Menampilkan{" "}
            <span className="font-medium text-gray-600">{filtered.length}</span>{" "}
            dari{" "}
            <span className="font-medium text-gray-600">{users.length}</span> user
          </span>
          {(search || roleFilter !== "all") && (
            <button
              onClick={() => { setSearch(""); setRoleFilter("all"); }}
              className="text-[#0F6A6A] hover:opacity-70 transition font-medium"
            >
              Reset filter
            </button>
          )}
        </div>

      </div>
    </div>
  );
}