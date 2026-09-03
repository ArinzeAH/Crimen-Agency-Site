import { SectionShell, SectionTitle } from "./primitives";

const pillars = [
  {
    n: "01",
    title: "A Lead Machine That Never Sleeps",
    body: "We build you a complete GoHighLevel infrastructure — funnels, automations, follow-up sequences — so every lead that touches your business gets worked, nurtured, and booked. Automatically. Even while you sleep.",
  },
  {
    n: "02",
    title: "Paid Traffic That Prints, Not Burns Cash",
    body: "We run ads engineered to bring in qualified leads at a predictable cost — not vanity metrics, not \"impressions.\" Pipeline. Booked calls. Revenue.",
  },
  {
    n: "03",
    title: "A Sales Team That Actually Closes",
    body: "Leads mean nothing if nobody closes them. We help you build, train, or plug in a sales team (or become your outsourced closing engine) so every opportunity gets converted at the highest possible rate.",
  },
];

export function Method() {
  return (
    <SectionShell id="method" className="bg-surface/40">
      <SectionTitle kicker="Standard operating procedure">The CRIMEN Method</SectionTitle>
      <p className="mt-6 max-w-2xl text-base text-muted-foreground">
        We install three things into your business:
      </p>

      <ol className="mt-12 grid gap-6 lg:grid-cols-3">
        {pillars.map((p) => (
          <li key={p.n} className="cut-tr panel relative px-7 py-8">
            <span className="font-display text-6xl font-bold text-primary/60">{p.n}</span>
            <h3 className="mt-4 text-2xl">{p.title}</h3>
            <p className="mt-4 text-sm text-muted-foreground">{p.body}</p>
          </li>
        ))}
      </ol>

      <p className="cut-br mt-10 border border-secondary/40 bg-secondary/10 px-6 py-6 font-display text-2xl leading-snug sm:text-3xl">
        Put those three together and you don't have a marketing agency anymore. You have a revenue
        machine.
      </p>
    </SectionShell>
  );
}
