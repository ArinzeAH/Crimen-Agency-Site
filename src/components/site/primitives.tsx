import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/bookings/strategycallwitharinze";

export function CtaButton({
  children,
  tone = "red",
  href = BOOKING_URL,
  className,
}: {
  children: ReactNode;
  tone?: "red" | "gold" | "ghost";
  href?: string;
  className?: string;
}) {
  const tones = {
    red: "bg-primary text-primary-foreground hover:bg-primary/85 glow-red",
    gold: "bg-secondary text-secondary-foreground hover:bg-secondary/85 glow-gold",
    ghost: "bg-transparent text-foreground hairline hover:bg-surface-raised",
  } as const;

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "cut-br inline-flex items-center justify-center px-7 py-4 text-sm font-semibold tracking-wide transition-colors duration-200",
        tones[tone],
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SectionShell({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("border-t border-border px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionTitle({
  children,
  kicker,
  className,
}: {
  children: ReactNode;
  kicker?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {kicker ? (
        <p className="rule-label mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-secondary/60" />
          {kicker}
        </p>
      ) : null}
      <h2 className="text-4xl sm:text-5xl md:text-6xl">{children}</h2>
    </div>
  );
}

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return { ref, inView };
}

export function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
  start = true,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  start?: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, start]);

  return (
    <span>
      {prefix}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
