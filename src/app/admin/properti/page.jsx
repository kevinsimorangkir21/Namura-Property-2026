"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Building2,
} from "lucide-react";

export default function PropertiPage() {
  const [search, setSearch] = useState("");

  const properties = [
    {
      id: 1,
      image: "/Asset/Properti5/Asset1.png",
      title: "Rumah Minimalis Lampung",
      type: "Jual",
      price: "Rp 750 Juta",
      status: "Aktif",
    },
    {
      id: 2,
      image: "/Asset/Properti5/Asset1.png",
      title: "Villa Modern Bandar Lampung",
      type: "Sewa",
      price: "Rp 5 Juta/Bulan",
      status: "Aktif",
    },
    {
      id: 3,
      image: "/Asset/Properti5/Asset1.png",
      title: "Ruko Strategis",
      type: "Jual",
      price: "Rp 1.2 Miliar",
      status: "Draft",
    },
  ];

  const filtered = properties.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage Properti
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Kelola seluruh data properti Namura Property.
          </p>
        </div>

        <Link
  href="/admin/properti/tambah"
  className="
    inline-flex
    items-center
    gap-2
    px-4
    py-3
    rounded-xl
    bg-[#0F6A6A]
    text-white
    text-sm
    font-medium
    hover:bg-[#0C5A5A]
    transition
  "
>
  <Plus size={18} />
  Tambah Properti
</Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">
            Total Properti
          </p>

          <h2 className="text-3xl font-bold mt-2">
            124
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">
            Dijual
          </p>

          <h2 className="text-3xl font-bold mt-2">
            89
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">
            Disewa
          </p>

          <h2 className="text-3xl font-bold mt-2">
            25
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">
            Draft
          </p>

          <h2 className="text-3xl font-bold mt-2">
            10
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4">

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-5">

          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari properti..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#0F6A6A]"
            />
          </div>

          <select className="px-4 py-3 rounded-xl border border-gray-200 outline-none">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Draft</option>
          </select>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 text-sm font-medium text-gray-500">
                  Properti
                </th>

                <th className="text-left py-4 text-sm font-medium text-gray-500">
                  Tipe
                </th>

                <th className="text-left py-4 text-sm font-medium text-gray-500">
                  Harga
                </th>

                <th className="text-left py-4 text-sm font-medium text-gray-500">
                  Status
                </th>

                <th className="text-right py-4 text-sm font-medium text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">

                    <div className="flex items-center gap-4">

                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {item.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          ID #{item.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="py-4 text-sm">
                    {item.type}
                  </td>

                  <td className="py-4 text-sm">
                    {item.price}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        item.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <div className="flex justify-end gap-2">

                      <Link
  href={`/admin/properti/detail/${item.id}`}
  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
>
  <Eye size={16} />
</Link>

                      <Link
  href={`/admin/properti/edit/${item.id}`}
  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
>
  <Pencil size={16} />
</Link>

                      <button className="w-9 h-9 rounded-lg border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}