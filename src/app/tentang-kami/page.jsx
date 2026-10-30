"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const BANNER_ILLUSTRATION_URL = "";

const TABS = [
  { id: "profil", label: "Profil Perusahaan" },
  { id: "visi-misi", label: "Visi & Misi" },
  { id: "nilai", label: "Nilai Perusahaan" },
  { id: "tim", label: "Tim Kami" },
];

const values = [
  {
    number: "01",
    title: "Integritas",
    desc: "Transparansi dan kejujuran dalam setiap proses yang kami jalankan.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Profesional",
    desc: "Memberikan pelayanan terbaik dengan standar kerja yang tinggi.",
    icon: Users,
  },
  {
    number: "03",
    title: "Inovasi",
    desc: "Terus berkembang mengikuti kebutuhan pasar dan teknologi.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Komitmen",
    desc: "Fokus pada kualitas dan kepuasan pelanggan jangka panjang.",
    icon: TrendingUp,
  },
];

const achievements = [
  { value: "100+", label: "Properti", icon: Building2 },
  { value: "80+", label: "Klien", icon: Users },
  { value: "10+", label: "Tahun", icon: TrendingUp },
  { value: "5+", label: "Kota", icon: MapPin },
];

const highlights = [
  "Lokasi strategis dan terus berkembang.",
  "Kualitas konstruksi dengan standar terbaik.",
  "Nilai investasi yang terus bertumbuh.",
];

const missions = [
  "Menyediakan properti berkualitas dengan desain modern.",
  "Memberikan pelayanan terbaik kepada pelanggan.",
  "Membangun hubungan jangka panjang dengan mitra dan klien.",
  "Berkontribusi pada pembangunan yang berkelanjutan.",
];

const team = [
  {
    name: "Martin Simorangkir",
    role: "Property Consultant",
    image: "/team1.jpg",
    desc: "Membantu pelanggan menemukan properti yang sesuai dengan kebutuhan dan rencana mereka.",
    note: "Siap membantu kebutuhan properti Anda",
  },
  {
    name: "Kevin Simorangkir",
    role: "IT Developer",
    image: "/team2.jpg",
    desc: "Mengembangkan teknologi dan pengalaman digital untuk mendukung kebutuhan pelanggan.",
    note: "Membangun pengalaman digital Namura",
  },
];

const smallNotch = { "--nw": "56px", "--nh": "56px", "--nr": "20px" };

function NotchCard({ icon: Icon, className = "", hoverDark = false, style, children }) {
  return (
    <div className="notch-wrap group h-full" style={style}>
      <div
        className={`notch flex h-full flex-col rounded-3xl bg-[var(--surface-soft)] ${
          hoverDark
            ? "transition-colors duration-300 group-hover:bg-[#0B1717] group-active:bg-[#0B1717]"
            : ""
        } ${className}`}
      >
        {children}
      </div>

      <span className="notch-btn" aria-hidden="true">
        <Icon
          size={24}
          strokeWidth={2}
          className="text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--primary)]"
        />
      </span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, accent, desc, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-[720px] text-center" : "max-w-[760px]"}>
      <span className={`eyebrow ${center ? "justify-center" : ""}`}>
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>

      <h2 className="heading-lg mt-4">
        {title}
        <span className="block text-[var(--primary)]">{accent}</span>
      </h2>

      {desc && (
        <p className={`text-body mt-4 ${center ? "mx-auto max-w-[620px]" : "max-w-[650px]"}`}>
          {desc}
        </p>
      )}
    </div>
  );
}

function TeamPhoto({ name, image }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative h-56 w-full overflow-hidden bg-[var(--surface-muted)] sm:h-64">
      {!failed ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          onError={() => setFailed(true)}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-[var(--primary)]/40">
          {initials}
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent"
      />
    </div>
  );
}

