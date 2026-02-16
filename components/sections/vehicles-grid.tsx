import { CarFront, ChevronRight } from "lucide-react";

import { vehicleTypes } from "@/lib/site-data";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type VehiclesGridProps = {
  showHeading?: boolean;
};

export function VehiclesGrid({ showHeading = true }: VehiclesGridProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Vehicles"
            title="Membership Vehicle Categories"
            description="Current inventory rotates often. These categories show the typical style of vehicles available in each plan."
            align="center"
          />
        ) : null}

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {vehicleTypes.map((vehicle) => (
            <article
              key={vehicle.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex rounded-lg bg-[#eef4fb] p-2">
                  <CarFront className="h-5 w-5 text-[#2a67ad]" />
                </div>
                <span className="rounded-full bg-[#f0f7ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2a67ad]">
                  {vehicle.plan}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1f3553]">{vehicle.name}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {vehicle.summary}
              </p>
              <ButtonLink
                href="/join"
                variant="secondary"
                className="mt-6 inline-flex gap-2"
              >
                Start Membership
                <ChevronRight className="h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
