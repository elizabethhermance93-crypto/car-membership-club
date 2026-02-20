"use client";

import Link from "next/link";
import { ChevronDown, MapPin, Search, X } from "lucide-react";
import { LineSpinner } from "@/components/ui/LineSpinner";
import { VehicleListCard } from "@/components/vehicles/VehicleListCard";
import type { InventoryItem } from "@/content/siteContent";

const locationOptions = [
  "Zipsters, LLC. - 1501 Oreilly Ct., Austin, TX 78734",
  "Lakeway, TX",
  "Bee Cave, TX",
  "West Lake Hills, TX",
  "Round Rock, TX",
  "Cedar Park, TX",
];

export type VehicleListFullScreenItem = {
  vehicle: InventoryItem;
  logoUrl: string | undefined;
};

type VehicleListFullScreenProps = {
  list: VehicleListFullScreenItem[];
  queryRaw: string;
  typeParam: string;
};

export function VehicleListFullScreen({
  list,
  queryRaw,
  typeParam,
}: VehicleListFullScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-950 pt-[72px]">
      <LineSpinner />
      <header className="sticky top-[72px] z-30 shrink-0 border-b border-stone-700/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
          <form
            action="/vehicles"
            method="get"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-stone-600/60 px-2 py-1.5 focus-within:border-amber-500/50"
          >
            {typeParam ? <input type="hidden" name="type" value={typeParam} /> : null}
            <input
              type="text"
              name="q"
              defaultValue={queryRaw}
              placeholder="Search make, model, year..."
              className="min-w-0 flex-1 bg-transparent py-2 pl-2 text-sm text-white placeholder:text-stone-500 focus:outline-none"
            />
            <div className="flex items-center gap-1">
              <details className="relative [&>div]:pointer-events-none [&>div]:opacity-0 [&>div]:scale-y-95 [&>div]:transition-all [&>div]:duration-200 [&[open]>div]:pointer-events-auto [&[open]>div]:opacity-100 [&[open]>div]:scale-y-100">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded px-2 py-1.5 text-xs font-medium text-stone-400 transition-colors hover:text-stone-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                  <MapPin className="h-3.5 w-3.5" />
                  All Locations
                  <ChevronDown className="h-3.5 w-3.5" />
                </summary>
                <div className="absolute right-0 z-20 mt-1 w-72 origin-top overflow-hidden rounded-md border border-stone-600 bg-stone-800 shadow-xl">
                  <div className="max-h-56 overflow-y-auto p-1">
                    {locationOptions.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        className="block w-full rounded px-2 py-2 text-left text-xs text-stone-300 transition-colors hover:bg-stone-700"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </details>
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1 rounded-md bg-amber-500 px-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </form>
          <Link
            href="/vehicles"
            className="inline-flex h-9 items-center gap-1 rounded-md border border-stone-600 bg-stone-800 px-3 text-sm font-medium text-stone-300 transition-colors hover:border-stone-500 hover:bg-stone-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <X className="h-4 w-4" />
            Clear
          </Link>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="mb-4 text-lg font-bold text-stone-200 sm:text-xl">
            {list.length > 0
              ? `${list.length} vehicle${list.length === 1 ? "" : "s"} found`
              : "No vehicles match"}
          </h2>
          {list.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map(({ vehicle, logoUrl }) => (
                <VehicleListCard key={vehicle.id} vehicle={vehicle} logoUrl={logoUrl} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-stone-700 bg-stone-800/80 px-4 py-6 text-center text-stone-400">
              No vehicles match your search or filter. Try a different keyword or category.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
