import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServicesLedger } from "@/components/site/ServicesLedger";

const SERVICES_IMAGE =
  "https://images.unsplash.com/photo-1603239564387-c5b5ea6f635e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwd29ya2VycyUyMHNjYWZmb2xkaW5nJTIwc3RlZWwlMjBmcmFtZXxlbnwwfHx8fDE3OTAzNTc2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Construction services delivered to specification"
        description="Building construction, residential and commercial development, civil and structural works, renovation, project management and real-estate solutions."
        image={SERVICES_IMAGE}
        imageAlt="Construction worker on scaffolding beside a building under construction"
      />

      <section>
        <div className="mx-auto max-w-[1200px] px-6 pt-20 lg:pt-24">
          <SectionHeading
            eyebrow="Eight service lines"
            title="Scope, deliverables and how we work"
            description="Each service line below lists what is included and what you receive. If your project spans more than one, we coordinate it as a single managed package."
          />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 pb-16 lg:pb-20">
          <ServicesLedger variant="full" />
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure where to start?"
        title="Not sure which service you need?"
        description="Describe the project and we will tell you which service line fits, what it involves and what it will take."
        primaryLabel="Request a Consultation"
        primaryTo="/contact"
      />
    </>
  );
}
