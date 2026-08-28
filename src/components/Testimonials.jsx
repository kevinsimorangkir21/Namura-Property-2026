"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Andi Pratama",
      location: "Jakarta",
      image: "/user1.jpg",
      text: "Proses pembelian rumah sangat mudah dan transparan. Tim selalu responsif dan membantu sampai proses serah terima.",
    },
    {
      name: "Siti Rahma",
      location: "Bandung",
      image: "/user2.jpg",
      text: "Lokasi strategis dan kualitas bangunan sangat memuaskan. Investasi yang tepat untuk keluarga kami.",
    },
    {
      name: "Budi Santoso",
      location: "Lampung",
      image: "/user3.jpg",
      text: "Pelayanan profesional dan proses administrasi sangat jelas. Sangat direkomendasikan bagi yang mencari properti.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* HEADER */}
        <div className="mx-auto max-w-[720px] text-center">

          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-[#0F6A6A]/10 bg-[#0F6A6A]/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#0F6A6A] sm:text-sm">
            Testimoni Klien
          </span>

          {/* Heading */}
          <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Apa Kata Klien Kami
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-7 text-gray-500 sm:text-base lg:text-lg">
            Kepercayaan pelanggan adalah prioritas utama kami. Dengarkan
            pengalaman mereka dalam menemukan hunian terbaik bersama kami.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group flex h-full flex-col rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)] sm:p-8"
            >
              {/* Rating */}
              <div
                className="flex items-center gap-1 text-[#F59E0B]"
                aria-label="Rating 5 dari 5"
              >
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    strokeWidth={1.8}
                    className="fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-6 flex-1 text-[15px] leading-7 text-gray-600">
                “{item.text}”
              </p>

              {/* Client */}
              <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                    {item.name}
                  </h4>

                  <p className="mt-0.5 text-xs text-gray-400 sm:text-sm">
                    {item.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}