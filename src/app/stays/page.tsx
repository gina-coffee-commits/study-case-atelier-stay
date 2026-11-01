
"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import { stays, images } from "@/lib/content";

export default function StaysPage() {
  const reduced = useReducedMotion();

  return (
    <main className="overflow-clip bg-ivory text-charcoal">
      <section className="relative flex min-h-17090svh] items-end overflow-hidden bg-charcoal text-white">
        <motion.img
          src={images.pool}
          alt="Modern pool architecture for Atelier Stay"
          initial={reduced ? false : { scale: 1.12, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/25" />

        <div className="relative z-10 w-full px-6 pb-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-8 text-[10px] uppercase tracking-[0.2em]">
              01 / The Collection
            </p>
            <h1 className="font-display text-[clamp(4rem,9vw,11rem)] font-medium leading-[0.96] tracking-[-0.075em]">
              Space to
              <br />
              <span className="font-light">feel at home.</span>
            </h1>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
              <p className="max-w-sm text-sm leading-8 text-white/80">
                Three imagined residences. Three different
                expressions of intentional, unhurried living.
              </p>
              <a
                href="#collection"
                className="flex items-center gap-4 text-[10px] uppercase tracking-[0.17em]"
              >
                Explore collection <ArrowDown size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="collection"
        className="scroll-mt-24 px-6 py-24 md:px-12 md:py-40 lg:px-20"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="flex justify-between border-b border-charcoal/20 pb-5 text-[10px] uppercase tracking-[0.17em] text-muted">
            <span>01 / Our Spaces</span>
            <span>03 Residences</span>
          </div>

          <div className="grid gap-12 py-20 lg:grid-cols-[30%_1fr]">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.18em]">
                Designed for a different rhythm
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[clamp(3.3rem,7vw,8rem)] font-medium leading-[1.03] tracking-[-0.07em]">
                A room is more than
                <br />
                <span className="font-light text-olive">
                  a place to sleep.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid items-start gap-x-9 gap-y-20 md:grid-cols-2">
            {stays.map((stay, index) => (
              <Reveal
                key={stay.slug}
                delay={index % 2 === 1 ? 0.12 : 0}
                className={index % 2 === 1 ? "md:pt-32" : ""}
              >
                <Link
                  href={`/stays/${stay.slug}`}
                  className="group block"
                >
                  <div className="relative h-107.5verflow-hidden bg-sand sm:h-140 lg:h-165">
                    <img
                      src={stay.image}
                      alt={`${stay.name} concept photography`}
                      className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    <div className="absolute left-6 top-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-white">
                      <span className="size-1.5 rounded-full bg-white" />
                      Residence {stay.number}
                    </div>
                    <span className="absolute bottom-5 right-5 flex size-14 items-center justify-center bg-ivory text-charcoal transition-all duration-500 group-hover:rotate-45 group-hover:bg-charcoal group-hover:text-white">
                      <ArrowUpRight size={22} strokeWidth={1.2} />
                    </span>
                  </div>

                  <div className="flex justify-between gap-5 border-b border-charcoal/20 py-7">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
                        {stay.category}
                      </span>
                      <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,4rem)] font-medium leading-none tracking-[-0.06em]">
                        {stay.name}
                      </h3>
                      <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
                        {stay.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted">
                      {stay.size}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-olive px-6 py-28 text-ivory md:px-12 md:py-40 lg:px-20">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <Reveal>
            <h2 className="font-display text-[clamp(3.8rem,8vw,9rem)] font-medium leading-[0.98] tracking-[-0.07em]">
              Your space.
              <br />
              <span className="font-light">Your pace.</span>
            </h2>
          </Reveal>
          <Link
            href="/contact"
            className="group flex items-center gap-5 text-[10px] uppercase tracking-widest"
          >
            Plan your stay
            <span className="flex size-14 items-center justify-center rounded-full border border-white/50 transition-all group-hover:rotate-45 group-hover:bg-white group-hover:text-charcoal">
              <ArrowUpRight size={21} />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
