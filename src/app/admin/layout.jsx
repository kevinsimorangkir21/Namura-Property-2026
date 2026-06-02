"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard, Building2, FileText, Users, Bell,
  User, LogOut, ChevronLeft, ChevronRight, Menu, X,
} from "lucide-react";
import WelcomeModal from "@/components/ui/WelcomeModal";

/* ─── Navigation structure ─────────────────────────── */

const NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "PROPERTY",
    items: [
      { name: "Properti", href: "/admin/properti", icon: Building2 },
    ],
  },
  {
    label: "CONTENT",
    items: [
      { name: "Artikel", href: "/admin/artikel", icon: FileText },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { name: "User", href: "/admin/user", icon: Users },
      { name: "Notifikasi", href: "/admin/notifikasi", icon: Bell },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { name: "Profil Saya", href: "/admin/profile", icon: User },
    ],
  },
];

/* ─── Tooltip ───────────────────────────────────────── */

function Tooltip({ text, children }) {
  return (
    <div className="relative group/tip flex items-center">
      {children}
      <div className="pointer-events-none absolute left-full ml-3 z-[100] hidden group-hover/tip:flex items-center">
        <div className="bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          {text}
        </div>
        <div className="absolute right-full border-4 border-transparent border-r-gray-900" />
      </div>
    </div>
  );
}

/* ─── NavItem ───────────────────────────────────────── */

function NavItem({ item, pathname, expanded, badge }) {
  const Icon = item.icon;
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  const inner = (
    <Link
      href={item.href}
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-xl
        transition-all duration-200 group/nav
        ${isActive
          ? "bg-white/[0.15] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
          : "text-white/60 hover:bg-white/[0.08] hover:text-white"
        }
      `}
    >
      {/* Active accent bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] bg-white rounded-r-full shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
      )}

      {/* Icon */}
      <Icon
        size={17}
        className={`flex-shrink-0 transition-colors duration-200 ${isActive ? "text-white" : "text-white/60 group-hover/nav:text-white"}`}
      />

      {/* Label */}
      {expanded && (
        <span className={`text-sm font-medium flex-1 ${isActive ? "text-white" : ""}`}>
          {item.name}
        </span>
      )}

      {/* Badge */}
      {expanded && badge > 0 && (
        <span className="flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );

  if (!expanded) {
    return <Tooltip text={`${item.name}${badge > 0 ? ` (${badge})` : ""}`}>{inner}</Tooltip>;
  }

  return inner;
}

/* ─── Main layout ───────────────────────────────────── */

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState({ name: "Administrator", email: "admin@namura.com", role: "Admin" });
  const [stats, setStats] = useState({ total: 0, active: 0 });
  const mobileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!token || !isLoggedIn) {
      toast.error("Sesi login telah berakhir");
      router.push("/login");
      return;
    }

    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          name: parsed.name || "Administrator",
          email: parsed.email || "admin@namura.com",
          role: parsed.role || "Admin",
        });
      } catch { }
    }

    // Fetch quick stats
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/properties`
        );
        if (res.ok) {
          const data = await res.json();
          const arr = data || [];
          setStats({
            total: arr.length,
            active: arr.filter((p) => (p.status || "").toLowerCase() === "aktif").length,
          });
        }
      } catch { }
    };
    fetchStats();

    setLoading(false);
  }, [router]);

  // Close mobile drawer on outside click
  useEffect(() => {
    const handler = (e) => {
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

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

  const breadcrumbs = pathname.split("/").filter(Boolean).map((seg, i, arr) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1),
    href: "/" + arr.slice(0, i + 1).join("/"),
    isLast: i === arr.length - 1,
  }));

  const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  /* ─── Sidebar content (shared between desktop + mobile) ─ */
  const SidebarContent = () => (
    <div className="flex flex-col h-full"
      style={{ background: "linear-gradient(180deg,#0f766e 0%,#115e59 50%,#134e4a 100%)" }}
    >

      {/* ── Branding ── */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/[0.08] ${!expanded && "justify-center"}`}>
        {expanded ? (
          <>
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image src="/Logo/Namura.png" alt="Namura" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">Namura Property</p>
              <p className="text-white/50 text-[10px] leading-tight mt-0.5">Property Management</p>
            </div>
          </>
        ) : (
          <Tooltip text="Namura Property">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center overflow-hidden">
              <Image src="/Logo/Namura.png" alt="Namura" width={28} height={28} className="object-contain" />
            </div>
          </Tooltip>
        )}
      </div>

      {/* ── Quick stats card ── */}
      {expanded && (
        <div className="mx-3 mt-4 p-3 rounded-xl bg-white/[0.08] border border-white/[0.1]">
          <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium mb-2">
            Quick Stats
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white text-xl font-bold leading-none">{stats.total}</p>
              <p className="text-white/60 text-[11px] mt-1">Total Properti</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {stats.active} Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            {expanded && (
              <p className="text-[9px] font-bold tracking-[0.12em] text-white/30 px-3 mb-2 uppercase">
                {group.label}
              </p>
            )}
            {!expanded && <div className="h-px bg-white/[0.07] mb-3 mx-3" />}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  expanded={expanded}
                  badge={0}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User profile card ── */}
      <div className="p-3 border-t border-white/[0.08]">
        {expanded ? (
          <div className="p-3 rounded-xl bg-white/[0.07] border border-white/[0.1] mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-300/30 to-teal-600/30 border border-white/20 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{user.name}</p>
                <p className="text-white/40 text-[10px] truncate">{user.email}</p>
              </div>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-teal-400/20 text-teal-300 uppercase tracking-wide flex-shrink-0">
                {user.role}
              </span>
            </div>
          </div>
        ) : (
          <Tooltip text={`${user.name} — ${user.role}`}>
            <div className="w-9 h-9 mx-auto rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold flex items-center justify-center mb-3 cursor-default">
              {initials}
            </div>
          </Tooltip>
        )}

        {/* Logout */}
        {expanded ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 border border-transparent hover:border-red-500/20 text-sm"
          >
            <LogOut size={15} />
            <span>Keluar</span>
          </button>
        ) : (
          <Tooltip text="Keluar">
            <button
              onClick={handleLogout}
              className="w-9 h-9 mx-auto flex items-center justify-center rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            >
              <LogOut size={15} />
            </button>
          </Tooltip>
        )}
      </div>

      {/* ── Collapse toggle (desktop) ── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-[#134e4a] border border-white/20 text-white/70 hover:text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        {expanded ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <WelcomeModal />

      {/* ── Desktop sidebar ── */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-screen transition-all duration-300 z-50 relative overflow-visible ${expanded ? "w-[280px]" : "w-[80px]"}`}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      )}

      {/* ── Mobile drawer ── */}
      <div
        ref={mobileRef}
        className={`md:hidden fixed top-0 left-0 h-screen w-[280px] z-50 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full relative overflow-visible">
          <SidebarContent />
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${expanded ? "md:ml-[280px]" : "md:ml-[80px]"}`}>

        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 h-14 px-4 md:px-6 flex items-center gap-4 shadow-sm">

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition flex-shrink-0"
          >
            <Menu size={17} />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-sm min-w-0">
            {breadcrumbs.map((bc, i) => (
              <div key={bc.href} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-gray-300 text-xs">/</span>}
                {bc.isLast ? (
                  <span className="font-semibold text-gray-900 truncate">{bc.label}</span>
                ) : (
                  <Link href={bc.href} className="text-gray-400 hover:text-gray-600 transition truncate">{bc.label}</Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right area — minimal on topbar since user info is in sidebar */}
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
