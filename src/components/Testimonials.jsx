"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

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

const rowClass =
  "-mx-[18px] flex snap-x snap-mandatory scroll-px-[18px] gap-4 overflow-x-auto px-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-9 lg:overflow-visible lg:px-0";

const itemClass =
  "w-[85%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-auto";

function Avatar({ name, image }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[var(--primary-light)] text-sm font-bold text-[var(--primary)]">
      {image && !failed ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="52px"
          onError={() => setFailed(true)}
          className="object-cover"
        />
      ) : (
        initials
      )}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[var(--surface)]">
      <div className="container section">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow justify-center">
            <span className="eyebrow-dot" />
            Testimoni Klien
          </div>

          <h2 className="heading-lg mt-5">Apa Kata Klien Kami</h2>

          <p className="text-body mx-auto mt-6 max-w-2xl">
            Kepercayaan pelanggan adalah prioritas utama kami. Dengarkan
            pengalaman mereka dalam menemukan hunian terbaik bersama kami.
          </p>
        </div>

        <ul className={`${rowClass} mt-10 lg:mt-14`}>
          {testimonials.map((item) => (
            <li key={item.name} className={itemClass}>
              <article className="notch-wrap group h-full">
                <div className="notch flex h-full flex-col rounded-3xl bg-[var(--surface-soft)] p-6 transition-colors duration-300 group-hover:bg-[#0B1717] group-active:bg-[#0B1717]">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <Avatar name={item.name} image={item.image} />

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-white group-active:text-white">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 truncate text-sm text-[var(--foreground-soft)] transition-colors duration-300 group-hover:text-white/60 group-active:text-white/60">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  <blockquote className="mt-6 flex-1 text-[15px] leading-7 text-[var(--foreground-muted)] transition-colors duration-300 group-hover:text-white/75 group-active:text-white/75">
                    “{item.text}”
                  </blockquote>

                  <div
                    className="mt-6 flex h-8 items-center gap-1 text-[var(--warning)]"
                    role="img"
                    aria-label="Rating 5 dari 5"
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className="h-[17px] w-[17px] fill-current"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <span className="notch-btn" aria-hidden="true">
                  <Quote
                    size={24}
                    strokeWidth={2}
                    className="text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--primary)] group-active:text-[var(--primary)]"
                  />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}