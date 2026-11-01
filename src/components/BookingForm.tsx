
"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import DateRangePicker from "@/components/DateRangePicker";
import { stays } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

function getLocalDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  if (!value) return "—";

  const [year, month, day] = value.split("-").map(Number);

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
  ];

  return `${day} ${months[month - 1]} ${year}`;
}

function calculateNights(start: string, end: string) {
  if (!start || !end || end <= start) return 0;

  const toUTC = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };

  return Math.round((toUTC(end) - toUTC(start)) / 86400000);
}

function getCapacity(slug: string) {
  switch (slug) {
    case "garden-suite":
      return 2;
    case "pool-residence":
      return 4;
    case "atelier-villa":
      return 6;
    default:
      return 2;
  }
}

export default function BookingForm() {
  const [today, setToday] = useState<string | null>(null);

  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);

  const [selectedStay, setSelectedStay] = useState(
    stays[0].slug
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const dropdownId = useId();
  const labelId = useId();
  const valueId = useId();

  const reduced = useReducedMotion();

  // Current date is read after hydration, not during prerender.
  useEffect(() => {
    setToday(getLocalDate());
  }, []);

  const selectedRoom =
    stays.find((stay) => stay.slug === selectedStay) ??
    stays[0];

  const capacity = getCapacity(selectedRoom.slug);
  const nights = calculateNights(arrival, departure);

  const isValid =
    today !== null &&
    arrival !== "" &&
    departure !== "" &&
    arrival >= today &&
    departure > arrival &&
    guests >= 1 &&
    guests <= capacity;

  // Close dropdown on outside click and Escape.
  useEffect(() => {
    if (!dropdownOpen) return;

    function onOutside(event: PointerEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [dropdownOpen]);

  function openDropdown() {
    setDropdownOpen(true);

    const index = Math.max(
      0,
      stays.findIndex((stay) => stay.slug === selectedStay)
    );

    requestAnimationFrame(() => {
      optionRefs.current[index]?.focus();
    });
  }

  function closeDropdown() {
    setDropdownOpen(false);
    triggerRef.current?.focus();
  }

  function selectStay(slug: string) {
    setSelectedStay(slug);

    setGuests((current) =>
      Math.min(current, getCapacity(slug))
    );

    closeDropdown();
  }

  function handleOptionKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let next = index;

    switch (event.key) {
      case "ArrowDown":
        next = (index + 1) % stays.length;
        break;

      case "ArrowUp":
        next = (index - 1 + stays.length) % stays.length;
        break;

      case "Home":
        next = 0;
        break;

      case "End":
        next = stays.length - 1;
        break;

      case "Tab":
        setDropdownOpen(false);
        return;

      default:
        return;
    }

    event.preventDefault();
    optionRefs.current[next]?.focus();
  }

  function handleArrivalChange(value: string) {
    setArrival(value);

    if (!value || (departure && departure <= value)) {
      setDeparture("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Recheck the date when submitting.
    const currentDate = getLocalDate();
    setToday(currentDate);

    if (
      !arrival ||
      !departure ||
      arrival < currentDate ||
      departure <= arrival ||
      guests < 1 ||
      guests > capacity
    ) {
      return;
    }

    setSubmitted(true);
  }

  function resetForm() {
    setArrival("");
    setDeparture("");
    setGuests(2);
    setSelectedStay(stays[0].slug);
    setDropdownOpen(false);
    setSubmitted(false);
    setToday(getLocalDate());
  }

  // ========================================
  // BOOKING PREVIEW
  // ========================================

  if (submitted) {
    return (
      <motion.div
        role="status"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease }}
        className="w-full min-w-0 border border-charcoal/15 bg-ivory p-6 sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-charcoal/15 pb-4">
          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted">
            Your Stay / Preview
          </span>

          <span className="flex size-9 items-center justify-center rounded-full bg-olive text-white">
            <Check size={17} strokeWidth={1.3} />
          </span>
        </div>

        <h3 className="mt-6 font-display text-[clamp(1.9rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.055em]">
          A moment to{" "}
          <span className="font-light text-olive">
            imagine.
          </span>
        </h3>

        <p className="mt-3 text-[12px] leading-6 text-muted">
          A summary of your imagined stay.
        </p>

        <div className="mt-7 border-y border-charcoal/15 py-3">
          {[
            ["Residence", selectedRoom.name],
            ["Check-in", formatDate(arrival)],
            ["Check-out", formatDate(departure)],
            [
              "Duration",
              `${nights} ${nights === 1 ? "night" : "nights"}`,
            ],
            [
              "Guests",
              `${guests} ${guests === 1 ? "guest" : "guests"}`,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-5 py-2.5 text-[12px]"
            >
              <span className="text-muted">{label}</span>
              <span className="text-right font-medium">
                {value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-6 text-muted">
          This is a fictional hospitality concept.
          No reservation or payment has been made.
        </p>

        <button
          type="button"
          onClick={resetForm}
          className="mt-6 inline-flex items-center gap-8 border-b border-charcoal pb-2.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
        >
          Start again
          <ArrowUpRight size={16} strokeWidth={1.3} />
        </button>
      </motion.div>
    );
  }

  // ========================================
  // RESERVATION FORM
  // ========================================

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full min-w-0 border border-charcoal/15 bg-ivory p-5 sm:p-6 lg:p-7"
    >
      {/* CARD HEADER */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted">
          Reservation Experience
        </span>

        <span className="text-[9px] uppercase tracking-[0.12em] text-muted">
          Demo / 001
        </span>
      </div>

      <div className="mt-4 h-px w-full bg-charcoal/15" />

      {/* FORM INTRO */}
      <div className="mb-6 mt-5">
        <h3 className="font-display text-[clamp(1.85rem,2.8vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.055em]">
          Your{" "}
          <span className="font-light text-olive">
            escape.
          </span>
        </h3>

        <p className="mt-2.5 max-w-87.5 text-[12px] leading-6 text-muted">
          A slower journey begins with a simple choice.
          Discover your imagined sanctuary.
        </p>
      </div>

      {/* FORM FIELDS — ALWAYS ONE COLUMN */}
      <div className="flex flex-col gap-5">

        {/* 01 / 02 — DATES */}
        <DateRangePicker
          arrival={arrival}
          departure={departure}
          today={today}
          onArrivalChange={handleArrivalChange}
          onDepartureChange={setDeparture}
        />

        {/* 03 — ACCOMMODATION */}
        <div
          ref={dropdownRef}
          className="relative z-20 w-full min-w-0"
        >
          <span
            id={labelId}
            className="block text-[9px] font-medium uppercase tracking-[0.16em] text-muted"
          >
            03 / Accommodation
          </span>

          <button
            ref={triggerRef}
            type="button"
            aria-labelledby={`${labelId} ${valueId}`}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-controls={dropdownId}
            onClick={() => {
              if (dropdownOpen) {
                closeDropdown();
              } else {
                openDropdown();
              }
            }}
            onKeyDown={(event) => {
              if (
                !dropdownOpen &&
                (event.key === "ArrowDown" ||
                  event.key === "ArrowUp")
              ) {
                event.preventDefault();
                openDropdown();
              }
            }}
            className={`group mt-2 flex w-full min-w-0 items-center justify-between gap-4 border-b py-3 text-left outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
              dropdownOpen
                ? "border-olive"
                : "border-charcoal/30 hover:border-charcoal"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 text-[9px] tracking-widest text-muted">
                {selectedRoom.number}
              </span>

              <div className="min-w-0">
                <span
                  id={valueId}
                  className="block truncate font-display text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-tight tracking-[-0.045em]"
                >
                  {selectedRoom.name}
                </span>

                <span className="mt-1 block text-[11px] text-muted">
                  {selectedRoom.category}
                </span>
              </div>
            </div>

            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                dropdownOpen
                  ? "rotate-180 border-charcoal bg-charcoal text-white"
                  : "border-charcoal/25 group-hover:border-charcoal"
              }`}
            >
              <ChevronDown size={16} strokeWidth={1.3} />
            </span>
          </button>

          {/* ANIMATED RESIDENCE OPTIONS */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                id={dropdownId}
                initial={
                  reduced
                    ? false
                    : { opacity: 0, y: -8 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: reduced ? 0 : 0.24,
                  ease,
                }}
                className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden border border-charcoal/15 bg-ivory shadow-[0_18px_45px_rgba(36,39,34,0.14)]"
              >
                <div className="flex items-center justify-between gap-3 border-b border-charcoal/10 px-4 py-3">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-muted">
                    The Collection
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.12em] text-muted">
                    {String(stays.length).padStart(2, "0")} Residences
                  </span>
                </div>

                {stays.map((stay, index) => {
                  const selected = selectedStay === stay.slug;

                  return (
                    <button
                      key={stay.slug}
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectStay(stay.slug)}
                      onKeyDown={(event) =>
                        handleOptionKeyDown(event, index)
                      }
                      className={`group flex w-full items-center gap-3 border-b border-charcoal/10 px-4 py-3.5 text-left outline-none transition-colors last:border-b-0 focus-visible:bg-sand ${
                        selected
                          ? "bg-[#E5E2DA]"
                          : "hover:bg-sand/50"
                      }`}
                    >
                      <span className="self-start pt-1 text-[9px] text-muted">
                        {stay.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <span className="block font-display text-[15px] font-medium leading-tight tracking-[-0.04em] sm:text-[17px]">
                          {stay.name}
                        </span>

                        <span className="mt-1 block text-[10px] leading-5 text-muted">
                          {stay.category} / {stay.size}
                        </span>
                      </div>

                      {selected ? (
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-olive text-white">
                          <Check size={14} strokeWidth={1.3} />
                        </span>
                      ) : (
                        <ArrowUpRight
                          size={17}
                          strokeWidth={1.2}
                          className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 04 — NUMBER OF GUESTS */}
        <div className="w-full min-w-0">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted">
              04 / Number of guests
            </span>

            <span className="shrink-0 text-[9px] text-muted">
              Max {capacity}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-4 border-b border-charcoal/30 py-3">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[23px] font-light leading-none tracking-tighter">
                {String(guests).padStart(2, "0")}
              </span>

              <span className="text-[11px] text-muted">
                {guests === 1 ? "Guest" : "Guests"}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Remove guest"
                disabled={guests <= 1}
                onClick={() =>
                  setGuests((current) =>
                    Math.max(1, current - 1)
                  )
                }
                className="flex size-9 items-center justify-center rounded-full border border-charcoal/25 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
              >
                <Minus size={16} strokeWidth={1.2} />
              </button>

              <button
                type="button"
                aria-label="Add guest"
                disabled={guests >= capacity}
                onClick={() =>
                  setGuests((current) =>
                    Math.min(capacity, current + 1)
                  )
                }
                className="flex size-9 items-center justify-center rounded-full border border-charcoal/25 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
              >
                <Plus size={16} strokeWidth={1.2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SELECTED NIGHTS */}
      <AnimatePresence>
        {nights > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-center justify-between border-t border-charcoal/10 pt-3 text-[11px] text-muted">
              <span>Duration of stay</span>
              <span className="font-medium text-charcoal">
                {nights} {nights === 1 ? "night" : "nights"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!isValid}
        className="group mt-6 flex w-full items-center justify-between gap-5 bg-charcoal px-5 py-4 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-40"
      >
        Preview my stay

        <ArrowUpRight
          size={18}
          strokeWidth={1.2}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </button>

      {/* DISCLAIMER */}
      <p className="mt-3 text-center text-[9px] leading-5 tracking-[0.07em] text-muted">
        INDEPENDENT CONCEPT · NO REAL BOOKINGS OR PAYMENTS
      </p>
    </form>
  );
}
