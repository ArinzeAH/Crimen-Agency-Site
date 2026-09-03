import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Suspense, lazy, useEffect, useState } from "react";
import { CtaButton, SectionShell, SectionTitle } from "./primitives";

const VaultSeal = lazy(() => import("./VaultSeal"));

export function Guarantee() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <SectionShell id="guarantee" className="bg-surface/40">
      <div className="cut-tr relative overflow-hidden border border-primary/40 bg-primary/10 px-7 py-12 sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute -right-10 top-1/2 hidden h-[460px] w-[460px] -translate-y-1/2 opacity-90 lg:block"
          aria-hidden="true"
        >
          {mounted ? (
            <Suspense fallback={null}>
              <VaultSeal />
            </Suspense>
          ) : null}
        </div>
        <p className="rule-label">The Guarantee — placeholder numbers</p>
        <p className="relative mt-6 max-w-3xl font-display text-3xl leading-[1.05] font-bold sm:text-4xl">
          We install your system. If it doesn't generate at least [X qualified leads / X% increase
          in booked calls] within [90 days], we keep working for free until it does.
        </p>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground">
          No lawyers. No fine print gymnastics. If we don't deliver, we don't get paid for the extra
          time it takes to make it right.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          Fill in with a real, specific number your business can back — vague guarantees don't
          convert, and empty ones destroy trust fast.
        </p>
      </div>
    </SectionShell>
  );
}

const reasons = [
  {
    title: "We build systems, not campaigns.",
    body: "Campaigns end. Systems compound.",
  },
  {
    title: "We speak revenue, not vanity metrics.",
    body: "We don't care about likes. We care about your bank account.",
  },
  {
    title: "One team, one system, zero finger-pointing.",
    body: "Most businesses hire five vendors that all blame each other when it doesn't work. We own leads, ads, AND sales — end to end.",
  },
  {
    title: "We only win when you win.",
    body: "Performance-based components available for the right partners.",
  },
];

export function WhyCrimen() {
  return (
    <SectionShell id="why">
      <SectionTitle kicker="The case for us">Why CRIMEN Agency</SectionTitle>
      <p className="mt-6 max-w-2xl text-base text-muted-foreground">
        We're not here to be your "marketing vendor." We're here to be the reason you hit your next
        revenue milestone.
      </p>

      <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
        {reasons.map((r) => (
          <div key={r.title} className="bg-surface px-7 py-8">
            <h3 className="text-xl">{r.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

const steps = [
  {
    n: "01",
    title: "Free Growth Audit",
    body: "We look under the hood of your current lead flow, funnels, ads, and sales process and show you exactly where you're leaking money.",
  },
  {
    n: "02",
    title: "Custom Build",
    body: "We design and install your GoHighLevel system, ad campaigns, and/or sales process — built around your specific offer and market.",
  },
  {
    n: "03",
    title: "Launch & Optimize",
    body: "We launch, track everything, and optimize weekly. No \"set it and forget it.\" We're in the numbers with you.",
  },
  {
    n: "04",
    title: "Scale",
    body: "Once the system is converting, we turn up the volume — more ad spend, more leads, more closes — without breaking what's working.",
  },
];

export function HowItWorks() {
  return (
    <SectionShell id="how" className="bg-surface/40">
      <SectionTitle kicker="Operation timeline">How It Works</SectionTitle>

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="cut-tr panel px-6 py-7">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-secondary">{s.n}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h3 className="mt-4 text-xl">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

const faqs = [
  {
    q: "We already use GoHighLevel, can you just fix what's broken?",
    a: "Yes. Most of our clients come to us with a messy GHL account. We audit it, rebuild what's broken, and optimize what's working.",
  },
  {
    q: "Do you run ads even if you don't build our automations?",
    a: "We can run ads standalone, but we always recommend the automations too — because sending traffic into a leaky funnel is like filling a bucket with holes in it.",
  },
  {
    q: "We don't have a sales team yet — can you help?",
    a: "Yes. We can help you build one from scratch, train your existing team, or close deals for you directly.",
  },
  {
    q: "How fast will we see results?",
    a: "Automations and funnels typically go live within 1–2 weeks. Ad results and sales improvements show up in the first 30–60 days, with compounding gains from there.",
  },
];

export function Faq() {
  return (
    <SectionShell id="faq">
      <SectionTitle kicker="On the record">FAQ</SectionTitle>

      <Accordion type="single" collapsible className="mt-10 border-t border-border">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-b border-border">
            <AccordionTrigger className="py-6 text-left font-display text-lg font-semibold tracking-tight hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl pb-6 text-sm text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}

export function FinalCta() {
  return (
    <SectionShell id="book" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-40 h-80"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 100%, rgba(196,30,58,0.22) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl">
        <h2 className="text-4xl sm:text-6xl">Ready To Stop Guessing And Start Scaling?</h2>
        <p className="mt-6 text-base text-muted-foreground sm:text-lg">
          Book a free Growth Audit. We'll show you exactly where you're losing leads and revenue —
          and what it would take to fix it.
        </p>
        <div className="mt-9">
          <CtaButton tone="red" className="px-8 py-5 text-base">
            Book Your Free Growth Audit
          </CtaButton>
        </div>
        <p className="cut-tr mt-8 border-l-2 border-secondary bg-surface px-5 py-4 text-sm text-muted-foreground">
          We only take on a handful of new clients each month so every account gets our full
          attention. If we don't think we can 5X you, we'll tell you straight up — free of charge.
        </p>
      </div>
    </SectionShell>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <img src="/crimen-logo.png" alt="" className="h-8 w-8" />
          <div>
            <p className="font-display text-base font-bold">CRIMEN AGENCY</p>
            <p className="text-xs text-muted-foreground">Leads. Sales. Systems. Done.</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CRIMEN Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
