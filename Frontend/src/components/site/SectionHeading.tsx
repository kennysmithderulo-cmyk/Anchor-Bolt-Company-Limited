import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Eyebrow + gold rule + condensed uppercase heading — the section lockup. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-[12px] font-bold uppercase tracking-[0.14em]",
            dark ? "text-accent" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <span className="mt-3 block h-[2px] w-12 bg-accent" aria-hidden="true" />
      <h2
        className={cn(
          "mt-4 font-display text-[30px] font-bold uppercase leading-[1.04] tracking-[0.02em] sm:text-[38px] lg:text-[46px]",
          dark ? "text-sidebar-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-[16px] leading-[1.6]",
            dark ? "text-sidebar-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
