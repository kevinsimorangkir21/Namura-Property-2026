import Link from "next/link";
import Image from "next/image";
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
  const imageSrc = image
    ? getImageUrl(image)
    : images?.[0] || "/placeholder.jpg";

  const href = slug ? `/daftar-properti/${slug}` : `/daftar-properti/${id}`;

  const formattedPrice =
    typeof price === "number"
      ? `Rp ${price.toLocaleString("id-ID")}`
      : price;

  if (!id) return null;

  return (
    <Link href={href}>
      <div
        className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl"
      >
        <div className="relative overflow-hidden rounded-xl">
          {image ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              width={400}
              height={300}
              className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {type && (
            <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${(type || "").toLowerCase() === "jual"
                ? "bg-emerald-500 text-white"
                : "bg-sky-500 text-white"
              }`}>
              {(type || "").toLowerCase() === "jual" ? "Dijual" : "Disewa"}
            </span>
          )}
        </div>

        <div className="mt-3 px-1">
          <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-[#0F6A6A] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-0.5">{location}</p>
          <p className="text-[#0F6A6A] font-semibold mt-1">
            {formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}
