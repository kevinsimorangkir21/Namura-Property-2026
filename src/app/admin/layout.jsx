"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Bell,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  Loader2,
} from "lucide-react";

import WelcomeModal from "@/components/ui/WelcomeModal";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
};

type NavItemProps = {
  item: MenuItem;
  pathname: string;
  sidebarOpen: boolean;
};

const menus: {
  section: string;
  items: MenuItem[];
}[] = [
  {
    section: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "Management",
    items: [
      {
        name: "Properti",
        href: "/admin/properti",
        icon: Building2,
      },
      {
        name: "Artikel",
        href: "/admin/artikel",
        icon: FileText,
      },
      {
        name: "User",
        href: "/admin/user",
        icon: Users,
      },
      {
        name: "Notifikasi",
        href: "/admin/notifikasi",
        icon: Bell,
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        name: "Profil Saya",
        href: "/admin/profile",
        icon: User,
      },
    ],
  },
];

function NavItem({
  item,
  pathname,
  sidebarOpen,
}: NavItemProps) {
  const Icon = item.icon;

  const isActive =
    pathname === item.href ||
    (item.href !== "/admin" &&
      pathname.startsWith(item.href + "/"));

  return (
    <Link
      href={item.href}
      title={!sidebarOpen ? item.name : undefined}
      aria-current={isActive ? "page" : undefined}
      className={[
        "relative flex items-center gap-3",
        "px-3 py-3 rounded-xl",
        "transition-all duration-200",
        "group",
        isActive
          ? "bg-white/15 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {isActive && (
        <span className="absolute left-0 top-[20%] h-[60%] w-1 bg-white rounded-r-full" />
      )}

      <Icon size={18} />

      {sidebarOpen && (
        <span className="text-sm font-medium truncate">
          {item.name}
        </span>
      )}

      {!sidebarOpen && (
        <span className="pointer-events-none absolute left-[72px] z-50 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
          {item.name}
        </span>
      )}
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [userName, setUserName] = useState("A");
  const [userNameFull, setUserNameFull] =
    useState("Administrator");

  /*
   * ==========================================
   * AUTHENTICATION CHECK
   * ==========================================
   */
  useEffect(() => {
    let mounted = true;

    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem("token");
        const isLoggedIn =
          localStorage.getItem("isLoggedIn") === "true";

        /*
         * Tidak ada token / session
         * → kembali ke halaman login.
         */
        if (!token || !isLoggedIn) {
          toast.error("Sesi login telah berakhir");
          router.replace("/login");
          return;
        }

        /*
         * Ambil informasi user.
         */
        const userRaw = localStorage.getItem("user");

        if (userRaw) {
          try {
            const parsed = JSON.parse(userRaw);

            const fullName =
              typeof parsed?.name === "string" &&
              parsed.name.trim()
                ? parsed.name.trim()
                : "Administrator";

            setUserNameFull(fullName);

            setUserName(
              fullName.charAt(0).toUpperCase() || "A"
            );
          } catch {
            setUserNameFull("Administrator");
            setUserName("A");
          }
        }

        if (mounted) {
          setLoading(false);
        }
      } catch {
        toast.error(
          "Gagal memeriksa sesi login"
        );

        router.replace("/login");
      }
    };

    checkAuthentication();

    return () => {
      mounted = false;
    };
  }, [router]);

  /*
   * ==========================================
   * LOGOUT
   * ==========================================
   */
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    } finally {
      toast.success("Logout berhasil");

      router.replace("/login");
    }
  };

  /*
   * ==========================================
   * BREADCRUMB
   * ==========================================
   */
  const breadcrumbs = useMemo(() => {
    const segments = pathname
      .split("/")
      .filter(Boolean);

    const labels: Record<string, string> = {
      admin: "Dashboard",
      properti: "Properti",
      artikel: "Artikel",
      user: "User",
      notifikasi: "Notifikasi",
      profile: "Profil Saya",
    };

    return segments.map((segment, index) => {
      const href =
        "/" +
        segments
          .slice(0, index + 1)
          .join("/");

      const label =
        labels[segment.toLowerCase()] ||
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) =>
            char.toUpperCase()
          );

      return {
        label,
        href,
        isLast:
          index === segments.length - 1,
      };
    });
  }, [pathname]);

  /*
   * ==========================================
   * LOADING SCREEN
   * ==========================================
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-[#0F6A6A]/15" />

            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0F6A6A] animate-spin" />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2
              size={14}
              className="animate-spin"
            />

            <span>Memuat dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <WelcomeModal />

      {/* =====================================
          SIDEBAR
      ====================================== */}
      <aside
        className={[
          "hidden md:flex",
          "flex-col",
          "fixed",
          "top-0",
          "left-0",
          "h-screen",
          "bg-[#0F6A6A]",
          "transition-all",
          "duration-300",
          "z-50",
          "shadow-xl",
          sidebarOpen
            ? "w-[260px]"
            : "w-[80px]",
        ].join(" ")}
      >
        {/* Sidebar Header */}
        <div
          className={[
            "px-4",
            "py-5",
            "border-b",
            "border-white/10",
            "flex",
            "items-center",
            sidebarOpen
              ? "justify-between"
              : "justify-center",
          ].join(" ")}
        >
          {sidebarOpen && (
            <div className="min-w-0">
              <h2 className="text-white font-semibold text-lg truncate">
                Namura Property
              </h2>

              <p className="text-xs text-white/50">
                Admin Dashboard
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(
                (previous) => !previous
              )
            }
            aria-label={
              sidebarOpen
                ? "Tutup sidebar"
                : "Buka sidebar"
            }
            className={[
              "w-9",
              "h-9",
              "flex",
              "items-center",
              "justify-center",
              "rounded-lg",
              "text-white/80",
              "hover:bg-white/10",
              "hover:text-white",
              "transition",
            ].join(" ")}
          >
            {sidebarOpen ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-3 py-4 overflow-y-auto"
          aria-label="Navigasi utama"
        >
          {menus.map((group) => (
            <div
              key={group.section}
              className="mb-6"
            >
              {sidebarOpen && (
                <p className="text-[11px] uppercase tracking-wider text-white/40 px-3 mb-3">
                  {group.section}
                </p>
              )}

              <div className="space-y-1">
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

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout" : undefined}
            className={[
              "w-full",
              "py-3",
              "rounded-xl",
              "bg-red-500",
              "hover:bg-red-600",
              "text-white",
              "transition",
              "flex",
              "items-center",
              "justify-center",
              "gap-2",
              "font-medium",
            ].join(" ")}
          >
            <LogOut size={16} />

            {sidebarOpen && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}
      <main
        className={[
          "flex-1",
          "flex",
          "flex-col",
          "min-w-0",
          "transition-all",
          "duration-300",
          sidebarOpen
            ? "md:ml-[260px]"
            : "md:ml-[80px]",
        ].join(" ")}
      >
        {/* ===================================
            TOPBAR
        ==================================== */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 px-4 md:px-6 flex items-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm min-w-0"
          >
            {breadcrumbs.map(
              (breadcrumb, index) => (
                <div
                  key={breadcrumb.href}
                  className="flex items-center gap-2 min-w-0"
                >
                  {index > 0 && (
                    <ChevronRight
                      size={14}
                      className="text-gray-300 shrink-0"
                    />
                  )}

                  {breadcrumb.isLast ? (
                    <span className="font-medium text-gray-900 truncate">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <Link
                      href={breadcrumb.href}
                      className="text-gray-400 hover:text-gray-600 transition truncate"
                    >
                      {breadcrumb.label}
                    </Link>
                  )}
                </div>
              )
            )}
          </nav>

          {/* User Information */}
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                {userNameFull}
              </p>

              <p className="text-xs text-gray-400">
                Administrator
              </p>
            </div>

            <div
              className="w-10 h-10 rounded-full bg-[#0F6A6A] text-white flex items-center justify-center font-semibold shrink-0"
              title={userNameFull}
            >
              {userName}
            </div>
          </div>
        </header>

        {/* ===================================
            PAGE CONTENT
        ==================================== */}
        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}