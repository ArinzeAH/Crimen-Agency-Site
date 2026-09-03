import { SectionShell, SectionTitle } from "./primitives";

const pains = [
  "Chase buyer/seller leads that never call back",
  "Watch loan applicants ghost you mid-funnel",
  "Let treatment bookings slip through the cracks because nobody followed up fast enough",
  "Miss cohort enrollment targets because applications go cold",
  "Lose product sales to abandoned carts you never recovered",
  "Manually follow up 47 times hoping someone finally books",
  "Watch your ad spend disappear into a black hole with no ROI",
  "Hire salespeople who can't close, then fire them, then repeat",
];

export function Problem() {
  return (
    <SectionShell id="problem">
      <SectionTitle kicker="Let's be honest">The Problem</SectionTitle>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-2xl text-foreground sm:text-3xl">You didn't build your business to:</p>
          <div className="mt-8 space-y-5 text-base text-muted-foreground">
            <p className="text-foreground">
              You built it to create something real. Something that scales without you being chained
              to it 80 hours a week.
            </p>
            <p className="font-display text-3xl leading-tight text-secondary">
              The problem isn't your offer. It's your systems.
            </p>
            <p>
              Most businesses in real estate, mortgage, med spa, bootcamp, and product spaces are
              running a 2015 playbook in 2026. We fix that.
            </p>
          </div>
        </div>

        <ul className="grid gap-px border border-border bg-border">
          {pains.map((p) => (
            <li key={p} className="flex items-start gap-4 bg-surface px-6 py-5">
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-primary"
              />
              <span className="text-sm text-muted-foreground">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
