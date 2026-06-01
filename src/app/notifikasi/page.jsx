"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function NotifikasiPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Silakan login untuk melihat notifikasi.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/notifications`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (!res.ok) throw new Error("Gagal memuat notifikasi");
                const data = await res.json();
                const sorted = (data || []).sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setNotifications(sorted);
            } catch (err) {
                setError("Gagal memuat notifikasi");
            } finally {
                setLoading(false);
            }
        }
        fetchNotifications();
    }, []);

    const totalPages = Math.ceil(notifications.length / perPage);
    const paginated = notifications.slice(
        (page - 1) * perPage,
        page * perPage
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <section className="bg-white">
            <div className="max-w-[800px] mx-auto px-6 py-24">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
                        Notifikasi
                    </span>

                    <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
                        Semua Notifikasi
                    </h1>

                    <p className="mt-4 text-lg text-gray-600">
                        Pantau semua aktivitas dan pembaruan sistem.
                    </p>
                </div>

                {loading ? (
                    <div className="py-24 text-center text-gray-400">
                        Memuat notifikasi...
                    </div>
                ) : error ? (
                    <div className="py-24 text-center">
                        <p className="text-red-500">{error}</p>
                        <Link href="/login" className="inline-block mt-4 text-[#0F6A6A] font-medium hover:underline">
                            Login →
                        </Link>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="py-24 text-center border border-dashed border-gray-200 rounded-[32px]">
                        <Bell size={32} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900">
                            Tidak ada notifikasi
                        </h3>
                        <p className="mt-2 text-gray-500">
                            Belum ada notifikasi untuk ditampilkan.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-3">
                            {paginated.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#0F6A6A]/10 flex items-center justify-center flex-shrink-0">
                                            <Bell size={18} className="text-[#0F6A6A]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900">{notif.title}</p>
                                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                            <p className="text-xs text-gray-400 mt-2">{formatDate(notif.created_at)}</p>
                                        </div>
                                        <span
                                            className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${(notif.status || "").toLowerCase() === "terkirim"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-amber-50 text-amber-700"
                                                }`}
                                        >
                                            {notif.status || "Draft"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-3 mt-12">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setPage(num)}
                                        className={`w-11 h-11 rounded-full text-sm font-medium transition ${page === num
                                                ? "bg-[#0F6A6A] text-white"
                                                : "border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
