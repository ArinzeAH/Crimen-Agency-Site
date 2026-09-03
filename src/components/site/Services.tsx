import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { SectionShell, SectionTitle } from "./primitives";

const industries = [
  { id: "real-estate", label: "Real Estate" },
  { id: "mortgage", label: "Mortgage" },
  { id: "med-spa", label: "Med Spa" },
  { id: "bootcamp", label: "Tech Bootcamp" },
  { id: "product", label: "Product Business" },
] as const;

type IndustryId = (typeof industries)[number]["id"];

const focuses = [
  { id: "automation", label: "Automation" },
  { id: "ads", label: "Ads" },
  { id: "sales", label: "Sales" },
  { id: "all", label: "All Three" },
] as const;

type FocusId = (typeof focuses)[number]["id"];

const modules = {
  automation: {
    title: "GoHighLevel Build-Out & Automation",
    promise:
      "We build your entire operating system inside GoHighLevel so leads never fall through the cracks again.",
    items: [
      "Full GHL account setup & configuration (from scratch or migration)",
      "Custom sales funnels built to convert (opt-in → booking → close)",
      "Automated follow-up sequences (SMS + email + voicemail drops) that chase leads for you 24/7",
      "Pipeline & CRM setup so you always know exactly where every deal stands",
      "Missed-call text-back so you never lose a lead to a missed phone call again",
      "Appointment booking & calendar automation",
      "Review & reputation automation to stack 5-star reviews on autopilot",
      "Custom dashboards so you see your numbers in real time, not guess at them",
      "Integration with your existing tools (payments, forms, ads, website)",
    ],
    result:
      "Every lead gets touched instantly, followed up automatically, and pushed toward a booked call or a completed sale — without you or your team lifting a finger.",
  },
  ads: {
    title: "Paid Advertising That's Actually Profitable",
    promise:
      "We don't run ads to make you feel good about \"brand awareness.\" We run ads to fill your calendar with qualified leads.",
    items: [
      "Meta (Facebook/Instagram) ads management",
      "Google & YouTube ads management",
      "LinkedIn ads for B2B / high-ticket offers",
      "Offer & hook creation — because the best targeting can't save a bad offer",
      "Landing pages built to convert (not just look pretty)",
      "Full-funnel tracking so you know your exact cost per lead and cost per sale",
      "Weekly optimization based on real data, not vibes",
      "Creative testing (ad copy, video, images) to constantly beat your own best performer",
    ],
    result:
      "Predictable, scalable lead flow that you can turn up whenever you want more appointments, applications, or sales.",
  },
  sales: {
    title: "Sales Team Setup & Training",
    promise:
      "A business with great leads and a weak sales team is like filling a bucket with holes in it. We plug the holes.",
    items: [
      "Sales process design (script, objection handling, follow-up cadence)",
      "Hiring & recruiting support to find closers, not order-takers",
      "Sales team training & onboarding",
      "Call review & coaching to sharpen close rates over time",
      "CRM-integrated sales tracking so you know exactly what's working",
      "Done-for-you outsourced closing (we close for you, if you want it fully hands-off)",
      "Compensation structure design to keep your closers hungry and aligned with your growth",
    ],
    result:
      "More of the leads we generate actually turn into signed clients, booked treatments, enrolled students, or completed sales.",
  },
} as const;

const industryOutcome: Record<IndustryId, string> = {
  "real-estate": "buyer & seller leads, listing appointments, and investor deals",
  mortgage: "loan applications, refinance leads, and rate-shopper follow-up",
  "med-spa": "high-ticket treatment bookings, membership sign-ups, and repeat clients",
  bootcamp: "enrollment leads, application-to-enrollment automation, and cohort fill-rate",
  product: "checkout automation, abandoned cart recovery, and repeat purchase flows",
};

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cut-sm-br px-5 py-3 text-sm font-medium transition-colors duration-150 ${
        active
          ? "bg-secondary text-secondary-foreground"
          : "hairline bg-surface text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function Services() {
  const [industry, setIndustry] = useState<IndustryId>("real-estate");
  const [focus, setFocus] = useState<FocusId>("all");

  const selected = useMemo(
    () => (focus === "all" ? (["automation", "ads", "sales"] as const) : ([focus] as const)),
    [focus],
  );

  const industryLabel = industries.find((i) => i.id === industry)!.label;

  return (
    <SectionShell id="services">
      <SectionTitle kicker="Build your configuration">Our Services</SectionTitle>
      <p className="mt-6 max-w-2xl text-base text-muted-foreground">
        Everything broken down, no fluff, no jargon. Pick your industry and where you're bleeding
        the most — the brief on the right updates as you go.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="cut-tr panel px-6 py-7">
          <fieldset>
            <legend className="rule-label mb-4">Industry</legend>
            <div className="flex flex-wrap gap-2">
              {industries.map((i) => (
                <Chip key={i.id} active={i.id === industry} onClick={() => setIndustry(i.id)}>
                  {i.label}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="rule-label mb-4">Service focus</legend>
            <div className="flex flex-wrap gap-2">
              {focuses.map((f) => (
                <Chip key={f.id} active={f.id === focus} onClick={() => setFocus(f.id)}>
                  {f.label}
                </Chip>
              ))}
            </div>
          </fieldset>

          <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            Built around <span className="text-foreground">{industryLabel}</span> —{" "}
            {industryOutcome[industry]}.
          </p>
        </div>

        <div className="cut-br panel px-6 py-7 sm:px-8">
          <p className="rule-label">Output panel</p>
          <h3 className="mt-2 text-3xl">
            {focus === "all" ? "The full revenue machine" : modules[focus].title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Configured for {industryLabel}: {industryOutcome[industry]}.
          </p>

          <div className="mt-8 space-y-8">
            {selected.map((key) => {
              const m = modules[key];
              return (
                <div key={key} className="border-l border-secondary/40 pl-5">
                  <h4 className="font-display text-xl font-semibold">{m.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{m.promise}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {m.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="mt-1 shrink-0 text-secondary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-foreground">
                    <span className="text-primary">The result:</span> {m.result}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
