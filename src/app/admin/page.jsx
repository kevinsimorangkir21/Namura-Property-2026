"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Building2,
  FileText,
  Users,
  Bell,
  Eye,
  Pencil,
  Trash2,
  ArrowUpRight,
  Sparkles,
  MapPin,
  RotateCcw,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import DeleteModal from "@/components/ui/DeleteModal";

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  icon: Icon,
  gradient,
  description,
  loading,
}) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-[24px]
        border border-white/70
        bg-white/65
        backdrop-blur-2xl
        shadow-[0_12px_40px_rgba(15,23,42,0.06)]
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]
      "
    >
      {/* Glow */}
      <div
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          {loading ? (
            <div className="mt-3 h-8 w-20 animate-pulse rounded-lg bg-slate-200" />
          ) : (
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {value ?? 0}
            </p>
          )}

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`
            flex h-11 w-11 items-center justify-center
            rounded-2xl
            bg-gradient-to-br ${gradient}
            text-white
            shadow-lg
            shadow-black/5
            transition-transform duration-300
            group-hover:scale-110
          `}
        >
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ search }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100/80 text-slate-400">
        <Building2 size={26} strokeWidth={1.5} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-800">
        Tidak ada properti
      </h3>

      <p className="mt-1 max-w-sm text-center text-xs leading-5 text-slate-400">
        {search
          ? "Tidak ditemukan properti yang sesuai dengan pencarian kamu."
          : "Belum ada data properti yang tersedia."}
      </p>
    </div>
  );
}

/* =========================================================
   LOADING ROW
========================================================= */

