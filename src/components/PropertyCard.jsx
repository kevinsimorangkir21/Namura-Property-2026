import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { getImageUrl } from "@/lib/api";

export default function PropertyCard({
  id,
  title,
  slug,
  price,
  images = [],
  image,
  location,
  type,
}) {
  if (!id) return null;

  const imageSrc = image
    ? getImageUrl(image)
    : images?.[0] || "/placeholder.jpg";

  const href = slug
    ? `/daftar-properti/${slug}`
    : `/daftar-properti/${id}`;

  const formattedPrice =
    typeof price === "number"
      ? `Rp ${price.toLocaleString("id-ID")}`
      : price || "Hubungi Kami";

  const isSell =
    (type || "").toLowerCase() === "jual";

  return (
    <Link href={href} className="block h-full">
      <article className="group h-full overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          {image ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-[250px] sm:h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              width={600}
              height={400}
              className="w-full h-[250px] sm:h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* badge */}
          {type && (
            <span
              className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                isSell
                  ? "bg-emerald-500 text-white"
                  : "bg-sky-500 text-white"
              }`}
            >
              {isSell ? "Dijual" : "Disewa"}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#0F6A6A] transition-colors">
            {title}
          </h3>

          {location && (
            <div className="flex items-center gap-2 mt-3 text-gray-500">
              <MapPin size={15} className="text-[#0F6A6A]" />
              <span className="text-sm line-clamp-1">
                {location}
              </span>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Harga
              </p>

              <p className="text-xl font-bold text-[#0F6A6A] mt-1">
                {formattedPrice}
              </p>
            </div>

            <div className="flex items-center gap-1 text-sm font-medium text-[#0F6A6A]">
              Detail
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}