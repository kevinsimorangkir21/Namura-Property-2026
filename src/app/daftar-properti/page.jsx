"use client";

import { useEffect, useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Search } from "lucide-react";

export default function DaftarPropertiPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties`
        );
        if (!res.ok) throw new Error("Gagal memuat data");
        const data = await res.json();
        setProperties(data || []);
      } catch (err) {
        setError("Gagal memuat data properti");
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filteredData = useMemo(() => {
    return properties.filter((item) => {
      const matchType =
        activeFilter === "semua" ||
        (item.type || "").toLowerCase() === activeFilter;

      const matchSearch = (item.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchType && matchSearch;
    });
  }, [activeFilter, search, properties]);

  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#0F6A6A]/10 px-4 py-2 text-sm font-medium text-[#0F6A6A]">
            Daftar Properti
          </span>

          <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Temukan Properti
            <br />
            Impian Anda
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Jelajahi berbagai pilihan properti terbaik dengan lokasi strategis,
            desain modern, dan nilai investasi yang menjanjikan.
          </p>
        </div>

        <div className="mt-14 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              placeholder="Cari properti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-14
                pl-14
                pr-5
                rounded-full
                border
                border-gray-200
                bg-white
                outline-none
                focus:border-[#0F6A6A]
                transition
              "
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["semua", "jual", "sewa"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`h-11 px-5 rounded-full text-sm font-medium transition ${activeFilter === item
                    ? "bg-[#0F6A6A] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#0F6A6A] hover:text-[#0F6A6A]"
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

        <div className="mt-8 mb-10">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900">
              {filteredData.length}
            </span>{" "}
            properti
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-400">
            Memuat properti...
          </div>
        ) : error ? (
          <div className="py-24 text-center text-red-500">
            {error}
          </div>
        ) : filteredData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <PropertyCard
                key={item.id}
                id={item.id}
                title={item.title}
                slug={item.slug}
                price={item.price}
                location={item.location}
                image={item.image}
                type={item.type}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-gray-200 rounded-[32px]">
            <h3 className="text-xl font-semibold text-gray-900">
              Properti Tidak Ditemukan
            </h3>

            <p className="mt-2 text-gray-500">
              Coba gunakan kata kunci lain atau ubah filter pencarian.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
