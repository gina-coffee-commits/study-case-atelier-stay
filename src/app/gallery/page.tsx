
"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Reveal from "@/components/Reveal";
import { galleryImages, images } from "@/lib/content";

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (active === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      } else if (event.key === "ArrowRight") {
        setActive((current) =>
          current === null ? null : (current + 1) % galleryImages.length
        );
      } else if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null
            ? null
            : (current - 1 + galleryImages.length) %
              galleryImages.length
        );
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  const previous = () =>
    setActive((current) =>
      current === null
        ? null
        : (current - 1 + galleryImages.length) %
          galleryImages.length
    );

  const next = () =>
    setActive((current) =>
      current === null ? null : (current + 1) % galleryImages.length
    );

  return (
    <main className="overflow-clip bg-ivory text-charcoal">
      {/* HERO */}
      <section className="relative flex min-h-162.5 h-[80svh] items-end overflow-hidden bg-charcoal text-white">
        <img
          src={images.pool}
          alt="Atelier Stay visual journal"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-black/25" />

        <div className="relative z-10 w-full px-6 pb-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-8 text-[10px] uppercase tracking-[0.2em]">
              04 / The Visual Journal
            </p>
            <h1 className="font-display text-[clamp(4rem,9vw,11rem)] font-medium leading-[0.96] tracking-[-0.075em]">
              A visual
              <br />
              <span className="font-light">perspective.</span>
            </h1>
            <p className="mt-12 max-w-sm text-sm leading-8 text-white/80">
              A visual collection of light, form, texture
              and moments of stillness.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-3 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-[1700px]">
          <div className="mb-16 flex items-end justify-between gap-5 px-3">
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
              Atelier Journal / Collection 001
            </span>
            <span className="text-sm font-medium">
              {String(galleryImages.length).padStart(2, "0")} Images
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            {galleryImages.map((src, index) => {
              const type = index % 5;

              const dimensions =
                type === 0
                  ? "col-span-2 h-[420px] md:col-span-8 md:h-[680px]"
                  : type === 1
                  ? "col-span-2 h-[420px] md:col-span-4 md:h-[680px]"
                  : "col-span-1 h-[280px] md:col-span-4 md:h-[480px]";

              return (
                <Reveal
                  key={`${index}-${src}`}
                  className={dimensions}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Open image ${index + 1}`}
                    className="group relative block h-full w-full overflow-hidden bg-sand text-left"
                  >
                    <img
                      src={src}
                      alt={`Atelier Stay visual journal image ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1200 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                    <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white">
                      <span>
                        Frame {String(index + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="fixed inset-0 z-120 flex flex-col bg-charcoal text-white"
          >
            <div className="flex items-center justify-between px-6 py-6 md:px-12">
              <span className="text-[10px] uppercase tracking-[0.18em]">
                Atelier / Visual Journal
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => setActive(null)}
                aria-label="Close gallery"
                className="flex items-center gap-3 text-[10px] uppercase tracking-widest"
              >
                Close <X size={22} strokeWidth={1.2} />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-6 md:px-24">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={galleryImages[active]}
                  alt={`Expanded Atelier Stay image ${active + 1}`}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? {} : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-white/20 px-6 py-6 md:px-12">
              <span className="text-[10px] uppercase tracking-widest">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous image"
                  className="flex size-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-charcoal"
                >
                  <ArrowLeft size={20} strokeWidth={1.2} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="flex size-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-charcoal"
                >
                  <ArrowRight size={20} strokeWidth={1.2} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
