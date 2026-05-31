"use client";

import Link from "next/link";
import {
  Bell,
  ArrowLeft,
  Calendar,
  Send,
  Users,
  CheckCircle2,
  Trash2,
} from "lucide-react";

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.05]">
        <p className="text-sm font-medium text-gray-800">{title}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function DetailNotifikasiPage() {
  const notification = {
    id: 1,
    title: "Properti Baru Ditambahkan",
    message:
      "Rumah Minimalis Lampung berhasil dipublikasikan dan sekarang sudah tampil di website.",
    target: "Semua User",
    status: "Terkirim",
    date: "30 Mei 2026",
    sender: "Administrator",
  };

  const meta = [
    {
      icon: <Calendar size={16} />,
      label: "Tanggal",
      value: notification.date,
      accent: "bg-gray-100 text-gray-500",
    },
    {
      icon: <Send size={16} />,
      label: "Pengirim",
      value: notification.sender,
      accent: "bg-sky-50 text-sky-500",
    },
    {
      icon: <Users size={16} />,
      label: "Target",
      value: notification.target,
      accent: "bg-purple-50 text-purple-500",
    },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/notifikasi"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition"
          >
            <ArrowLeft size={14} />
            Kembali ke Notifikasi
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-2">
            Detail Notifikasi
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80">
              <CheckCircle2 size={10} />
              {notification.status}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-200/80">
              <Users size={10} />
              {notification.target}
            </span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition flex-shrink-0">
          <Trash2 size={15} />
          Hapus
        </button>
      </div>

      {/* NOTIFICATION IDENTITY */}
      <div className="bg-white rounded-2xl border border-black/[0.06] px-6 py-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0F6A6A]/10 flex items-center justify-center flex-shrink-0">
          <Bell size={20} className="text-[#0F6A6A]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {notification.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">ID #{notification.id}</p>
        </div>
      </div>

      {/* META GRID */}
      <div className="grid sm:grid-cols-3 gap-4">
        {meta.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.accent}`}>
              {m.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400">{m.label}</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">
                {m.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MESSAGE */}
      <SectionCard title="Isi Notifikasi">
        <div className="p-4 rounded-xl bg-gray-50 border border-black/[0.04]">
          <p className="text-sm text-gray-700 leading-7">
            {notification.message}
          </p>
        </div>
      </SectionCard>

      {/* PREVIEW */}
      <SectionCard title="Preview Notifikasi">
        <div className="max-w-md rounded-2xl border border-black/[0.06] p-4 bg-gray-50">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F6A6A]/10 flex items-center justify-center flex-shrink-0">
              <Bell size={18} className="text-[#0F6A6A]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {notification.title}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-5">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

    </div>
  );
}