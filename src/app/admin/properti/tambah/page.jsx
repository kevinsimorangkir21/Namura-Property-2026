"use client";

import { useState } from "react";
import { Save, Upload, X, MapPin } from "lucide-react";

/* ================= FIELD COMPONENTS ================= */

function Label({ children }) {
  return (
    <label className="block text-xs font-medium text-gray-600 mb-1.5">
      {children}
    </label>
  );
}

function Input({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 text-gray-700 transition"
    >
      {children}
    </select>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.05]">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ================= CONSTANTS ================= */

const FASILITAS = [
  "Kolam Renang",
  "Carport",
  "Taman",
  "Security",
  "Wifi",
  "Gym",
  "Dapur",
  "AC",
  "Water Heater",
];

/* ================= PAGE ================= */

export default function TambahPropertiPage() {
  const [form, setForm] = useState({
    nama: "",
    tipe: "Jual",
    status: "Draft",
    harga: "",
    lokasi: "",
    kamarTidur: "",
    kamarMandi: "",
    garasi: "",
    luasBangunan: "",
    luasTanah: "",
    maps: "",
    deskripsi: "",
  });

  const [fasilitas, setFasilitas] = useState([]);
  const [images, setImages] = useState([]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleFasilitas = (item) =>
    setFasilitas((prev) =>
      prev.includes(item)
        ? prev.filter((f) => f !== item)
        : [...prev, item]
    );

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages((prev) =>
        [...prev, ...Array.from(e.target.files)].slice(0, 6)
      );
    }
  };

  const removeImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Tambah Properti
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Isi detail properti yang ingin dipublikasikan.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="px-4 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition">
            Simpan Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
            <Save size={15} />
            Publish
          </button>
        </div>
      </div>

      {/* INFORMASI DASAR */}
      <SectionCard title="Informasi Dasar">
        <div className="grid md:grid-cols-2 gap-5">

          <div className="md:col-span-2">
            <Label>Nama Properti</Label>
            <Input
              placeholder="Contoh: Rumah Minimalis 2 Lantai"
              value={form.nama}
              onChange={set("nama")}
            />
          </div>

          <div>
            <Label>Tipe Listing</Label>
            <Select value={form.tipe} onChange={set("tipe")}>
              <option value="Jual">Dijual</option>
              <option value="Sewa">Disewa</option>
            </Select>
          </div>

          <div>
            <Label>Status</Label>
            <Select value={form.status} onChange={set("status")}>
              <option value="Draft">Draft</option>
              <option value="Aktif">Aktif</option>
            </Select>
          </div>

          <div>
            <Label>Harga</Label>
            <Input
              placeholder="Contoh: Rp 750.000.000"
              value={form.harga}
              onChange={set("harga")}
            />
          </div>

          <div>
            <Label>Lokasi</Label>
            <Input
              placeholder="Contoh: Bandar Lampung, Lampung"
              value={form.lokasi}
              onChange={set("lokasi")}
            />
          </div>

        </div>
      </SectionCard>

      {/* DETAIL PROPERTI */}
      <SectionCard title="Detail Properti">
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <Label>Kamar Tidur</Label>
            <Input
              placeholder="Contoh: 3"
              value={form.kamarTidur}
              onChange={set("kamarTidur")}
            />
          </div>

          <div>
            <Label>Kamar Mandi</Label>
            <Input
              placeholder="Contoh: 2"
              value={form.kamarMandi}
              onChange={set("kamarMandi")}
            />
          </div>

          <div>
            <Label>Garasi</Label>
            <Input
              placeholder="Contoh: 1"
              value={form.garasi}
              onChange={set("garasi")}
            />
          </div>

          <div>
            <Label>Luas Bangunan (m²)</Label>
            <Input
              placeholder="Contoh: 120"
              value={form.luasBangunan}
              onChange={set("luasBangunan")}
            />
          </div>

          <div>
            <Label>Luas Tanah (m²)</Label>
            <Input
              placeholder="Contoh: 150"
              value={form.luasTanah}
              onChange={set("luasTanah")}
            />
          </div>

        </div>
      </SectionCard>

      {/* FASILITAS */}
      <SectionCard title="Fasilitas Properti">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FASILITAS.map((item) => {
            const checked = fasilitas.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggleFasilitas(item)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm transition ${
                  checked
                    ? "bg-[#0F6A6A]/[0.08] border-[#0F6A6A]/30 text-[#0F6A6A] font-medium"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition ${
                    checked
                      ? "bg-[#0F6A6A] border-[#0F6A6A]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {checked && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                {item}
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* LOKASI MAPS */}
      <SectionCard title="Lokasi Maps">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <MapPin size={15} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="https://maps.google.com/..."
            value={form.maps}
            onChange={set("maps")}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition"
          />
        </div>
        {form.maps && (
          <p className="text-xs text-gray-400 mt-2">
            Pastikan link merupakan embed URL dari Google Maps.
          </p>
        )}
      </SectionCard>

      {/* DESKRIPSI */}
      <SectionCard title="Deskripsi">
        <textarea
          rows={5}
          value={form.deskripsi}
          onChange={set("deskripsi")}
          placeholder="Tulis deskripsi lengkap properti, termasuk fasilitas, keunggulan, dan informasi tambahan..."
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition resize-none"
        />
      </SectionCard>

      {/* FOTO */}
      <SectionCard
        title="Foto Properti"
        description="Unggah hingga 6 foto. Format JPG, PNG, atau WEBP."
      >
        <div className="flex flex-col gap-4">

          <label className="flex flex-col items-center justify-center gap-3 w-full h-36 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-[#0F6A6A]/40 transition cursor-pointer">
            <Upload size={20} className="text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Klik untuk unggah foto
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                atau drag & drop ke sini
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-black/[0.06] bg-gray-100"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </SectionCard>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pb-2">
        <button className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition">
          Batal
        </button>
        <button className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition">
          Simpan Draft
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition">
          <Save size={15} />
          Publish
        </button>
      </div>

    </div>
  );
}