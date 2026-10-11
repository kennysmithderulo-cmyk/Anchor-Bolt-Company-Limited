import { img } from "@/lib/site";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

/** Photo or drafting-sheet page header used by every inner page. */
export function PageHeader({ eyebrow, title, description, image, imageAlt }: PageHeaderProps) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden">
        <img
          src={img(image, 2400)}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-scrim" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-6 pb-14 pt-36 lg:pb-16 lg:pt-44">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent-on-dark)]">{eyebrow}</p>
          <span className="mt-3 block h-[2px] w-12 bg-accent" aria-hidden="true" />
          <h1 className="mt-4 max-w-4xl font-display text-[36px] font-bold uppercase leading-[1.02] tracking-[0.02em] text-sidebar-foreground lg:text-[56px]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.6] text-sidebar-foreground/80">
              {description}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-14 lg:pb-12 lg:pt-20">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        <span className="mt-3 block h-[2px] w-12 bg-accent" aria-hidden="true" />
        <h1 className="mt-4 max-w-4xl font-display text-[34px] font-bold uppercase leading-[1.03] tracking-[0.02em] lg:text-[52px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.6] text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