function ProfilPanel() {
  return (
    <div className="space-y-14 lg:space-y-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-20">
        <div className="notch-wrap group relative mx-auto w-full max-w-[560px] [filter:drop-shadow(0_20px_36px_rgba(15,60,60,0.14))] lg:mx-0">
          <div className="notch relative overflow-hidden rounded-[28px] sm:rounded-[32px]">
            <Image
              src="/Asset/Banner/Asset1.png"
              alt="Tentang Namura Property"
              width={800}
              height={900}
              className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />

            <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-[var(--glass-bg-strong)] px-4 py-3 backdrop-blur-xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <TrendingUp size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-soft)]">
                    Pengalaman
                  </p>
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-[var(--primary)] sm:text-2xl">
                      10+
                    </span>
                    <span className="text-xs text-[var(--foreground-muted)]">Tahun</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-[100px] sm:bottom-6 sm:left-6">
              <div className="rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Namura Property
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  Membangun masa depan bersama
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/daftar-properti"
            aria-label="Lihat properti"
            className="notch-btn text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--primary)]"
          >
            <ArrowUpRight
              size={26}
              strokeWidth={2.25}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="max-w-[650px]">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Siapa Kami
          </span>

          <h2 className="heading-lg mt-4">
            Lebih dari sekadar
            <span className="block text-[var(--primary)]">tempat tinggal.</span>
          </h2>

          <p className="text-body mt-5 max-w-[600px]">
            Kami percaya bahwa rumah bukan sekadar bangunan, tetapi tempat di
            mana kehidupan dan cerita dimulai. Dengan pengalaman lebih dari
            satu dekade, Namura Property menghadirkan properti berkualitas yang
            memberikan kenyamanan, keamanan, dan nilai investasi jangka
            panjang.
          </p>

          <ul className="mt-7 space-y-3.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                  <CheckCircle2 size={15} aria-hidden="true" />
                </span>
                <span className="text-sm leading-6 text-[var(--foreground-secondary)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/kontak" className="btn btn-primary group">
              Hubungi Kami
              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link href="/daftar-properti" className="btn btn-ghost group">
              Lihat Properti
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {achievements.map((item) => (
          <li key={item.label}>
            <NotchCard
              icon={item.icon}
              style={smallNotch}
              hoverDark
              className="min-h-[170px] justify-between p-5 sm:min-h-[190px] sm:p-6"
            >
              <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-white group-active:text-white sm:text-xl">
                {item.label}
              </h3>
              <p className="mt-6 text-4xl font-bold leading-none tracking-tight text-[var(--foreground-soft)] sm:text-[44px]">
                {item.value}
              </p>
            </NotchCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisiMisiPanel() {
  return (
    <div>
      <SectionHeader
        eyebrow="Visi & Misi"
        title="Punya arah yang jelas,"
        accent="untuk masa depan yang lebih baik."
        desc="Setiap langkah kami berangkat dari visi yang jelas dan komitmen untuk memberikan pengalaman properti yang lebih baik bagi pelanggan, mitra, dan masyarakat."
      />

      <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-7">
        <NotchCard icon={Target} className="p-6 pb-[88px] sm:p-8 sm:pb-[88px] lg:p-9 lg:pb-[88px]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            Visi
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-[28px]">
            Menjadi bagian dari masa depan properti Indonesia.
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--foreground-secondary)] sm:text-base">
            Menjadi pengembang properti terpercaya yang menghadirkan hunian
            berkualitas tinggi, bernilai investasi, dan mampu meningkatkan
            kualitas hidup masyarakat Indonesia.
          </p>
        </NotchCard>

        <NotchCard icon={HeartHandshake} className="p-6 pb-[88px] sm:p-8 sm:pb-[88px] lg:p-9 lg:pb-[88px]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            Misi
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-[28px]">
            Memberikan pengalaman properti yang lebih baik.
          </h3>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {missions.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-[var(--surface)] p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-[var(--foreground-secondary)]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </NotchCard>
      </div>
    </div>
  );
}

function NilaiPanel() {
  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Nilai Perusahaan"
          title="Prinsip yang menjadi"
          accent="fondasi setiap langkah."
        />

        <p className="max-w-[430px] text-sm leading-6 text-[var(--foreground-muted)] lg:pb-1">
          Nilai-nilai ini menjadi panduan dalam setiap keputusan, pelayanan, dan
          hubungan yang kami bangun bersama pelanggan maupun mitra.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6">
        {values.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <NotchCard
                icon={Icon}
                hoverDark
                className="min-h-[260px] p-6"
              >
                <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-white group-active:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-[var(--foreground-muted)] transition-colors duration-300 group-hover:text-white/70 group-active:text-white/70">
                  {item.desc}
                </p>

                <p className="mt-6 text-4xl font-bold leading-none tracking-tight text-[var(--foreground-soft)]">
                  {item.number}
                </p>
              </NotchCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TimPanel() {
  return (
    <div>
      <SectionHeader
        center
        eyebrow="Tim Kami"
        title="Orang-orang di balik"
        accent="perjalanan Namura."
        desc="Tim kami hadir untuk membantu Anda menemukan solusi properti yang sesuai dengan kebutuhan dan rencana masa depan."
      />

      <ul className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2 lg:mt-10 lg:gap-7">
        {team.map((member) => (
          <li key={member.name}>
            <NotchCard icon={CheckCircle2} className="overflow-hidden">
              <div className="relative">
                <TeamPhoto name={member.name} image={member.image} />
                <span className="absolute bottom-4 left-5 rounded-full border border-white/50 bg-[var(--glass-bg-strong)] px-3 py-1.5 text-[11px] font-semibold text-[var(--primary)] backdrop-blur-md">
                  {member.role}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
                  {member.name}
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-[var(--foreground-muted)]">
                  {member.desc}
                </p>

                <p className="mt-auto pr-20 pt-5 text-xs font-medium text-[var(--primary)]">
                  {member.note}
                </p>
              </div>
            </NotchCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PANELS = {
  profil: ProfilPanel,
  "visi-misi": VisiMisiPanel,
  nilai: NilaiPanel,
  tim: TimPanel,
};

export default function TentangKamiPage() {
  const [active, setActive] = useState(TABS[0].id);
  const tabBarRef = useRef(null);
  const panelRef = useRef(null);
  const tabRefs = useRef({});
  const mountedRef = useRef(false);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (TABS.some((t) => t.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    tabRefs.current[active]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [active]);

  const select = (id) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);

    const stuck =
      tabBarRef.current && tabBarRef.current.getBoundingClientRect().top <= 100;
    if (stuck) {
      requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ block: "start" })
      );
    }
  };

  const handleKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.id === active);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next === null) return;

    e.preventDefault();
    const id = TABS[next].id;
    select(id);
    tabRefs.current[id]?.focus();
  };

  const Panel = PANELS[active];

  return (
    <main className="overflow-x-clip bg-[var(--surface)] text-[var(--foreground)]">
      <section>
        <div className="container pt-4 sm:pt-6">
          <div className="relative flex min-h-[240px] items-start overflow-hidden rounded-t-[28px] bg-[var(--surface-soft)] px-6 pb-16 pt-10 sm:min-h-[300px] sm:px-10 sm:pt-12 lg:min-h-[360px] lg:px-14 lg:pt-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 30%, rgba(255,255,255,0.95), transparent 42%), radial-gradient(circle at 85% 70%, rgba(15,106,106,0.16), transparent 45%)",
              }}
            />

            <div className="relative z-10 max-w-[560px]">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl">
                Tentang Namura Property
              </h1>
              <p className="mt-3 max-w-[460px] text-base leading-7 text-[var(--foreground-muted)] sm:text-lg">
                Membangun hunian berkualitas dan terpercaya untuk masa depan
                keluarga Indonesia.
              </p>
            </div>

            {BANNER_ILLUSTRATION_URL && (
              <img
                src={BANNER_ILLUSTRATION_URL}
                alt=""
                draggable={false}
                className="pointer-events-none absolute bottom-0 right-0 hidden h-[88%] max-w-[55%] object-contain object-right-bottom md:block"
              />
            )}
          </div>
        </div>
      </section>

      <div
        ref={tabBarRef}
        className="sticky top-16 z-40 border-y border-[var(--border-soft)] bg-[var(--surface-soft)] lg:top-20"
      >
        <div className="container">
          <div
            role="tablist"
            aria-label="Menu Tentang Kami"
            onKeyDown={handleKeyDown}
            className="-mx-[18px] flex overflow-x-auto px-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(tab.id)}
                  className={`relative shrink-0 whitespace-nowrap px-5 py-4 text-sm transition-colors duration-200 sm:px-6 sm:text-base ${
                    isActive
                      ? "font-semibold text-[var(--primary)]"
                      : "text-[var(--foreground-secondary)] hover:text-[var(--primary)]"
                  }`}
                >
                  {tab.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[var(--primary)] transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section
        ref={panelRef}
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="scroll-mt-36 outline-none lg:scroll-mt-40"
      >
        <div key={active} className="tab-panel-enter container py-12 sm:py-14 lg:py-20">
          <Panel />
        </div>
      </section>
    </main>
  );
}