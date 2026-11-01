
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { stays, images } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stays.map((stay) => ({ slug: stay.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const stay = stays.find((item) => item.slug === slug);

  return {
    title: stay
      ? `${stay.name} | Atelier Stay`
      : "Residence Not Found",
    description: stay?.description,
  };
}

export default async function StayDetailPage({ params }: Props) {
  const { slug } = await params;
  const stay = stays.find((item) => item.slug === slug);

  if (!stay) notFound();

  const related = stays.filter((item) => item.slug !== slug);

  return (
    <main className="overflow-clip bg-ivory text-charcoal">
      {/* HERO */}
      <section className="relative flex min-h-162.5 h-[90svh] items-end overflow-hidden bg-charcoal text-white">
        <img
          src={stay.image}
          alt={`${stay.name} concept photography`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/30" />

        <div className="relative z-10 w-full px-6 pb-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-9 text-[10px] uppercase tracking-[0.2em]">
              Residence {stay.number} / The Collection
            </p>
            <h1 className="max-w-300 font-display text-[clamp(3.5rem,8.5vw,10rem)] font-medium leading-[0.95] tracking-[-0.075em]">
              {stay.name}
            </h1>
            <div className="mt-12 flex flex-wrap items-center gap-10 border-t border-white/40 pt-6 text-[10px] uppercase tracking-[0.16em]">
              <span>{stay.guests}</span>
              <span>{stay.size}</span>
              <span>{stay.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 md:px-12 md:py-40 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <Link
            href="/stays"
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] hover:text-olive"
          >
            <ArrowLeft size={17} strokeWidth={1.2} />
            All residences
          </Link>

          <div className="grid gap-16 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <Reveal>
              <div>
                <p className="mb-8 text-[10px] uppercase tracking-[0.18em] text-muted">
                  A Different Way to Stay
                </p>
                <h2 className="font-display text-[clamp(3.5rem,6vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.07em]">
                  Your own
                  <br />
                  <span className="font-light text-olive">
                    private world.
                  </span>
                </h2>
                <p className="mt-12 max-w-lg text-base leading-9 text-muted">
                  {stay.description}
                  {" "}An imagined residence shaped by considered
                  materials, generous light, and moments of calm.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border-t border-charcoal/20">
                <div className="grid grid-cols-2 gap-8 border-b border-charcoal/20 py-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted">
                      Capacity
                    </p>
                    <p className="mt-4 text-2xl font-light">
                      {stay.guests}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted">
                      Residence size
                    </p>
                    <p className="mt-4 text-2xl font-light">
                      {stay.size}
                    </p>
                  </div>
                </div>

                <h3 className="mt-12 text-[10px] uppercase tracking-[0.18em]">
                  Residence features
                </h3>

                <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6">
                  {stay.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <Check
                        size={17}
                        strokeWidth={1.2}
                        className="shrink-0 text-olive"
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="group mt-14 flex items-center justify-between bg-charcoal px-7 py-6 text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-olive"
                >
                  Explore your stay
                  <ArrowUpRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VISUAL JOURNAL */}
      <section className="px-3 pb-24 md:px-6 md:pb-40">
        <div className="grid gap-3 md:grid-cols-2 md:gap-5">
          <div className="h-110 overflow-hidden bg-sand md:h-180">
            <img
              src={images.architecture}
              alt="Concept architecture and interior"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
          <div className="h-110rflow-hidden bg-sand md:mt-28 md:h-180">
            <img
              src={images.pool}
              alt="Pool and architectural atmosphere"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>
        <p className="mt-6 px-3 text-[10px] uppercase tracking-[0.16em] text-muted">
          Architectural impressions / Concept photography
        </p>
      </section>

      {/* RELATED */}
      <section className="border-t border-charcoal/15 px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-7">
            <h2 className="font-display text-[clamp(3rem,6vw,7rem)] font-medium leading-none tracking-[-0.07em]">
              More to discover.
            </h2>
            <Link
              href="/stays"
              className="border-b border-charcoal pb-3 text-[10px] uppercase tracking-[0.16em]"
            >
              All residences ↗
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/stays/${item.slug}`}
                className="group"
              >
                <div className="h-100rflow-hidden bg-sand md:h-120">
                  <img
                    src={item.image}
                    alt={`${item.name} concept imagery`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-5 border-b border-charcoal/20 py-6">
                  <h3 className="text-2xl font-medium tracking-[-0.06em] md:text-3xl">
                    {item.name}
                  </h3>
                  <ArrowUpRight size={21} strokeWidth={1.2} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
