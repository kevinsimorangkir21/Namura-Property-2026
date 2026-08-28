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
  Sparkles,
} from "lucide-react";

import WelcomeModal from "@/components/ui/WelcomeModal";

/* =========================================================
   MENU CONFIGURATION
========================================================= */

const menus = [
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

/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({ item, pathname, sidebarOpen }) {
  const Icon = item.icon;

  const isActive =
    pathname === item.href ||
    (item.href !== "/admin" &&
      pathname.startsWith(item.href + "/"));

  return (
    <Link
      href={item.href}
      title={!sidebarOpen ? item.name : undefined}
      className={`
        group relative flex items-center gap-3
        min-h-[46px]
        px-3.5
        rounded-2xl
        overflow-hidden
        transition-all duration-300 ease-out
        ${
          isActive
            ? "text-white bg-white/[0.14] border border-white/[0.16] shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
            : "text-white/60 border border-transparent hover:text-white hover:bg-white/[0.07] hover:border-white/[0.08]"
        }
      `}
    >
      {/* Active glow */}
      {isActive && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-white/[0.08] via-transparent to-white/[0.04]" />

          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
        </>
      )}

      {/* Icon container */}
      <span
        className={`
          relative z-10
          w-8 h-8
          rounded-xl
          flex items-center justify-center
          transition-all duration-300
          ${
            isActive
              ? "bg-white/[0.12] shadow-inner"
              : "bg-transparent group-hover:bg-white/[0.06]"
          }
        `}
      >
        <Icon size={18} strokeWidth={1.8} />
      </span>

      {sidebarOpen && (
        <span className="relative z-10 text-sm font-medium truncate">
          {item.name}
        </span>
      )}

      {/* Tooltip collapsed */}
      {!sidebarOpen && (
        <span
          className="
            pointer-events-none
            absolute left-[68px]
            z-[100]
            hidden group-hover:block
            whitespace-nowrap
            rounded-xl
            border border-white/10
            bg-[#123f40]/95
            backdrop-blur-xl
            px-3 py-2
            text-xs
            text-white
            shadow-xl
          "
        >
          {item.name}
        </span>
      )}
    </Link>
  );
}

/* =========================================================
   ADMIN LAYOUT
========================================================= */

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [userName, setUserName] = useState("A");
  const [userNameFull, setUserNameFull] =
    useState("Administrator");

  /* =======================================================
     AUTH CHECK
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem("token");
        const isLoggedIn =
          localStorage.getItem("isLoggedIn");

        /*
         * User belum login
         */
        if (!token || !isLoggedIn) {
          toast.error("Sesi login telah berakhir");

          router.replace("/login");

          return;
        }

        /*
         * Load user information
         */
        const user = localStorage.getItem("user");

        if (user) {
          try {
            const parsed = JSON.parse(user);

            const fullName =
              typeof parsed?.name === "string" &&
              parsed.name.trim()
                ? parsed.name.trim()
                : "Administrator";

            setUserNameFull(fullName);

            setUserName(
              fullName.charAt(0).toUpperCase() || "A"
            );
          } catch (error) {
            console.error(
              "Failed to parse user:",
              error
            );
          }
        }

        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        );

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

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    toast.success("Logout berhasil");

    router.replace("/login");
  };

  /* =======================================================
     BREADCRUMB
  ======================================================= */

  const breadcrumbs = useMemo(() => {
    const segments = pathname
      .split("/")
      .filter(Boolean);

    const labels = {
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

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#071f20] flex items-center justify-center">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#0F6A6A]/30 blur-[120px] -top-40 -left-40" />

        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[120px] -bottom-40 -right-20" />

        {/* Glass loader */}
        <div className="relative flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-2xl flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-white/90">
              Memuat dashboard
            </p>

            <p className="text-xs text-white/40 mt-1">
              Mohon tunggu sebentar...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#071f20]">
      {/* ===================================================
          BACKGROUND AMBIENCE
      ==================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[650px] h-[650px] rounded-full bg-[#0F6A6A]/25 blur-[150px] -top-[250px] -left-[200px]" />

        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-400/[0.07] blur-[140px] top-[30%] right-[-220px]" />

        <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-400/[0.05] blur-[140px] bottom-[-200px] left-[30%]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <WelcomeModal />

      {/* ===================================================
          SIDEBAR
      ==================================================== */}

      <aside
        className={`
          hidden md:flex
          fixed
          top-4
          left-4
          bottom-4
          z-50
          flex-col
          rounded-[28px]
          border border-white/[0.10]
          bg-white/[0.055]
          backdrop-blur-2xl
          shadow-[0_20px_70px_rgba(0,0,0,0.28)]
          transition-all duration-300
          overflow-hidden
          ${
            sidebarOpen
              ? "w-[260px]"
              : "w-[80px]"
          }
        `}
      >
        {/* Sidebar inner highlight */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.06] via-transparent to-black/[0.08]" />

        {/* Sidebar Header */}
        <div
          className={`
            relative
            px-4
            py-5
            border-b border-white/[0.08]
            flex items-center
            ${
              sidebarOpen
                ? "justify-between"
                : "justify-center"
            }
          `}
        >
          {sidebarOpen && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/[0.10] border border-white/[0.12] backdrop-blur-xl flex items-center justify-center shadow-inner">
                <Sparkles
                  size={18}
                  className="text-white"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-white font-semibold text-[15px] truncate">
                  Namura Property
                </h2>

                <p className="text-[11px] text-white/40 mt-0.5">
                  Admin Dashboard
                </p>
              </div>
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
            className="
              w-9
              h-9
              shrink-0
              rounded-xl
              border border-white/[0.08]
              bg-white/[0.05]
              text-white/60
              hover:text-white
              hover:bg-white/[0.10]
              transition-all
              flex
              items-center
              justify-center
            "
          >
            {sidebarOpen ? (
              <PanelLeftClose size={17} />
            ) : (
              <PanelLeftOpen size={17} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 px-3 py-5 overflow-y-auto">
          {menus.map((group) => (
            <div
              key={group.section}
              className="mb-7"
            >
              {sidebarOpen && (
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  {group.section}
                </p>
              )}

              <div className="space-y-1.5">
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
        <div className="relative p-3 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout" : undefined}
            className={`
              group
              relative
              w-full
              min-h-[46px]
              rounded-2xl
              border border-red-400/[0.12]
              bg-red-500/[0.08]
              hover:bg-red-500/[0.16]
              text-red-200
              hover:text-white
              transition-all duration-300
              flex items-center
              ${
                sidebarOpen
                  ? "justify-center gap-2"
                  : "justify-center"
              }
            `}
          >
            <LogOut
              size={17}
              strokeWidth={1.8}
            />

            {sidebarOpen && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ===================================================
          MAIN
      ==================================================== */}

      <main
        className={`
          relative
          min-h-screen
          flex flex-col
          transition-all duration-300
          ${
            sidebarOpen
              ? "md:ml-[292px]"
              : "md:ml-[112px]"
          }
        `}
      >
        {/* =================================================
            TOPBAR
        ================================================= */}

        <header
          className="
            sticky
            top-4
            z-40
            mx-4
            md:mr-4
            h-[64px]
            rounded-2xl
            border border-white/[0.10]
            bg-white/[0.055]
            backdrop-blur-2xl
            shadow-[0_15px_50px_rgba(0,0,0,0.16)]
            flex
            items-center
            px-4
            md:px-5
          "
        >
          {/* Topbar shine */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-white/[0.05] via-transparent to-white/[0.025]" />

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="relative flex items-center gap-1.5 text-sm min-w-0"
          >
            {breadcrumbs.map(
              (bc, index) => (
                <div
                  key={bc.href}
                  className="flex items-center gap-1.5 min-w-0"
                >
                  {index > 0 && (
                    <ChevronRight
                      size={14}
                      className="text-white/20 shrink-0"
                    />
                  )}

                  {bc.isLast ? (
                    <span className="font-medium text-white/90 truncate">
                      {bc.label}
                    </span>
                  ) : (
                    <Link
                      href={bc.href}
                      className="text-white/40 hover:text-white/70 transition truncate"
                    >
                      {bc.label}
                    </Link>
                  )}
                </div>
              )
            )}
          </nav>

          {/* User */}
          <div className="relative ml-auto flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white/90 truncate max-w-[180px]">
                {userNameFull}
              </p>

              <p className="text-[11px] text-white/35">
                Administrator
              </p>
            </div>

            {/* Avatar */}
            <div
              title={userNameFull}
              className="
                relative
                w-10
                h-10
                rounded-xl
                border border-white/[0.14]
                bg-white/[0.10]
                backdrop-blur-xl
                text-white
                flex
                items-center
                justify-center
                font-semibold
                shadow-inner
                overflow-hidden
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.14] to-transparent" />

              <span className="relative">
                {userName}
              </span>
            </div>
          </div>
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="relative flex-1 p-4 md:p-6 pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}