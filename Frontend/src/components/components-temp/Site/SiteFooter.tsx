import { Link } from "react-router-dom";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMPANY, NAV } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-[1200px] px-6 pb-28 pt-16 lg:pb-20 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 shrink-0 bg-accent" aria-hidden="true" />
              <span className="font-display text-2xl font-bold uppercase leading-none tracking-[0.08em]">
                Anchor-Bolt
              </span>
            </div>
            <p className="mt-5 font-display text-[22px] font-bold uppercase leading-[1.15] tracking-[0.02em]">
              {COMPANY.tagline}
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-[1.6] text-sidebar-foreground/75">
              {COMPANY.industry} · {COMPANY.city}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="lightPill" size="pill">
                <a href={COMPANY.phoneHref}>
                  <Phone className="h-4 w-4" /> Call {COMPANY.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="heroOutline" size="pill">
                <a href={COMPANY.whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent">Navigation</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[15px] text-sidebar-foreground/80 transition-colors duration-200 hover:text-sidebar-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent">Registered office</p>
            <ul className="mt-5 space-y-4 text-[15px] text-sidebar-foreground/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                <span>
                  {COMPANY.name}
                  <br />
                  {COMPANY.street}
                  <br />
                  {COMPANY.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                <a href={COMPANY.phoneHref} className="transition-colors hover:text-sidebar-foreground">
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                <span>{COMPANY.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--rule-on-dark)] pt-6 text-[12px] uppercase tracking-[0.1em] text-sidebar-foreground/60 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {COMPANY.name}
          </p>
          <p>Sekondi-Takoradi · Western Region · Ghana</p>
        </div>
        <p className="mt-4 text-[12px] leading-[1.6] text-sidebar-foreground/50">
          Portfolio entries and project imagery shown on this site are placeholders, to be replaced with
          verified Anchor-Bolt projects. Company profile figures are available on request.
        </p>
      </div>
    </footer>
  );
}
