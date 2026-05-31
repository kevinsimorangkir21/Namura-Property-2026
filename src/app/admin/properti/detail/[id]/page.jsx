"use client";

import Link from "next/link";
import {
  Pencil,
  Archive,
  BedDouble,
  Bath,
  Car,
  Ruler,
  MapPin,
  ArrowLeft,
} from "lucide-react";

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
  const property = {
    id: 1,
    title: "Rumah Minimalis Lampung",
    price: "Rp 750.000.000",
    location: "Bandar Lampung",
    type: "Dijual",
    status: "Aktif",
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    buildingArea: 120,
    landArea: 180,
    images: [
      "/Asset/Properti5/Asset1.png",
      "/Asset/Properti5/Asset1.png",
      "/Asset/Properti5/Asset1.png",
      "/Asset/Properti5/Asset1.png",
    ],
    facilities: [
      "Kolam Renang",
      "Carport",
      "Taman",
      "Security",
      "Wifi",
      "Gym",
    ],
    description:
      "Hunian modern dengan lokasi strategis, akses mudah ke pusat kota, sekolah, rumah sakit, dan pusat perbelanjaan.",
  };

  const stats = [
    { icon: <BedDouble size={20} />, value: property.bedrooms, label: "Kamar Tidur" },
    { icon: <Bath size={20} />, value: property.bathrooms, label: "Kamar Mandi" },
    { icon: <Car size={20} />, value: property.garage, label: "Garasi" },
    { icon: <Ruler size={20} />, value: `${property.buildingArea} m²`, label: "Luas Bangunan" },
    { icon: <Ruler size={20} />, value: `${property.landArea} m²`, label: "Luas Tanah" },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/properti"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition"
          >
            <ArrowLeft size={14} />
            Kembali ke Properti
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80">
              {property.status}
            </span>
            <span className="inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-200/80">
              {property.type}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={12} />
              {property.location}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition">
            <Archive size={15} />
            Arsipkan
          </button>
          <Link
            href={`/admin/properti/${property.id}/edit`}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition"
          >
            <Pencil size={15} />
            Edit Properti
          </Link>
        </div>
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-4 gap-3 h-[360px]">
        <div className="col-span-2 row-span-2">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        {property.images.slice(1).map((img, i) => (
          <div key={i} className="col-span-1">
            <img
              src={img}
              alt={`${property.title} ${i + 2}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>

      {/* PRICE */}
      <div className="bg-white rounded-2xl border border-black/[0.06] px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Harga</p>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight">
            {property.price}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin size={13} />
          {property.location}
        </div>
      </div>

      {/* DETAIL STATS */}
      <SectionCard title="Detail Properti">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 border border-black/[0.04]"
            >
              <div className="text-gray-400">{s.icon}</div>
              <p className="font-semibold text-gray-900 text-sm">{s.value}</p>
              <p className="text-[11px] text-gray-400 text-center">{s.label}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* FASILITAS */}
      <SectionCard title="Fasilitas">
        <div className="flex flex-wrap gap-2">
          {property.facilities.map((facility) => (
            <span
              key={facility}
              className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[#0F6A6A]/[0.08] text-[#0F6A6A] text-xs font-medium border border-[#0F6A6A]/20"
            >
              {facility}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* DESKRIPSI */}
      <SectionCard title="Deskripsi">
        <p className="text-sm text-gray-600 leading-7">
          {property.description}
        </p>
      </SectionCard>

    </div>
  );
}