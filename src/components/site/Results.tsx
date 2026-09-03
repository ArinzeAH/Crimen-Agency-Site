import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CountUp, CtaButton, SectionShell, SectionTitle, useInView } from "./primitives";

const RED = "#C41E3A";
const GOLD = "#E0BE45";
const SMOKE = "#8D8894";
const BONE = "#F3EEE6";

const leadVolume = [
  { day: "Day 0", leads: 42 },
  { day: "Day 15", leads: 96 },
  { day: "Day 30", leads: 188 },
  { day: "Day 45", leads: 310 },
  { day: "Day 60", leads: 495 },
  { day: "Day 75", leads: 690 },
  { day: "Day 90", leads: 845 },
];

const cpl = [
  { industry: "Real Estate", before: 78, after: 31 },
  { industry: "Mortgage", before: 112, after: 44 },
  { industry: "Med Spa", before: 64, after: 22 },
  { industry: "Bootcamp", before: 96, after: 38 },
  { industry: "Product", before: 41, after: 16 },
];

const proof = [
  { value: 20, suffix: "X", label: "Lead volume lift across active accounts" },
  { value: 5, suffix: "X", label: "Increase in closed sales" },
  { value: 61, suffix: "%", label: "Average drop in cost per lead" },
  { value: 14, suffix: " days", label: "Typical time to first system live" },
];

const testimonials = [
  {
    quote:
      "[Client Name] went from [X leads/month] to [Y leads/month] in [Z days], with a [X%] close rate on booked calls.",
    who: "[Industry], [City]",
  },
  {
    quote:
      "[Client Name] recovered [$X] in abandoned cart revenue in the first 30 days after we installed automated recovery flows.",
    who: "[Industry], [City]",
  },
  {
    quote:
      "[Client Name]'s sales team went from closing [X%] to [Y%] after we rebuilt their sales process.",
    who: "[Industry], [City]",
  },
];

const tooltipStyle = {
  backgroundColor: "#16141A",
  border: "1px solid rgba(141,136,148,0.25)",
  color: BONE,
  fontSize: 12,
} as const;

export function Results() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const charts = useInView<HTMLDivElement>();

  return (
    <SectionShell id="results">
      <SectionTitle kicker="Evidence file">The Results</SectionTitle>

      <p className="cut-tr mt-6 max-w-3xl border-l-2 border-primary bg-surface px-5 py-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Placeholder data.</strong> Replace with real client
        numbers, screenshots, and video testimonials before this goes live — this section is what
        actually sells the page. Claims without proof next to them get scrolled past.
      </p>

      <div ref={ref} className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {proof.map((p) => (
          <div key={p.label} className="brackets cut-br relative bg-surface px-6 py-8">
            <p className="font-display text-5xl font-bold text-foreground">
              <CountUp to={p.value} suffix={p.suffix} start={inView} />
            </p>
            <p className="mt-3 text-xs text-muted-foreground">{p.label}</p>
          </div>
        ))}
      </div>

      <div ref={charts.ref} className="mt-8 grid gap-8 lg:grid-cols-2">
        <figure className="cut-tr panel p-6">
          <figcaption className="mb-6">
            <h3 className="text-xl">Average Client Lead Volume, First 90 Days</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Placeholder blended average across active accounts.
            </p>
          </figcaption>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.inView ? leadVolume : []} margin={{ left: -18, right: 8 }}>
                <defs>
                  <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={RED} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={RED} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(141,136,148,0.13)" vertical={false} />
                <XAxis dataKey="day" stroke={SMOKE} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={SMOKE} tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: SMOKE, strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="leads"
                  name="Leads / month"
                  stroke={RED}
                  strokeWidth={2.5}
                  fill="url(#leadFill)"
                  animationDuration={1600}
                  dot={{ r: 3, fill: RED, stroke: RED }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </figure>

        <figure className="cut-tr panel p-6">
          <figcaption className="mb-6">
            <h3 className="text-xl">Cost Per Lead: Before vs After</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Placeholder figures, in USD, by industry.
            </p>
          </figcaption>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.inView ? cpl : []} margin={{ left: -18, right: 8 }}>
                <CartesianGrid stroke="rgba(141,136,148,0.13)" vertical={false} />
                <XAxis dataKey="industry" stroke={SMOKE} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={SMOKE} tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(141,136,148,0.08)" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: SMOKE }} />
                <Bar dataKey="before" name="Before CRIMEN" fill={SMOKE} animationDuration={1200} />
                <Bar dataKey="after" name="After CRIMEN" fill={GOLD} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </figure>
      </div>

      <ul className="mt-8 grid gap-4 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.quote} className="brackets cut-br panel relative px-6 py-7">
            <p className="rule-label mb-3">Placeholder</p>
            <blockquote className="text-sm text-foreground">"{t.quote}"</blockquote>
            <p className="mt-4 text-xs text-secondary">— {t.who}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <CtaButton tone="ghost">
          See More Case Studies
        </CtaButton>
      </div>
    </SectionShell>
  );
}
