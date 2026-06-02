"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        {/* Logo */}
        <img
          src="/Logo/Namura.png"
          alt="Namura Property"
          className="w-12 h-12 object-contain"
        />

        {/* Spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-[#0F6A6A]/15" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0F6A6A] animate-spin" />
        </div>

        {/* Text */}
        <p className="text-sm text-gray-400 font-medium tracking-wide">
          Memuat halaman...
        </p>
      </div>
    </div>
  );
}
