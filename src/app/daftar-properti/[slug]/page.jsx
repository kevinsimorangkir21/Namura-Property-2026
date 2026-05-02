import Link from "next/link";
import { properties } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import RelatedProperties from "@/components/RelatedProperties";

export default async function PropertyDetail({ params }) {
  const { slug } = await params;

  const property = properties.find(
    (p) => String(p.id) === String(slug)
  );

  if (!property) {
    return (
      <div className="py-20 text-center text-gray-500">
        Properti tidak ditemukan
      </div>
    );
  }

  const wa = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo, saya tertarik dengan properti ${property.title}`
  )}`;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* ================= BREADCRUMB ================= */}
        <div className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-900">Home</Link> /{" "}
          <Link href="/daftar-properti" className="hover:text-gray-900">
            Properti
          </Link>{" "}
          / <span className="text-gray-600">{property.title}</span>
        </div>

        {/* ================= GALLERY ================= */}
        <PropertyGallery images={property.images || []} />

        {/* ================= CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-12 mt-12">

          {/* LEFT */}
          <div>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              {property.title}
            </h1>

            <p className="text-gray-400 text-sm mb-4">
              {property.location || "Lokasi tidak tersedia"}
            </p>

            <p className="text-[var(--primary)] text-xl md:text-2xl font-semibold mb-6">
              {property.price}
            </p>

            {/* INFO */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-500 mb-8">
              <div>
                <p className="text-gray-400">Kamar Tidur</p>
                <p className="font-medium text-gray-900">
                  {property.bedrooms || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Kamar Mandi</p>
                <p className="font-medium text-gray-900">
                  {property.bathrooms || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Luas</p>
                <p className="font-medium text-gray-900">
                  {property.area || "-"}
                </p>
              </div>
            </div>

            {/* DESC */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {property.desc}
            </p>

          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">

            <h3 className="mb-5 font-semibold text-gray-900">
              Hubungi Agen
            </h3>

            <div className="space-y-3">

              <input
                placeholder="Nama"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-[var(--primary)] transition"
              />

              <input
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-[var(--primary)] transition"
              />

              <textarea
                placeholder="Pesan"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-[var(--primary)] transition"
              />

            </div>

            {/* CTA */}
            <a
              href={wa}
              target="_blank"
              className="block text-center mt-5 py-3 rounded-full text-sm font-medium bg-[var(--primary)] text-white hover:opacity-90 transition"
            >
              Chat via WhatsApp
            </a>

          </div>

        </div>

        {/* ================= RELATED ================= */}
        <div className="mt-16">
          <RelatedProperties currentId={property.id} />
        </div>

      </div>
    </section>
  );
}