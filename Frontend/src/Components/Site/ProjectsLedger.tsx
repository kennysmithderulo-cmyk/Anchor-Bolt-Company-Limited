import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/site/Reveal";
import { getProjects, type Project } from "@/lib/api";
import { img } from "@/lib/site";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Residential", "Commercial", "Construction", "Development", "Renovation"];
const SKELETON = ["s1", "s2", "s3", "s4", "s5"];

type ProjectsLedgerProps = { limit?: number; showFilters?: boolean };

/** Project portfolio as a ledger of rows; each row opens a detail overlay. */
export function ProjectsLedger({ limit, showFilters = true }: ProjectsLedgerProps) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Project | null>(null);
  const { data, isLoading, isError } = useQuery({ queryKey: ["projects"], queryFn: () => getProjects() });

  const visible = useMemo(() => {
    const matches = (data ?? []).filter((project) => filter === "All" || project.category === filter);
    return limit ? matches.slice(0, limit) : matches;
  }, [data, filter, limit]);

  return (
    <div className="mt-10">
      {showFilters ? (
        <div className="flex gap-6 overflow-x-auto border-b border-border pb-3">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={cn(
                "relative whitespace-nowrap pb-2 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors duration-200",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-[width] after:duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                filter === option
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {isLoading ? (
        <div className="border-t border-border">
          {SKELETON.map((key) => (
            <div key={key} className="grid gap-5 border-b border-border py-6 md:grid-cols-[220px_1fr_160px]">
              <div className="aspect-[16/9] w-full animate-pulse bg-muted" />
              <div className="h-6 w-2/3 animate-pulse bg-muted" />
            </div>
          ))}
        </div>
      ) : null}

      {isError ? (
        <p className="mt-8 border border-border px-6 py-5 text-[15px] text-muted-foreground">
          The project ledger could not be loaded. Please refresh the page.
        </p>
      ) : null}

      {!isLoading && !isError ? (
        visible.length === 0 ? (
          <div className="mt-8 flex flex-col items-start gap-3 border border-border px-6 py-8">
            <p className="font-display text-[20px] font-bold uppercase tracking-[0.04em]">
              No projects in this category
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="text-[13px] font-bold uppercase tracking-[0.08em] text-accent underline underline-offset-4"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="border-t border-border">
            {visible.map((project, index) => (
              <Reveal key={project.id} delay={index * 50}>
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="group grid w-full grid-cols-1 gap-5 border-b border-border py-6 text-left transition-colors duration-300 hover:bg-muted md:grid-cols-[220px_1fr_180px_72px] md:items-center md:gap-8"
                >
                  <span className="block overflow-hidden border border-border">
                    <img
                      src={img(project.image, 700)}
                      alt={project.image_alt}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </span>
                  <span className="block">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-[22px] font-bold uppercase leading-tight tracking-[0.02em]">
                        {project.title}
                      </span>
                      {project.is_placeholder ? (
                        <span className="border border-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                          Sample
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-2 block text-[14px] text-muted-foreground">
                      {project.location} · <span className="tabular-nums">{project.year}</span>
                    </span>
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {project.category}
                  </span>
                  <span className="flex items-center justify-between gap-3 md:justify-end">
                    <span className="font-display text-[24px] font-bold leading-none tabular-nums text-accent">
                      {project.index}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-accent" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        )
      ) : null}

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
          {active ? (
            <>
              <img
                src={img(active.image, 1400)}
                alt={active.image_alt}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-[22px] font-bold leading-none tabular-nums text-accent">
                    {active.index}
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {active.category}
                  </span>
                  {active.is_placeholder ? (
                    <span className="border border-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                      Sample entry
                    </span>
                  ) : null}
                </div>
                <DialogTitle className="mt-4 font-display text-[28px] font-bold uppercase leading-[1.06] tracking-[0.02em]">
                  {active.title}
                </DialogTitle>
                <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-muted-foreground">
                  {active.location} · <span className="tabular-nums">{active.year}</span>
                </p>
                <DialogDescription className="mt-5 text-[16px] leading-[1.6] text-foreground/80">
                  {active.scope}
                </DialogDescription>
                <ul className="mt-6 border-t border-border">
                  {active.details.map((detail) => (
                    <li
                      key={detail}
                      className="border-b border-border py-3 text-[15px] text-muted-foreground"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button asChild variant="heroPill" size="pill">
                    <Link to="/contact">Discuss a project like this</Link>
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