function LoadingRows() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <tr key={item}>
          {[1, 2, 3, 4, 5].map((cell) => (
            <td key={cell} className="px-5 py-4">
              <div className="h-4 animate-pulse rounded-md bg-slate-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminPage() {
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [deleteTarget, setDeleteTarget] = useState(null);

  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, propertiesData] = await Promise.all([
          apiFetch("/api/dashboard/stats"),
          apiFetch("/api/properties"),
        ]);

        setStats(statsData);
        setProperties(propertiesData || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        toast.error("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* =======================================================
     SEARCH DEBOUNCE
  ======================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filtered = properties.filter((property) => {
    const query = search.toLowerCase();

    const matchSearch =
      (property.title || "").toLowerCase().includes(query) ||
      (property.location || "").toLowerCase().includes(query);

    const matchFilter =
      filter === "all" ||
      (property.type || "").toLowerCase() === filter;

    return matchSearch && matchFilter;
  });

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      setProperties((prev) =>
        prev.filter((property) => property.id !== id)
      );

      toast.success("Properti berhasil dihapus");

      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete property:", err);
      toast.error("Gagal menghapus properti");
    }
  };

  /* =======================================================
     FORMAT PRICE
  ======================================================= */

  const formatPrice = (price) => {
    if (!price) return "-";

    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  /* =======================================================
     FILTER LABEL
  ======================================================= */

  const filterLabels = {
    all: "Semua",
    jual: "Dijual",
    sewa: "Disewa",
  };

  /* =======================================================
     RESET SEARCH
  ======================================================= */

  const resetSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <DeleteModal
        item={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="relative min-h-full">
        {/* =================================================
            BACKGROUND DECORATION
        ================================================= */}

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0F6A6A]/8 blur-3xl" />
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-300/8 blur-3xl" />
        </div>

        <div className="flex flex-col gap-7">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F6A6A]/10 text-[#0F6A6A]">
                  <Sparkles size={14} />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F6A6A]/70">
                  Overview
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Kelola properti dan data website Namura Property.
              </p>
            </div>

            <Link
              href="/admin/properti/tambah"
              className="
                group inline-flex items-center justify-center gap-2
                rounded-2xl
                bg-[#0F6A6A]
                px-4 py-3
                text-sm font-semibold text-white
                shadow-[0_10px_25px_rgba(15,106,106,0.20)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-[#0b5c5c]
                hover:shadow-[0_15px_30px_rgba(15,106,106,0.25)]
                active:scale-[0.98]
              "
            >
              <Plus
                size={17}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:rotate-90"
              />

              <span>Tambah Properti</span>

              <ArrowUpRight
                size={15}
                className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Properti"
              value={stats?.total_properties}
              icon={Building2}
              gradient="from-[#0F6A6A] to-teal-400"
              description="Semua properti"
              loading={loading}
            />

            <StatCard
              label="Total Artikel"
              value={stats?.total_articles}
              icon={FileText}
              gradient="from-emerald-500 to-teal-400"
              description="Artikel website"
              loading={loading}
            />

            <StatCard
              label="Total User"
              value={stats?.total_users}
              icon={Users}
              gradient="from-sky-500 to-cyan-400"
              description="Pengguna terdaftar"
              loading={loading}
            />

            <StatCard
              label="Notifikasi"
              value={stats?.total_notifications}
              icon={Bell}
              gradient="from-amber-500 to-orange-400"
              description="Notifikasi sistem"
              loading={loading}
            />
          </div>

          {/* =================================================
              PROPERTY CARD
          ================================================= */}

          <section
            className="
              overflow-hidden
              rounded-[26px]
              border border-white/70
              bg-white/65
              backdrop-blur-2xl
              shadow-[0_15px_50px_rgba(15,23,42,0.06)]
            "
          >
            {/* =================================================
                CARD HEADER
            ================================================= */}

            <div className="border-b border-slate-200/60 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-slate-900">
                      Daftar Properti
                    </h2>

                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                      {properties.length}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Kelola seluruh listing properti kamu.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* =================================================
                      SEARCH
                  ================================================= */}

                  <div className="relative">
                    <Search
                      size={16}
                      className="
                        pointer-events-none
                        absolute left-3 top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      value={searchInput}
                      onChange={(e) =>
                        setSearchInput(e.target.value)
                      }
                      placeholder="Cari properti..."
                      className="
                        h-10
                        w-full
                        rounded-xl
                        border border-slate-200/80
                        bg-white/60
                        pl-9 pr-4
                        text-xs
                        text-slate-700
                        outline-none
                        placeholder:text-slate-400
                        transition
                        focus:border-[#0F6A6A]/30
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#0F6A6A]/5
                        sm:w-60
                      "
                    />

                    {searchInput && (
                      <button
                        type="button"
                        onClick={resetSearch}
                        className="
                          absolute right-3 top-1/2
                          -translate-y-1/2
                          text-slate-400
                          transition
                          hover:text-slate-700
                        "
                        aria-label="Reset pencarian"
                      >
                        <RotateCcw size={13} />
                      </button>
                    )}
                  </div>

                  {/* =================================================
                      FILTER
                  ================================================= */}

                  <div className="flex items-center rounded-xl border border-slate-200/80 bg-slate-100/60 p-1">
                    {Object.entries(filterLabels).map(
                      ([value, label]) => {
                        const active = filter === value;

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setFilter(value)}
                            className={`
                              rounded-lg
                              px-3 py-2
                              text-[11px]
                              font-semibold
                              transition-all duration-200
                              ${
                                active
                                  ? "bg-white text-slate-900 shadow-sm"
                                  : "text-slate-400 hover:text-slate-700"
                              }
                            `}
                          >
                            {label}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200/50 bg-slate-50/30">
                    <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Properti
                    </th>

                    <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Lokasi
                    </th>

                    <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Harga
                    </th>

                    <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Tipe
                    </th>

                    <th className="px-6 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200/40">
                  {loading ? (
                    <LoadingRows />
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <EmptyState search={search} />
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item) => {
                      const isSale =
                        (item.type || "").toLowerCase() ===
                        "jual";

                      return (
                        <tr
                          key={item.id}
                          className="
                            group
                            transition-colors duration-200
                            hover:bg-white/70
                          "
                        >
                          {/* PROPERTY */}

                          <td className="px-6 py-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <div
                                className="
                                  flex h-10 w-10
                                  flex-shrink-0
                                  items-center justify-center
                                  rounded-xl
                                  bg-[#0F6A6A]/8
                                  text-[#0F6A6A]
                                  transition-all duration-200
                                  group-hover:scale-105
                                  group-hover:bg-[#0F6A6A]/12
                                "
                              >
                                <Building2
                                  size={17}
                                  strokeWidth={1.7}
                                />
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="
                                    max-w-[270px]
                                    truncate
                                    text-xs
                                    font-semibold
                                    text-slate-800
                                  "
                                  title={item.title}
                                >
                                  {item.title}
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-400">
                                  ID #{item.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* LOCATION */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <MapPin
                                size={13}
                                className="flex-shrink-0 text-slate-400"
                                strokeWidth={1.7}
                              />

                              <span className="max-w-[180px] truncate">
                                {item.location || "-"}
                              </span>
                            </div>
                          </td>

                          {/* PRICE */}

                          <td className="px-5 py-4">
                            <span className="text-xs font-semibold text-slate-800">
                              {formatPrice(item.price)}
                            </span>
                          </td>

                          {/* TYPE */}

                          <td className="px-5 py-4">
                            <span
                              className={`
                                inline-flex
                                items-center
                                rounded-full
                                px-2.5 py-1
                                text-[10px]
                                font-semibold
                                ring-1
                                ${
                                  isSale
                                    ? "bg-emerald-50/80 text-emerald-700 ring-emerald-200/70"
                                    : "bg-sky-50/80 text-sky-700 ring-sky-200/70"
                                }
                              `}
                            >
                              <span
                                className={`
                                  mr-1.5 h-1.5 w-1.5 rounded-full
                                  ${
                                    isSale
                                      ? "bg-emerald-500"
                                      : "bg-sky-500"
                                  }
                                `}
                              />

                              {isSale ? "Dijual" : "Disewa"}
                            </span>
                          </td>

                          {/* ACTION */}

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                href={`/admin/properti/detail/${item.id}`}
                                title="Lihat detail"
                                className="
                                  flex h-8 w-8
                                  items-center justify-center
                                  rounded-lg
                                  text-slate-400
                                  transition-all
                                  hover:bg-slate-100
                                  hover:text-slate-800
                                "
                              >
                                <Eye
                                  size={15}
                                  strokeWidth={1.8}
                                />
                              </Link>

                              <Link
                                href={`/admin/properti/edit/${item.id}`}
                                title="Edit properti"
                                className="
                                  flex h-8 w-8
                                  items-center justify-center
                                  rounded-lg
                                  text-slate-400
                                  transition-all
                                  hover:bg-[#0F6A6A]/8
                                  hover:text-[#0F6A6A]
                                "
                              >
                                <Pencil
                                  size={15}
                                  strokeWidth={1.8}
                                />
                              </Link>

                              <button
                                type="button"
                                title="Hapus properti"
                                onClick={() =>
                                  setDeleteTarget(item)
                                }
                                className="
                                  flex h-8 w-8
                                  items-center justify-center
                                  rounded-lg
                                  text-slate-300
                                  transition-all
                                  hover:bg-red-50
                                  hover:text-red-500
                                "
                              >
                                <Trash2
                                  size={15}
                                  strokeWidth={1.8}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            {!loading && (
              <div className="flex flex-col gap-2 border-t border-slate-200/50 bg-slate-50/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-slate-400">
                  Menampilkan{" "}
                  <span className="font-semibold text-slate-600">
                    {filtered.length}
                  </span>{" "}
                  dari{" "}
                  <span className="font-semibold text-slate-600">
                    {properties.length}
                  </span>{" "}
                  properti
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-semibold
                      text-[#0F6A6A]
                      transition
                      hover:opacity-70
                    "
                  >
                    <RotateCcw size={12} />
                    Reset pencarian
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}