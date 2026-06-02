"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Pencil, Trash2, Users, Shield, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import DeleteModal from "@/components/ui/DeleteModal";
import { StatCardSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";

function StatCard({ label, value, icon, accentIcon }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4 hover:shadow-md hover:scale-[1.02] transition-all duration-200">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentIcon}`}>{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function UserPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await apiFetch("/api/users");
        setUsers(data || []);
      } catch {
        toast.error("Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filtered = users.filter((user) => {
    const matchSearch = (user.name || "").toLowerCase().includes(search.toLowerCase()) || (user.email || "").toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || (user.role || "").toLowerCase() === roleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  const totalAdmin = users.filter((u) => (u.role || "").toLowerCase() === "admin").length;
  const totalActive = users.filter((u) => ["active", "aktif"].includes((u.status || "").toLowerCase())).length;

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/users/${deleteTarget.id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      toast.success("✓ User berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal menghapus user");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <DeleteModal open={!!deleteTarget} title="Hapus User?" description={`"${deleteTarget?.name}" akan dihapus permanen dan tidak dapat dikembalikan.`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />

      <div className="flex items-start justify-between gap-4">
        <div><h1 className="text-xl font-semibold text-gray-900">Manage User</h1><p className="text-sm text-gray-400 mt-0.5">Kelola akun admin dan marketing.</p></div>
        <Link href="/admin/user/tambah" className="flex items-center gap-2 bg-[#0F6A6A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 transition flex-shrink-0">
          <Plus size={16} /> <span className="hidden sm:inline">Tambah User</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)}</div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard label="Total User" value={users.length} icon={<Users size={20} />} accentIcon="bg-gray-100 text-gray-500" />
          <StatCard label="Admin" value={totalAdmin} icon={<Shield size={20} />} accentIcon="bg-sky-50 text-sky-600" />
          <StatCard label="User Aktif" value={totalActive} icon={<UserCheck size={20} />} accentIcon="bg-emerald-50 text-emerald-600" />
        </div>
      )}

      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">Daftar User</p>
          <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none w-48 sm:w-56 transition" /></div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none transition">
            <option value="all">Semua role</option>
            <option value="admin">Admin</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-black/[0.05]">{["Nama", "Email", "Role", "Status", "Aksi"].map((h, i) => <th key={i} className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-black/[0.04]">
              {loading ? (
                [...Array(4)].map((_, i) => <TableRowSkeleton key={i} cols={5} />)
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-sm text-gray-400">Tidak ada user ditemukan.</td></tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-[#0F6A6A] text-white flex items-center justify-center font-medium text-sm flex-shrink-0">{(user.name || "U").charAt(0).toUpperCase()}</div><div><p className="font-medium text-gray-900">{user.name}</p><p className="text-xs text-gray-400">ID #{user.id}</p></div></div></td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{user.email}</td>
                    <td className="px-5 py-3.5"><span className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${(user.role || "").toLowerCase() === "admin" ? "bg-sky-50 text-sky-700 ring-sky-200/80" : "bg-purple-50 text-purple-700 ring-purple-200/80"}`}>{user.role || "-"}</span></td>
                    <td className="px-5 py-3.5"><span className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${["active", "aktif"].includes((user.status || "").toLowerCase()) ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80" : "bg-red-50 text-red-600 ring-red-200/80"}`}>{user.status || "-"}</span></td>
                    <td className="px-5 py-3.5"><div className="flex items-center justify-end gap-1"><Link href={`/admin/user/edit/${user.id}`} className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"><Pencil size={14} /></Link><button onClick={() => setDeleteTarget(user)} className="w-8 h-8 rounded-lg border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 transition"><Trash2 size={14} /></button></div></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-gray-400">
          <span>Menampilkan <span className="font-medium text-gray-600">{filtered.length}</span> dari <span className="font-medium text-gray-600">{users.length}</span> user</span>
          {(search || roleFilter !== "all") && <button onClick={() => { setSearch(""); setRoleFilter("all"); }} className="text-[#0F6A6A] hover:opacity-70 font-medium">Reset filter</button>}
        </div>
      </div>
    </div>
  );
}
