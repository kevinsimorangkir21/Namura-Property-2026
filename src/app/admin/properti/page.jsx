"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { apiFetch, getImageUrl } from "@/lib/api";

export default function PropertiPage() {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await apiFetch("/api/properties");
        setProperties(data || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filtered = properties.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalJual = properties.filter((p) => (p.type || "").toLowerCase() === "jual").length;
  const totalSewa = properties.filter((p) => (p.type || "").toLowerCase() === "sewa").length;

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/properties/${id}`, { method: "DELETE" });
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "-";
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manage Properti</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola seluruh data properti Namura Property.</p>
        </div>
        <Link
          href="/admin/properti/tambah"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0F6A6A] text-white text-sm font-medium hover:bg-[#0C5A5A] transition"
        >
          <Plus size={18} />
          Tambah Properti
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Properti</p>
          <h2 className="text-3xl font-bold mt-2">{loading ? "..." : properties.length}</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Dijual</p>
          <h2 className="text-3xl font-bold mt-2">{loading ? "..." : totalJual}</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Disewa</p>
          <h2 className="text-3xl font-bold mt-2">{loading ? "..." : totalSewa}</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Draft</p>
          <h2 className="text-3xl font-bold mt-2">{loading ? "..." : properties.filter((p) => (p.status || "").toLowerCase() === "draft").length}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-5">
          <div className="relative w-full md:max-w-sm">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari properti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0F6A6A]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 text-sm font-medium text-gray-500">Properti</th>
                <th className="text-left py-4 text-sm font-medium text-gray-500">Tipe</th>
                <th className="text-left py-4 text-sm font-medium text-gray-500">Harga</th>
                <th className="text-left py-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right py-4 text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">Memuat data...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">Tidak ada properti ditemukan.</td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                          {item.image ? (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm capitalize">{item.type}</td>
                    <td className="py-4 text-sm">{formatPrice(item.price)}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${(item.status || "").toLowerCase() === "aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {item.status || "Draft"}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/properti/detail/${item.id}`}
                          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/properti/edit/${item.id}`}
                          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="w-9 h-9 rounded-lg border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-sm font-semibold text-gray-900">Hapus Properti?</h3>
            <p className="text-xs text-gray-500 mt-1.5">
              <span className="font-medium text-gray-700">{deleteTarget.title}</span> akan dihapus permanen.
            </p>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2 text-sm rounded-xl border text-gray-600 hover:bg-gray-50">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteTarget.id)} className="flex-1 px-4 py-2 text-sm rounded-xl bg-red-500 text-white font-medium hover:bg-red-600">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
