import Link from "next/link";
import { properties } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import RelatedProperties from "@/components/RelatedProperties";
import {
  BedDouble,
  Bath,
  Ruler,
  MapPin,
} from "lucide-react";

export default async function PropertyDetail({ params }) {
  const { slug } = await params;

  const property = properties.find(
    (p) => String(p.id) === String(slug)
  );

  if (!property) {
    return (
      <div className="py-24 text-center text-gray-500">
        Properti tidak ditemukan
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/daftar-properti"
            className="hover:text-gray-900"
          >
            Properti
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            {property.title}
          </span>
        </div>

        <PropertyGallery images={property.images || []} />

        <div className="max-w-[900px] mx-auto mt-14">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-4 py-2 rounded-full bg-[#0F6A6A]/10 text-[#0F6A6A] text-sm font-medium">
              {property.type === "jual"
                ? "Dijual"
                : "Disewa"}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 mt-4 text-gray-500">
            <MapPin size={18} />
            <span>
              {property.location || "Lokasi tidak tersedia"}
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-bold text-[#0F6A6A]">
            {property.price}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            <div className="border border-gray-100 rounded-2xl p-5">
              <BedDouble className="w-5 h-5 text-[#0F6A6A]" />

              <p className="text-sm text-gray-500 mt-3">
                Kamar Tidur
              </p>

              <h3 className="font-semibold text-gray-900 mt-1">
                {property.bedrooms || "-"}
              </h3>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <Bath className="w-5 h-5 text-[#0F6A6A]" />

              <p className="text-sm text-gray-500 mt-3">
                Kamar Mandi
              </p>

              <h3 className="font-semibold text-gray-900 mt-1">
                {property.bathrooms || "-"}
              </h3>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5 col-span-2 md:col-span-1">
              <Ruler className="w-5 h-5 text-[#0F6A6A]" />

              <p className="text-sm text-gray-500 mt-3">
                Luas Bangunan
              </p>

              <h3 className="font-semibold text-gray-900 mt-1">
                {property.area || "-"}
              </h3>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-2xl font-semibold text-gray-900">
              Deskripsi Properti
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              {property.desc}
            </p>
          </div>

          <div className="mt-14 bg-[#F8FAFC] border border-gray-100 rounded-[28px] p-8">
            <h3 className="text-2xl font-semibold text-gray-900">
              Ringkasan Properti
            </h3>

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="flex justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-gray-900">
                  {property.type === "jual"
                    ? "Dijual"
                    : "Disewa"}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-500">Lokasi</span>
                <span className="font-medium text-gray-900">
                  {property.location || "-"}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-500">Kamar Tidur</span>
                <span className="font-medium text-gray-900">
                  {property.bedrooms || "-"}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-500">Kamar Mandi</span>
                <span className="font-medium text-gray-900">
                  {property.bathrooms || "-"}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-500">Luas Bangunan</span>
                <span className="font-medium text-gray-900">
                  {property.area || "-"}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-500">Harga</span>
                <span className="font-medium text-[#0F6A6A]">
                  {property.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <RelatedProperties currentId={property.id} />
        </div>
      </div>
    </section>
  );
}