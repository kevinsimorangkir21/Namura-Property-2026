"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <main className="min-h-screen bg-white">
      <div className="flex min-h-screen">

        {/* =====================================================
            LEFT / BRAND PANEL
        ===================================================== */}
        <div className="relative hidden w-[44%] overflow-hidden bg-[#0F6A6A] lg:flex">
          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* LOGO */}
            <div>
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={180}
                height={68}
                priority
                className="h-auto w-[180px] object-contain object-left"
              />
            </div>

            {/* MESSAGE */}
            <div className="max-w-[440px]">
              <p className="mb-4 text-sm font-medium tracking-wide text-white/60">
                ADMINISTRATION
              </p>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white xl:text-5xl">
                Kelola bisnis properti
                <span className="block text-white/75">
                  dengan lebih sederhana.
                </span>
              </h1>

              <p className="mt-6 max-w-[400px] text-base leading-7 text-white/65">
                Satu dashboard untuk mengelola properti, artikel,
                marketing, dan aktivitas bisnis Namura Property.
              </p>
            </div>

            {/* LEFT FOOTER */}
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Namura Property
            </p>
          </div>
        </div>

        {/* =====================================================
            RIGHT / LOGIN PANEL
        ===================================================== */}
        <div className="flex w-full items-center justify-center px-6 py-10 sm:px-8 lg:w-[56%] lg:px-12">
          <div className="w-full max-w-[420px]">

            {/* MOBILE LOGO */}
            <div className="mb-12 lg:hidden">
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={180}
                height={68}
                priority
                className="h-auto w-[180px] object-contain object-left"
              />
            </div>

            {/* HEADER */}
            <div>
              <p className="text-sm font-semibold text-[#0F6A6A]">
                ADMIN
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Selamat datang
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                Masuk ke dashboard Namura Property untuk melanjutkan.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="mt-9 space-y-5"
            >

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email"
                    autoComplete="email"
                    required
                    className="h-13 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.06]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                    className="h-13 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0F6A6A] focus:ring-4 focus:ring-[#0F6A6A]/[0.06]"
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#0F6A6A] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0C5A5A] hover:shadow-lg hover:shadow-[#0F6A6A]/15 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            {/* SECURITY NOTE */}
            <div className="mt-7 border-t border-gray-100 pt-6">
              <p className="text-center text-xs leading-5 text-gray-400">
                Akses ini hanya diperuntukkan bagi administrator
                Namura Property.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}