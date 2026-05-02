"use client";

import { useState } from "react";
import Image from "next/image";

export default function FAQ() {
  const [active, setActive] = useState(null);

  const faqs = [
    {
      question: "Bagaimana cara menjadwalkan kunjungan properti?",
      answer:
        "Anda dapat menjadwalkan kunjungan melalui halaman kontak atau menghubungi tim kami secara langsung untuk menentukan waktu yang sesuai.",
    },
    {
      question: "Jenis properti apa saja yang tersedia?",
      answer:
        "Kami menyediakan berbagai pilihan properti, mulai dari rumah tinggal, apartemen, hingga properti komersial.",
    },
    {
      question: "Apakah tersedia layanan konsultasi properti?",
      answer:
        "Ya, tim kami siap membantu Anda dalam memilih properti yang sesuai dengan kebutuhan dan anggaran.",
    },
    {
      question: "Apakah properti bisa dijadikan investasi?",
      answer:
        "Semua properti kami memiliki potensi investasi jangka panjang dengan nilai yang terus berkembang.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* IMAGE */}
          <div className="order-2 md:order-1">
            <Image
              src="/Asset/Banner/Asset3.png"
              alt="FAQ Properti"
              width={450}
              height={520}
              className="rounded-xl object-cover w-full h-[240px] sm:h-[300px] md:h-auto"
            />
          </div>

          {/* CONTENT */}
          <div className="order-1 md:order-2 text-center md:text-left">

            {/* LABEL */}
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
              FAQ
            </p>

            {/* TITLE */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 md:mb-8">
              Pertanyaan yang Sering Diajukan
            </h2>

            {/* ACCORDION */}
            <div className="space-y-3 md:space-y-4 text-left">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setActive(active === i ? null : i)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <p className="font-medium text-sm md:text-base text-gray-900">
                      {item.question}
                    </p>

                    <span className="text-gray-500 text-lg shrink-0">
                      {active === i ? "−" : "+"}
                    </span>
                  </div>

                  {active === i && (
                    <p className="text-gray-600 text-xs md:text-sm mt-3 leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}