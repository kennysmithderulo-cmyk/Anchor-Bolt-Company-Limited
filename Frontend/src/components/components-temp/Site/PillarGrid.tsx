import { useQuery } from "@tanstack/react-query";
import { ClipboardList, Clock, ShieldCheck, Users, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { getPillars } from "@/lib/api";

const ICONS: Record<string, LucideIcon> = {
  quality: ShieldCheck,
  management: ClipboardList,
  reliable: Clock,
  client: Users,
};

const SKELETON_KEYS = ["p1", "p2", "p3", "p4"];

/** The four company commitments, presented as a drafting-sheet ledger. */
export function PillarGrid() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["pillars"], queryFn: getPillars });

  if (isLoading) {
    return (
      <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {SKELETON_KEYS.map((key) => (
          <div key={key} className="bg-background px-6 py-8">
            <div className="h-6 w-6 animate-pulse bg-muted" />
            <div className="mt-6 h-5 w-3/4 animate-pulse bg-muted" />
            <div className="mt-3 h-16 w-full animate-pulse bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="mt-12 border border-border px-6 py-5 text-[15px] text-muted-foreground">
        Company commitments could not be loaded. Please refresh the page or call {" "}
        <a href="tel:+233244579689" className="font-bold text-foreground underline decoration-accent">
          +233 244 57 96 89
        </a>
        .
      </p>
    );
  }

  return (
    <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {data.map((pillar, index) => {
        const Icon = ICONS[pillar.icon] ?? ShieldCheck;
        return (
          <Reveal key={pillar.id} delay={index * 70} className="h-full bg-background">
            <article className="flex h-full flex-col px-6 py-8 transition-colors duration-300 hover:bg-muted">
              <div className="flex items-start justify-between">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                <span className="font-display text-2xl font-bold leading-none tabular-nums text-accent">
                  {pillar.index}
                </span>
              </div>
              <h3 className="mt-7 font-display text-[21px] font-bold uppercase leading-[1.1] tracking-[0.02em]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{pillar.description}</p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
