import { SectionShell, SectionTitle } from "./primitives";

const industries = [
  {
    icon: "🏠",
    name: "Real Estate Firms",
    detail: "buyer & seller leads, listing appointments, investor deals",
  },
  {
    icon: "🏦",
    name: "Mortgage Firms",
    detail: "loan applications, refinance leads, rate-shopper follow-up",
  },
  {
    icon: "💉",
    name: "Med Spas",
    detail: "high-ticket treatment bookings, membership sign-ups, repeat clients",
  },
  {
    icon: "💻",
    name: "Tech Bootcamps",
    detail: "enrollment leads, application-to-enrollment automation, cohort fill-rate",
  },
  {
    icon: "📦",
    name: "Product Businesses",
    detail: "checkout automation, abandoned cart recovery, repeat purchase flows",
  },
];

export function WhoThisIsFor() {
  return (
    <SectionShell id="who">
      <SectionTitle kicker="Clearance list">Who This Is For</SectionTitle>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <li key={i.name} className="cut-tr panel px-6 py-6">
            <span className="text-2xl" aria-hidden="true">
              {i.icon}
            </span>
            <h3 className="mt-3 text-xl">{i.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.detail}</p>
          </li>
        ))}
        <li className="cut-br flex flex-col justify-center border border-primary/40 bg-primary/10 px-6 py-6">
          <p className="text-base font-semibold">
            If your business lives or dies by booked calls, closed deals, or filled seats — this is
            exactly what we do.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Not a generalist agency. A specialist for these five industries.
          </p>
        </li>
      </ul>
    </SectionShell>
  );
}
