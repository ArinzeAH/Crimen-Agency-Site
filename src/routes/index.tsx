import { createFileRoute } from "@tanstack/react-router";
import { Nav, PromoBar } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhoThisIsFor } from "@/components/site/WhoThisIsFor";
import { Results } from "@/components/site/Results";
import { Problem } from "@/components/site/Problem";
import { Method } from "@/components/site/Method";
import { Services } from "@/components/site/Services";
import {
  Faq,
  FinalCta,
  Footer,
  Guarantee,
  HowItWorks,
  WhyCrimen,
} from "@/components/site/Closing";

const title = "CRIMEN Agency — We Print Leads And Turn Them Into Cash";
const description =
  "Marketing, sales and automation systems for real estate, mortgage, med spa, tech bootcamp and product businesses. 20X more leads, 5X more sales.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <PromoBar />
      <Nav />
      <main>
        <Hero />
        <WhoThisIsFor />
        <Results />
        <Problem />
        <Method />
        <Services />
        <Guarantee />
        <WhyCrimen />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
