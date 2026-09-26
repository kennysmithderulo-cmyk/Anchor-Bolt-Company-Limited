import { Info } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { ProjectsLedger } from "@/components/site/ProjectsLedger";

export default function OurWork() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Our Work"
        description="Residential, commercial, construction, development and renovation projects delivered across Sekondi-Takoradi and the Western Region."
      />

      <section>
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-10 lg:pb-24 lg:pt-12">
          <div className="flex items-start gap-3 border border-border bg-muted px-5 py-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
            <p className="text-[13px] leading-[1.55] text-muted-foreground">
              Representative sample entries: each is marked{" "}
              <span className="font-bold text-foreground">Sample</span> and will be replaced with verified
              Anchor-Bolt project names, photography and details.
            </p>
          </div>
          <ProjectsLedger />
        </div>
      </section>

      <CtaBand
        eyebrow="Your project next"
        title="Add your project to the ledger"
        description="Send us the site and the requirement — we will come back with a scoped approach and cost plan."
        primaryLabel="Request a Consultation"
        primaryTo="/contact"
      />
    </>
  );
}
