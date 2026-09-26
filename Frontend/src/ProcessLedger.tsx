import { useQuery } from "@tanstack/react-query";

import { Reveal } from "@/components/site/Reveal";
import { getProcess } from "@/lib/api";

const SKELETON = ["r1", "r2", "r3", "r4"];

/** Four-stage process: compact row of steps, or the full vertical ledger. */
export function ProcessLedger({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const { data, isLoading, isError } = useQuery({ queryKey: ["process"], queryFn: getProcess });

  if (isLoading) {
    return (
      <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {SKELETON.map((key) => (
          <div key={key} className="bg-background px-6 py-8">
            <div className="h-10 w-16 animate-pulse bg-muted" />
            <div className="mt-4 h-5 w-2/3 animate-pulse bg-muted" />
            <div className="mt-3 h-20 w-full animate-pulse bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="mt-12 border border-border px-6 py-5 text-[15px] text-muted-foreground">
        Our process could not be loaded. Please refresh the page.
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {data.map((stage, index) => (
          <Reveal key={stage.id} delay={index * 70} className="h-full bg-background">
            <div className="flex h-full flex-col px-6 py-8 transition-colors duration-300 hover:bg-muted">
              <span className="font-display text-[44px] font-bold leading-none tabular-nums text-accent">
                {stage.index}
              </span>
              <h3 className="mt-6 font-display text-[22px] font-bold uppercase leading-[1.1] tracking-[0.02em]">
                {stage.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{stage.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <ol className="relative mt-14 border-l border-border pl-8 sm:ml-4 lg:pl-12">
      {data.map((stage, index) => (
        <li key={stage.id} className="relative pb-14 last:pb-0">
          <span
            className="absolute -left-[38px] top-3 h-2.5 w-2.5 bg-accent sm:-left-[38px] lg:-left-[54px]"
            aria-hidden="true"
          />
          <Reveal delay={index * 80}>
            <div className="grid gap-4 lg:grid-cols-[96px_1fr_240px] lg:items-start lg:gap-10">
              <span className="font-display text-[40px] font-bold leading-none tabular-nums text-accent lg:text-[60px]">
                {stage.index}
              </span>
              <div>
                <h2 className="font-display text-[24px] font-bold uppercase leading-[1.08] tracking-[0.02em] lg:text-[28px]">
                  {stage.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-muted-foreground">
                  {stage.description}
                </p>
              </div>
              <p className="text-[12px] font-bold uppercase leading-[1.7] tracking-[0.1em] text-muted-foreground lg:text-right">
                {stage.deliverable}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
