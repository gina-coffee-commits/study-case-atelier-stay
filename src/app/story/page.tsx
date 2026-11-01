
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import { images } from "@/lib/content";

const principles = [
  {
    number: "01",
    title: "Less, but meaningful.",
    text: "An approach defined by clarity, restraint, and intention.",
  },
  {
    number: "02",
    title: "Nature as a guide.",
    text: "Warm materials, natural light, and a deeper connection to place.",
  },
  {
    number: "03",
    title: "Designed to feel.",
    text: "Spaces and experiences that inspire a slower, more present way of living.",
  },
];

export default function StoryPage() {
  const reduced = useReducedMotion();

  return (
    <main className="overflow-clip bg-ivory text-charcoal">
      <section className="relative flex min-h-170 h-[90svh] items-end overflow-hidden bg-charcoal text-white">
        <motion.img
          src={images.architecture}
          alt="Atelier Stay architectural philosophy"
          initial={reduced ? false : { opacity: 0.5, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/25" />

        <div className="relative z-10 w-full px-6 pb-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-8 text-[10px] uppercase tracking-[0.2em]">
              03 / Our Story
            </p>
            <h1 className="font-display text-[clamp(4rem,9vw,11rem)] font-medium leading-[0.96] tracking-[-0.075em]">
              A different
              <br />
              <span className="font-light">perspective.</span>
            </h1>
            <p className="mt-12 max-w-sm text-sm leading-8 text-white/80">
              Imagining hospitality through a more intentional
              lens of architecture, nature and design.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-12 md:py-44 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex justify-between border-b border-charcoal/20 pb-5 text-[10px] uppercase tracking-[0.17em] text-muted">
            <span>01 / The Philosophy</span>
            <span>Art of Slowing Down</span>
          </div>

          <div className="grid gap-12 pt-24 lg:grid-cols-[25%_1fr]">
            <Reveal>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.17em]">
                <Plus size={18} strokeWidth={1.2} />
                Our Point of View
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="font-display text-[clamp(3.5rem,7.5vw,9rem)] font-medium leading-[1.02] tracking-[-0.07em]">
                  The art of
                  <br />
                  <span className="font-light text-olive">
                    living slowly.
                  </span>
                </h2>
              </Reveal>

              <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-20">
                <Reveal>
                  <p className="text-base leading-9 text-muted">
                    Atelier Stay is a fictional hospitality
                    concept created to explore a simple idea:
                    the spaces we inhabit can change how we
                    experience time.
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <p className="text-base leading-9 text-muted">
                    Through architecture, natural textures,
                    generous whitespace and intentional
                    interaction, the digital experience
                    becomes an extension of that philosophy.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[65svh] min-h-120 overflow-hidden bg-sand">
        <img
          src={images.nature}
          alt="Bali nature and landscape"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-6 bottom-8 flex justify-between gap-6 text-[10px] uppercase tracking-[0.18em] text-white md:inset-x-12">
          <span>Inspired by the landscape</span>
          <span className="hidden sm:block">Bali, Indonesia</span>
        </div>
      </section>

      <section className="px-6 py-28 md:px-12 md:py-44 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex justify-between border-b border-charcoal/20 pb-5 text-[10px] uppercase tracking-[0.17em] text-muted">
            <span>02 / The Principles</span>
            <span>Three Design Foundations</span>
          </div>

          <div className="mt-14">
            {principles.map((item) => (
              <Reveal key={item.number}>
                <div className="grid gap-6 border-b border-charcoal/20 py-10 lg:grid-cols-[12%_1fr_30%] lg:items-center lg:gap-12 lg:py-14">
                  <span className="text-xs text-muted">
                    {item.number}
                  </span>
                  <h3 className="font-display text-[clamp(2.2rem,4.2vw,5rem)] font-medium leading-tight tracking-[-0.06em]">
                    {item.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-8 text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-6 py-32 text-center text-white md:px-12 md:py-48">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
            The Atelier Manifesto
          </p>
          <h2 className="mx-auto mt-14 max-w-325 font-display text-[clamp(3.5rem,9vw,11rem)] font-medium leading-[0.98] tracking-[-0.075em]">
            Less noise.
            <br />
            <span className="font-light text-sand">
              More meaning.
            </span>
          </h2>
          <Link
            href="/gallery"
            className="mt-16 inline-flex items-center gap-5 border-b border-white/50 pb-4 text-[10px] uppercase tracking-[0.16em]"
          >
            Explore the visual journal
            <ArrowUpRight size={19} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
