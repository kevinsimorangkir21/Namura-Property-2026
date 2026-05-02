import { properties } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import RelatedProperties from "@/components/RelatedProperties";

export default function PropertyDetail({ params }) {
  const { slug } = params;

  const property = properties.find((p) => p.id === slug);

  if (!property) {
    return (
      <div className="py-20 text-center text-gray-500">
        Properti tidak ditemukan
      </div>
    );
  }

  const wa = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo, saya tertarik dengan ${property.title}`
  )}`;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* 🔹 GALLERY */}
        <PropertyGallery images={property.images} />

        {/* 🔹 CONTENT */}
        <div className="grid md:grid-cols-2 gap-12 mt-12">

          {/* LEFT */}
          <div>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              {property.title}
            </h1>

            <p className="text-gray-400 text-sm mb-4">
              {property.location}
            </p>

            <p className="text-[var(--primary)] text-xl md:text-2xl font-semibold mb-6">
              {property.price}
            </p>

            {/* MINI INFO */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6">
              <span>{property.bedrooms} Kamar Tidur</span>
              <span>{property.bathrooms} Kamar Mandi</span>
              <span>{property.area}</span>
            </div>

            {/* DESC */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {property.desc}
            </p>

          </div>

          {/* RIGHT — CONTACT */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">

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


            {/* WHATSAPP */}
            <a
              href={wa}
              target="_blank"
              className="block text-center mt-3 py-3 rounded-full text-sm border border-[var(--primary)] text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white transition"
            >
              Kirim Pesan via WhatsApp
            </a>

          </div>

        </div>

        {/* 🔹 RELATED */}
        <RelatedProperties currentId={property.id} />

      </div>
    </section>
  );
}