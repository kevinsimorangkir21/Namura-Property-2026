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
        border border-white/90
        bg-white/80
        backdrop-blur-2xl
        shadow-[0_12px_40px_rgba(15,106,106,0.07)]
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/90
        hover:shadow-[0_20px_50px_rgba(15,106,106,0.12)]
      "
    >
      {/* Decorative glow */}
      <div
        className={`
          pointer-events-none
          absolute -right-10 -top-10
          h-32 w-32
          rounded-full
          bg-gradient-to-br ${gradient}
          opacity-[0.08]
          blur-3xl
          transition-opacity duration-300
          group-hover:opacity-[0.16]
        `}
      />

      <div className="relative flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          {loading ? (
            <div className="mt-3 h-9 w-20 animate-pulse rounded-lg bg-slate-200/80" />
          ) : (
            <p className="mt-2 text-3xl font-semibold tracking-tight text-[#102A33]">
              {value ?? 0}
            </p>
          )}

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`
            flex h-12 w-12 flex-shrink-0
            items-center justify-center
            rounded-2xl
            bg-gradient-to-br ${gradient}
            text-white
            shadow-[0_8px_20px_rgba(15,106,106,0.12)]
            transition-all duration-300
            group-hover:scale-105
          `}
        >
          <Icon size={20} strokeWidth={1.8} />
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
      <div
        className="
          flex h-16 w-16
          items-center justify-center
          rounded-2xl
          border border-[#0F6A6A]/10
          bg-[#0F6A6A]/5
          text-[#0F6A6A]/60
        "
      >
        <Building2 size={26} strokeWidth={1.5} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#102A33]">
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
   LOADING ROWS
========================================================= */

function LoadingRows() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((row) => (
        <tr key={row}>
          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200/70" />

              <div className="space-y-2">
                <div className="h-3 w-48 animate-pulse rounded bg-slate-200/70" />
                <div className="h-2 w-12 animate-pulse rounded bg-slate-200/50" />
              </div>
            </div>
          </td>

          <td className="px-5 py-5">
            <div className="h-3 w-32 animate-pulse rounded bg-slate-200/70" />
          </td>

          <td className="px-5 py-5">
            <div className="h-3 w-28 animate-pulse rounded bg-slate-200/70" />
          </td>

          <td className="px-5 py-5">
            <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200/70" />
          </td>

          <td className="px-6 py-5">
            <div className="ml-auto h-8 w-24 animate-pulse rounded-lg bg-slate-200/70" />
          </td>
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
     FILTER DATA
  ======================================================= */

  const filtered = properties.filter((property) => {
    const query = search.toLowerCase().trim();

    const matchSearch =
      !query ||
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
    if (price === null || price === undefined || price === "") {
      return "-";
    }

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
        {/* ===================================================
            AMBIENT BACKGROUND
        =================================================== */}

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="
              absolute
              -left-40
              -top-40
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#0F6A6A]/10
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              -right-40
              top-20
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#5CC8B2]/10
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-1/3
              h-[360px]
              w-[360px]
              rounded-full
              bg-[#B7E4DA]/20
              blur-[100px]
            "
          />

          {/* Subtle grid */}
          <div
            className="
              absolute inset-0
              opacity-[0.025]
              [background-image:linear-gradient(rgba(15,106,106,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(15,106,106,0.5)_1px,transparent_1px)]
              [background-size:40px_40px]
            "
          />
        </div>

        <div className="flex flex-col gap-7">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-xl
                    border border-[#0F6A6A]/10
                    bg-[#0F6A6A]/5
                    text-[#0F6A6A]
                  "
                >
                  <Sparkles size={15} />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F6A6A]/70">
                  Overview
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-[#102A33]">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Kelola properti dan data website Namura Property.
              </p>
            </div>

            <Link
              href="/admin/properti/tambah"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#0F6A6A]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-[0_10px_25px_rgba(15,106,106,0.18)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#0B5C5C]
                hover:shadow-[0_15px_35px_rgba(15,106,106,0.22)]
                active:scale-[0.98]
              "
            >
              <Plus
                size={17}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-200
                  group-hover:rotate-90
                "
              />

              <span>Tambah Properti</span>

              <ArrowUpRight
                size={15}
                className="
                  opacity-50
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </div>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Properti"
              value={stats?.total_properties}
              icon={Building2}
              gradient="from-[#0F6A6A] to-[#39AFA0]"
              description="Semua properti"
              loading={loading}
            />

            <StatCard
              label="Total Artikel"
              value={stats?.total_articles}
              icon={FileText}
              gradient="from-[#00A982] to-[#36C7A8]"
              description="Artikel website"
              loading={loading}
            />

            <StatCard
              label="Total User"
              value={stats?.total_users}
              icon={Users}
              gradient="from-[#0EA5E9] to-[#38BDF8]"
              description="Pengguna terdaftar"
              loading={loading}
            />

            <StatCard
              label="Notifikasi"
              value={stats?.total_notifications}
              icon={Bell}
              gradient="from-[#F59E0B] to-[#FDBA4D]"
              description="Notifikasi sistem"
              loading={loading}
            />
          </div>

          {/* =================================================
              PROPERTY SECTION
          ================================================= */}

          <section
            className="
              overflow-hidden
              rounded-[26px]
              border border-white/90
              bg-white/80
              backdrop-blur-2xl
              shadow-[0_15px_50px_rgba(15,106,106,0.07)]
            "
          >
            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="border-b border-[#0F6A6A]/10 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-[#102A33]">
                      Daftar Properti
                    </h2>

                    <span
                      className="
                        rounded-full
                        border border-[#0F6A6A]/10
                        bg-[#0F6A6A]/5
                        px-2
                        py-0.5
                        text-[10px]
                        font-semibold
                        text-[#0F6A6A]
                      "
                    >
                      {properties.length}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Kelola seluruh listing properti kamu.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* =========================================
                      SEARCH
                  ========================================= */}

                  <div className="relative">
                    <Search
                      size={16}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) =>
                        setSearchInput(e.target.value)
                      }
                      placeholder="Cari properti..."
                      className="
                        h-10
                        w-full
                        rounded-xl
                        border border-[#0F6A6A]/15
                        bg-white/70
                        pl-9
                        pr-10
                        text-xs
                        text-slate-700
                        outline-none
                        placeholder:text-slate-400
                        transition
                        focus:border-[#0F6A6A]/40
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#0F6A6A]/8
                        sm:w-60
                      "
                    />

                    {searchInput && (
                      <button
                        type="button"
                        onClick={resetSearch}
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                          transition
                          hover:text-[#0F6A6A]
                        "
                        aria-label="Reset pencarian"
                      >
                        <RotateCcw size={13} />
                      </button>
                    )}
                  </div>

                  {/* =========================================
                      FILTER
                  ========================================= */}

                  <div
                    className="
                      flex
                      items-center
                      rounded-xl
                      border border-[#0F6A6A]/10
                      bg-[#EFF6F5]/80
                      p-1
                    "
                  >
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
                              px-3
                              py-2
                              text-[11px]
                              font-semibold
                              transition-all
                              duration-200
                              ${
                                active
                                  ? "bg-white text-[#0F6A6A] shadow-sm ring-1 ring-[#0F6A6A]/5"
                                  : "text-slate-400 hover:text-[#0F6A6A]"
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
                  <tr
                    className="
                      border-b
                      border-[#0F6A6A]/10
                      bg-[#F4F8F8]/70
                    "
                  >
                    <th
                      className="
                        px-6
                        py-3
                        text-left
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[#789197]
                      "
                    >
                      Properti
                    </th>

                    <th
                      className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[#789197]
                      "
                    >
                      Lokasi
                    </th>

                    <th
                      className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[#789197]
                      "
                    >
                      Harga
                    </th>

                    <th
                      className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[#789197]
                      "
                    >
                      Tipe
                    </th>

                    <th
                      className="
                        px-6
                        py-3
                        text-right
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[#789197]
                      "
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#0F6A6A]/8">
                  {/* =========================================
                      LOADING
                  ========================================= */}

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
                            transition-all
                            duration-200
                            hover:bg-[#F0F8F7]/70
                          "
                        >
                          {/* =================================
                              PROPERTY
                          ================================= */}

                          <td className="px-6 py-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  flex-shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  border
                                  border-[#0F6A6A]/8
                                  bg-[#0F6A6A]/5
                                  text-[#0F6A6A]
                                  transition-all
                                  duration-200
                                  group-hover:scale-105
                                  group-hover:bg-[#0F6A6A]/10
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
                                    text-[#102A33]
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

                          {/* =================================
                              LOCATION
                          ================================= */}

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <MapPin
                                size={13}
                                className="flex-shrink-0 text-[#0F6A6A]/45"
                                strokeWidth={1.7}
                              />

                              <span className="max-w-[180px] truncate">
                                {item.location || "-"}
                              </span>
                            </div>
                          </td>

                          {/* =================================
                              PRICE
                          ================================= */}

                          <td className="px-5 py-4">
                            <span className="text-xs font-semibold text-[#102A33]">
                              {formatPrice(item.price)}
                            </span>
                          </td>

                          {/* =================================
                              TYPE
                          ================================= */}

                          <td className="px-5 py-4">
                            <span
                              className={`
                                inline-flex
                                items-center
                                rounded-full
                                px-2.5
                                py-1
                                text-[10px]
                                font-semibold
                                ring-1
                                ${
                                  isSale
                                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200/70"
                                    : "bg-sky-50 text-sky-700 ring-sky-200/70"
                                }
                              `}
                            >
                              <span
                                className={`
                                  mr-1.5
                                  h-1.5
                                  w-1.5
                                  rounded-full
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

                          {/* =================================
                              ACTION
                          ================================= */}

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              {/* DETAIL */}

                              <Link
                                href={`/admin/properti/detail/${item.id}`}
                                title="Lihat detail"
                                className="
                                  flex
                                  h-8
                                  w-8
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-slate-400
                                  transition-all
                                  hover:bg-[#0F6A6A]/8
                                  hover:text-[#0F6A6A]
                                "
                              >
                                <Eye
                                  size={15}
                                  strokeWidth={1.8}
                                />
                              </Link>

                              {/* EDIT */}

                              <Link
                                href={`/admin/properti/edit/${item.id}`}
                                title="Edit properti"
                                className="
                                  flex
                                  h-8
                                  w-8
                                  items-center
                                  justify-center
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

                              {/* DELETE */}

                              <button
                                type="button"
                                title="Hapus properti"
                                onClick={() =>
                                  setDeleteTarget(item)
                                }
                                className="
                                  flex
                                  h-8
                                  w-8
                                  items-center
                                  justify-center
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
              <div
                className="
                  flex
                  flex-col
                  gap-2
                  border-t
                  border-[#0F6A6A]/8
                  bg-[#F8FBFB]/60
                  px-6
                  py-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
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