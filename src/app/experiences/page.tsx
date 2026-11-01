
"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import { experiences, images } from "@/lib/content";

const sectionIds = ["wellness", "dining", "discovery"];

export default function ExperiencesPage() {
  const reduced = useReducedMotion();

  return (
    <main className="overflow-clip bg-ivory text-charcoal">
      {/* HERO */}
      <section className="relative flex min-h-172.5 h-[90svh] items-end overflow-hidden bg-charcoal text-white">
        <motion.img
          src={images.wellness}
          alt="Wellness and slow living atmosphere"
          initial={reduced ? false : { scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-black/25" />

        <div className="relative z-10 w-full px-6 pb-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-8 text-[10px] uppercase tracking-[0.2em]">
              02 / The Experiences
            </p>
            <h1 className="font-display text-[clamp(4rem,9vw,11rem)] font-medium leading-[0.96] tracking-[-0.075em]">
              Beyond
              <br />
              <span className="font-light">the everyday.</span>
            </h1>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
              <p className="max-w-sm text-sm leading-8 text-white/80">
                A collection of imagined rituals, shared
                moments, and experiences that invite you
                to slow down.
              </p>
              <a
                href="#wellness"
                className="flex items-center gap-4 text-[10px] uppercase tracking-[0.15em]"
              >
                Explore experiences <ArrowDown size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-28 md:px-12 md:py-40 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex justify-between border-b border-charcoal/20 pb-5 text-[10px] uppercase tracking-[0.17em] text-muted">
            <span>The Atelier Experience</span>
            <span>01 — 03</span>
          </div>
          <div className="grid gap-12 pt-20 lg:grid-cols-[25%_1fr]">
            <Reveal>
              <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em]">
                <Plus size={18} strokeWidth={1.2} />
                A Different Rhythm
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[clamp(3.5rem,7vw,8rem)] font-medium leading-[1.02] tracking-[-0.07em]">
                Made for moments
                <br />
                <span className="font-light text-olive">
                  that matter.
                </span>
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE JOURNEY */}
      <section className="pb-24 md:pb-40">
        {experiences.map((item, index) => (
          <article
            id={sectionIds[index]}
            key={item.number}
            className="scroll-mt-28 px-6 py-12 md:px-12 md:py-20 lg:px-20"
          >
            <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <Reveal
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="group relative h-120 overflow-hidden bg-sand md:h-177.5">
                  <img
                    src={item.image}
                    alt={`${item.category} concept photography`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1200 group-hover:scale-105"
                  />
                  <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.18em] text-white">
                    {item.number} / {item.category}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="max-w-xl">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
                    Experience {item.number}
                  </span>

                  <h3 className="mt-10 font-display text-[clamp(3rem,6vw,7rem)] font-medium leading-[1.02] tracking-[-0.065em]">
                    {item.title}
                  </h3>

                  <div className="mt-12 h-px w-16 bg-olive/50" />

                  <p className="mt-10 max-w-md text-base leading-9 text-muted">
                    {item.description}
                  </p>

                  <Link
                    href="/contact"
                    className="group mt-14 inline-flex items-center gap-12 border-b border-charcoal pb-4 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Plan your experience
                    <ArrowUpRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      {/* ENDING */}
      <section className="bg-olive px-6 py-28 text-ivory md:px-12 md:py-44">
        <Reveal className="mx-auto max-w-375 text-center">
          <p className="mb-12 text-[10px] uppercase tracking-[0.2em]">
            Your Rhythm, Your Journey
          </p>
          <h2 className="font-display text-[clamp(3.5rem,8vw,9rem)] font-medium leading-[1.02] tracking-[-0.07em]">
            Find your own
            <br />
            <span className="font-light">kind of stillness.</span>
          </h2>
          <Link
            href="/contact"
            className="mt-14 inline-flex items-center gap-5 border-b border-white/60 pb-4 text-[10px] uppercase tracking-[0.16em]"
          >
            Begin your journey <ArrowUpRight size={20} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
