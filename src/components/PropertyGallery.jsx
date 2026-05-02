"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = () =>
    setActive((p) => (p === 0 ? images.length - 1 : p - 1));

  const next = () =>
    setActive((p) => (p === images.length - 1 ? 0 : p + 1));

  if (!images.length) return null;

  return (
    <div>

      {/* MAIN */}
      <div className="relative h-[260px] md:h-[420px] mb-4">
        <Image
          src={images[active]}
          alt=""
          fill
          className="object-cover rounded-xl cursor-zoom-in"
          onClick={() => setOpen(true)}
        />

        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
          <ChevronLeft />
        </button>

        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
          <ChevronRight />
        </button>
      </div>

      {/* THUMB */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={`w-20 h-16 relative cursor-pointer border ${
              active === i ? "border-black" : ""
            }`}
          >
            <Image src={img} fill className="object-cover" alt="" />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white">
            <X />
          </button>

          <button onClick={prev} className="absolute left-6 text-white">
            <ChevronLeft />
          </button>

          <Image
            src={images[active]}
            width={900}
            height={600}
            className="object-contain max-h-[90vh]"
            alt=""
          />

          <button onClick={next} className="absolute right-6 text-white">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}