import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsultationForm } from "@/components/site/ConsultationForm";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { COMPANY } from "@/lib/site";

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request a consultation"
        description="Share your project details and our team will respond within one business day. For urgent enquiries, call or message us directly."
      />

      <section>
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 pb-16 pt-10 lg:grid-cols-12 lg:pb-24 lg:pt-12">
          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-muted p-6 lg:p-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent">Company details</p>
              <h2 className="mt-3 font-display text-[24px] font-bold uppercase leading-[1.1] tracking-[0.02em]">
                {COMPANY.name}
              </h2>
              <ul className="mt-7 space-y-6">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Address
                    </p>
                    <p className="mt-1 text-[15px] leading-[1.6]">
                      {COMPANY.street}
                      <br />
                      {COMPANY.city}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Phone
                    </p>
                    <a
                      href={COMPANY.phoneHref}
                      className="mt-1 block text-[15px] font-medium transition-colors duration-200 hover:text-accent"
                    >
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Office hours
                    </p>
                    <p className="mt-1 text-[15px] leading-[1.6]">{COMPANY.hours}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 border-t-2 border-accent pt-5">
                <p className="text-[14px] leading-[1.6] text-muted-foreground">
                  We respond within one business day. Site visits are arranged across the Western Region and
                  beyond by appointment.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Button asChild variant="heroPill" size="pill">
                  <a href={COMPANY.whatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" strokeWidth={2} /> WhatsApp {COMPANY.phoneDisplay}
                  </a>
                </Button>
                <Button asChild variant="ghostPill" size="pill">
                  <a href={COMPANY.phoneHref}>
                    <Phone className="h-4 w-4" strokeWidth={2} /> Call now
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
          <SectionHeading
            eyebrow="Find us"
            title="Airport Ridge, Sekondi-Takoradi"
            description="Our office is on Sanderling Street in Airport Ridge. Visits are welcome by appointment."
          />
          <div className="mt-8 border border-border">
            <iframe
              title={`Map showing ${COMPANY.name}, ${COMPANY.fullAddress}`}
              src={COMPANY.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full lg:h-[460px]"
            />
          </div>
          <a
            href={COMPANY.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="group mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-foreground"
          >
            Open in Google Maps
            <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
          </a>
        </div>
      </section>
    </>
  );
}
