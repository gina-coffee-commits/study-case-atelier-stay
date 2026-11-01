
"use client";

import { motion, useReducedMotion } from "motion/react";
import BookingForm from "@/components/BookingForm";

export default function ContactPage() {
  const reduced = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#E5E2DA] text-charcoal">
      <section className="flex min-h-svh items-center px-6 pb-10 pt-28 md:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-295 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7 }}
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.16em] text-muted">
              05 / Your Invitation
            </p>

            <h1 className="font-display text-[clamp(2.8rem,4vw,4rem)] font-medium leading-[1.08] tracking-[-0.055em]">
              Make room
              <br />
              for
              <br />
              <span className="font-light text-olive">
                moments.
              </span>
            </h1>

            <p className="mt-6 max-w-[320px] text-[13px] leading-6 text-muted">
              Select your preferred dates, accommodation
              and guests to explore a considered reservation
              experience.
            </p>

            <div className="mt-9 max-w-87.5 border-t border-charcoal/20 pt-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.13em]">
                Independent Concept
              </p>
              <p className="mt-3 text-[12px] leading-6 text-muted">
                Atelier Stay is a fictional hospitality concept
                by Mode by Gina. No real reservations or
                payments are processed.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : 0.12,
            }}
            className="min-w-0"
          >
            <BookingForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
