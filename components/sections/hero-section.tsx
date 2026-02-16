import Image from "next/image";
import { BadgeCheck, CarFront, Repeat, ShieldCheck } from "lucide-react";

import { heroBullets } from "@/lib/site-data";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const trustStats = [
  { label: "Years Serving Members", value: "3+" },
  { label: "Membership Billing", value: "Weekly" },
  { label: "Credit Check", value: "Not Required" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-[#eef4fb] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(42,103,173,0.14),transparent_40%)]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b88719]">
            Join. Drive. Swap.
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1f3553] sm:text-5xl">
            Car Membership Built for Real Life
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
            Zipsters gives you a smarter path to reliable transportation with
            clear weekly dues, transparent requirements, and membership
            flexibility designed for everyday drivers.
          </p>

          <ul className="mt-7 space-y-3">
            {heroBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#2a67ad]" />
                <span className="text-sm text-slate-700 sm:text-base">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/vehicles">View Vehicles</ButtonLink>
            <ButtonLink href="/join" variant="secondary">
              Join Membership
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/refresh-the-look-logo.png"
              alt="Refresh The Look USA logo"
              width={70}
              height={88}
              className="rounded-lg"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#2a67ad]">
                Refresh The Look USA
              </p>
              <p className="text-xl font-bold text-[#1f3553]">Zipsters Membership</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-[#f5f8fd] p-4 text-center"
              >
                <p className="text-lg font-extrabold text-[#1f3553]">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 rounded-2xl border border-[#2a67ad]/15 bg-[#f9fbff] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#1f3553]">
              <CarFront className="h-4 w-4 text-[#2a67ad]" />
              Membership plans start at $125/week
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#1f3553]">
              <ShieldCheck className="h-4 w-4 text-[#2a67ad]" />
              Insurance options available
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#1f3553]">
              <Repeat className="h-4 w-4 text-[#2a67ad]" />
              Swap within your membership tier
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
