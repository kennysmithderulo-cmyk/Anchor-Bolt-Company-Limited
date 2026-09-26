import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { PillarGrid } from "@/components/site/PillarGrid";
import { ProcessLedger } from "@/components/site/ProcessLedger";
import { ProjectsLedger } from "@/components/site/ProjectsLedger";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServicesLedger } from "@/components/site/ServicesLedger";
import { WhyChoose } from "@/components/site/WhyChoose";
import { COMPANY, img } from "@/lib/site";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1673978481178-b4d72cfd2fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwc2l0ZSUyMGV4Y2F2YXRvciUyMGNyYW5lJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzkwMzU3NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080";

const NEXT_STEPS = [
  "We review your enquiry and call you back within one business day.",
  "We agree a site visit and work through the scope with you.",
  "You receive a written scope, programme and cost plan to proceed.",
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={img(HERO_IMAGE, 2400)}
          alt="Tower crane and reinforced concrete frame on a building site under construction"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-scrim" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[84vh] max-w-[1200px] flex-col justify-end px-6 pb-10 pt-36">
          <p className="animate-fade-up text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--accent-on-dark)]">
            Sekondi-Takoradi · Ghana
          </p>
          <h1 className="stagger-1 mt-4 max-w-4xl animate-fade-up font-display text-[38px] font-bold uppercase leading-[0.98] tracking-[0.02em] text-sidebar-foreground sm:text-[50px] lg:text-[64px]">
            Building Strong Foundations. Creating Lasting Value.
          </h1>
          <p className="stagger-2 mt-6 max-w-2xl animate-fade-up text-[16px] leading-[1.6] text-sidebar-foreground/85 lg:text-[18px]">
            Anchor-Bolt Company Limited delivers quality construction and real-estate solutions built on
            strength, precision, and reliability.
          </p>
          <div className="stagger-3 mt-8 flex flex-wrap gap-3 animate-fade-up">
            <Button asChild variant="lightPill" size="pill">
              <Link to="/contact">Get a Quote</Link>
            </Button>
            <Button asChild variant="heroOutline" size="pill">
              <Link to="/our-work">Explore Our Projects</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[color:var(--rule-on-dark)] pt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground">
            <span>Construction</span>
            <span className="h-1 w-1 bg-accent" aria-hidden="true" />
            <span>Real Estate</span>
            <span className="h-1 w-1 bg-accent" aria-hidden="true" />
            <span>Project Development</span>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="About Anchor-Bolt"
            title="Four commitments we hold on every project"
            description="Anchor-Bolt Company Limited is committed to delivering dependable construction and property-development solutions while maintaining high standards of workmanship, safety, quality and customer satisfaction."
          />
          <PillarGrid />
          <div className="mt-8">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-foreground"
            >
              More about the company
              <ArrowRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="What we do"
            title="Construction and development, delivered end to end"
            description="From building construction and residential development to civil works and project management — one accountable team across the whole delivery chain."
          />
          <ServicesLedger variant="summary" limit={3} />
          <div className="mt-10">
            <Button asChild variant="ghostPill" size="pill">
              <Link to="/services">View all services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="Why Anchor-Bolt"
            title="Why clients choose us"
            description="Strength, reliability and precision are not slogans on our sites — they are the standards we are measured against every week."
          />
          <WhyChoose />
        </div>
      </section>

      <CtaBand
        eyebrow="Our commitment"
        title={COMPANY.tagline}
        description={COMPANY.statement}
        primaryLabel="Request a Consultation"
        primaryTo="/contact"
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="How we work"
            title="From consultation to completion"
            description="A clear four-stage process, so you always know what happens next and what it delivers."
          />
          <ProcessLedger variant="compact" />
          <div className="mt-10">
            <Link
              to="/process"
              className="group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-foreground"
            >
              See how we work in detail
              <ArrowRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow="Our Work"
            title="Building in the Western Region"
            description="A representative selection of our project ledger. Sample entries are marked, and will be replaced with verified Anchor-Bolt projects."
          />
          <ProjectsLedger limit={3} showFilters={false} />
          <div className="mt-10">
            <Button asChild variant="ghostPill" size="pill">
              <Link to="/our-work">Explore all projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk about your project"
              description="Tell us what you are planning. We will review it and come back to you with practical next steps — no obligation."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="heroPill" size="pill">
                <Link to="/contact">Request a Consultation</Link>
              </Button>
              <Button asChild variant="ghostPill" size="pill">
                <a href={COMPANY.phoneHref}>
                  <Phone className="h-4 w-4" strokeWidth={2} /> Call {COMPANY.phoneDisplay}
                </a>
              </Button>
            </div>
            <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                <div>
                  <dt className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Address
                  </dt>
                  <dd className="mt-1 text-[15px] leading-[1.6]">
                    {COMPANY.street}
                    <br />
                    {COMPANY.city}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                <div>
                  <dt className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Office hours
                  </dt>
                  <dd className="mt-1 text-[15px] leading-[1.6]">{COMPANY.hours}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full bg-muted p-6 lg:p-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent">What happens next</p>
              <ol className="mt-6 space-y-5">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-4 border-b border-border pb-5 last:border-b-0 last:pb-0">
                    <span className="font-display text-[20px] font-bold leading-none tabular-nums text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-[1.6]">{step}</span>
                  </li>
                ))}
              </ol>
              <Button asChild variant="ghostPill" size="pill" className="mt-8 w-full">
                <a href={COMPANY.whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" strokeWidth={2} /> Message us on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
