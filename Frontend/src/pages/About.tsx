import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PillarGrid } from "@/components/site/PillarGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhyChoose } from "@/components/site/WhyChoose";
import { getServices } from "@/lib/api";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1608303588026-884930af2559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8M3x8YXJjaGl0ZWN0JTIwYmx1ZXByaW50JTIwc2l0ZSUyMHBsYW5zJTIwZW5naW5lZXIlMjBkcmF3aW5nc3xlbnwwfHx8fDE3OTAzNTc2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function About() {
  const { data: services } = useQuery({ queryKey: ["services"], queryFn: getServices });

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Dependable construction, built to be lived in"
        description="Anchor-Bolt Company Limited is a construction and real-estate development company working from Airport Ridge, Sekondi-Takoradi, across Ghana's Western Region."
        image={ABOUT_IMAGE}
        imageAlt="Project team reviewing architectural drawings on site"
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who we are" title="Strength, precision and reliability" />
          </div>
          <div className="space-y-5 text-[16px] leading-[1.7] text-muted-foreground lg:col-span-7">
            <p>
              Anchor-Bolt Company Limited delivers dependable construction and property-development solutions,
              maintaining high standards of workmanship, safety, quality and customer satisfaction throughout
              every project we take on.
            </p>
            <p>
              We work as one accountable team across design coordination, civil and structural works, building
              construction and project management. That single line of responsibility means fewer gaps between
              trades, clearer reporting, and a finished building that matches what was agreed.
            </p>
            <p>
              Our approach is straightforward: understand the requirement properly, plan it in writing, build it
              with quality and precision, then review the finished project with the client before we call it
              complete.
            </p>
            <p className="border-l-2 border-accent pl-5 text-[15px] italic text-foreground">
              Detailed company profile information — registrations, classifications and references — is available
              on request. Figures such as years in operation and completed project counts can be published here
              once confirmed by the company.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="Our commitments"
            title="What we are measured on"
            description="Four company-wide commitments that shape how every Anchor-Bolt project is planned, built and handed over."
          />
          <PillarGrid />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="Why Anchor-Bolt"
            title="Why clients choose us"
            description="Quality workmanship, attention to detail, reliable delivery, professional standards, transparent communication and customer-focused service."
          />
          <WhyChoose />
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="Capabilities"
            title="Our service lines"
            description="Eight disciplines delivered in-house or as a managed package, from first groundworks to final handover."
          />
          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
            {(services ?? []).map((service) => (
              <Link
                key={service.id}
                to={`/services#${service.slug}`}
                className="group flex items-start justify-between gap-6 bg-background px-6 py-6 transition-colors duration-300 hover:bg-muted"
              >
                <span className="flex gap-5">
                  <span className="font-display text-[24px] font-bold leading-none tabular-nums text-accent">
                    {service.index}
                  </span>
                  <span>
                    <span className="block font-display text-[20px] font-bold uppercase leading-[1.1] tracking-[0.02em]">
                      {service.title}
                    </span>
                    <span className="mt-2 block text-[15px] leading-[1.6] text-muted-foreground">
                      {service.summary}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="Start with a conversation"
        description="Tell us what you are planning and we will advise on scope, sequence and cost."
        primaryLabel="Request a Consultation"
        primaryTo="/contact"
      />
    </>
  );
}
