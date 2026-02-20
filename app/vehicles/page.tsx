import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ExternalLink, MapPin, Search } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";
import { FeaturedVehicleCarousel } from "@/components/vehicles/FeaturedVehicleCarousel";
import { siteContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Browse inventory categories, featured vehicles, and latest additions.",
};

const locationOptions = [
  "Zipsters, LLC. - 1501 Oreilly Ct., Austin, TX 78734",
  "Lakeway, TX",
  "Bee Cave, TX",
  "West Lake Hills, TX",
  "Round Rock, TX",
  "Cedar Park, TX",
];

const nextSteps = [
  { title: "", image: "/images/discover-brand.png" },
  { title: "", image: "/images/trading.png" },
  { title: "", image: "/images/find-pricing.png" },
  { title: "", image: "/images/how-to-use-mobile.png" },
];

/** First 6 vehicles from inventory for the vehicle cards section (year, make, model + image). */
function getVehicleCards() {
  return siteContent.inventory.slice(0, 6).map((v) => ({
    id: v.id,
    label: `${v.make}`,
    membershipTier: v.membershipTier,
    image: v.image,
  }));
}

/** Featured vehicle groups: each vehicle has 3 panels (left interior, center car, right interior). */
function getFeaturedVehicleGroups() {
  return siteContent.inventory.slice(0, 4).map((v) => {
    const name = `${v.year} ${v.make} ${v.model} · ${v.membershipTier}`;
    return {
      id: v.id,
      name,
      leftImage: v.thumbnails[1],
      centerImage: v.image,
      rightImage: v.thumbnails[2],
    };
  });
}

/** Latest addition: most recent model year in inventory, or undefined if empty. */
function getLatestAddition() {
  const sorted = [...siteContent.inventory].sort((a, b) => b.year - a.year);
  return sorted[0] ?? undefined;
}

type VehiclesPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const queryRaw = (searchParams?.q ?? "").trim();
  const query = queryRaw.trim().toLowerCase();
  const vehicleCards = getVehicleCards();
  const brandCards = siteContent.brandLogos.map((b) => ({ label: b.name, logo: b.image }));
  const featuredVehicleGroups = getFeaturedVehicleGroups();
  const latestAddition = getLatestAddition();
  const filteredVehicleCards = query
    ? vehicleCards.filter((card) => card.label.toLowerCase().includes(query))
    : vehicleCards;
  const filteredBrands = query
    ? brandCards.filter((brand) => brand.label.toLowerCase().includes(query))
    : brandCards;
  const hasNoMatches = filteredVehicleCards.length === 0 && filteredBrands.length === 0;

  return (
    <section className="relative overflow-hidden bg-stone-100 py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <PrismBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-white/65 dark:bg-black/45" />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-600 sm:text-sm">
            Inventory
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Browse Vehicles
          </h1>
        </div>

        <form
          action="/vehicles"
          method="get"
          className="sticky top-[78px] z-20 mx-auto mt-6 max-w-4xl rounded-md border border-stone-300/70 bg-white/95 p-2.5 shadow-sm backdrop-blur-sm sm:p-3"
        >
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              type="text"
              name="q"
              defaultValue={queryRaw}
              placeholder="Search make, model, year or plan..."
              className="h-11 w-full min-w-0 rounded-sm border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
            />
            <div className="flex items-center justify-end gap-2">
              <details className="relative [&>div]:pointer-events-none [&>div]:opacity-0 [&>div]:scale-y-95 [&>div]:transition-all [&>div]:duration-200 [&[open]>div]:pointer-events-auto [&[open]>div]:opacity-100 [&[open]>div]:scale-y-100">
                <summary className="inline-flex h-11 cursor-pointer list-none items-center gap-1 rounded-sm border border-stone-300 bg-white px-3 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">
                  <MapPin className="h-3.5 w-3.5" />
                  All Locations
                  <ChevronDown className="h-3.5 w-3.5" />
                </summary>
                <div className="absolute right-0 z-20 mt-1 w-72 origin-top overflow-hidden rounded-md border border-stone-200 bg-white shadow-lg">
                  <div className="max-h-56 overflow-y-auto p-1">
                    {locationOptions.map((location) => (
                      <button
                        key={location}
                        type="button"
                        className="block w-full cursor-pointer rounded px-2 py-2 text-left text-xs text-stone-700 transition-colors hover:bg-stone-100"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              </details>
              <button
                type="submit"
                className="inline-flex h-11 cursor-pointer items-center gap-1 rounded-sm bg-stone-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-yellow-500 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
          {queryRaw ? (
            <div className="mt-2 text-right">
              <Link
                href="/vehicles"
                className="text-xs font-medium text-amber-600 hover:text-amber-700"
              >
                Clear search
              </Link>
            </div>
          ) : null}
        </form>

        <div className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {filteredVehicleCards.map((card) => (
            <article
              key={card.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-stone-300/70 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-xl hover:shadow-stone-400/30"
            >
              <div className="relative h-36 w-full">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 text-center text-sm font-bold leading-tight text-white drop-shadow-md sm:text-base lg:text-lg">
                  {card.label}
                </p>
                <p className="absolute right-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white sm:text-xs">
                  {card.membershipTier}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid w-full grid-cols-8 gap-2 lg:gap-3">
          {filteredBrands.map((brand) => (
            <article
              key={brand.label}
              className="group flex min-h-[88px] cursor-pointer flex-col items-center justify-center rounded-xl border border-stone-300/70 bg-gradient-to-b from-white to-stone-50 p-2 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-400 hover:from-white hover:to-stone-100 hover:shadow-lg hover:shadow-stone-400/30 lg:min-h-[96px] lg:p-2.5"
            >
              <div className="relative h-9 w-12 shrink-0 lg:h-10 lg:w-14">
                <Image
                  src={brand.logo}
                  alt={brand.label}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <p className="mt-1.5 line-clamp-2 text-[11px] font-semibold leading-tight text-stone-900 lg:mt-2 lg:text-xs">{brand.label}</p>
            </article>
          ))}
          <Link
            href="/#vehicles"
            className="flex min-h-[88px] flex-col items-center justify-center rounded-xl border border-stone-300/70 bg-white/95 p-2 text-center text-stone-900 transition-colors hover:bg-white hover:shadow-lg hover:shadow-stone-400/30 lg:min-h-[96px] lg:p-2.5"
          >
            <ExternalLink className="h-5 w-5 shrink-0 lg:h-6 lg:w-6" />
            <p className="mt-1.5 line-clamp-2 text-[11px] font-semibold leading-tight lg:mt-2 lg:text-xs">View All Brands</p>
          </Link>
        </div>
        {hasNoMatches ? (
          <div className="mt-5 rounded-xl border border-yellow-500/40 bg-yellow-100 p-4 text-sm text-yellow-900">
            No vehicle or brand matched your search. Try a broader keyword.
          </div>
        ) : null}

        <div className="mt-12">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600">
            Featured Vehicle
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold text-stone-900">Premium Selection</h2>
          <FeaturedVehicleCarousel groups={featuredVehicleGroups} />
        </div>

        {latestAddition ? (
        <article className="mt-10 overflow-hidden rounded-2xl border border-stone-300/70 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr] lg:items-stretch">
            <div className="relative h-56 cursor-pointer overflow-hidden rounded-xl sm:h-64">
              <Image
                src={latestAddition.image}
                alt={`${latestAddition.year} ${latestAddition.make} ${latestAddition.model}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 35vw"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600">
                Latest Addition
              </p>
              <h2 className="mt-2 text-3xl font-bold text-stone-900">
                {latestAddition.year} {latestAddition.make} {latestAddition.model}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                {latestAddition.blurb ??
                  `Premium ${latestAddition.make} ${latestAddition.model} available with Zipsters ${latestAddition.membershipTier} membership. Well-maintained, luxury interior and modern features.`}
              </p>
              <div className="mt-auto flex justify-end pt-5">
                <div className="text-right">
                  <p className="text-4xl font-extrabold tracking-tight text-yellow-500">ZIPSTERS</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-600">
                    {latestAddition.membershipTier} membership
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
        ) : null}

        <div className="mt-12">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600">
            Next Steps
          </p>
          <h3 className="mt-2 text-center text-3xl font-bold text-stone-900 sm:text-4xl">
            Explore. Experience. Enjoy.
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((step) => (
              <div className="group relative h-72 cursor-pointer overflow-hidden rounded-xl border border-stone-300/70 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-xl hover:shadow-stone-400/30" key={step.image}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
                <p className="absolute bottom-5 left-4 right-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
