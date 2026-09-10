"use client";

import Link from "next/link";
import Image from "next/image";
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
  ChevronDown,
  Menu,
  X,
  Home,
  ShieldCheck,
} from "lucide-react";

import WelcomeModal from "@/components/ui/WelcomeModal";

/* ============================================================
   MENU CONFIG
============================================================ */

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

/* ============================================================
   NAV ITEM
============================================================ */

function NavItem({
  item,
  pathname,
  sidebarOpen,
  onNavigate,
}) {
  const Icon = item.icon;

  /*
   * Dashboard (/admin) harus exact match.
   *
   * Sebelumnya:
   * pathname.startsWith("/admin/")
   *
   * membuat Dashboard ikut aktif ketika:
   * /admin/profile
   * /admin/properti
   * /admin/artikel
   * dll.
   *
   * Sekarang Dashboard hanya aktif jika pathname benar-benar
   * sama dengan /admin.
   */
  const isActive =
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname === item.href ||
        pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={!sidebarOpen ? item.name : undefined}
      className={`
        group relative flex h-[44px] items-center gap-3
        rounded-[12px] px-3
        transition-all duration-200
        ${
          isActive
            ? "bg-white text-[#0F6A6A] shadow-[0_4px_14px_rgba(0,0,0,0.07)]"
            : "text-white/60 hover:bg-white/[0.08] hover:text-white"
        }
        ${sidebarOpen ? "" : "justify-center px-0"}
      `}
    >
      {/* ACTIVE INDICATOR */}
      {isActive && (
        <span
          className="
            absolute left-0 top-1/2
            h-[22px] w-[3px]
            -translate-y-1/2
            rounded-r-full
            bg-[#0F6A6A]
          "
        />
      )}

      {/* ICON */}
      <span
        className={`
          flex h-8 w-8 shrink-0
          items-center justify-center
          rounded-[9px]
          transition-all duration-200
          ${
            isActive
              ? "bg-[#EAF5F4] text-[#0F6A6A]"
              : "text-white/65 group-hover:text-white"
          }
        `}
      >
        <Icon
          size={17}
          strokeWidth={isActive ? 2.2 : 1.8}
        />
      </span>

      {/* LABEL */}
      {sidebarOpen && (
        <span
          className={`
            truncate text-[13px] font-medium
            ${
              isActive
                ? "text-[#263331]"
                : "text-white/70 group-hover:text-white"
            }
          `}
        >
          {item.name}
        </span>
      )}
    </Link>
  );
}

