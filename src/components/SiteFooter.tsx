
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Our Stays", href: "/stays" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our Story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Plan Your Stay", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-charcoal text-ivory">
      <div className="mx-auto max-w-[1800px] px-6 pb-6 pt-14 md:px-12 md:pt-16 lg:px-20">

        {/* TOP */}
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
              An invitation to slow down
            </p>

            <h2 className="max-w-132.5 font-display text-[clamp(2.7rem,4.5vw,5rem)] font-medium leading-[1.03] tracking-[-0.065em]">
              Stay a little
              <br />
              <span className="font-light text-sand">
                longer.
              </span>
            </h2>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-8 border-b border-white/40 pb-3 text-[10px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
            >
              Plan your stay
              <ArrowUpRight
                size={18}
                strokeWidth={1.2}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          {/* NAVIGATION */}
          <div className="grid grid-cols-2 gap-8 md:pt-2">
            <div>
              <p className="mb-6 text-[10px] uppercase tracking-[0.17em] text-white/40">
                Explore
              </p>

              <nav
                aria-label="Footer navigation"
                className="flex flex-col gap-3"
              >
                {navigation.slice(0, 3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-fit text-[13px] text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-6 text-[10px] uppercase tracking-[0.17em] text-white/40">
                Discover
              </p>

              <nav
                aria-label="Footer discovery navigation"
                className="flex flex-col gap-3"
              >
                {navigation.slice(3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-fit text-[13px] text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* BRAND WORDMARK */}
        <div className="flex flex-col gap-5 border-b border-white/15 py-7 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="text-[clamp(1.6rem,3vw,3rem)] font-semibold leading-none tracking-[-0.085em]"
          >
            ATELIER
            <span className="ml-2 font-light tracking-[-0.045em]">
              STAY
            </span>
          </Link>

          <p className="max-w-70 text-[11px] leading-6 text-white/45 md:text-right">
            Considered spaces. Slower moments.
            <br />
            A different way to stay.
          </p>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col justify-between gap-3 pt-6 text-[9px] uppercase leading-5 tracking-[0.12em] text-white/40 md:flex-row md:items-center">
          <span>
            © 2026 Atelier Stay — Independent Concept
          </span>

          <span>
            Fictional property · No real bookings
          </span>

          <a
            href="https://www.modebygina.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
          >
            Design & Development by Mode by Gina
            <ArrowUpRight size={13} strokeWidth={1.2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
