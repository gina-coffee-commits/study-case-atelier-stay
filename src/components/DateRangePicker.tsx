
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

type Field = "arrival" | "departure";

type Props = {
  arrival: string;
  departure: string;
  today: string | null;
  onArrivalChange: (date: string) => void;
  onDepartureChange: (date: string) => void;
};

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function addMonths(monthKey: string, amount: number) {
  const [year, month] = monthKey.split("-").map(Number);
  const index = year * 12 + month - 1 + amount;

  const nextYear = Math.floor(index / 12);
  const nextMonth = ((index % 12) + 12) % 12;

  return `${nextYear}-${pad(nextMonth + 1)}`;
}

function formatDate(value: string) {
  if (!value) return "Select date";

  const [year, month, day] = value.split("-").map(Number);

  return `${pad(day)} ${monthNames[month - 1].slice(0, 3)} ${year}`;
}

function countNights(start: string, end: string) {
  if (!start || !end || end <= start) return 0;

  const toUTC = (value: string) => {
    const [y, m, d] = value.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };

  return Math.round(
    (toUTC(end) - toUTC(start)) / 86400000
  );
}

function buildCalendar(monthKey: string) {
  const [year, monthNumber] = monthKey.split("-").map(Number);
  const month = monthNumber - 1;

  const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const offset = (firstDay + 6) % 7;

  const totalDays = new Date(
    Date.UTC(year, month + 1, 0)
  ).getUTCDate();

  const cells: Array<string | null> = [];

  for (let i = 0; i < offset; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    cells.push(dateKey(year, month, day));
  }

  return cells;
}

