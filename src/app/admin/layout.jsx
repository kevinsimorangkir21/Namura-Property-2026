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
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
        ? "bg-white/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-sm"
        : "text-white/60 hover:bg-white/10 hover:text-white"
        }`}
    >
      {isActive && (
        <span className="absolute left-0 top-[20%] h-[60%] w-[3px] bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      )}
      <Icon
        size={18}
        className={`shrink-0 transition-transform duration-200 ${isActive ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" : "group-hover:scale-110"
          }`}
      />
      {sidebarOpen && (
        <span className="text-sm font-medium tracking-wide">{item.name}</span>
      )}
      {isActive && sidebarOpen && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_6px_white]" />
      )}
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
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
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
    <div className="flex min-h-screen" style={{ background: "linear-gradient(135deg, #0a4a4a 0%, #0F6A6A 40%, #0d5c5c 70%, #083d3d 100%)" }}>
      <WelcomeModal />

      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-screen transition-all duration-300 z-50 ${sidebarOpen ? "w-[260px]" : "w-[80px]"
          }`}
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "4px 0 32px rgba(0,0,0,0.15), inset 1px 0 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Logo area */}
        <div
          className="px-4 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              {/* Logo icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                N
              </div>
              <div>
                <h2 className="text-white font-semibold text-[15px] leading-tight tracking-wide">
                  Namura Property
                </h2>
                <p className="text-[11px] text-white/40 tracking-wider uppercase">Admin Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
          >
            {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menus.map((group) => (
            <div key={group.section} className="mb-6">
              {sidebarOpen && (
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 px-3 mb-2 font-semibold">
                  {group.section}
                </p>
              )}
              {!sidebarOpen && (
                <div
                  className="mx-3 mb-2 h-px"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    pathname={pathname}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User profile + logout */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {sidebarOpen && (
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-3"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {userName}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{userNameFull}</p>
                <p className="text-white/40 text-[11px]">Administrator</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`w-full py-2.5 rounded-xl text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium ${sidebarOpen ? "" : "px-0"
              }`}
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.35)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
            }}
          >
            <LogOut size={15} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"
          }`}
      >
        {/* Topbar */}
        <div
          className="sticky top-0 z-40 h-16 px-6 flex items-center"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
          }}
        >
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((bc, index) => (
              <div key={bc.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-300">/</span>}
                {bc.isLast ? (
                  <span className="font-semibold text-gray-800">{bc.label}</span>
                ) : (
                  <Link href={bc.href} className="text-gray-400 hover:text-gray-600 transition-colors">
                    {bc.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{userNameFull}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">Admin</p>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-md"
              style={{
                background: "linear-gradient(135deg, #0F6A6A 0%, #0a4a4a 100%)",
                boxShadow: "0 2px 12px rgba(15,106,106,0.4)",
              }}
            >
              {userName}
            </div>
          </div>
        </div>

        {/* Page content — white card with slight border-radius at top */}
        <div
          className="flex-1 p-6"
          style={{
            background: "#F0F4F8",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}