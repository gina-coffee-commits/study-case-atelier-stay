
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stays } from "@/lib/content";

type Stay = (typeof stays)[number];

type StayCardProps = {
  stay: Stay;
};

export default function StayCard({ stay }: StayCardProps) {
  return (
    <article className="group w-full">
      <Link href={`/stays/${stay.slug}`} className="block">
        <div className="relative h-105 overflow-hidden bg-sand md:h-145">
          <img
            src={stay.image}
            alt={`${stay.name} — Atelier Stay concept`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <span className="absolute left-6 top-6 text-[10px] tracking-[0.15em] text-white">
            {stay.number} / 03
          </span>

          <span className="absolute bottom-5 right-5 flex h-16 w-16 items-center justify-center bg-ivory text-charcoal transition-colors duration-300 group-hover:bg-olive group-hover:text-white">
            <ArrowUpRight size={24} strokeWidth={1.2} />
          </span>
        </div>

        <div className="flex items-start justify-between gap-5 border-b border-charcoal/20 py-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
              {stay.category}
            </p>

            <h3 className="mt-3 font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">
              {stay.name}
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
              {stay.description}
            </p>
          </div>

          <span className="mt-2 shrink-0 text-xs text-muted">
            {stay.size}
          </span>
        </div>
      </Link>
    </article>
  );
}
