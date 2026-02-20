import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteContent } from "@/content/siteContent";
import { InventoryView } from "@/components/vehicles/InventoryView";

function getVehicleById(id: string) {
  return siteContent.inventory.find((v) => v.id === id) ?? null;
}

function getLogoForMake(make: string): string | undefined {
  return siteContent.brandLogos.find((b) => b.name === make)?.image;
}

/** Weekly membership dues for the vehicle's tier (e.g. "$150"). */
function getWeeklyDuesForTier(membershipTier: string): string {
  const plan = siteContent.plans.find(
    (p) => p.name.toLowerCase() === membershipTier.toLowerCase()
  );
  return plan?.price ?? "$—";
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) return { title: "Vehicle Not Found" };
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  return {
    title,
    description: vehicle.blurb ?? `${title} — ${vehicle.membershipTier} membership.`,
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) notFound();

  const logoUrl = getLogoForMake(vehicle.make);
  const weeklyDues = getWeeklyDuesForTier(vehicle.membershipTier);

  return (
    <InventoryView
      vehicle={vehicle}
      logoUrl={logoUrl}
      weeklyDues={weeklyDues}
    />
  );
}
