
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { images, stays } from "@/lib/content";

type MenuKey = "stays" | "experiences" | "discover";

type MenuLink = {
  label: string;
  href: string;
  description?: string;
};

const menuContent: Record<
  MenuKey,
  {
    index: string;
    title: string;
    subtitle: string;
    image: string;
    links: MenuLink[];
    footer: MenuLink;
  }
> = {
  stays: {
    index: "01",
    title: "The Collection",
    subtitle: "Spaces created for moments of stillness.",
    image: stays[0].image,
    links: [
      {
        label: "The Garden Suite",
        href: "/stays/garden-suite",
        description: "A private sanctuary",
      },
      {
        label: "The Pool Residence",
        href: "/stays/pool-residence",
        description: "A space of your own",
      },
      {
        label: "The Atelier Villa",
        href: "/stays/atelier-villa",
        description: "Our signature hideaway",
      },
    ],
    footer: { label: "Explore all stays", href: "/stays" },
  },
  experiences: {
    index: "02",
    title: "The Experience",
    subtitle: "The art of being, in every little moment.",
    image: images.wellness,
    links: [
      {
        label: "The Ritual of Rest",
        href: "/experiences#wellness",
        description: "Wellness & restoration",
      },
      {
        label: "The Shared Table",
        href: "/experiences#dining",
        description: "Dining & connection",
      },
      {
        label: "Beyond the Walls",
        href: "/experiences#discovery",
        description: "Culture & exploration",
      },
    ],
    footer: {
      label: "All experiences",
      href: "/experiences",
    },
  },
  discover: {
    index: "03",
    title: "Discover Atelier",
    subtitle: "A different perspective on slower living.",
    image: images.architecture,
    links: [
      {
        label: "Our Story",
        href: "/story",
        description: "The philosophy",
      },
      {
        label: "The Gallery",
        href: "/gallery",
        description: "A visual journal",
      },
      {
        label: "Plan Your Stay",
        href: "/contact",
        description: "A booking experience",
      },
    ],
    footer: {
      label: "Begin your journey",
      href: "/contact",
    },
  },
};

