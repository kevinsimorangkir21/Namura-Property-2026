"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Pencil, Archive, BedDouble, Bath, Car, Ruler, MapPin, ArrowLeft } from "lucide-react";
import { apiFetch, getImageUrl } from "@/lib/api";

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.05]">
        <p className="text-sm font-medium text-gray-800">{title}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function DetailPropertiPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await apiFetch(`/api/properties/${params.id}`);
        setProperty(data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchProperty();
  }, [params.id]);

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400">Memuat data...</div>;
  }

  if (!property) {
    return <div className="flex items-center justify-center py-20 text-gray-400">Properti tidak ditemukan.</div>;
  }

  const formatPrice = (price) => {
    if (!price) return "-";
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const stats = [
    { icon: <BedDouble size={20} />, value: property.bedrooms, label: "Kamar Tidur" },
    { icon: <Bath size={20} />, value: property.bathrooms, label: "Kamar Mandi" },
    { icon: <Car size={20} />, value: property.garage, label: "Garasi" },
    { icon: <Ruler size={20} />, value: `${property.building_area} m²`, label: "Luas Bangunan" },
    { icon: <Ruler size={20} />, value: `${property.land_area} m²`, label: "Luas Tanah" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/properti" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition">
            <ArrowLeft size={14} /> Kembali ke Properti
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">{property.title}</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80">
              {property.status}
            </span>
            <span className="inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-200/80">
              {property.type}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={12} /> {property.location}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/admin/properti/edit/${property.id}`}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition"
          >
            <Pencil size={15} /> Edit Properti
          </Link>
        </div>
      </div>

      {/* IMAGE */}
      {property.image && (
        <div className="h-[360px] rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={getImageUrl(property.image)}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* PRICE */}
      <div className="bg-white rounded-2xl border border-black/[0.06] px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Harga</p>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight">{formatPrice(property.price)}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin size={13} /> {property.location}
        </div>
      </div>

      {/* DETAIL STATS */}
      <SectionCard title="Detail Properti">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 border border-black/[0.04]">
              <div className="text-gray-400">{s.icon}</div>
              <p className="font-semibold text-gray-900 text-sm">{s.value}</p>
              <p className="text-[11px] text-gray-400 text-center">{s.label}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* DESKRIPSI */}
      {property.description && (
        <SectionCard title="Deskripsi">
          <p className="text-sm text-gray-600 leading-7">{property.description}</p>
        </SectionCard>
      )}
    </div>
  );
}
