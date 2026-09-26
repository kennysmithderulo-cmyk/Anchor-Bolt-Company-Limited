import { MessageCircle, Phone } from "lucide-react";

import { COMPANY } from "@/lib/site";

/** Mobile conversion bar: click-to-call plus WhatsApp. */
export function ContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background md:hidden">
      <a
        href={COMPANY.phoneHref}
        className="flex items-center justify-center gap-2 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-foreground transition-colors duration-200 hover:bg-muted"
      >
        <Phone className="h-4 w-4 text-accent" strokeWidth={2} />
        Call Now
      </a>
      <a
        href={COMPANY.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 border-l border-border bg-primary py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors duration-200 hover:bg-[var(--primary-hover)]"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
        WhatsApp
      </a>
    </div>
  );
}
