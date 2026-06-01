"use client";

import { useState, useEffect } from "react";
import { Bell, Send, Search, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

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

export default function NotifikasiPage() {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Broadcast form
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastStatus, setBroadcastStatus] = useState("Terkirim");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/api/notifications");
      setNotifications(data || []);
    } catch (err) {
      setError(err.message || "Gagal memuat data notifikasi.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = notifications.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/notifications/${id}`, { method: "DELETE" });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message || "Gagal menghapus notifikasi.");
      setDeleteTarget(null);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    setSendError("");
    setSendSuccess("");

    if (!broadcastTitle.trim()) {
      setSendError("Judul notifikasi wajib diisi.");
      return;
    }
    if (!broadcastMessage.trim()) {
      setSendError("Pesan notifikasi wajib diisi.");
      return;
    }

    try {
      setSending(true);
      await apiFetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify({
          title: broadcastTitle,
          message: broadcastMessage,
          status: broadcastStatus,
        }),
      });
      setBroadcastTitle("");
      setBroadcastMessage("");
      setBroadcastStatus("Terkirim");
      setSendSuccess("Notifikasi berhasil dikirim.");
      // Refresh list
      fetchNotifications();
      setTimeout(() => setSendSuccess(""), 3000);
    } catch (err) {
      setSendError(err.message || "Gagal mengirim notifikasi.");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-7">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Manage Notifikasi
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola notifikasi dan broadcast sistem.
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Notifikasi"
          value={loading ? "..." : notifications.length}
          icon={<Bell size={20} />}
          accentIcon="bg-gray-100 text-gray-500"
        />
        <StatCard
          label="Terkirim"
          value={loading ? "..." : notifications.filter((n) => (n.status || "").toLowerCase() === "terkirim").length}
          icon={<Send size={20} />}
          accentIcon="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Draft"
          value={loading ? "..." : notifications.filter((n) => (n.status || "").toLowerCase() === "draft").length}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          accentIcon="bg-amber-50 text-amber-600"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        {/* TOOLBAR */}
        <div className="px-5 py-3.5 border-b border-black/[0.05] flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-gray-800 flex-1 min-w-0">
            Daftar Notifikasi
          </p>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari notifikasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 w-48 sm:w-56 placeholder-gray-400 transition"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.05]">
                {["Judul", "Pesan", "Status", "Tanggal", ""].map((h, i) => (
                  <th
                    key={i}
                    className={`px-5 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${i === 4 ? "text-right" : "text-left"
                      }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-sm text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-sm text-gray-400">
                    Tidak ada notifikasi ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0F6A6A]/10 flex items-center justify-center flex-shrink-0">
                          <Bell size={15} className="text-[#0F6A6A]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 whitespace-nowrap">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID #{item.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500 max-w-xs truncate">
                      {item.message || "-"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ${(item.status || "").toLowerCase() === "terkirim"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200/80"
                            : "bg-amber-50 text-amber-700 ring-amber-200/80"
                          }`}
                      >
                        {item.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="w-8 h-8 rounded-lg border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition"
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
            <span className="font-medium text-gray-600">{notifications.length}</span>{" "}
            notifikasi
          </span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[#0F6A6A] hover:opacity-70 transition font-medium"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* QUICK BROADCAST */}
      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-black/[0.05]">
          <p className="text-sm font-medium text-gray-800">Quick Broadcast</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Kirim notifikasi langsung ke seluruh pengguna.
          </p>
        </div>

        <form onSubmit={handleBroadcast} className="p-5 flex flex-col gap-3">
          {sendError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2">
              {sendError}
            </div>
          )}
          {sendSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-2">
              {sendSuccess}
            </div>
          )}

          <input
            value={broadcastTitle}
            onChange={(e) => setBroadcastTitle(e.target.value)}
            placeholder="Judul notifikasi"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
          />
          <textarea
            rows={4}
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="Tulis pesan notifikasi..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition resize-none"
          />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Status
            </label>
            <select
              value={broadcastStatus}
              onChange={(e) => setBroadcastStatus(e.target.value)}
              className="w-full sm:w-48 px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
            >
              <option value="Terkirim">Terkirim</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="flex items-center justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={() => {
                setBroadcastTitle("");
                setBroadcastMessage("");
                setBroadcastStatus("Terkirim");
                setSendError("");
              }}
              className="px-4 py-2 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition"
            >
              Bersihkan
            </button>
            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
            >
              <Send size={14} />
              {sending ? "Mengirim..." : "Kirim Broadcast"}
            </button>
          </div>
        </form>
      </div>

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-sm font-semibold text-gray-900">Hapus Notifikasi?</h3>
            <p className="text-xs text-gray-500 mt-1.5">
              <span className="font-medium text-gray-700">{deleteTarget.title}</span> akan dihapus permanen.
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2 text-sm rounded-xl border text-gray-600 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                className="flex-1 px-4 py-2 text-sm rounded-xl bg-red-500 text-white font-medium hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
