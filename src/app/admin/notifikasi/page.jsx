"use client";

import { useState, useEffect } from "react";
import { Bell, Send, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import DeleteModal from "@/components/ui/DeleteModal";
import { StatCardSkeleton } from "@/components/ui/Skeleton";

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

export default function NotifikasiPage() {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastStatus, setBroadcastStatus] = useState("Terkirim");
  const [sending, setSending] = useState(false);

  useEffect(() => { fetchNotifications(); }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      const data = await apiFetch("/api/notifications");
      setNotifications(data || []);
    } catch {
      toast.error("Gagal mengambil data notifikasi");
    } finally {
      setLoading(false);
    }
  }

  const filtered = notifications.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/notifications/${deleteTarget.id}`, { method: "DELETE" });
      setNotifications((prev) => prev.filter((n) => n.id !== deleteTarget.id));
      toast.success("✓ Notifikasi berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal menghapus notifikasi");
    } finally {
      setDeleting(false);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim()) { toast.error("Judul notifikasi wajib diisi"); return; }
    if (!broadcastMessage.trim()) { toast.error("Pesan notifikasi wajib diisi"); return; }
    try {
      setSending(true);
      await apiFetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify({ title: broadcastTitle, message: broadcastMessage, status: broadcastStatus }),
      });
      setBroadcastTitle(""); setBroadcastMessage(""); setBroadcastStatus("Terkirim");
      toast.success("✓ Notifikasi berhasil dibuat");
      fetchNotifications();
    } catch {
      toast.error("Gagal mengirim notifikasi");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-";

  const terkirim = notifications.filter((n) => (n.status || "").toLowerCase() === "terkirim").length;
  const draft = notifications.filter((n) => (n.status || "").toLowerCase() === "draft").length;

  return (
    <div className="flex flex-col gap-7">
      <DeleteModal open={!!deleteTarget} title="Hapus Notifikasi?" description={`"${deleteTarget?.title}" akan dihapus permanen.`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />

      <div><h1 className="text-xl font-semibold text-gray-900">Manage Notifikasi</h1><p className="text-sm text-gray-400 mt-0.5">Kelola notifikasi dan broadcast sistem.</p></div>

      {loading ? (
        <div className="grid sm:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)}</div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard label="Total Notifikasi" value={notifications.length} icon={<Bell size={20} />} accentIcon="bg-gray-100 text-gray-500" />
          <StatCard label="Terkirim" value={terkirim} icon={<Send size={20} />} accentIcon="bg-emerald-50 text-emerald-600" />
          <StatCard label="Draft" value={draft} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} accentIcon="bg-amber-50 text-amber-600" />
        </div>
      )}

      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">Daftar Notifikasi</p>
          <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Cari notifikasi..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none w-48 sm:w-56 transition" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-black/[0.05]">{["Judul", "Pesan", "Status", "Tanggal", ""].map((h, i) => <th key={i} className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-black/[0.04]">
              {loading ? [...Array(3)].map((_, i) => (
                <tr key={i} className="border-b border-black/[0.04]">{[...Array(5)].map((__, j) => <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded-lg w-3/4" /></td>)}</tr>
              )) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-sm text-gray-400">Tidak ada notifikasi.</td></tr>
              ) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition">
                  <td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#0F6A6A]/10 flex items-center justify-center flex-shrink-0"><Bell size={15} className="text-[#0F6A6A]" /></div><div><p className="font-medium text-gray-900">{item.title}</p><p className="text-xs text-gray-400">ID #{item.id}</p></div></div></td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 max-w-xs truncate">{item.message || "-"}</td>
                  <td className="px-5 py-3.5"><span className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${(item.status || "").toLowerCase() === "terkirim" ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80" : "bg-amber-50 text-amber-700 ring-amber-200/80"}`}>{item.status || "Draft"}</span></td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(item.created_at)}</td>
                  <td className="px-5 py-3.5"><div className="flex justify-end"><button onClick={() => setDeleteTarget(item)} className="w-8 h-8 rounded-lg border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 transition"><Trash2 size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-black/[0.05] text-xs text-gray-400">Menampilkan <span className="font-medium text-gray-600">{filtered.length}</span> dari <span className="font-medium text-gray-600">{notifications.length}</span> notifikasi</div>
      </div>

      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-black/[0.05]"><p className="text-sm font-medium text-gray-800">Quick Broadcast</p><p className="text-xs text-gray-400 mt-0.5">Kirim notifikasi langsung ke seluruh pengguna.</p></div>
        <form onSubmit={handleBroadcast} className="p-5 flex flex-col gap-3">
          <input value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)} placeholder="Judul notifikasi" className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 placeholder-gray-400 transition" />
          <textarea rows={4} value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} placeholder="Tulis pesan notifikasi..." className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 placeholder-gray-400 transition resize-none" />
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={() => { setBroadcastTitle(""); setBroadcastMessage(""); }} className="px-4 py-2 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition">Bersihkan</button>
            <button type="submit" disabled={sending} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 transition disabled:opacity-50">
              <Send size={14} />
              {sending ? "Mengirim..." : "Kirim Broadcast"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
