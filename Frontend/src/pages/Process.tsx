import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { ProcessLedger } from "@/components/site/ProcessLedger";

const PROCESS_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8Mnx8YXJjaGl0ZWN0JTIwYmx1ZXByaW50JTIwc2l0ZSUyMHBsYW5zJTIwZW5naW5lZXIlMjBkcmF3aW5nc3xlbnwwfHx8fDE3OTAzNTc2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function Process() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="How we work, stage by stage"
        description="Four stages, each with a defined output. You always know what is being decided, what it costs and what comes next."
        image={PROCESS_IMAGE}
        imageAlt="Architect working on drawings with a pencil and set square"
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-24">
          <ProcessLedger variant="full" />
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-border pt-8">
            <p className="text-[15px] text-muted-foreground">
              Projects vary in scale and complexity, so stage durations are set with you once the scope is known.
            </p>
            <Button asChild variant="ghostPill" size="pill">
              <Link to="/services">See what we build</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Stage one"
        title="Start at stage one"
        description="Consultation costs you nothing but a conversation. Bring the site, the idea and the budget expectation."
        primaryLabel="Request a Consultation"
        primaryTo="/contact"
      />
    </>
  );
}
