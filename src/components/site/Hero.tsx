import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CountUp, CtaButton } from "./primitives";

const VaultFunnel = lazy(() => import("./VaultFunnel"));

const stats = [
  { label: "More leads generated", to: 20, suffix: "X" },
  { label: "More sales closed", to: 5, suffix: "X" },
  { label: "Industries specialised in", to: 5, suffix: "" },
  { label: "Follow-up running", to: 24, suffix: "/7" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visualOpacity = Math.max(0, 1 - scrolled / 520);

  const line = (i: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduced ? 0 : 0.12 * i, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden px-5 pt-14 pb-20 sm:px-8 md:pt-20 md:pb-28">
      {/* 3D centrepiece sits behind the copy */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-2 z-0 mx-auto h-[680px] w-full max-w-4xl md:h-[760px]"
        style={{ opacity: visualOpacity * 0.5 }}
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-[65%] w-[75%]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,30,58,0.28) 0%, rgba(196,30,58,0.07) 45%, transparent 70%)",
            }}
          />
        </div>
        {mounted ? (
          <Suspense fallback={null}>
            <VaultFunnel distance={9.6} />
          </Suspense>
        ) : null}
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p {...line(0)} className="rule-label mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-primary" />
          Case file: CRIMEN Agency
          <span className="inline-block h-px w-8 bg-primary" />
        </motion.p>

        <h1 className="text-[2.1rem] leading-[1.0] sm:text-5xl md:text-[3.5rem]">
          <motion.span {...line(1)} className="block">
            10X More Qualified
          </motion.span>
          <motion.span {...line(2)} className="block text-primary">
            Appointments.
          </motion.span>
          <motion.span {...line(3)} className="block">
            Booked For You.
          </motion.span>
        </h1>

        <motion.div {...line(4)} className="mt-7 max-w-2xl space-y-4 text-base text-muted-foreground">
          <p className="text-foreground">
            Built for med spas, mortgage firms, tech coaches, real estate teams, and product
            businesses that live or die by a full calendar.
          </p>
          <p>
            We install the lead machine, the ads, and the sales process that fill your week with
            qualified appointments — using systems, not luck.
          </p>
        </motion.div>

        <motion.div {...line(5)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <CtaButton tone="red" className="px-8 py-5 text-base">
            Book Your Free Growth Audit
          </CtaButton>
          <a
            href="#results"
            className="text-sm font-medium text-secondary underline-offset-4 hover:underline"
          >
            See the numbers first
          </a>
        </motion.div>

        <motion.p
          {...line(6)}
          className="cut-tr mt-8 max-w-xl border-l-2 border-secondary bg-surface/80 px-5 py-4 text-left text-sm text-muted-foreground backdrop-blur-sm"
        >
          We only take on a handful of new clients each month so every account gets our full
          attention. If we don't think we can 5X you, we'll tell you straight up — free of charge.
        </motion.p>
      </div>

      <motion.dl
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: reduced ? 0 : 1.35 }}
        className="relative z-10 mx-auto mt-16 grid w-full max-w-5xl grid-cols-2 gap-px border border-border bg-border md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse bg-surface px-6 py-7 text-center">
            <dt className="mt-2 text-xs text-muted-foreground">{s.label}</dt>
            <dd className="font-display text-4xl font-bold text-secondary">
              <CountUp to={s.to} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
