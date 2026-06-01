"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LatestArticles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchArticles() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
                );
                if (!res.ok) throw new Error("Gagal memuat artikel");
                const data = await res.json();
                // Sort newest first, filter published, take 3
                const sorted = (data || [])
                    .filter((a) => (a.status || "").toLowerCase() === "published")
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 3);
                setArticles(sorted);
            } catch (err) {
                setError("Gagal memuat artikel");
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <section className="bg-white">
            <div className="max-w-[1200px] mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
                    <div>
                        <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
                            Artikel Terbaru
                        </span>

                        <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
                            Insight &amp; Informasi
                            <br />
                            Seputar Properti
                        </h2>

                        <p className="mt-4 max-w-2xl text-lg text-gray-600">
                            Temukan tips, panduan, dan informasi terbaru untuk membantu
                            Anda membuat keputusan investasi properti yang tepat.
                        </p>
                    </div>

                    <Link
                        href="/artikel"
                        className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-gray-200 bg-white text-gray-900 font-medium hover:bg-gray-50 transition"
                    >
                        Lihat Semua Artikel
                    </Link>
                </div>

                {loading ? (
                    <div className="py-24 text-center text-gray-400">
                        Memuat artikel...
                    </div>
                ) : error ? (
                    <div className="py-24 text-center text-red-500">
                        {error}
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((item) => {
                            const imageSrc = item.thumbnail || item.image;
                            const imageUrl = imageSrc
                                ? imageSrc.startsWith("http")
                                    ? imageSrc
                                    : `${process.env.NEXT_PUBLIC_API_URL}/${imageSrc}`
                                : null;

                            return (
                                <Link
                                    key={item.id}
                                    href={`/artikel/${item.slug}`}
                                    className="group"
                                >
                                    <article className="bg-white border border-gray-100 rounded-[28px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                                        <div className="overflow-hidden">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={item.title}
                                                    className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-[240px] bg-gray-100 flex items-center justify-center text-gray-300">
                                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <p className="text-sm text-gray-400">
                                                {formatDate(item.created_at)}
                                            </p>

                                            <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-[#0F6A6A] transition">
                                                {item.title}
                                            </h3>

                                            {item.excerpt && (
                                                <p className="mt-3 text-gray-600 line-clamp-3">
                                                    {item.excerpt}
                                                </p>
                                            )}

                                            <span className="inline-flex mt-5 text-[#0F6A6A] font-medium">
                                                Baca Selengkapnya →
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-24 text-center text-gray-400">
                        Belum ada artikel tersedia.
                    </div>
                )}
            </div>
        </section>
    );
}
