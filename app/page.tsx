import type { Metadata } from "next";

import { HomeLanding } from "@/components/landing/home-landing";

export const metadata: Metadata = {
  title: "Zipsters Car Membership Club",
  description:
    "Join Zipsters car membership with weekly dues, flexible swaps, and transparent membership plans.",
};

export default function HomePage() {
  return <HomeLanding />;
}