const menuItems: { key: MenuKey; label: string }[] = [
  { key: "stays", label: "Our Stays" },
  { key: "experiences", label: "Experiences" },
  { key: "discover", label: "Discover" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 45);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMenus() {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  const solid = scrolled || activeMenu !== null || mobileOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-80 transition-all duration-500 ${
          solid
            ? "border-b border-charcoal/10 bg-ivory text-charcoal"
            : "border-b border-white/25 bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-19 max-w-[1800px] items-center justify-between px-6 sm:px-10 lg:h-22 lg:px-16">
          <Link
            href="/"
            onClick={closeMenus}
            className="relative z-90 shrink-0 text-[19px] font-semibold tracking-[-0.08em] sm:text-[22px]"
          >
            ATELIER{" "}
            <span className="font-normal tracking-[0.055em]">
              STAY
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="hidden h-full items-center gap-9 xl:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              onClick={closeMenus}
              className="text-[11px] transition-opacity hover:opacity-50"
            >
              Home
            </Link>

            {menuItems.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-expanded={activeMenu === item.key}
                aria-controls="atelier-mega-menu"
                onClick={() =>
                  setActiveMenu(
                    activeMenu === item.key ? null : item.key
                  )
                }
                onMouseEnter={() => setActiveMenu(item.key)}
                className={`flex h-full items-center gap-2 text-[11px] transition-opacity hover:opacity-50 ${
                  activeMenu === item.key ? "opacity-60" : ""
                }`}
              >
                {item.label}
                <ChevronDown
                  size={13}
                  strokeWidth={1.4}
                  className={`transition-transform duration-300 ${
                    activeMenu === item.key ? "rotate-180" : ""
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/contact"
              onClick={closeMenus}
              className={`group flex items-center gap-7 border px-5 py-3.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                solid
                  ? "border-charcoal/40 hover:bg-charcoal hover:text-white"
                  : "border-white/60 hover:bg-white hover:text-charcoal"
              }`}
            >
              Plan your stay
              <ArrowUpRight
                size={17}
                strokeWidth={1.2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setActiveMenu(null);
            }}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            className="relative z-90 flex items-center gap-3 xl:hidden"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.15em]">
              {mobileOpen ? "Close" : "Menu"}
            </span>
            {mobileOpen ? (
              <X size={23} strokeWidth={1.3} />
            ) : (
              <Menu size={23} strokeWidth={1.3} />
            )}
          </button>
        </div>
      </header>

      {/* DESKTOP MEGA MENU */}
      <AnimatePresence mode="wait">
        {activeMenu && !mobileOpen && (
          <motion.div
            key={activeMenu}
            id="atelier-mega-menu"
            initial={reduced ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            onMouseLeave={() => setActiveMenu(null)}
            className="fixed inset-x-0 top-22 z-79 hidden overflow-hidden border-b border-charcoal/10 bg-ivory text-charcoal shadow-[0_25px_70px_rgba(0,0,0,0.1)] xl:block"
          >
            <div className="mx-auto grid max-w-[1800px] grid-cols-[1.1fr_1.6fr_0.95fr] gap-12 px-16 py-12">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="mb-9 text-[10px] uppercase tracking-[0.2em] text-muted">
                    {menuContent[activeMenu].index} / ATELIER STAY
                  </p>

                  <h2 className="font-serif text-[clamp(3rem,4.4vw,5.5rem)] leading-[0.86] tracking-[-0.055em]">
                    {menuContent[activeMenu].title}
                  </h2>

                  <p className="mt-8 max-w-60 text-sm leading-7 text-muted">
                    {menuContent[activeMenu].subtitle}
                  </p>
                </div>

                <span className="mt-12 text-[10px] uppercase tracking-[0.18em] text-muted">
                  A different way to stay
                </span>
              </div>

              <div className="flex flex-col">
                <p className="mb-6 text-[10px] uppercase tracking-[0.18em] text-muted">
                  Explore
                </p>

                {menuContent[activeMenu].links.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className="group flex items-center justify-between gap-5 border-b border-charcoal/15 py-5"
                  >
                    <div className="flex items-start gap-5">
                      <span className="mt-1.5 text-[9px] text-muted">
                        0{index + 1}
                      </span>

                      <div>
                        <span className="block font-serif text-[clamp(1.8rem,2.5vw,3rem)] leading-none tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2">
                          {link.label}
                        </span>
                        <span className="mt-2 block text-[11px] text-muted">
                          {link.description}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.1}
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                ))}

                <Link
                  href={menuContent[activeMenu].footer.href}
                  onClick={closeMenus}
                  className="group mt-9 flex w-fit items-center gap-10 border-b border-charcoal pb-3 text-[10px] font-medium uppercase tracking-[0.16em]"
                >
                  {menuContent[activeMenu].footer.label}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="relative h-87.5 overflow-hidden bg-sand">
                <motion.img
                  key={menuContent[activeMenu].image}
                  src={menuContent[activeMenu].image}
                  alt={`${menuContent[activeMenu].title} concept photography`}
                  initial={reduced ? false : { scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: reduced ? 0 : 0.75 }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-transparent p-6">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white">
                    Moments in stillness — Atelier Stay
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP OUTSIDE BACKDROP */}
      {activeMenu && !mobileOpen && (
        <button
          type="button"
          aria-label="Close dropdown menu"
          onClick={() => setActiveMenu(null)}
          className="fixed inset-0 z-70 hidden cursor-default bg-black/25 xl:block"
        />
      )}

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -25 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="fixed inset-0 z-75 flex flex-col overflow-y-auto bg-ivory px-6 pb-10 pt-28 text-charcoal sm:px-10 xl:hidden"
          >
            <div className="mx-auto flex w-full max-w-212.5 flex-1 flex-col">
              <p className="mb-10 text-[10px] uppercase tracking-[0.2em] text-muted">
                Explore Atelier Stay
              </p>

              <Link
                href="/"
                onClick={closeMenus}
                className="flex items-center justify-between border-b border-charcoal/15 py-5"
              >
                <span className="font-serif text-5xl sm:text-7xl">
                  Home
                </span>
                <ArrowUpRight size={22} strokeWidth={1.2} />
              </Link>

              {menuItems.map((item) => {
                const expanded = mobileSection === item.key;
                const content = menuContent[item.key];

                return (
                  <div
                    key={item.key}
                    className="border-b border-charcoal/15"
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileSection(expanded ? null : item.key)
                      }
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="font-serif text-5xl sm:text-7xl">
                        {item.label}
                      </span>
                      <ChevronDown
                        size={23}
                        strokeWidth={1.2}
                        className={`shrink-0 transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? {} : { height: 0, opacity: 0 }}
                          transition={{ duration: reduced ? 0 : 0.32 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-2 sm:pl-5">
                            <p className="mb-6 max-w-xs text-sm leading-7 text-muted">
                              {content.subtitle}
                            </p>

                            {content.links.map((link, index) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenus}
                                className="flex items-center gap-4 py-3"
                              >
                                <span className="text-[9px] text-muted">
                                  0{index + 1}
                                </span>
                                <span className="font-serif text-[28px]">
                                  {link.label}
                                </span>
                                <ArrowUpRight
                                  size={16}
                                  strokeWidth={1.2}
                                  className="ml-auto"
                                />
                              </Link>
                            ))}

                            <Link
                              href={content.footer.href}
                              onClick={closeMenus}
                              className="mt-6 inline-flex items-center gap-8 border-b border-charcoal pb-2 text-[10px] uppercase tracking-[0.15em]"
                            >
                              {content.footer.label}
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/contact"
                onClick={closeMenus}
                className="mt-10 flex items-center justify-between bg-charcoal px-6 py-6 text-[11px] uppercase tracking-[0.16em] text-white"
              >
                Plan your stay
                <MoveUpRightIcon />
              </Link>

              <p className="mt-auto pt-12 text-[9px] uppercase leading-6 tracking-widest text-muted">
                Independent hospitality concept
                <br />
                Design & Development by Mode by Gina
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MoveUpRightIcon() {
  return <ArrowUpRight size={21} strokeWidth={1.2} />;
}
