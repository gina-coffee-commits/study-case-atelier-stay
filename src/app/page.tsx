
"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { images, stays, experiences } from "@/lib/content";
import BookingForm from "@/components/BookingForm";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.85,
        delay: reduced ? 0 : delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

function Label({
  number,
  title,
  light = false,
}: {
  number: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-4 border-b pb-4 text-[10px] font-medium uppercase tracking-[0.15em] ${
        light
          ? "border-white/25 text-white/65"
          : "border-charcoal/20 text-muted"
      }`}
    >
      <span>{number} / {title}</span>
      <span>ATELIER STAY</span>
    </div>
  );
}

function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex w-fit items-center gap-8 border-b pb-3 text-[10px] font-medium uppercase tracking-[0.14em] ${
        light ? "border-white/50" : "border-charcoal/50"
      }`}
    >
      {children}
      <ArrowUpRight
        size={17}
        strokeWidth={1.4}
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  );
}

const section =
  "relative flex min-h-[100svh] flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-16";

const container = "mx-auto w-full max-w-[1360px]";

const heading =
  "font-display text-[clamp(2.8rem,5.4vw,5.75rem)] font-medium leading-[1.07] tracking-[-0.065em]";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 1.08]
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-160 h-svh items-end overflow-hidden bg-charcoal text-white"
    >
      <motion.img
        src={images.hero}
        alt="ATELIER STAY architectural concept"
        style={{ scale }}
        initial={reduced ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.7, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-black/30" />

      <div className={`${container} relative z-10 px-6 pb-24 sm:px-10 lg:px-16 lg:pb-24`}>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-[10px] uppercase tracking-[0.2em]"
        >
          A considered hospitality concept / Bali
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          className="max-w-225t-display text-[clamp(4rem,8.4vw,8.75rem)] font-medium leading-[0.97] tracking-[-0.075em]"
        >
          A slower way
          <br />
          <span className="font-light">to be.</span>
        </motion.h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-sm text-[14px] leading-7 text-white/85">
            Thoughtful spaces, contemporary architecture,
            and the beauty of living at your own pace.
          </p>

          <TextLink href="/stays" light>
            Discover our stays
          </TextLink>
        </div>
      </div>

      <a
        href="#philosophy"
        className="absolute bottom-7 right-6 z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] sm:right-10 lg:right-16"
      >
        Scroll to explore <ArrowDown size={15} />
      </a>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className={`${section} bg-ivory`}>
      <div className={container}>
        <Label number="01" title="The Philosophy" />

        <div className="grid items-center gap-12 py-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
          <Reveal>
            <p className="self-start text-[10px] uppercase tracking-[0.18em] text-muted">
              The art of slowing down
            </p>
          </Reveal>

          <div>
            <Reveal>
              <h2 className={heading}>
                Not just a place
                <br />
                to stay.
                <br />
                <span className="font-light text-olive">
                  A way to feel.
                </span>
              </h2>
            </Reveal>

            <Reveal
              delay={0.15}
              className="mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-md text-sm leading-7 text-muted">
                Atelier Stay imagines hospitality through a
                quieter lens. Natural materials, considered
                architecture, and thoughtful digital experiences.
              </p>

              <TextLink href="/story">
                Our philosophy
              </TextLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.09, 1]
  );

  return (
    <section
      ref={ref}
      className="relative h-svh min-h-137.5 overflow-hidden bg-sand"
    >
      <motion.img
        src={images.architecture}
        alt="Architectural atmosphere"
        style={{ scale }}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute bottom-10 left-6 right-6 flex items-end justify-between gap-5 text-white sm:left-10 sm:right-10 lg:left-16 lg:right-16">
        <Reveal>
          <h2 className="max-w-lg font-display text-[clamp(2.4rem,4vw,4.5rem)] font-light leading-[1.08] tracking-tighter">
            Designed to feel
            <br />
            different.
          </h2>
        </Reveal>

        <span className="hidden text-[10px] uppercase tracking-[0.16em] md:block">
          Architecture / Atmosphere
        </span>
      </div>
    </section>
  );
}