export default function DateRangePicker({
  arrival,
  departure,
  today,
  onArrivalChange,
  onDepartureChange,
}: Props) {
  const [activeField, setActiveField] = useState<Field | null>(null);
  const [visibleMonth, setVisibleMonth] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLButtonElement>(null);
  const departureRef = useRef<HTMLButtonElement>(null);

  const reduced = useReducedMotion();

  useEffect(() => {
    if (today && !visibleMonth) {
      setVisibleMonth(today.slice(0, 7));
    }
  }, [today, visibleMonth]);

  useEffect(() => {
    if (!activeField) return;

    function onOutside(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveField(null);

        if (activeField === "arrival") {
          arrivalRef.current?.focus();
        } else {
          departureRef.current?.focus();
        }
      }
    }

    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeField]);

  function open(field: Field) {
    if (!today) return;

    if (activeField === field) {
      setActiveField(null);
      return;
    }

    const preferred =
      (field === "departure" ? departure || arrival : arrival) ||
      today;

    setVisibleMonth(
      preferred.slice(0, 7) < today.slice(0, 7)
        ? today.slice(0, 7)
        : preferred.slice(0, 7)
    );

    setActiveField(field);
  }

  function chooseDate(date: string) {
    if (!today || date < today) return;

    if (activeField === "arrival") {
      onArrivalChange(date);

      if (departure && departure <= date) {
        onDepartureChange("");
      }

      setActiveField("departure");
      return;
    }

    if (activeField === "departure") {
      if (!arrival) {
        onArrivalChange(date);
        setActiveField("departure");
        return;
      }

      if (date <= arrival) return;

      onDepartureChange(date);
      setActiveField(null);
      departureRef.current?.focus();
    }
  }

  const cells = visibleMonth ? buildCalendar(visibleMonth) : [];
  const [year, monthNumber] = visibleMonth
    ? visibleMonth.split("-").map(Number)
    : [0, 1];

  const nights = countNights(arrival, departure);

  const previousDisabled =
    !today || !visibleMonth ||
    visibleMonth <= today.slice(0, 7);

  return (
    <div ref={wrapperRef} className="relative sm:col-span-2">
      {/* DATE TRIGGERS */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div>
          <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.15em] text-muted">
            01 / Check-in
          </p>

          <button
            ref={arrivalRef}
            type="button"
            disabled={!today}
            onClick={() => open("arrival")}
            aria-expanded={activeField === "arrival"}
            aria-haspopup="dialog"
            className={`flex w-full min-w-0 items-center justify-between gap-2 border-b py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
              activeField === "arrival"
                ? "border-olive"
                : "border-charcoal/30 hover:border-charcoal"
            }`}
          >
            <span className={`text-[12px] sm:text-[13px] ${
              arrival ? "text-charcoal" : "text-muted"
            }`}>
              {formatDate(arrival)}
            </span>

            <CalendarDays
              size={16}
              strokeWidth={1.25}
              className="shrink-0"
            />
          </button>
        </div>

        <div>
          <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.15em] text-muted">
            02 / Check-out
          </p>

          <button
            ref={departureRef}
            type="button"
            disabled={!today}
            onClick={() => open("departure")}
            aria-expanded={activeField === "departure"}
            aria-haspopup="dialog"
            className={`flex w-full min-w-0 items-center justify-between gap-2 border-b py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
              activeField === "departure"
                ? "border-olive"
                : "border-charcoal/30 hover:border-charcoal"
            }`}
          >
            <span className={`text-[12px] sm:text-[13px] ${
              departure ? "text-charcoal" : "text-muted"
            }`}>
              {formatDate(departure)}
            </span>

            <CalendarDays
              size={16}
              strokeWidth={1.25}
              className="shrink-0"
            />
          </button>
        </div>
      </div>

      {/* SHARED CALENDAR */}
      <AnimatePresence>
        {activeField && visibleMonth && today && (
          <motion.div
            key="calendar"
            role="dialog"
            aria-label={
              activeField === "arrival"
                ? "Choose check-in date"
                : "Choose check-out date"
            }
            initial={
              reduced
                ? false
                : { opacity: 0, y: -8, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{
              duration: reduced ? 0 : 0.23,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 right-0 top-full z-65 mt-3 border border-charcoal/15 bg-ivory p-4 shadow-[0_22px_60px_rgba(36,39,34,0.16)] sm:p-5"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.17em] text-muted">
                  {activeField === "arrival"
                    ? "Select your arrival"
                    : "Select your departure"}
                </p>

                <h4 className="mt-1.5 text-[16px] font-medium tracking-[-0.04em]">
                  {monthNames[monthNumber - 1]} {year}
                </h4>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={previousDisabled}
                  onClick={() =>
                    setVisibleMonth((m) => addMonths(m, -1))
                  }
                  aria-label="Previous month"
                  className="flex size-8 items-center justify-center rounded-full border border-charcoal/15 transition-colors hover:bg-charcoal hover:text-white disabled:opacity-25"
                >
                  <ChevronLeft size={17} strokeWidth={1.3} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setVisibleMonth((m) => addMonths(m, 1))
                  }
                  aria-label="Next month"
                  className="flex size-8 items-center justify-center rounded-full border border-charcoal/15 transition-colors hover:bg-charcoal hover:text-white"
                >
                  <ChevronRight size={17} strokeWidth={1.3} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveField(null)}
                  aria-label="Close calendar"
                  className="ml-1 flex size-8 items-center justify-center"
                >
                  <X size={16} strokeWidth={1.3} />
                </button>
              </div>
            </div>

            {/* WEEK DAYS */}
            <div className="mt-4 grid grid-cols-7 gap-y-1">
              {weekdays.map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="flex h-7 items-center justify-center text-[9px] font-medium uppercase tracking-wider text-muted"
                >
                  {day}
                </div>
              ))}

              {cells.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} />;
                }

                const day = Number(date.slice(-2));

                const unavailable =
                  date < today ||
                  (activeField === "departure" &&
                    !!arrival &&
                    date <= arrival);

                const isArrival = date === arrival;
                const isDeparture = date === departure;

                const selected = isArrival || isDeparture;
                const inRange =
                  !!arrival &&
                  !!departure &&
                  date > arrival &&
                  date < departure;

                return (
                  <button
                    key={date}
                    type="button"
                    disabled={unavailable}
                    onClick={() => chooseDate(date)}
                    aria-label={`${day} ${monthNames[monthNumber - 1]} ${year}`}
                    aria-pressed={selected}
                    className={`relative flex h-9 min-w-0 items-center justify-center text-[12px] transition-colors duration-200 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-olive sm:h-10 ${
                      selected
                        ? "rounded-full bg-charcoal font-medium text-white"
                        : inRange
                          ? "bg-[#DEE2D8] text-charcoal"
                          : unavailable
                            ? "cursor-not-allowed text-charcoal/25"
                            : "text-charcoal hover:rounded-full hover:bg-sand"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* FOOTER */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-charcoal/10 pt-4">
              <span className="text-[9px] uppercase tracking-[0.12em] text-muted">
                {nights
                  ? `${nights} ${nights === 1 ? "night" : "nights"} selected`
                  : activeField === "arrival"
                    ? "Choose arrival date"
                    : "Choose departure date"}
              </span>

              <button
                type="button"
                onClick={() => {
                  onArrivalChange("");
                  onDepartureChange("");
                  setActiveField(null);
                }}
                className="text-[9px] font-medium uppercase tracking-[0.15em] underline underline-offset-4"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
