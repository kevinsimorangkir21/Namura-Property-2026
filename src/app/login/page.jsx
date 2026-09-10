"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email dan password harus diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("isLoggedIn", "true");

        sessionStorage.setItem("showWelcome", "true");

        toast.success("Login berhasil", {
          description: `Selamat datang kembali, ${
            res.user?.name || "Admin"
          }`,
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
    <main className="h-dvh overflow-hidden bg-white">
      <div className="flex h-full min-h-0">

        {/* =====================================================
            LEFT / BRAND PANEL
        ===================================================== */}
        <section className="relative hidden h-full w-[46%] overflow-hidden bg-[#0F6A6A] lg:block">

          {/* DECORATION */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full border border-white/[0.07]" />

            <div className="absolute -left-16 -top-16 h-[260px] w-[260px] rounded-full border border-white/[0.06]" />

            <div className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full border border-white/[0.08]" />

            <div className="absolute -bottom-20 -right-20 h-[360px] w-[360px] rounded-full border border-white/[0.06]" />

            <div className="absolute right-[20%] top-[24%] h-2 w-2 rounded-full bg-white/25" />

            <div className="absolute right-[28%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/20" />

            <div className="absolute bottom-[27%] left-[18%] h-1.5 w-1.5 rounded-full bg-white/20" />

            <div className="absolute bottom-[32%] left-[25%] h-1 w-1 rounded-full bg-white/15" />
          </div>

          <div className="relative z-10 flex h-full flex-col px-10 py-8 xl:px-14 xl:py-10">

            {/* LOGO */}
            <div>
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={180}
                height={68}
                priority
                className="h-auto w-[160px] object-contain object-left xl:w-[175px]"
              />
            </div>

            {/* CENTER */}
            <div className="flex flex-1 items-center">
              <div className="max-w-[460px]">

                {/* LABEL */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                    <Building2
                      size={11}
                      className="text-white/80"
                    />
                  </span>

                  <span className="text-[10px] font-semibold tracking-[0.16em] text-white/60">
                    NAMURA PROPERTY
                  </span>
                </div>

                {/* HEADING */}
                <h1 className="text-[38px] font-bold leading-[1.08] tracking-[-0.035em] text-white xl:text-[48px]">
                  Kelola properti.
                  <span className="block text-white/50">
                    Bangun masa depan.
                  </span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-5 max-w-[390px] text-sm leading-6 text-white/55">
                  Akses dashboard Namura Property untuk mengelola
                  properti, artikel, dan aktivitas bisnis dalam satu
                  tempat.
                </p>

                {/* FEATURES */}
                <div className="mt-7 space-y-3">
                  {[
                    "Kelola data properti dengan mudah",
                    "Publikasikan artikel terbaru",
                    "Pantau aktivitas bisnis",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <CheckCircle2
                          size={12}
                          className="text-white/70"
                        />
                      </span>

                      <span className="text-xs text-white/60">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <p className="text-[10px] text-white/30">
                © {new Date().getFullYear()} Namura Property
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                <ShieldCheck size={12} />
                Secure Administration
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT / LOGIN
        ===================================================== */}
        <section className="flex h-full min-h-0 w-full items-center justify-center bg-white px-6 lg:w-[54%] lg:px-10 xl:px-16">

          <div className="w-full max-w-[400px]">

            {/* MOBILE LOGO */}
            <div className="mb-7 lg:hidden">
              <Image
                src="/Logo/Namura_Property1.png"
                alt="Namura Property"
                width={180}
                height={68}
                priority
                className="h-auto w-[155px] object-contain object-left"
              />
            </div>

            {/* HEADER */}
            <div>

              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5F4]">
                <Lock
                  size={18}
                  strokeWidth={1.8}
                  className="text-[#0F6A6A]"
                />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F6A6A]">
                Administrator
              </p>

              <h2 className="mt-1.5 text-[30px] font-bold leading-tight tracking-[-0.035em] text-[#101918]">
                Selamat datang.
              </h2>

              <p className="mt-2 max-w-[360px] text-xs leading-5 text-[#78837F] sm:text-sm">
                Masuk ke dashboard Namura Property untuk melanjutkan
                pengelolaan bisnis Anda.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="mt-6"
            >

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold text-[#263331]"
                >
                  Email
                </label>

                <div className="group relative">
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA5A1] transition-colors group-focus-within:text-[#0F6A6A]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    required
                    className="h-[50px] w-full rounded-[13px] border border-[#E1E7E5] bg-white pl-10 pr-4 text-sm text-[#101918] outline-none transition-all duration-200 placeholder:text-[#A4AEAB] hover:border-[#CBD5D2] focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.06]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold text-[#263331]"
                >
                  Password
                </label>

                <div className="group relative">

                  <Lock
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA5A1] transition-colors group-focus-within:text-[#0F6A6A]"
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
                    className="h-[50px] w-full rounded-[13px] border border-[#E1E7E5] bg-white pl-10 pr-12 text-sm text-[#101918] outline-none transition-all duration-200 placeholder:text-[#A4AEAB] hover:border-[#CBD5D2] focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.06]"
                  />

                  {/* SHOW / HIDE */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    title={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#98A39F] transition-all duration-200 hover:bg-[#EAF5F4] hover:text-[#0F6A6A] active:scale-95"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={17}
                        strokeWidth={1.8}
                      />
                    ) : (
                      <Eye
                        size={17}
                        strokeWidth={1.8}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-[13px] bg-[#0F6A6A] text-sm font-semibold text-white shadow-[0_7px_20px_rgba(15,106,106,0.14)] transition-all duration-200 hover:bg-[#0C5A5A] hover:shadow-[0_10px_26px_rgba(15,106,106,0.20)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            {/* SECURITY */}
            <div className="mt-5 rounded-[13px] border border-[#E8EEEC] bg-[#F8FAF9] px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF5F4]">
                  <ShieldCheck
                    size={14}
                    strokeWidth={1.8}
                    className="text-[#0F6A6A]"
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-[#344240]">
                    Akses administrator
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-[#899490]">
                    Hanya untuk administrator resmi Namura Property.
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#0F6A6A]" />

              <p className="text-[10px] text-[#A0AAA7]">
                Namura Property Administration
              </p>

              <span className="h-1 w-1 rounded-full bg-[#0F6A6A]" />
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}