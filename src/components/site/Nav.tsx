import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CtaButton } from "./primitives";

const links = [
  { label: "Who It's For", href: "#who" },
  { label: "Results", href: "#results" },
  { label: "Method", href: "#method" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

export function PromoBar() {
  return (
    <div className="relative z-50 bg-primary px-4 py-2 text-center text-xs font-semibold tracking-wide text-primary-foreground sm:text-sm">
      Limited intake — only a handful of new client accounts open each month.
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src="/crimen-logo.png" alt="CRIMEN Agency" className="h-9 w-9" />
          <span className="font-display text-lg font-bold tracking-tight">CRIMEN</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <CtaButton tone="red" className="px-5 py-3 text-xs">
            Book Your Free Growth Audit
          </CtaButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="cut-sm-br hairline p-2 lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-surface px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaButton tone="red" className="mt-5 w-full px-5 py-3 text-xs">
            Book Your Free Growth Audit
          </CtaButton>
        </div>
      ) : null}
    </header>
  );
}