function Collection() {
  return (
    <section className={`${section} bg-ivory`}>
      <div className={container}>
        <Label number="02" title="The Collection" />

        <div className="my-9 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <Reveal>
            <h2 className={heading}>
              Spaces for
              <br />
              <span className="font-light text-olive">
                slower living.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-72.5 text-sm leading-7 text-muted">
              Three imagined residences, each expressing
              a different approach to effortless comfort.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {stays.slice(0, 2).map((stay, index) => (
            <Reveal key={stay.slug} delay={index * 0.1}>
              <Link
                href={`/stays/${stay.slug}`}
                className="group block"
              >
                <div className="relative h-65flow-hidden bg-sand sm:h-82.5.5-[clamp(260px,35vh,420px)]">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  <span className="absolute bottom-4 right-4 flex size-11 items-center justify-center bg-ivory text-charcoal transition-colors group-hover:bg-charcoal group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-charcoal/20 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted">
                      Residence {stay.number}
                    </p>
                    <h3 className="mt-2 font-display text-[clamp(1.4rem,2vw,2rem)] font-medium tracking-tighter">
                      {stay.name}
                    </h3>
                  </div>
                  <span className="text-xs text-muted">
                    {stay.size}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex justify-end">
          <TextLink href="/stays">
            All residences
          </TextLink>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className={`${section} bg-charcoal text-ivory`}>
      <div className={container}>
        <Label number="03" title="The Experience" light />

        <div className="grid items-center gap-10 py-9 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-sand">
                Beyond the spaces
              </p>

              <h2 className={heading}>
                Made for
                <br />
                moments
                <br />
                <span className="font-light text-sand">
                  that matter.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                Wellness, dining, and discovery.
                Meaningful experiences at a slower pace.
              </p>

              <div className="mt-8">
                <TextLink href="/experiences" light>
                  Explore experiences
                </TextLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-80 overflow-hidden bg-olive sm:h-110 lg:h-[clamp(340px,58vh,570px)]">
              <img
                src={images.wellness}
                alt="Wellness concept"
                loading="lazy"
                className="h-full w-full object-cover"
              />

              <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-widest text-white">
                Rest / Ritual / Renewal
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 border-t border-white/20 pt-5 sm:grid-cols-3">
          {experiences.map((item) => (
            <Link
              key={item.number}
              href={`/experiences#${item.category.toLowerCase()}`}
              className="group flex items-center justify-between gap-4 py-2"
            >
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/45">
                  {item.number} / {item.category}
                </p>
                <p className="mt-1 text-sm font-medium">
                  {item.title}
                </p>
              </div>
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className={`${section} bg-ivory text-center`}>
      <div className={`${container} flex flex-col items-center`}>
        <Reveal>
          <p className="mb-8 text-[10px] uppercase tracking-[0.18em] text-muted">
            The Atelier Perspective
          </p>

          <h2 className="font-display text-[clamp(3.8rem,8vw,8rem)] font-medium leading-[1.03] tracking-[-0.075em]">
            The luxury
            <br />
            of <span className="font-light text-olive">less.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-sm text-sm leading-7 text-muted">
            A quiet invitation to find beauty
            in the spaces between moments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section className={`${section} bg-[#E5E2DA]`}>
      <div className={container}>
        <Label number="04" title="Your Invitation" />

        <div className="grid items-center gap-10 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className={heading}>
                Make room
                <br />
                for
                <br />
                <span className="font-light text-olive">
                  moments.
                </span>
              </h2>

              <p className="mt-7 max-w-sm text-sm leading-7 text-muted">
                Select a residence and explore a
                thoughtfully designed booking experience.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-widest"
              >
                Plan your stay <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative flex min-h-150 h-svh items-center justify-center overflow-hidden bg-charcoal px-6 text-center text-white">
      <img
        src={images.nature}
        alt="Landscape concept"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <Reveal className="relative z-10">
        <p className="mb-8 text-[10px] uppercase tracking-[0.18em]">
          Your next chapter
        </p>

        <h2 className="font-display text-[clamp(3.8rem,7.5vw,7.5rem)] font-medium leading-[1.03] tracking-[-0.07em]">
          Stay somewhere
          <br />
          <span className="font-light">different.</span>
        </h2>

        <div className="mt-10 flex justify-center">
          <TextLink href="/contact" light>
            Begin your journey
          </TextLink>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <main className="overflow-x-clip bg-ivory text-charcoal">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
        className="fixed inset-x-0 top-0 z-100-[2px] origin-left bg-olive"
      />

      <Hero />
      <Philosophy />
      <Architecture />
      <Collection />
      <Experience />
      <Manifesto />
      <Booking />
      <Closing />

      <div className="bg-ivory px-6 py-4 text-center text-[9px] uppercase tracking-widest text-muted">
        Independent Concept — Design & Development by Mode by Gina
      </div>
    </main>
  );
}
