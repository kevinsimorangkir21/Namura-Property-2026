"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("showWelcome", "true");

        toast.success("✓ Login berhasil", {
          description: `Selamat datang kembali, ${res.user?.name || "Admin"}`,
        });

        router.push("/admin");
      }
    } catch (err) {
      if (err.message === "API URL is not configured.") {
        toast.error("API URL belum dikonfigurasi. Hubungi administrator.");
      } else if (err.status === 401) {
        toast.error("Email atau password salah");
      } else if (err.status === 400) {
        toast.error("Email dan password harus diisi");
      } else {
        toast.error("Terjadi kesalahan. Coba lagi nanti.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen overflow-hidden bg-[#F8FAFC]">
      <div className="flex h-screen">

        {/* Left panel */}
        <div className="hidden lg:flex w-[42%] bg-[#0F6A6A] relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col justify-center h-full px-14">
            <div>
              <h2 className="text-3xl font-bold text-white">Namura Property</h2>
              <p className="text-white/60 mt-2">Property Management System</p>
            </div>
            <div className="mt-12">
              <h1 className="text-5xl font-bold text-white leading-tight">
                Dashboard<br />Management
              </h1>
              <p className="mt-6 text-lg text-white/75 max-w-md leading-relaxed">
                Akses seluruh sistem operasional Namura Property dalam satu dashboard
                terintegrasi untuk mengelola properti, artikel, marketing, dan aktivitas bisnis.
              </p>
            </div>
            <div className="mt-10 space-y-4 max-w-xl">
              {["Kelola Properti", "Kolaborasi Tim", "Monitoring Bisnis"].map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-md px-5 py-4">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item}</h3>
                    <p className="text-white/70 text-sm">
                      {i === 0 && "Tambah, edit, dan monitor seluruh listing."}
                      {i === 1 && "Admin dan marketing dalam satu sistem."}
                      {i === 2 && "Pantau performa properti dan lead secara real-time."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-[58%] flex items-center justify-center px-8">
          <div className="w-full max-w-[480px]">
            <div className="mb-10">
              <div className="lg:hidden mb-6">
                <h2 className="text-2xl font-bold text-[#0F6A6A]">Namura Property</h2>
              </div>
              <h1 className="text-5xl font-bold text-gray-900">Login</h1>
              <p className="mt-3 text-gray-500">Masuk untuk mengakses dashboard Namura Property</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="h-14 rounded-2xl bg-white border border-gray-200 flex items-center px-4">
                  <Mail size={18} className="text-gray-400" />
                  <input
                    type="email"
                    placeholder="admin@namura.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 ml-3 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="h-14 rounded-2xl bg-white border border-gray-200 flex items-center px-4">
                  <Lock size={18} className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 ml-3 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#0F6A6A] text-white font-semibold hover:bg-[#0C5A5A] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : "Masuk"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              © 2026 Namura Property. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
