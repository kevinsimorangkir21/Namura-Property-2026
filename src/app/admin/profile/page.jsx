"use client";

import { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Save,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  CalendarDays,
  Crown,
  KeyRound,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [name, setName] = useState("Administrator");
  const [email, setEmail] = useState("admin@namura.com");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ============================================================
     LOAD USER DATA
  ============================================================ */

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      if (user?.name) {
        setName(user.name);
      }

      if (user?.email) {
        setEmail(user.email);
      }
    } catch {
      // Keep default profile values when localStorage is invalid.
    }
  }, []);

  /* ============================================================
     AVATAR INITIAL
  ============================================================ */

  const avatarInitial = useMemo(() => {
    const value = name?.trim();

    if (!value) return "A";

    return value.charAt(0).toUpperCase();
  }, [name]);

  /* ============================================================
     SAVE
  ============================================================ */

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nama lengkap wajib diisi.");
      return;
    }

    if (!email.trim()) {
      toast.error("Email wajib diisi.");
      return;
    }

    if (password && password.length < 8) {
      toast.error("Password baru minimal 8 karakter.");
      return;
    }

    setSaving(true);

    try {
      /*
       * Untuk sementara data profil disimpan ke localStorage.
       *
       * Jika backend profile update sudah tersedia, bagian ini
       * nantinya dapat diganti dengan:
       *
       * await apiFetch("/api/auth/profile", {
       *   method: "PUT",
       *   body: JSON.stringify({
       *     name,
       *     email,
       *     ...(password ? { password } : {}),
       *   }),
       * });
       */

      const currentUser = localStorage.getItem("user");

      let userData = {};

      try {
        userData = currentUser
          ? JSON.parse(currentUser)
          : {};
      } catch {
        userData = {};
      }

      const updatedUser = {
        ...userData,
        name: name.trim(),
        email: email.trim(),
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );

      setPassword("");

      toast.success("Profil berhasil diperbarui.");
    } catch {
      toast.error(
        "Terjadi kesalahan saat menyimpan perubahan."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="flex flex-col gap-5">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-[10px]
              bg-[#EAF5F4]
              text-[#0F6A6A]
            "
          >
            <User size={16} strokeWidth={2} />
          </div>

          <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-[#18211F]">
            Profil Saya
          </h1>
        </div>

        <p className="pl-10 text-xs text-[#899490]">
          Kelola informasi akun dan keamanan administrator.
        </p>
      </div>

      {/* ========================================================
          MAIN GRID
      ======================================================== */}

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">

        {/* ======================================================
            PROFILE SUMMARY
        ====================================================== */}

        <aside className="h-fit overflow-hidden rounded-2xl border border-[#E5EBE8] bg-white shadow-[0_2px_12px_rgba(15,40,35,0.035)]">

          {/* TOP PROFILE */}
          <div className="relative overflow-hidden px-5 pb-5 pt-6">

            {/* Decorative background */}
            <div
              className="
                pointer-events-none
                absolute -right-10 -top-10
                h-28 w-28
                rounded-full
                bg-[#0F6A6A]/[0.06]
              "
            />

            <div
              className="
                pointer-events-none
                absolute -left-12 top-16
                h-20 w-20
                rounded-full
                bg-[#0F6A6A]/[0.035]
              "
            />

            {/* AVATAR */}
            <div className="relative flex flex-col items-center">

              <div
                className="
                  relative
                  flex h-[88px] w-[88px]
                  items-center justify-center
                  rounded-full
                  bg-[#0F6A6A]
                  text-[30px] font-semibold
                  text-white
                  shadow-[0_10px_30px_rgba(15,106,106,0.18)]
                "
              >
                {avatarInitial}

                {/* ONLINE */}
                <span
                  className="
                    absolute
                    bottom-1 right-1
                    h-4 w-4
                    rounded-full
                    border-[3px]
                    border-white
                    bg-[#3FA66B]
                  "
                />
              </div>

              <div className="mt-3 text-center">
                <p className="max-w-[210px] truncate text-sm font-semibold text-[#202B28]">
                  {name || "Administrator"}
                </p>

                <div className="mt-1 flex items-center justify-center gap-1.5">
                  <Crown
                    size={11}
                    className="text-[#0F6A6A]"
                    strokeWidth={2}
                  />

                  <span className="text-[10px] font-medium text-[#8A9692]">
                    Super Admin
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ACCOUNT STATUS */}
          <div className="border-t border-[#EDF1EF] px-4 py-4">

            <p className="mb-2.5 px-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#A0AAA7]">
              Informasi Akun
            </p>

            <div className="flex flex-col gap-1.5">

              {/* ROLE */}
              <div
                className="
                  flex items-center
                  justify-between
                  rounded-xl
                  border border-[#EEF2F0]
                  bg-[#F8FAF9]
                  px-3 py-2.5
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-lg
                      bg-white
                      text-[#7C8985]
                    "
                  >
                    <ShieldCheck size={14} />
                  </div>

                  <span className="text-[11px] text-[#7B8783]">
                    Role
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-[#263331]">
                  Administrator
                </span>
              </div>

              {/* STATUS */}
              <div
                className="
                  flex items-center
                  justify-between
                  rounded-xl
                  border border-[#EEF2F0]
                  bg-[#F8FAF9]
                  px-3 py-2.5
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-lg
                      bg-white
                      text-[#3FA66B]
                    "
                  >
                    <CheckCircle2 size={14} />
                  </div>

                  <span className="text-[11px] text-[#7B8783]">
                    Status
                  </span>
                </div>

                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#3FA66B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3FA66B]" />
                  Aktif
                </span>
              </div>

              {/* JOIN DATE */}
              <div
                className="
                  flex items-center
                  justify-between
                  rounded-xl
                  border border-[#EEF2F0]
                  bg-[#F8FAF9]
                  px-3 py-2.5
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-lg
                      bg-white
                      text-[#7C8985]
                    "
                  >
                    <CalendarDays size={14} />
                  </div>

                  <span className="text-[11px] text-[#7B8783]">
                    Bergabung
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-[#263331]">
                  Mei 2026
                </span>
              </div>
            </div>
          </div>

          {/* SECURITY INFO */}
          <div className="px-4 pb-4">
            <div
              className="
                flex items-start gap-2.5
                rounded-xl
                border border-[#DDEBE8]
                bg-[#F2F9F8]
                px-3 py-3
              "
            >
              <ShieldCheck
                size={15}
                className="mt-0.5 shrink-0 text-[#0F6A6A]"
              />

              <div>
                <p className="text-[10px] font-semibold text-[#31504B]">
                  Akun terlindungi
                </p>

                <p className="mt-0.5 text-[9px] leading-relaxed text-[#71817D]">
                  Pastikan informasi login Anda selalu
                  diperbarui dan aman.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ======================================================
            FORM
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-[#E5EBE8] bg-white shadow-[0_2px_12px_rgba(15,40,35,0.035)]">

          {/* FORM HEADER */}
          <div
            className="
              flex items-center
              justify-between
              border-b border-[#EDF1EF]
              px-5 py-4
              sm:px-6
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-lg
                    bg-[#EAF5F4]
                    text-[#0F6A6A]
                  "
                >
                  <KeyRound size={14} />
                </div>

                <p className="text-sm font-semibold text-[#263331]">
                  Informasi Akun
                </p>
              </div>

              <p className="mt-1 pl-9 text-[10px] text-[#98A29F]">
                Perbarui informasi dasar dan keamanan akun.
              </p>
            </div>

            <div
              className="
                hidden items-center gap-1.5
                rounded-full
                border border-[#E5EEEB]
                bg-[#F8FAF9]
                px-2.5 py-1.5
                sm:flex
              "
            >
              <ShieldCheck
                size={11}
                className="text-[#0F6A6A]"
              />

              <span className="text-[9px] font-medium text-[#78837F]">
                Secure
              </span>
            </div>
          </div>

          {/* FORM BODY */}
          <form
            onSubmit={handleSave}
            className="flex flex-col gap-5 p-5 sm:p-6"
          >

            {/* ==================================================
                NAME
            ================================================== */}

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="profile-name"
                className="
                  text-[11px]
                  font-semibold
                  text-[#56625E]
                "
              >
                Nama Lengkap
              </label>

              <div className="relative">
                <div
                  className="
                    pointer-events-none
                    absolute left-3 top-1/2
                    flex -translate-y-1/2
                    items-center
                    text-[#98A29F]
                  "
                >
                  <User size={15} />
                </div>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Masukkan nama lengkap"
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-[#DFE6E3]
                    bg-[#FAFCFB]
                    pl-10 pr-4
                    text-xs text-[#263331]
                    outline-none
                    transition
                    placeholder:text-[#B0B9B6]
                    hover:border-[#CBD7D3]
                    focus:border-[#0F6A6A]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#0F6A6A]/[0.07]
                  "
                />
              </div>
            </div>

            {/* ==================================================
                EMAIL
            ================================================== */}

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="profile-email"
                className="
                  text-[11px]
                  font-semibold
                  text-[#56625E]
                "
              >
                Email
              </label>

              <div className="relative">
                <div
                  className="
                    pointer-events-none
                    absolute left-3 top-1/2
                    flex -translate-y-1/2
                    items-center
                    text-[#98A29F]
                  "
                >
                  <Mail size={15} />
                </div>

                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Masukkan alamat email"
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-[#DFE6E3]
                    bg-[#FAFCFB]
                    pl-10 pr-4
                    text-xs text-[#263331]
                    outline-none
                    transition
                    placeholder:text-[#B0B9B6]
                    hover:border-[#CBD7D3]
                    focus:border-[#0F6A6A]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#0F6A6A]/[0.07]
                  "
                />
              </div>
            </div>

            {/* ==================================================
                DIVIDER
            ================================================== */}

            <div className="h-px bg-[#EDF1EF]" />

            {/* ==================================================
                PASSWORD
            ================================================== */}

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="profile-password"
                  className="
                    text-[11px]
                    font-semibold
                    text-[#56625E]
                  "
                >
                  Password Baru
                </label>

                <span
                  className="
                    rounded-full
                    bg-[#F3F7F6]
                    px-2 py-1
                    text-[8px]
                    font-medium
                    text-[#899490]
                  "
                >
                  Opsional
                </span>
              </div>

              <div className="relative">
                <div
                  className="
                    pointer-events-none
                    absolute left-3 top-1/2
                    flex -translate-y-1/2
                    items-center
                    text-[#98A29F]
                  "
                >
                  <Lock size={15} />
                </div>

                <input
                  id="profile-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-[#DFE6E3]
                    bg-[#FAFCFB]
                    pl-10 pr-11
                    text-xs text-[#263331]
                    outline-none
                    transition
                    placeholder:text-[#B0B9B6]
                    hover:border-[#CBD7D3]
                    focus:border-[#0F6A6A]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#0F6A6A]/[0.07]
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="
                    absolute right-2
                    top-1/2
                    flex h-8 w-8
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    text-[#98A29F]
                    transition
                    hover:bg-[#F0F5F3]
                    hover:text-[#0F6A6A]
                  "
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <ShieldCheck
                  size={12}
                  className="text-[#899490]"
                />

                <p className="text-[10px] text-[#899490]">
                  Minimal 8 karakter. Gunakan kombinasi
                  huruf, angka, dan simbol.
                </p>
              </div>
            </div>

            {/* ==================================================
                SUBMIT
            ================================================== */}

            <div
              className="
                flex flex-col-reverse
                gap-3
                border-t border-[#EDF1EF]
                pt-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  size={13}
                  className="text-[#3FA66B]"
                />

                <span className="text-[10px] text-[#899490]">
                  Perubahan akan tersimpan di akun Anda.
                </span>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="
                  flex h-10
                  items-center justify-center
                  gap-2
                  rounded-xl
                  bg-[#0F6A6A]
                  px-5
                  text-xs font-semibold
                  text-white
                  shadow-[0_5px_16px_rgba(15,106,106,0.14)]
                  transition-all
                  hover:bg-[#0B5C5C]
                  hover:shadow-[0_7px_20px_rgba(15,106,106,0.18)]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <>
                    <span
                      className="
                        h-3.5 w-3.5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* ========================================================
          DANGER ZONE
      ======================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border border-[#F0D9D9]
          bg-white
        "
      >
        {/* HEADER */}
        <div
          className="
            flex items-center
            gap-2.5
            border-b border-[#F4E5E5]
            bg-[#FFFDFD]
            px-5 py-3.5
            sm:px-6
          "
        >
          <div
            className="
              flex h-7 w-7
              items-center justify-center
              rounded-lg
              bg-red-50
              text-red-500
            "
          >
            <ShieldAlert size={14} />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#B54242]">
              Zona Berbahaya
            </p>

            <p className="mt-0.5 text-[9px] text-[#A99393]">
              Tindakan berikut bersifat permanen.
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div
          className="
            flex flex-col
            gap-4
            px-5 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#303A37]">
              Hapus Akun
            </p>

            <p className="mt-1 max-w-[700px] text-[10px] leading-relaxed text-[#929D99]">
              Menghapus akun akan menghapus data akun secara
              permanen dan tindakan ini tidak dapat dikembalikan.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              toast.info(
                "Fitur hapus akun belum tersedia."
              )
            }
            className="
              flex shrink-0
              items-center justify-center
              gap-1.5
              rounded-xl
              border border-[#E9CACA]
              bg-white
              px-4 py-2.5
              text-[10px]
              font-semibold
              text-[#C34D4D]
              transition
              hover:bg-[#FFF5F5]
              hover:border-[#E1BABA]
            "
          >
            Hapus Akun
            <ChevronRight size={13} />
          </button>
        </div>
      </section>

    </div>
  );
}