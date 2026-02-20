"use client";

import Image from "next/image";
import Link from "next/link";
import { type InventoryItem } from "@/content/siteContent";

type VehicleListCardProps = {
  vehicle: InventoryItem;
  logoUrl: string | undefined;
};

export function VehicleListCard({ vehicle, logoUrl }: VehicleListCardProps) {
  const displayName = `${vehicle.make} ${vehicle.model}`;
  const variant = vehicle.type || vehicle.membershipTier;

  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-300/80 bg-stone-100 shadow-md shadow-stone-400/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/20 focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:ring-offset-2 focus-within:ring-offset-stone-200 [--card-bg:theme(colors.stone.100)] hover:[--card-bg:transparent]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-amber-300 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex flex-1 flex-col bg-[var(--card-bg)] p-4 transition-colors duration-300 group-hover:bg-transparent">
        {logoUrl ? (
          <div className="relative mb-3 h-8 w-14 shrink-0">
            <Image
              src={logoUrl}
              alt={vehicle.make}
              fill
              className="object-contain object-left transition-transform duration-300 group-hover:scale-110"
              unoptimized
            />
          </div>
        ) : null}
        <h3 className="text-lg font-bold text-stone-900 transition-colors duration-300 group-hover:text-white">{displayName}</h3>
        <p className="mt-0.5 text-sm text-stone-600 transition-colors duration-300 group-hover:text-stone-200">{variant}</p>
      </div>
      <div className="relative h-40 w-full overflow-hidden sm:h-44">
        <Image
          src={vehicle.image}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Link>
  );
}
