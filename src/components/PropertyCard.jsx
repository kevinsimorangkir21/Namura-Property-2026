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
  // Support both: API single `image` string and legacy `images` array
  const imageSrc = image
    ? getImageUrl(image)
    : images?.[0] || "/placeholder.jpg";

  // Use slug for URL if available, fallback to id
  const href = slug ? `/daftar-properti/${slug}` : `/daftar-properti/${id}`;

  // Format price: if number, format as Rp; if string, use as-is
  const formattedPrice =
    typeof price === "number"
      ? `Rp ${price.toLocaleString("id-ID")}`
      : price;

  if (!id) return null;

  return (
    <Link href={href}>
      <div className="group cursor-pointer">

        <div className="relative overflow-hidden rounded-xl">
          {image ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-[220px] object-cover group-hover:scale-105 transition"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              width={400}
              height={300}
              className="w-full h-[220px] object-cover group-hover:scale-105 transition"
            />
          )}
        </div>

        <div className="mt-3">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-gray-400 text-sm">{location}</p>
          <p className="text-[var(--primary)] font-semibold mt-1">
            {formattedPrice}
          </p>
        </div>

      </div>
    </Link>
  );
}
