"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard, Building2, FileText, Users, Bell,
  User, LogOut, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import WelcomeModal from "@/components/ui/WelcomeModal";

const menus = [
  {
    section: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    section: "Management",
    items: [
      { name: "Properti", href: "/admin/properti", icon: Building2 },
      { name: "Artikel", href: "/admin/artikel", icon: FileText },
      { name: "User", href: "/admin/user", icon: Users },
      { name: "Notifikasi", href: "/admin/notifikasi", icon: Bell },
    ],
  },
  {
    section: "Account",
    items: [{ name: "Profil Saya", href: "/admin/profile", icon: User }],
  },
];

function NavItem({ item, pathname, sidebarOpen }) {
  const Icon = item.icon;
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
    >
      {isActive && <span className="absolute left-0 top-[20%] h-[60%] w-1 bg-white rounded-r-full" />}
      <Icon size={18} />
      {sidebarOpen && <span className="text-sm">{item.name}</span>}
    </Link>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("A");
  const [userNameFull, setUserNameFull] = useState("Administrator");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!token || !isLoggedIn) {
      toast.error("Sesi login telah berakhir");
      router.push("/login");
      return;
    }

    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserNameFull(parsed.name || "Administrator");
        setUserName(parsed.name?.charAt(0).toUpperCase() || "A");
      } catch { }
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    toast.success("✓ Logout berhasil");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-[#0F6A6A]/15" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0F6A6A] animate-spin" />
          </div>
          <p className="text-sm text-gray-400">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <WelcomeModal />

      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-screen bg-[#0F6A6A] transition-all duration-300 z-50 ${sidebarOpen ? "w-[260px]" : "w-[80px]"
          }`}
      >
        <div className="px-4 py-5 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="text-white font-semibold text-lg">Namura Property</h2>
              <p className="text-xs text-white/50">Admin Dashboard</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4">
          {menus.map((group) => (
            <div key={group.section} className="mb-6">
              {sidebarOpen && (
                <p className="text-[11px] uppercase tracking-wider text-white/40 px-3 mb-3">
                  {group.section}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem key={item.name} item={item} pathname={pathname} sidebarOpen={sidebarOpen} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"
          }`}
      >
        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 px-6 flex items-center">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((bc, index) => (
              <div key={bc.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-300">/</span>}
                {bc.isLast ? (
                  <span className="font-medium text-gray-900">{bc.label}</span>
                ) : (
                  <Link href={bc.href} className="text-gray-400 hover:text-gray-600">{bc.label}</Link>
                )}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userNameFull}</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0F6A6A] text-white flex items-center justify-center font-semibold">
              {userName}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
