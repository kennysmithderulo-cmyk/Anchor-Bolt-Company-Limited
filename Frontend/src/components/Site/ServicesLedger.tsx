import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { getServices } from "@/lib/api";
import { img } from "@/lib/site";
import { cn } from "@/lib/utils";

type ServicesLedgerProps = {
  variant?: "summary" | "full";
  limit?: number;
};

const SKELETON = ["k1", "k2", "k3"];

/** Services presented as a contractor's ledger — numbered rows, never card grids. */
export function ServicesLedger({ variant = "summary", limit }: ServicesLedgerProps) {
  const { data, isLoading, isError } = useQuery({ queryKey: ["services"], queryFn: getServices });

  if (isLoading) {
    return (
      <div className="mt-12 border-t border-border">
        {SKELETON.map((key) => (
          <div key={key} className="border-b border-border py-8">
            <div className="h-6 w-40 animate-pulse bg-muted" />
            <div className="mt-4 h-16 w-full max-w-2xl animate-pulse bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="mt-12 border border-border px-6 py-5 text-[15px] text-muted-foreground">
        Our services could not be loaded. Please refresh, or call{" "}
        <a href="tel:+233244579689" className="font-bold text-foreground underline decoration-accent">
          +233 244 57 96 89
        </a>
        .
      </p>
    );
  }

  const services = limit ? data.slice(0, limit) : data;

  if (variant === "summary") {
    return (
      <div className="mt-12 border-t border-border">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 60}>
            <article className="grid gap-6 border-b border-border py-8 transition-colors duration-300 hover:bg-muted lg:grid-cols-[88px_1fr_200px] lg:items-center lg:gap-10 lg:py-10">
              <span className="font-display text-[34px] font-bold leading-none tabular-nums text-accent lg:text-[46px]">
                {service.index}
              </span>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {service.line}
                </p>
                <h3 className="mt-2 font-display text-[26px] font-bold uppercase leading-[1.08] tracking-[0.02em] lg:text-[32px]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-muted-foreground">
                  {service.description}
                </p>
              </div>
              <div className="lg:text-right">
                <Link
                  to={`/services#${service.slug}`}
                  className="group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-foreground"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4">
      {services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <article
            key={service.id}
            id={service.slug}
            className="scroll-mt-[96px] border-t border-border py-12 first:border-t-0 lg:py-16"
          >
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={cn("lg:col-span-5", reversed && "lg:order-2")}>
                <div className="group overflow-hidden border border-border">
                  <img
                    src={img(service.image, 1200)}
                    alt={service.image_alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
              </div>
              <div className={cn("lg:col-span-7", reversed && "lg:order-1")}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[30px] font-bold leading-none tabular-nums text-accent">
                    {service.index}
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {service.line}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[28px] font-bold uppercase leading-[1.06] tracking-[0.02em] lg:text-[34px]">
                  {service.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-foreground/80">{service.description}</p>
                <ul className="mt-7 border-t border-border">
                  {service.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-3 border-b border-border py-3 text-[15px] leading-[1.5] transition-colors duration-200 hover:bg-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.2} />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button asChild variant="ghostPill" size="pill" className="w-full sm:w-auto">
                    <Link to="/contact">Request a Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
