"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Upload, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { apiFetch, API_URL, getImageUrl } from "@/lib/api";
import { toast } from "sonner";

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

export default function EditPropertiPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    type: "Jual",
    status: "Aktif",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    garage: "",
    building_area: "",
    land_area: "",
    description: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await apiFetch(`/api/properties/${params.id}`);
        setForm({
          title: data.title || "",
          type: data.type || "Jual",
          status: data.status || "Aktif",
          price: data.price?.toString() || "",
          location: data.location || "",
          bedrooms: data.bedrooms?.toString() || "",
          bathrooms: data.bathrooms?.toString() || "",
          garage: data.garage?.toString() || "",
          building_area: data.building_area?.toString() || "",
          land_area: data.land_area?.toString() || "",
          description: data.description || "",
        });
        setCurrentImage(data.image || "");
      } catch (err) {
        console.error("Failed to fetch property:", err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchProperty();
  }, [params.id]);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        type: form.type,
        status: form.status,
        price: parseFloat(form.price) || 0,
        location: form.location,
        bedrooms: parseInt(form.bedrooms) || 0,
        bathrooms: parseInt(form.bathrooms) || 0,
        garage: parseInt(form.garage) || 0,
        building_area: parseFloat(form.building_area) || 0,
        land_area: parseFloat(form.land_area) || 0,
        description: form.description,
      };

      await apiFetch(`/api/properties/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      // Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const token = localStorage.getItem("token");
        await fetch(
          `${API_URL}/api/properties/${params.id}/upload`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
      }

      toast.success("✓ Properti berhasil diperbarui");
      router.push("/admin/properti");
    } catch (err) {
      setError(err.data?.details ? Object.values(err.data.details).join(", ") : err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400">Memuat data...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/properti" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition">
            <ArrowLeft size={14} /> Kembali ke Properti
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">Edit Properti</h1>
          <p className="text-sm text-gray-400 mt-0.5">Perbarui informasi properti.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/admin/properti" className="px-4 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition">
            Batal
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : "Update Properti"}
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
              <option value="Aktif">Aktif</option>
              <option value="Draft">Draft</option>
            </Select>
          </div>
          <div>
            <Label>Harga (angka saja)</Label>
            <Input placeholder="750000000" type="number" value={form.price} onChange={set("price")} />
          </div>
          <div>
            <Label>Lokasi</Label>
            <Input placeholder="Bandar Lampung, Lampung" value={form.location} onChange={set("location")} />
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
      <SectionCard title="Foto Properti" description="Unggah foto baru untuk mengganti yang lama.">
        <div className="flex flex-col gap-4">
          {/* Current image */}
          {currentImage && !imagePreview && (
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-black/[0.06]">
              <img
                src={getImageUrl(currentImage)}
                alt="Current"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <label className="flex flex-col items-center justify-center gap-3 w-full h-36 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-[#0F6A6A]/40 transition cursor-pointer">
            <Upload size={20} className="text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Klik untuk unggah foto baru</p>
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
        <Link href="/admin/properti" className="px-5 py-2.5 text-sm rounded-xl border border-black/[0.08] text-gray-600 hover:bg-gray-50 transition">
          Batal
        </Link>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[#0F6A6A] text-white hover:opacity-90 active:scale-[.98] transition disabled:opacity-50"
        >
          <Save size={15} />
          {saving ? "Menyimpan..." : "Update Properti"}
        </button>
      </div>
    </div>
  );
}
