"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const FEATURES = [
  "Kelola data properti dengan mudah",
  "Publikasikan artikel terbaru",
  "Pantau aktivitas bisnis",
];

const inputClass =
  "h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] outline-none transition-all duration-200 placeholder:text-[var(--foreground-soft)] hover:border-[var(--border-primary)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10";

const labelClass =
  "mb-2 block text-xs font-semibold text-[var(--foreground-secondary)]";

const fieldIconClass =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-soft)] transition-colors group-focus-within:text-[var(--primary)]";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      toast.error("Email dan password harus diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("isLoggedIn", "true");

        sessionStorage.setItem("showWelcome", "true");

        toast.success("Login berhasil", {
          description: `Selamat datang kembali, ${res.user?.name || "Admin"}`,
        });

        router.push("/admin");
      }
    } catch (err) {
      if (err.message === "API URL is not configured.") {
        toast.error("API URL belum dikonfigurasi", {
          description: "Hubungi administrator.",
        });
      } else if (err.status === 401) {
        toast.error("Email atau password salah");
      } else if (err.status === 400) {
        toast.error("Email dan password harus diisi");
      } else {
        toast.error("Terjadi kesalahan", {
          description: "Silakan coba lagi nanti.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-x-clip bg-[var(--surface)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[var(--primary)]/10 blur-[120px]"
      />

      <div className="relative grid min-h-dvh gap-5 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <section className="notch-wrap group hidden lg:block">
          <div className="notch relative flex h-full min-h-[640px] flex-col overflow-hidden rounded-[32px] bg-[var(--primary)] p-10 xl:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.14), transparent 45%), radial-gradient(circle at 85% 90%, rgba(0,0,0,0.18), transparent 50%)",
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-[280px] w-[280px] rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-52 -left-40 h-[560px] w-[560px] rounded-full border border-white/[0.08]"
            />

            <div className="relative">
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={180}
                height={68}
                priority
                className="h-auto w-[165px] object-contain object-left"
              />
            </div>

            <div className="relative my-auto max-w-[460px] py-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <Building2 size={12} className="text-white/80" aria-hidden="true" />
                <span className="text-[10px] font-semibold tracking-[0.16em] text-white/75">
                  NAMURA PROPERTY
                </span>
              </span>

              <h2 className="mt-5 text-[40px] font-bold leading-[1.06] tracking-[-0.035em] text-white xl:text-[50px]">
                Kelola properti.
                <span className="block text-white/55">Bangun masa depan.</span>
              </h2>

              <p className="mt-5 max-w-[400px] text-sm leading-6 text-white/70">
                Akses dashboard Namura Property untuk mengelola properti,
                artikel, dan aktivitas bisnis dalam satu tempat.
              </p>

              <ul className="mt-8 space-y-3">
                {FEATURES.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                      <CheckCircle2 size={13} className="text-white" aria-hidden="true" />
                    </span>
                    <span className="text-[13px] text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="relative max-w-[60%] text-[11px] text-white/50">
              © {new Date().getFullYear()} Namura Property
            </p>
          </div>

          <Link
            href="/"
            aria-label="Kembali ke beranda"
            className="notch-btn text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--primary)]"
          >
            <ArrowUpRight
              size={26}
              strokeWidth={2.25}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-[460px]">
            <div className="notch-wrap">
              <div className="notch rounded-[28px] bg-[var(--surface-soft)] p-6 sm:p-8">
                <Image
                  src="/Logo/Namura_Property1.png"
                  alt="Namura Property"
                  width={180}
                  height={68}
                  priority
                  className="mb-7 h-auto w-[150px] object-contain object-left lg:hidden"
                />

                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <Lock size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                  Administrator
                </p>

                <h1 className="mt-1.5 text-[30px] font-bold leading-tight tracking-[-0.035em] text-[var(--foreground)]">
                  Selamat datang.
                </h1>

                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  Masuk ke dashboard Namura Property untuk melanjutkan
                  pengelolaan bisnis Anda.
                </p>

                <form onSubmit={handleLogin} className="mt-7">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>

                    <div className="group relative">
                      <Mail
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={fieldIconClass}
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        autoComplete="email"
                        inputMode="email"
                        required
                        className={`${inputClass} pl-11 pr-4`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="password" className={labelClass}>
                      Password
                    </label>

                    <div className="group relative">
                      <Lock
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={fieldIconClass}
                      />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password"
                        autoComplete="current-password"
                        required
                        className={`${inputClass} pl-11 pr-14`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword
                            ? "Sembunyikan password"
                            : "Tampilkan password"
                        }
                        aria-pressed={showPassword}
                        className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-[var(--foreground-soft)] transition-all duration-200 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] active:scale-95"
                      >
                        {showPassword ? (
                          <EyeOff size={18} strokeWidth={1.8} />
                        ) : (
                          <Eye size={18} strokeWidth={1.8} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="btn btn-primary group mt-6 h-[52px] w-full rounded-2xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        Masuk ke Dashboard
                        <ArrowRight
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>

                  <p className="mt-5 flex min-h-[48px] items-center pr-20 text-[11px] leading-5 text-[var(--foreground-soft)]">
                    Hanya untuk administrator resmi Namura Property.
                  </p>
                </form>
              </div>

              <span className="notch-btn" aria-hidden="true">
                <ShieldCheck
                  size={24}
                  strokeWidth={2}
                  className="text-[var(--primary)]"
                />
              </span>
            </div>

            <Link
              href="/"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--foreground-muted)] transition-colors hover:text-[var(--primary)] lg:hidden"
            >
              <ArrowRight size={15} className="rotate-180" aria-hidden="true" />
              Kembali ke beranda
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}