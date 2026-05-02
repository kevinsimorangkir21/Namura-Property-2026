import Link from "next/link";
import Image from "next/image";

export default function PropertyCard({
  id,
  title,
  price,
  images,
  location,
}) {
  return (
    <Link href={`/daftar-properti/${id}`}>
      <div className="group cursor-pointer">

        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={images[0]}
            alt={title}
            width={400}
            height={300}
            className="w-full h-[220px] object-cover group-hover:scale-105 transition"
          />
        </div>

        <div className="mt-3">
          <h3 className="font-medium">{title}</h3>
          <p className="text-gray-400 text-sm">{location}</p>
          <p className="text-[var(--primary)] font-semibold mt-1">
            {price}
          </p>
        </div>

      </div>
    </Link>
  );
}