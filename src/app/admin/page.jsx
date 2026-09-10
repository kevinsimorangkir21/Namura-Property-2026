"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileText,
  Plus,
  Search,
  Trash2,
  UserRound,
  Bell,
  Eye,
  Pencil,
  MapPin,
  RefreshCw,
  TrendingUp,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { apiFetch } from "@/lib/api";
import { StatCardSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";
import DeleteModal from "@/components/ui/DeleteModal";

/* ============================================================
   HELPERS
============================================================ */

const formatPrice = (price) => {
  if (!price) return "-";
  return `Rp ${Number(price).toLocaleString("id-ID")}`;
};

const getTypeLabel = (type) => {
  return (type || "").toLowerCase() === "jual"
    ? "Dijual"
    : "Disewa";
};

const getTypeClass = (type) => {
  return (type || "").toLowerCase() === "jual"
    ? "bg-[#EAF5F4] text-[#0F6A6A] ring-1 ring-[#0F6A6A]/10"
    : "bg-[#EFF6FF] text-[#2563EB] ring-1 ring-[#2563EB]/10";
};

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  icon: Icon,
  description,
  iconClass,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#E5EBE8] bg-white p-4 shadow-[0_2px_12px_rgba(20,40,35,0.025)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D8E3DF] hover:shadow-[0_8px_24px_rgba(20,40,35,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon
            size={18}
            strokeWidth={1.8}
          />
        </div>

        <div className="flex h-7 w-7 items-center justify-center rounded-lg text-[#B0BBB7] transition-colors group-hover:bg-[#F4F8F7] group-hover:text-[#0F6A6A]">
          <ArrowUpRight size={15} />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[26px] font-bold leading-none tracking-[-0.035em] text-[#101918]">
          {value}
        </p>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#667370]">
            {label}
          </p>

          {description && (
            <span className="hidden text-[10px] text-[#A0AAA7] sm:block">
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({ search, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F6F5] text-[#8B9894]">
        <Search size={20} strokeWidth={1.7} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#263331]">
        Tidak ada properti ditemukan
      </h3>

      <p className="mt-1 max-w-[320px] text-center text-xs leading-5 text-[#98A39F]">
        {search
          ? "Coba gunakan kata kunci lain atau reset pencarian."
          : "Belum ada properti yang tersedia."}
      </p>

      {search && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#EAF5F4] px-3 py-2 text-xs font-semibold text-[#0F6A6A] transition hover:bg-[#DDEFE D]"
        >
          <RefreshCw size={13} />
          Reset pencarian
        </button>
      )}
    </div>
  );
}

/* ============================================================
   MOBILE PROPERTY CARD
============================================================ */

function MobilePropertyCard({
  item,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-[#E5EBE8] bg-white p-4 shadow-[0_2px_12px_rgba(20,40,35,0.025)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#202B29]">
            {item.title || "Properti Tanpa Nama"}
          </h3>

          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#8A9692]">
            <MapPin
              size={12}
              strokeWidth={1.8}
            />
            <span className="truncate">
              {item.location || "-"}
            </span>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${getTypeClass(
            item.type
          )}`}
        >
          {getTypeLabel(item.type)}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] text-[#9AA5A1]">
            Harga
          </p>

          <p className="mt-0.5 text-sm font-bold text-[#263331]">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href={`/admin/properti/detail/${item.id}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7D8985] transition hover:bg-[#F2F6F5] hover:text-[#0F6A6A]"
            title="Lihat"
          >
            <Eye size={15} />
          </Link>

          <Link
            href={`/admin/properti/edit/${item.id}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7D8985] transition hover:bg-[#F2F6F5] hover:text-[#0F6A6A]"
            title="Edit"
          >
            <Pencil size={15} />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(item)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600"
            title="Hapus"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function AdminPage() {
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ==========================================================
     FETCH DATA
  ========================================================== */

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [statsData, propertiesData] =
        await Promise.all([
          apiFetch("/api/dashboard/stats"),
          apiFetch("/api/properties"),
        ]);

      setStats(statsData);
      setProperties(propertiesData || []);
    } catch (err) {
      console.error(
        "Failed to fetch dashboard data:",
        err
      );

      toast.error("Gagal memuat data dashboard", {
        description:
          "Silakan coba refresh kembali.",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ==========================================================
     SEARCH DEBOUNCE
  ========================================================== */

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  /* ==========================================================
     FILTERED PROPERTIES
  ========================================================== */

  const filtered = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim();

    return properties.filter((property) => {
      const title = (
        property.title || ""
      ).toLowerCase();

      const location = (
        property.location || ""
      ).toLowerCase();

      const matchSearch =
        !keyword ||
        title.includes(keyword) ||
        location.includes(keyword);

      const matchFilter =
        filter === "all" ||
        (property.type || "")
          .toLowerCase() === filter;

      return matchSearch && matchFilter;
    });
  }, [properties, search, filter]);

  /* ==========================================================
     DELETE
  ========================================================== */

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      setProperties((prev) =>
        prev.filter(
          (property) => property.id !== id
        )
      );

      toast.success(
        "Properti berhasil dihapus"
      );

      setDeleteTarget(null);
    } catch (err) {
      console.error(
        "Failed to delete property:",
        err
      );

      toast.error(
        "Gagal menghapus properti"
      );
    }
  };

  /* ==========================================================
     RESET
  ========================================================== */

  const resetSearch = () => {
    setSearchInput("");
    setSearch("");
    setFilter("all");
  };

  /* ==========================================================
     FILTERS
  ========================================================== */

  const filterLabels = {
    all: "Semua",
    jual: "Dijual",
    sewa: "Disewa",
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <>
      {/* DELETE MODAL */}
      <DeleteModal
        item={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() =>
          setDeleteTarget(null)
        }
      />

      <div className="mx-auto w-full max-w-[1440px] space-y-5">

        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F6A6A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F6A6A]">
                Overview
              </span>
            </div>

            <h1 className="text-[25px] font-bold tracking-[-0.035em] text-[#101918] sm:text-[28px]">
              Dashboard
            </h1>

            <p className="mt-1 text-xs leading-5 text-[#7C8884] sm:text-sm">
              Pantau dan kelola aktivitas Namura Property dari satu tempat.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E1E8E5] bg-white px-3.5 text-xs font-semibold text-[#5E6A66] transition hover:border-[#CCD8D4] hover:bg-[#F8FAF9] hover:text-[#0F6A6A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={14}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

            <Link
              href="/admin/properti/tambah"
              className="group flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0F6A6A] px-4 text-xs font-semibold text-white shadow-[0_5px_16px_rgba(15,106,106,0.14)] transition hover:bg-[#0C5A5A] hover:shadow-[0_7px_20px_rgba(15,106,106,0.20)] active:scale-[0.98]"
            >
              <Plus
                size={15}
                strokeWidth={2.2}
              />

              <span>
                Tambah Properti
              </span>

              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </section>

        {/* ====================================================
            STATS
        ==================================================== */}

        {loading ? (
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <StatCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <StatCard
              label="Total Properti"
              value={
                stats?.total_properties ?? 0
              }
              description="Semua properti"
              icon={Building2}
              iconClass="bg-[#EAF5F4] text-[#0F6A6A]"
            />

            <StatCard
              label="Total Artikel"
              value={
                stats?.total_articles ?? 0
              }
              description="Konten website"
              icon={FileText}
              iconClass="bg-[#F0F5FF] text-[#4F6FD8]"
            />

            <StatCard
              label="Total User"
              value={
                stats?.total_users ?? 0
              }
              description="Pengguna"
              icon={UserRound}
              iconClass="bg-[#F3F1FA] text-[#765DB5]"
            />

            <StatCard
              label="Notifikasi"
              value={
                stats?.total_notifications ?? 0
              }
              description="Aktivitas"
              icon={Bell}
              iconClass="bg-[#FFF7E9] text-[#C58A2B]"
            />
          </div>
        )}

        {/* ====================================================
            MAIN PROPERTY SECTION
        ==================================================== */}

        <section className="overflow-hidden rounded-2xl border border-[#E4EBE8] bg-white shadow-[0_2px_14px_rgba(20,40,35,0.025)]">

          {/* SECTION HEADER */}
          <div className="border-b border-[#E9EEEC] px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

              {/* TITLE */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F4] text-[#0F6A6A]">
                  <Building2
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-[#263331]">
                    Daftar Properti
                  </h2>

                  <p className="mt-0.5 text-[10px] text-[#9AA5A1]">
                    Kelola seluruh properti yang tampil di website.
                  </p>
                </div>
              </div>

              {/* CONTROLS */}
              <div className="flex flex-col gap-2 sm:flex-row">

                {/* SEARCH */}
                <div className="relative">
                  <Search
                    size={15}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9BA6A2]"
                  />

                  <input
                    value={searchInput}
                    onChange={(e) =>
                      setSearchInput(
                        e.target.value
                      )
                    }
                    placeholder="Cari nama atau lokasi..."
                    className="h-9 w-full rounded-xl border border-[#E2E8E5] bg-[#F8FAF9] pl-9 pr-9 text-xs text-[#263331] outline-none transition placeholder:text-[#A4AEAB] hover:border-[#D2DC D8] focus:border-[#0F6A6A] focus:bg-white focus:ring-4 focus:ring-[#0F6A6A]/[0.05] sm:w-[230px]"
                  />

                  {searchInput && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearchInput("")
                      }
                      className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[#A0AAA7] hover:bg-[#EAF5F4] hover:text-[#0F6A6A]"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* FILTER */}
                <div className="flex h-9 items-center rounded-xl bg-[#F3F6F5] p-1">
                  {Object.entries(
                    filterLabels
                  ).map(([value, label]) => {
                    const active =
                      filter === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setFilter(value)
                        }
                        className={`
                          h-7 rounded-lg px-3 text-[10px] font-semibold transition-all
                          ${
                            active
                              ? "bg-white text-[#0F6A6A] shadow-[0_1px_4px_rgba(20,40,35,0.08)]"
                              : "text-[#7F8B87] hover:text-[#263331]"
                          }
                        `}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#EEF2F0] bg-[#FBFCFC]">
                  <th className="px-5 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#9AA5A1]">
                    Properti
                  </th>

                  <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#9AA5A1]">
                    Lokasi
                  </th>

                  <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#9AA5A1]">
                    Harga
                  </th>

                  <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#9AA5A1]">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-[9px] font-bold uppercase tracking-[0.12em] text-[#9AA5A1]">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F0F3F2]">
                {loading ? (
                  <>
                    {[1, 2, 3, 4, 5, 6].map(
                      (item) => (
                        <TableRowSkeleton
                          key={item}
                        />
                      )
                    )}
                  </>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <EmptyState
                        search={search}
                        onReset={resetSearch}
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="group transition-colors hover:bg-[#FBFCFC]"
                    >
                      {/* PROPERTY */}
                      <td className="max-w-[280px] px-5 py-3.5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F5] text-[#6E7C77] transition-colors group-hover:bg-[#EAF5F4] group-hover:text-[#0F6A6A]">
                            <Building2
                              size={16}
                              strokeWidth={1.7}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#263331]">
                              {item.title ||
                                "Properti Tanpa Nama"}
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#A0AAA7]">
                              ID #{item.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td className="max-w-[220px] px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin
                            size={13}
                            strokeWidth={1.7}
                            className="shrink-0 text-[#A0AAA7]"
                          />

                          <span className="truncate text-xs text-[#687570]">
                            {item.location || "-"}
                          </span>
                        </div>
                      </td>

                      {/* PRICE */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-bold text-[#34413E]">
                          {formatPrice(
                            item.price
                          )}
                        </span>
                      </td>

                      {/* TYPE */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ${getTypeClass(
                            item.type
                          )}`}
                        >
                          {getTypeLabel(
                            item.type
                          )}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">

                          <Link
                            href={`/admin/properti/detail/${item.id}`}
                            title="Lihat properti"
                            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-semibold text-[#7B8783] transition hover:bg-[#F0F6F5] hover:text-[#0F6A6A]"
                          >
                            <Eye
                              size={14}
                            />
                            <span className="hidden xl:inline">
                              Lihat
                            </span>
                          </Link>

                          <Link
                            href={`/admin/properti/edit/${item.id}`}
                            title="Edit properti"
                            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-semibold text-[#7B8783] transition hover:bg-[#F0F6F5] hover:text-[#0F6A6A]"
                          >
                            <Pencil
                              size={14}
                            />
                            <span className="hidden xl:inline">
                              Edit
                            </span>
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget(
                                item
                              )
                            }
                            title="Hapus properti"
                            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-semibold text-[#C27C7C] transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2
                              size={14}
                            />
                            <span className="hidden xl:inline">
                              Hapus
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ==================================================
              MOBILE LIST
          ================================================== */}

          <div className="space-y-3 p-3 md:hidden">
            {loading ? (
              <>
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-[105px] animate-pulse rounded-2xl bg-[#F2F5F4]"
                  />
                ))}
              </>
            ) : filtered.length === 0 ? (
              <EmptyState
                search={search}
                onReset={resetSearch}
              />
            ) : (
              filtered.map((item) => (
                <MobilePropertyCard
                  key={item.id}
                  item={item}
                  onDelete={setDeleteTarget}
                />
              ))
            )}
          </div>

          {/* ==================================================
              TABLE FOOTER
          ================================================== */}

          <div className="flex flex-col gap-2 border-t border-[#EEF2F0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F1F6F5] text-[#0F6A6A]">
                <TrendingUp
                  size={12}
                  strokeWidth={1.8}
                />
              </span>

              <p className="text-[10px] text-[#929D99]">
                Menampilkan{" "}
                <span className="font-bold text-[#53605C]">
                  {filtered.length}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-[#53605C]">
                  {properties.length}
                </span>{" "}
                properti
              </p>
            </div>

            <div className="flex items-center gap-3">
              {search && (
                <button
                  type="button"
                  onClick={resetSearch}
                  className="text-[10px] font-semibold text-[#0F6A6A] transition hover:opacity-70"
                >
                  Reset pencarian
                </button>
              )}

              <Link
                href="/admin/properti"
                className="group flex items-center gap-1 text-[10px] font-semibold text-[#7C8884] transition hover:text-[#0F6A6A]"
              >
                Kelola semua properti
                <ChevronRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* ====================================================
            QUICK ACTIONS
        ==================================================== */}

        <section className="grid gap-3 sm:grid-cols-3">

          <Link
            href="/admin/artikel"
            className="group flex items-center gap-3 rounded-2xl border border-[#E5EBE8] bg-white p-3.5 shadow-[0_2px_12px_rgba(20,40,35,0.02)] transition hover:-translate-y-0.5 hover:border-[#D8E3DF] hover:shadow-[0_8px_24px_rgba(20,40,35,0.05)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5FF] text-[#4F6FD8]">
              <FileText
                size={16}
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#34413E]">
                Kelola Artikel
              </p>

              <p className="mt-0.5 text-[10px] text-[#9AA5A1]">
                Atur konten website
              </p>
            </div>

            <ArrowUpRight
              size={15}
              className="text-[#A7B1AE] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0F6A6A]"
            />
          </Link>

          <Link
            href="/admin/user"
            className="group flex items-center gap-3 rounded-2xl border border-[#E5EBE8] bg-white p-3.5 shadow-[0_2px_12px_rgba(20,40,35,0.02)] transition hover:-translate-y-0.5 hover:border-[#D8E3DF] hover:shadow-[0_8px_24px_rgba(20,40,35,0.05)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F1FA] text-[#765DB5]">
              <UserRound
                size={16}
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#34413E]">
                Kelola User
              </p>

              <p className="mt-0.5 text-[10px] text-[#9AA5A1]">
                Atur akses administrator
              </p>
            </div>

            <ArrowUpRight
              size={15}
              className="text-[#A7B1AE] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0F6A6A]"
            />
          </Link>

          <Link
            href="/admin/notifikasi"
            className="group flex items-center gap-3 rounded-2xl border border-[#E5EBE8] bg-white p-3.5 shadow-[0_2px_12px_rgba(20,40,35,0.02)] transition hover:-translate-y-0.5 hover:border-[#D8E3DF] hover:shadow-[0_8px_24px_rgba(20,40,35,0.05)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF7E9] text-[#C58A2B]">
              <Bell
                size={16}
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#34413E]">
                Notifikasi
              </p>

              <p className="mt-0.5 text-[10px] text-[#9AA5A1]">
                Lihat aktivitas terbaru
              </p>
            </div>

            <ArrowUpRight
              size={15}
              className="text-[#A7B1AE] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0F6A6A]"
            />
          </Link>
        </section>

        {/* ====================================================
            SYSTEM STATUS
        ==================================================== */}

        <div className="flex items-center justify-between rounded-xl border border-[#E7ECEA] bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#3FA66B]/30" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#3FA66B]" />
            </span>

            <span className="text-[10px] font-medium text-[#7C8884]">
              Dashboard system aktif
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-[#A0AAA7]">
            <CheckCircle2
              size={12}
              className="text-[#3FA66B]"
            />
            Data tersinkronisasi
          </div>
        </div>
      </div>
    </>
  );
}