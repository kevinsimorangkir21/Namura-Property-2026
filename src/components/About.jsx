import Link from "next/link";
import { ArrowUpRight, Award, MapPin, ShieldCheck, TrendingUp } from "lucide-react";

const ILLUSTRATION_URL = "";

const cards = [
  { title: "Pengalaman", value: "10+ Tahun", icon: Award, href: "/tentang-kami" },
  { title: "Lokasi", value: "Strategis", icon: MapPin, href: "/tentang-kami" },
  { title: "Kualitas", value: "Terjamin", icon: ShieldCheck, href: "/tentang-kami" },
  { title: "Investasi", value: "Menguntungkan", icon: TrendingUp, href: "/tentang-kami" },
];

export default function About() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)]">
      <div className="container section">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-[0.9fr_1fr_1fr] lg:grid-rows-2 lg:gap-9">
          <div className="relative flex min-h-[380px] flex-col overflow-hidden rounded-3xl bg-[var(--surface-soft)] p-7 sm:p-9 md:col-span-2 lg:col-span-1 lg:row-span-2">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-[44px]">
              Tentang Kami
            </h2>

            <p className="mt-4 max-w-[30ch] text-base leading-7 text-[var(--foreground-muted)]">
              Membangun hunian nyaman untuk masa depan keluarga dengan
              pengalaman lebih dari satu dekade.
            </p>

            <Link
              href="/tentang-kami"
              className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
            >
              Pelajari Lebih Lanjut
              <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </Link>

            {ILLUSTRATION_URL && (
              <img
                src={ILLUSTRATION_URL}
                alt=""
                loading="lazy"
                draggable={false}
                className="pointer-events-none mt-auto block w-[94%] max-w-[460px] object-contain object-bottom pt-8"
              />
            )}
          </div>

          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="notch-wrap group block h-full"
              >
                <div className="notch flex h-full min-h-[200px] flex-col justify-between rounded-3xl bg-[var(--surface-soft)] p-6 transition-colors duration-300 group-hover:bg-[#0B1717] group-focus-visible:bg-[#0B1717] group-active:bg-[#0B1717] sm:min-h-[210px]">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
                      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                    </span>

                    <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-white group-focus-visible:text-white group-active:text-white sm:text-2xl">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-8 text-[40px] font-bold leading-none tracking-tight text-[var(--foreground-soft)]">
                    {card.value}
                  </p>
                </div>

                <span className="notch-btn" aria-hidden="true">
                  <ArrowUpRight
                    size={26}
                    strokeWidth={2.25}
                    className="text-[var(--foreground)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)] group-focus-visible:text-[var(--primary)] group-active:text-[var(--primary)]"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}