import { Check } from "lucide-react";

import { membershipPlans } from "@/lib/site-data";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const planStyles: Record<
  string,
  { card: string; title: string; price: string; badge?: string }
> = {
  Silver: {
    card: "bg-gradient-to-b from-[#61bacb] to-[#178fe0]",
    title: "text-[#0d6ac2]",
    price: "text-white",
  },
  Gold: {
    card: "bg-gradient-to-b from-[#e6c63a] to-[#34b88f]",
    title: "text-[#139688]",
    price: "text-white",
    badge: "Most Popular",
  },
  Platinum: {
    card: "bg-gradient-to-b from-[#f0c754] to-[#f47d21]",
    title: "text-[#ff5d1e]",
    price: "text-white",
  },
  Exotics: {
    card: "bg-gradient-to-b from-[#325c94] to-[#1f3553]",
    title: "text-[#b6cdf4]",
    price: "text-white",
  },
};

export function MembershipCards() {
  return (
    <section className="py-16 sm:py-20" id="memberships">
      <Container>
        <SectionHeading
          eyebrow="Memberships"
          title="Membership Plans"
          description="Clear weekly dues, transparent one-time fees, and flexible options for different vehicle tiers."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {membershipPlans.map((plan) => {
            const style = planStyles[plan.name];

            return (
              <article
                key={plan.name}
                className={`relative rounded-3xl p-6 shadow-xl shadow-slate-200/60 ${style.card}`}
              >
                {style.badge ? (
                  <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {style.badge}
                  </span>
                ) : null}

                <h3 className={`text-4xl font-black uppercase ${style.title}`}>
                  {plan.name}
                </h3>
                <p className="mt-5 text-sm font-semibold text-white/90">
                  vehicles starting at
                </p>
                <p className={`mt-1 text-5xl font-extrabold ${style.price}`}>
                  ${plan.weeklyPrice}
                  <span className="text-2xl font-semibold">/week</span>
                </p>
                <p className="mt-2 text-sm text-white/90">
                  one-time membership fee of ${plan.oneTimeFee}
                </p>
                <p className="mt-2 text-sm text-white/95">{plan.description}</p>
                <div className="my-5 h-px bg-white/50" />

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-white">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/vehicles"
                  className="mt-8 w-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                  variant="secondary"
                >
                  View Vehicles
                </ButtonLink>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