/* ============================================================
   ADMIN LAYOUT
============================================================ */

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [userName, setUserName] = useState("A");
  const [userNameFull, setUserNameFull] =
    useState("Administrator");

  /* ==========================================================
     AUTH CHECK
  ========================================================== */

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

        const fullName =
          parsed.name || "Administrator";

        setUserNameFull(fullName);

        setUserName(
          fullName.charAt(0).toUpperCase()
        );
      } catch {
        setUserNameFull("Administrator");
        setUserName("A");
      }
    }

    setLoading(false);
  }, [router]);

  /* ==========================================================
     CLOSE MOBILE MENU / PROFILE WHEN ROUTE CHANGES
  ========================================================== */

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  /* ==========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    toast.success("Logout berhasil");

    router.push("/login");
  };

  /* ==========================================================
     BREADCRUMBS
  ========================================================== */

  const breadcrumbs = useMemo(() => {
    const segments = pathname
      .split("/")
      .filter(Boolean);

    return segments.map((segment, index) => {
      let label =
        segment.charAt(0).toUpperCase() +
        segment.slice(1);

      const labels = {
        admin: "Dashboard",
        properti: "Properti",
        artikel: "Artikel",
        user: "User",
        notifikasi: "Notifikasi",
        profile: "Profil Saya",
      };

      label = labels[segment] || label;

      return {
        label,
        href:
          "/" +
          segments
            .slice(0, index + 1)
            .join("/"),
        isLast:
          index === segments.length - 1,
      };
    });
  }, [pathname]);

  /* ==========================================================
     CURRENT PAGE
  ========================================================== */

  const currentPage =
    breadcrumbs[breadcrumbs.length - 1]?.label ||
    "Dashboard";

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="flex h-dvh items-center justify-center overflow-hidden bg-[#F7FAF9]">
        <div className="flex flex-col items-center">
          <div className="relative h-10 w-10">
            <div
              className="
                absolute inset-0
                rounded-full
                border-2
                border-[#0F6A6A]/10
              "
            />

            <div
              className="
                absolute inset-0
                animate-spin
                rounded-full
                border-2
                border-transparent
                border-t-[#0F6A6A]
              "
            />
          </div>

          <p className="mt-4 text-xs text-[#899490]">
            Memuat dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-[#F7FAF9]">

      {/* ======================================================
          WELCOME MODAL
      ====================================================== */}

      <WelcomeModal />

      {/* ======================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 hidden
          flex-col overflow-hidden
          bg-[#0F6A6A]
          md:flex
          ${
            sidebarOpen
              ? "w-[248px]"
              : "w-[76px]"
          }
          transition-[width] duration-300 ease-out
        `}
      >

        {/* ====================================================
            SIDEBAR HEADER
        ==================================================== */}

        <div
          className={`
            flex h-[72px] shrink-0 items-center
            border-b border-white/[0.09]
            ${
              sidebarOpen
                ? "justify-between px-4"
                : "justify-center px-2"
            }
          `}
        >

          {/* LOGO */}
          {sidebarOpen ? (
            <Link
              href="/admin"
              className="flex min-w-0 items-center"
            >
              <Image
                src="/Logo/Namura_Property2.png"
                alt="Namura Property"
                width={155}
                height={58}
                priority
                className="
                  h-auto w-[145px]
                  object-contain object-left
                "
              />
            </Link>
          ) : (
            <Link
              href="/admin"
              title="Namura Property"
              className="
                flex h-10 w-10
                items-center justify-center
                overflow-hidden rounded-xl
                bg-white
              "
            >
              <Image
                src="/Logo/Namura.png"
                alt="Namura Property"
                width={32}
                height={32}
                priority
                className="h-8 w-8 object-contain"
              />
            </Link>
          )}

          {/* COLLAPSE BUTTON */}
          <button
            type="button"
            onClick={() =>
              setSidebarOpen(
                (prev) => !prev
              )
            }
            title={
              sidebarOpen
                ? "Tutup sidebar"
                : "Buka sidebar"
            }
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-lg
              text-white/50
              transition
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            {sidebarOpen ? (
              <PanelLeftClose
                size={17}
                strokeWidth={1.8}
              />
            ) : (
              <PanelLeftOpen
                size={17}
                strokeWidth={1.8}
              />
            )}
          </button>
        </div>

        {/* ====================================================
            SIDEBAR CONTENT
        ==================================================== */}

        <nav className="flex-1 overflow-y-auto px-3 py-5 scrollbar-none">
          {menus.map((group) => (
            <div
              key={group.section}
              className="mb-6 last:mb-0"
            >

              {/* SECTION LABEL */}
              {sidebarOpen ? (
                <p
                  className="
                    mb-2 px-3
                    text-[9px] font-bold
                    uppercase tracking-[0.18em]
                    text-white/30
                  "
                >
                  {group.section}
                </p>
              ) : (
                <div
                  className="
                    mb-3 h-px
                    bg-white/[0.08]
                  "
                />
              )}

              {/* ITEMS */}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    pathname={pathname}
                    sidebarOpen={sidebarOpen}
                    onNavigate={() =>
                      setMobileMenuOpen(false)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* ====================================================
            SIDEBAR BOTTOM
        ==================================================== */}

        <div
          className="
            shrink-0
            border-t border-white/[0.09]
            p-3
          "
        >

          {/* USER INFO */}
          {sidebarOpen && (
            <div
              className="
                mb-3 flex items-center gap-2.5
                rounded-xl
                bg-white/[0.06]
                px-3 py-2.5
              "
            >
              <div
                className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-white/10
                  text-xs font-bold
                  text-white
                "
              >
                {userName}
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-[11px] font-semibold
                    text-white/80
                  "
                >
                  {userNameFull}
                </p>

                <p className="text-[9px] text-white/35">
                  Administrator
                </p>
              </div>
            </div>
          )}

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className={`
              flex h-[42px] w-full
              items-center
              rounded-[11px]
              border border-red-400/10
              bg-red-500/[0.08]
              text-red-200
              transition-all
              hover:bg-red-500/[0.15]
              hover:text-white
              ${
                sidebarOpen
                  ? "justify-start gap-3 px-3"
                  : "justify-center"
              }
            `}
          >
            <LogOut
              size={16}
              strokeWidth={1.8}
            />

            {sidebarOpen && (
              <span className="text-xs font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ======================================================
          MOBILE SIDEBAR OVERLAY
      ====================================================== */}

      {mobileMenuOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/30
            backdrop-blur-[2px]
            md:hidden
          "
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />
      )}

      {/* ======================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[280px]
          flex-col
          bg-[#0F6A6A]
          shadow-2xl
          transition-transform
          duration-300
          md:hidden
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* MOBILE HEADER */}
        <div
          className="
            flex h-[68px]
            items-center justify-between
            border-b border-white/[0.09]
            px-4
          "
        >
          <Image
            src="/Logo/Namura_Property2.png"
            alt="Namura Property"
            width={155}
            height={58}
            priority
            className="
              h-auto w-[145px]
              object-contain object-left
            "
          />

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              text-white/60
              hover:bg-white/10
              hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* MOBILE NAV */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {menus.map((group) => (
            <div
              key={group.section}
              className="mb-6"
            >
              <p
                className="
                  mb-2 px-3
                  text-[9px] font-bold
                  uppercase tracking-[0.18em]
                  text-white/30
                "
              >
                {group.section}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    pathname={pathname}
                    sidebarOpen={true}
                    onNavigate={() =>
                      setMobileMenuOpen(false)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* MOBILE LOGOUT */}
        <div
          className="
            border-t border-white/[0.09]
            p-3
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex h-11 w-full
              items-center justify-center
              gap-2
              rounded-xl
              bg-red-500/10
              text-sm font-medium
              text-red-200
              transition
              hover:bg-red-500/20
              hover:text-white
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main
        className={`
          flex min-h-dvh min-w-0
          flex-1 flex-col
          transition-[margin] duration-300
          ${
            sidebarOpen
              ? "md:ml-[248px]"
              : "md:ml-[76px]"
          }
        `}
      >

        {/* ====================================================
            TOPBAR
        ==================================================== */}

        <header
          className="
            sticky top-0 z-30
            h-[68px] shrink-0
            border-b border-[#E7ECEA]
            bg-white/95
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex h-full
              items-center
              px-4 sm:px-5 lg:px-6
            "
          >

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(true)
              }
              className="
                mr-3
                flex h-9 w-9
                items-center justify-center
                rounded-lg
                text-[#5F6B67]
                hover:bg-[#F3F7F6]
                md:hidden
              "
            >
              <Menu size={19} />
            </button>

            {/* BREADCRUMB */}
            <div className="min-w-0">
              <nav className="flex items-center gap-2">

                {/* DESKTOP HOME */}
                <Link
                  href="/admin"
                  className="
                    hidden items-center gap-1.5
                    text-xs text-[#9AA5A1]
                    transition
                    hover:text-[#0F6A6A]
                    sm:flex
                  "
                >
                  <Home size={13} />
                  Dashboard
                </Link>

                {breadcrumbs.length > 1 && (
                  <span
                    className="
                      hidden text-[#D1D8D5]
                      sm:block
                    "
                  >
                    /
                  </span>
                )}

                {/* BREADCRUMB ITEMS */}
                <div
                  className="
                    flex min-w-0
                    items-center gap-2
                  "
                >
                  {breadcrumbs
                    .filter(
                      (_, index) =>
                        index > 0
                    )
                    .map((bc) => (
                      <div
                        key={bc.href}
                        className="
                          flex min-w-0
                          items-center gap-2
                        "
                      >
                        <span
                          className="
                            hidden text-[#D1D8D5]
                            sm:block
                          "
                        >
                          /
                        </span>

                        {bc.isLast ? (
                          <span
                            className="
                              truncate
                              text-xs font-semibold
                              text-[#263331]
                              sm:text-sm
                            "
                          >
                            {bc.label}
                          </span>
                        ) : (
                          <Link
                            href={bc.href}
                            className="
                              hidden
                              text-xs
                              text-[#9AA5A1]
                              hover:text-[#0F6A6A]
                              sm:block
                            "
                          >
                            {bc.label}
                          </Link>
                        )}
                      </div>
                    ))}
                </div>

                {/* MOBILE CURRENT PAGE */}
                <span
                  className="
                    truncate
                    text-sm font-semibold
                    text-[#263331]
                    sm:hidden
                  "
                >
                  {currentPage}
                </span>
              </nav>

              <p
                className="
                  mt-0.5 hidden
                  text-[10px]
                  text-[#A0AAA7]
                  sm:block
                "
              >
                Namura Property Administration
              </p>
            </div>

            {/* RIGHT */}
            <div
              className="
                ml-auto flex items-center gap-2
              "
            >

              {/* SECURITY STATUS */}
              <div
                className="
                  hidden items-center gap-1.5
                  rounded-full
                  border border-[#E6EEEB]
                  bg-[#F8FAF9]
                  px-2.5 py-1.5
                  lg:flex
                "
              >
                <span
                  className="
                    h-1.5 w-1.5
                    rounded-full
                    bg-[#3FA66B]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#78837F]
                  "
                >
                  System Active
                </span>
              </div>

              {/* PROFILE */}
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(
                      (prev) => !prev
                    )
                  }
                  className="
                    flex items-center gap-2
                    rounded-xl
                    px-1.5 py-1
                    transition
                    hover:bg-[#F4F7F6]
                  "
                >
                  {/* AVATAR */}
                  <div
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-[#0F6A6A]
                      text-xs font-bold
                      text-white
                      shadow-sm
                    "
                  >
                    {userName}
                  </div>

                  {/* USER NAME */}
                  <div className="hidden text-left sm:block">
                    <p
                      className="
                        max-w-[130px]
                        truncate
                        text-xs font-semibold
                        text-[#263331]
                      "
                    >
                      {userNameFull}
                    </p>

                    <p
                      className="
                        text-[10px]
                        text-[#9AA5A1]
                      "
                    >
                      Administrator
                    </p>
                  </div>

                  {/* CHEVRON */}
                  <ChevronDown
                    size={14}
                    className={`
                      hidden
                      text-[#9AA5A1]
                      transition-transform
                      sm:block
                      ${
                        profileOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                {/* =================================================
                    PROFILE DROPDOWN
                ================================================= */}

                {profileOpen && (
                  <>
                    {/* OUTSIDE CLICK */}
                    <div
                      className="
                        fixed inset-0 z-[-1]
                      "
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    />

                    {/* DROPDOWN */}
                    <div
                      className="
                        absolute right-0
                        top-[calc(100%+8px)]
                        w-[220px]
                        overflow-hidden
                        rounded-2xl
                        border border-[#E5EBE8]
                        bg-white
                        p-1.5
                        shadow-[0_12px_40px_rgba(15,40,35,0.12)]
                      "
                    >

                      {/* USER INFO */}
                      <div
                        className="
                          rounded-xl
                          bg-[#F7FAF9]
                          px-3 py-3
                        "
                      >
                        <div className="flex items-center gap-2.5">

                          <div
                            className="
                              flex h-9 w-9
                              items-center justify-center
                              rounded-full
                              bg-[#0F6A6A]
                              text-xs font-bold
                              text-white
                            "
                          >
                            {userName}
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                truncate
                                text-xs font-semibold
                                text-[#263331]
                              "
                            >
                              {userNameFull}
                            </p>

                            <div
                              className="
                                mt-0.5 flex
                                items-center gap-1
                              "
                            >
                              <ShieldCheck
                                size={11}
                                className="text-[#0F6A6A]"
                              />

                              <span
                                className="
                                  text-[9px]
                                  text-[#8B9692]
                                "
                              >
                                Administrator
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* PROFILE LINK */}
                      <Link
                        href="/admin/profile"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="
                          mt-1.5
                          flex h-10
                          items-center gap-2.5
                          rounded-xl
                          px-3
                          text-xs font-medium
                          text-[#52605C]
                          transition
                          hover:bg-[#F3F7F6]
                          hover:text-[#0F6A6A]
                        "
                      >
                        <User size={15} />
                        Profil Saya
                      </Link>

                      {/* LOGOUT */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="
                          flex h-10 w-full
                          items-center gap-2.5
                          rounded-xl
                          px-3
                          text-xs font-medium
                          text-red-500
                          transition
                          hover:bg-red-50
                        "
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <div
          className="
            min-w-0 flex-1
            p-4 sm:p-5 lg:p-6
          "
        >
          {children}
        </div>

      </main>
    </div>
  );
}