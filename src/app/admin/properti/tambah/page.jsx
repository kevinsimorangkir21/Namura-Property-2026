"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload, X, MapPin } from "lucide-react";
import { apiFetch } from "@/lib/api";

/* ================= FIELD COMPONENTS ================= */

function Label({ children }) {
  return <label className="block text-xs font-medium text-gray-600 mb-1.5">{children}</label>;
}

function Input({ placeholder, type = "text", value, onChange }) {
  return (
    <input
      type={type}
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
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function TambahPropertiPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    type: "Jual",
    status: "Draft",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    garage: "",
    building_area: "",
    land_area: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (status) => {
    setSaving(true);
    setError("");

    try {
      // Create property
      const payload = {
        title: form.title,
        type: form.type,
        status: status,
        price: parseFloat(form.price) || 0,
        location: form.location,
        bedrooms: parseInt(form.bedrooms) || 0,
        bathrooms: parseInt(form.bathrooms) || 0,
        garage: parseInt(form.garage) || 0,
        building_area: parseFloat(form.building_area) || 0,
        land_area: parseFloat(form.land_area) || 0,
        description: form.description,
      };

      const property = await apiFetch("/api/properties", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Upload image if selected
      if (imageFile && property.id) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const token = localStorage.getItem("token");
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${property.id}/upload`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
      }

      router.push("/admin/properti");
    } catch (err) {
      setError(err.data?.details ? Object.values(err.data.details).join(", ") : err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Tambah Properti</h1>
          <p className="text-sm text-gray-400 mt-0.5">Isi detail properti yang ingin dipublikasikan.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => handleSubmit("Draft")}
            disabled={saving}
            className="px-4 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            onClick={() => handleSubmit("Aktif")}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
      )}

      {/* INFORMASI DASAR */}
      <SectionCard title="Informasi Dasar">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label>Nama Properti</Label>
            <Input placeholder="Contoh: Rumah Minimalis 2 Lantai" value={form.title} onChange={set("title")} />
          </div>
          <div>
            <Label>Tipe Listing</Label>
            <Select value={form.type} onChange={set("type")}>
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
            <Label>Harga (angka saja)</Label>
            <Input placeholder="Contoh: 750000000" type="number" value={form.price} onChange={set("price")} />
          </div>
          <div>
            <Label>Lokasi</Label>
            <Input placeholder="Contoh: Bandar Lampung, Lampung" value={form.location} onChange={set("location")} />
          </div>
        </div>
      </SectionCard>

      {/* DETAIL PROPERTI */}
      <SectionCard title="Detail Properti">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label>Kamar Tidur</Label>
            <Input placeholder="3" type="number" value={form.bedrooms} onChange={set("bedrooms")} />
          </div>
          <div>
            <Label>Kamar Mandi</Label>
            <Input placeholder="2" type="number" value={form.bathrooms} onChange={set("bathrooms")} />
          </div>
          <div>
            <Label>Garasi</Label>
            <Input placeholder="1" type="number" value={form.garage} onChange={set("garage")} />
          </div>
          <div>
            <Label>Luas Bangunan (m²)</Label>
            <Input placeholder="120" type="number" value={form.building_area} onChange={set("building_area")} />
          </div>
          <div>
            <Label>Luas Tanah (m²)</Label>
            <Input placeholder="150" type="number" value={form.land_area} onChange={set("land_area")} />
          </div>
        </div>
      </SectionCard>

      {/* DESKRIPSI */}
      <SectionCard title="Deskripsi">
        <textarea
          rows={5}
          value={form.description}
          onChange={set("description")}
          placeholder="Tulis deskripsi lengkap properti..."
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F6A6A]/20 focus:border-[#0F6A6A]/40 placeholder-gray-400 transition resize-none"
        />
      </SectionCard>

      {/* FOTO */}
      <SectionCard title="Foto Properti" description="Unggah 1 foto utama. Format JPG, PNG, atau WEBP (max 10MB).">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col items-center justify-center gap-3 w-full h-36 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-[#0F6A6A]/40 transition cursor-pointer">
            <Upload size={20} className="text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Klik untuk unggah foto</p>
              <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, atau WEBP</p>
            </div>
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageSelect} />
          </label>

          {imagePreview && (
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-black/[0.06]">
              <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              <button
                onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center"
              >
                <X size={10} />
              </button>
            </div>
          )}
        </div>
      </SectionCard>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pb-2">
        <button onClick={() => router.push("/admin/properti")} className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition">
          Batal
        </button>
        <button
          onClick={() => handleSubmit("Aktif")}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
        >
          <Save size={15} />
          {saving ? "Menyimpan..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
