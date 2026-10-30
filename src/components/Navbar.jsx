"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, ChevronRight, Menu, X } from "lucide-react";
import { API_URL } from "@/lib/api";

const NAV_ITEMS = [
  { name: "Beranda", href: "/" },
  { name: "Daftar Properti", href: "/daftar-properti" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Artikel", href: "/artikel" },
  { name: "Kontak", href: "/kontak" },
];

const isActivePath = (pathname, href) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/");

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function NotificationPanel({ items, total, loading, onNavigate }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
        <p className="text-sm font-semibold text-[var(--foreground)]">
          Notifikasi
        </p>
        {total > 0 && <span className="badge">{total}</span>}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {loading ? (
          <div className="px-5 py-10 text-center text-sm text-[var(--foreground-soft)]">
            Memuat...
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              <Bell size={20} />
            </span>
            <p className="text-sm text-[var(--foreground-soft)]">
              Tidak ada notifikasi
            </p>
          </div>
        ) : (
          <ul>
            {items.map((notif) => (
              <li
                key={notif.id}
                className="flex gap-3 border-b border-[var(--border-soft)] px-5 py-4 last:border-b-0"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {notif.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                    {notif.message}
                  </p>
                  <p className="mt-1.5 text-[11px] text-[var(--foreground-soft)]">
                    {formatDate(notif.created_at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        href="/notifikasi"
        onClick={onNavigate}
        className="flex min-h-12 items-center justify-center border-t border-[var(--border-soft)] px-5 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/5"
      >
        Lihat Semua Notifikasi
      </Link>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const bellWrapRef = useRef(null);
  const sheetRef = useRef(null);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!(token && user));
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setNotifOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setNotifLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (err.name !== "AbortError") setNotifications([]);
      } finally {
        if (!controller.signal.aborted) setNotifLoading(false);
      }
    })();

    return () => controller.abort();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!notifOpen) return;

    function handlePointerDown(e) {
      const inBell = bellWrapRef.current?.contains(e.target);
      const inSheet = sheetRef.current?.contains(e.target);
      if (!inBell && !inSheet) setNotifOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [notifOpen]);

  useEffect(() => {
    if (!open && !notifOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setNotifOpen(false);
        return;
      }

      if (e.key === "Tab" && open && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, notifOpen]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!open && !(notifOpen && isMobile)) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, notifOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      toggleRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [open]);

  const notifCount = notifications.length;
  const latestNotifs = useMemo(
    () =>
      [...notifications]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5),
    [notifications]
  );

  const closeNotif = () => setNotifOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <Link
              href="/"
              aria-label="Namura Property - Beranda"
              className="flex shrink-0 items-center"
            >
              <Image
                src="/Logo/Namura_Property1.png"
                alt="Namura Property"
                width={160}
                height={42}
                priority
                className="h-8 w-auto sm:h-10"
              />
            </Link>

            <nav
              aria-label="Navigasi utama"
              className="hidden items-center gap-1 lg:flex"
            >
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex h-10 items-center rounded-full px-4 text-sm transition-colors duration-200 ${
                      active
                        ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                        : "font-medium text-[var(--foreground-muted)] hover:bg-[var(--primary)]/5 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/kontak"
                className="hidden h-11 items-center rounded-full border border-[var(--glass-border-edge)] bg-[var(--glass-bg-strong)] px-5 text-sm font-semibold text-[var(--foreground)] shadow-[inset_0_1px_0_var(--glass-highlight)] transition-all duration-200 hover:border-[var(--border-primary)] hover:bg-[var(--surface)] lg:inline-flex"
              >
                Hubungi Kami
              </Link>

              {isLoggedIn && (
                <div className="relative" ref={bellWrapRef}>
                  <button
                    type="button"
                    onClick={() => setNotifOpen((v) => !v)}
                    aria-label="Notifikasi"
                    aria-haspopup="dialog"
                    aria-expanded={notifOpen}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border-edge)] bg-[var(--glass-bg-strong)] text-[var(--foreground-secondary)] shadow-[inset_0_1px_0_var(--glass-highlight)] transition-colors duration-200 hover:border-[var(--border-primary)] hover:text-[var(--primary)]"
                  >
                    <Bell size={18} />
                    {notifCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[10px] font-bold text-white ring-2 ring-[var(--surface)]">
                        {notifCount > 9 ? "9+" : notifCount}
                      </span>
                    )}
                  </button>

                  {notifOpen && (
                    <div
                      role="dialog"
                      aria-label="Notifikasi"
                      className="absolute right-0 top-[calc(100%+12px)] z-50 hidden w-[380px] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass-hover)] backdrop-blur-2xl backdrop-saturate-150 lg:flex lg:max-h-[480px]"
                    >
                      <NotificationPanel
                        items={latestNotifs}
                        total={notifCount}
                        loading={notifLoading}
                        onNavigate={closeNotif}
                      />
                    </div>
                  )}
                </div>
              )}

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Buka menu"
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border-edge)] bg-[var(--glass-bg-strong)] text-[var(--foreground)] shadow-[inset_0_1px_0_var(--glass-highlight)] transition-colors duration-200 hover:border-[var(--border-primary)] lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isLoggedIn && (
        <div
          className={`fixed inset-0 z-[1000] transition-[visibility] duration-300 lg:hidden ${
            notifOpen ? "visible" : "pointer-events-none invisible"
          }`}
        >
          <div
            aria-hidden="true"
            onClick={closeNotif}
            className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
              notifOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Notifikasi"
            className={`absolute inset-x-0 bottom-0 flex max-h-[80dvh] flex-col overflow-hidden rounded-t-[var(--radius-xl)] border border-b-0 border-[var(--glass-border)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-xl)] backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 ease-out motion-reduce:transition-none ${
              notifOpen ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex justify-center pb-1 pt-3">
              <span className="h-1.5 w-10 rounded-full bg-[var(--border)]" />
            </div>
            <NotificationPanel
              items={latestNotifs}
              total={notifCount}
              loading={notifLoading}
              onNavigate={closeNotif}
            />
          </div>
        </div>
      )}

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[1000] transition-[visibility] duration-300 lg:hidden ${
          open ? "visible" : "pointer-events-none invisible"
        }`}
      >
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col border-l border-[var(--glass-border)] bg-[var(--glass-bg-strong)] shadow-[var(--shadow-xl)] backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-soft)] px-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label="Namura Property - Beranda"
            >
              <Image
                src="/Logo/Namura_Property1.png"
                alt="Namura Property"
                width={160}
                height={42}
                className="h-8 w-auto"
              />
            </Link>

            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border-edge)] bg-[var(--glass-bg)] text-[var(--foreground)] transition-colors hover:border-[var(--border-primary)]"
            >
              <X size={20} />
            </button>
          </div>

          <nav
            aria-label="Navigasi utama"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[52px] items-center justify-between rounded-2xl px-4 text-base transition-colors duration-200 ${
                        active
                          ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                          : "font-medium text-[var(--foreground-secondary)] active:bg-[var(--primary)]/5"
                      }`}
                    >
                      {item.name}
                      <ChevronRight
                        size={18}
                        className={
                          active
                            ? "text-[var(--primary)]"
                            : "text-[var(--foreground-soft)]"
                        }
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className="shrink-0 border-t border-[var(--border-soft)] px-5 pt-4"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 20px)" }}
          >
            <Link
              href="/kontak"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}