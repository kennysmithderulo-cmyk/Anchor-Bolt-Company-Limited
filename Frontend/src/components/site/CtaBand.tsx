import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/site";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel: string;
  primaryTo: string;
  showWhatsApp?: boolean;
};

/** Navy statement band with the single CTA for that band. */
export function CtaBand({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryTo,
  showWhatsApp = true,
}: CtaBandProps) {
  return (
    <section className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
        <span className="block h-[2px] w-12 bg-accent" aria-hidden="true" />
        {eyebrow ? (
          <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        ) : null}
        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[32px] font-bold uppercase leading-[1.05] tracking-[0.02em] lg:col-span-7 lg:text-[46px]">
            {title}
          </h2>
          <div className="lg:col-span-5">
            {description ? (
              <p className="text-[16px] leading-[1.6] text-sidebar-foreground/80">{description}</p>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="lightPill" size="pill">
                <Link to={primaryTo}>{primaryLabel}</Link>
              </Button>
              {showWhatsApp ? (
                <Button asChild variant="heroOutline" size="pill">
                  <a href={COMPANY.whatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" strokeWidth={2} /> WhatsApp
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
