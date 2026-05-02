"use client";

import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Search } from "lucide-react";
import { properties } from "@/data/properties";

export default function DaftarPropertiPage() {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [search, setSearch] = useState("");

  // 🔍 FILTER + SEARCH
  const filteredData = properties.filter((item) => {
    const matchType =
      activeFilter === "semua" || item.type === activeFilter;

    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchType && matchSearch;
  });

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* HEADER */}
        <div className="mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Daftar Properti
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto md:mx-0 text-sm md:text-base">
            Temukan berbagai pilihan properti terbaik sesuai kebutuhan Anda.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">

          {/* SEARCH */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2 w-full md:max-w-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              placeholder="Cari properti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* FILTER */}
          <div className="flex gap-4 text-sm justify-center md:justify-end">
            {["semua", "jual", "sewa"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`pb-1 capitalize transition ${
                  activeFilter === item
                    ? "text-gray-900 border-b-2 border-[var(--primary)] font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item === "semua"
                  ? "Semua"
                  : item === "jual"
                  ? "Dijual"
                  : "Disewa"}
              </button>
            ))}
          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filteredData.map((item) => (
            <PropertyCard key={item.id} {...item} />
          ))}
        </div>

        {/* EMPTY */}
        {filteredData.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Properti tidak ditemukan.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}