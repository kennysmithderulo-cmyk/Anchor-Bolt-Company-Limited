import {
  CalendarClock,
  HardHat,
  HeartHandshake,
  MessagesSquare,
  Ruler,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { WHY_CHOOSE } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  hardhat: HardHat,
  ruler: Ruler,
  calendar: CalendarClock,
  shield: ShieldCheck,
  messages: MessagesSquare,
  handshake: HeartHandshake,
};

/** Why clients choose Anchor-Bolt — six hairline-ruled commitments. */
export function WhyChoose() {
  return (
    <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {WHY_CHOOSE.map((item, index) => {
        const Icon = ICONS[item.icon] ?? ShieldCheck;
        return (
          <Reveal key={item.title} delay={index * 60} className="h-full bg-background">
            <article className="flex h-full flex-col px-6 py-8 transition-colors duration-300 hover:bg-muted">
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.6} />
              <h3 className="mt-6 font-display text-[20px] font-bold uppercase leading-[1.1] tracking-[0.02em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{item.description}</p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
