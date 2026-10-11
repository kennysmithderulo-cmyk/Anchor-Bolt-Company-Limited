import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMPANY, NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-border bg-background">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label={`${COMPANY.name} home`}>
          <span className="h-3.5 w-3.5 shrink-0 bg-accent" aria-hidden="true" />
          <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.08em]">
            Anchor-Bolt
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative py-1.5 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-200",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-[width] after:duration-200",
                  isActive
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={COMPANY.phoneHref}
            className="hidden items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:text-foreground xl:flex"
          >
            <Phone className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            {COMPANY.phoneDisplay}
          </a>
          <Button asChild variant="heroPill" size="pill" className="hidden md:inline-flex">
            <Link to="/contact">Request Consultation</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors duration-200 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col justify-between overflow-y-auto border-t border-border bg-background px-6 py-8 lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between border-b border-border py-4 font-display text-[26px] font-bold uppercase tracking-[0.03em]",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )
                }
              >
                {item.label}
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Button asChild variant="heroPill" size="pill">
              <Link to="/contact">Request Consultation</Link>
            </Button>
            <Button asChild variant="ghostPill" size="pill">
              <a href={COMPANY.whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp {COMPANY.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
