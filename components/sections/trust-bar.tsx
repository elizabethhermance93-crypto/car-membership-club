import { CircleCheckBig } from "lucide-react";

import { trustHighlights } from "@/lib/site-data";
import { Container } from "@/components/ui/container";

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white py-5">
      <Container>
        <ul className="grid gap-3 md:grid-cols-3">
          {trustHighlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-[#2a67ad]" />
              <span className="text-sm font-medium text-slate-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
