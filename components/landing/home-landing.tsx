import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { faqItems } from "@/lib/site-data";

const brandLogos = [
  { src: "/assets/posh/logo-porsche.0425572f.webp", alt: "Porsche" },
  { src: "/assets/posh/logo-mercedes.7fab82a1.webp", alt: "Mercedes-Benz" },
  { src: "/assets/posh/logo-bmw.38037f30.webp", alt: "BMW" },
  { src: "/assets/posh/logo-corvette.444868a4.webp", alt: "Corvette" },
  { src: "/assets/posh/logo-audi.5afecd8e.webp", alt: "Audi" },
  { src: "/assets/posh/logo-chevrolet.8140fe97.webp", alt: "Chevrolet" },
];

const problemCards = [
  {
    title: "Vehicle Depreciation",
    description:
      "New vehicles can lose 70-80% of their value over the term of a traditional auto loan.",
    image: "/assets/posh/depreciation.0bb6f6aa.webp",
  },
  {
    title: "High Interest Rates",
    description:
      "Financing rates can stack expensive interest charges and make monthly payments harder to manage.",
    image: "/assets/posh/interest.8efb1d8f.webp",
  },
  {
    title: "Insurance Premiums",
    description:
      "Insurance costs can rise quickly and become a major part of monthly driving expenses.",
    image: "/assets/posh/insurance.4067759e.webp",
  },
  {
    title: "Expensive Maintenance & Repairs",
    description:
      "Routine maintenance and unexpected repairs can create large and unpredictable out-of-pocket costs.",
    image: "/assets/posh/maintenance.c9c4560b.webp",
  },
];

const solutionItems = [
  {
    title: "Depreciation Losses",
    description:
      "The average car depreciates 70-80% over a loan term, leaving much lower value at payoff.",
  },
  {
    title: "High Interest Rates Eliminated",
    description: "There are no interest charges with a membership.",
  },
  {
    title: "Insurance Available",
    description: "Insurance can be added as an option through membership support.",
  },
  {
    title: "Zero Maintenance",
    description:
      "All routine maintenance is covered at no charge. A repair program is available for mechanical problems.",
  },
  {
    title: "Easy 5 Minute Deal",
    description: "No games, no gimmicks, and no application required.",
  },
  {
    title: "Less Paperwork Less Hassle",
    description:
      "A simple 9-page membership agreement is all the paperwork needed.",
  },
  {
    title: "Unlimited Mileage",
    description: "No mileage restrictions to worry about.",
  },
];

const membershipPlans = [
  {
    name: "Silver",
    weekly: "$125/week",
    fee: "Requires one-time fee of $1000",
    gradient: "from-[#61bacb] to-[#178fe0]",
    titleColor: "text-[#0d6ac2]",
  },
  {
    name: "Gold",
    weekly: "$150/week",
    fee: "Requires one-time fee of $1500",
    gradient: "from-[#e3c73f] to-[#34b88f]",
    titleColor: "text-[#139688]",
  },
  {
    name: "Platinum",
    weekly: "$200/week",
    fee: "Requires one-time fee of $2000",
    gradient: "from-[#f0c754] to-[#f47d21]",
    titleColor: "text-[#ff5d1e]",
  },
  {
    name: "Exotics",
    weekly: "$250/week",
    fee: "Requires one-time fee of $2500",
    gradient: "from-[#325c94] to-[#1f3553]",
    titleColor: "text-[#b6cdf4]",
  },
];

const stepItems = [
  {
    title: "Create an account",
    description: "Verify your phone number and upload your driver's license.",
    image: "/assets/posh/sign-up.a9a4f7ba.svg",
    alt: "Person creating account on a mobile device.",
  },
  {
    title: "Choose a plan",
    description:
      "Each membership plan includes different vehicles. You can swap to vehicles in your active plan.",
    image: "/assets/posh/choose-plan.572d5ac1.svg",
    alt: "Illustration of person selecting a checklist.",
  },
  {
    title: "Select a car",
    description:
      "After choosing a plan, select the vehicle you want to start with and confirm your membership.",
    image: "/assets/posh/choose-car.ab598b8e.svg",
    alt: "Illustration of person selecting a vehicle option.",
  },
  {
    title: "Drive away in style",
    description:
      "You can always check available cars and swap as needed based on your membership plan.",
    image: "/assets/posh/car.8755593e.svg",
    alt: "Illustration of person near a car.",
  },
];

function LandingHeader() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/refresh-the-look-logo.png"
            alt="Refresh The Look USA logo"
            width={44}
            height={56}
            priority
          />
          <div>
            <p className="text-xl font-black tracking-wide text-[#1f3553]">ZIPSTERS</p>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
              Membership Club
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link className="text-sm font-semibold text-slate-700 hover:text-[#2a67ad]" href="/vehicles">
            Vehicles
          </Link>
          <a className="text-sm font-semibold text-slate-700 hover:text-[#2a67ad]" href="#memberships">
            Memberships
          </a>
          <a className="text-sm font-semibold text-slate-700 hover:text-[#2a67ad]" href="#how-it-works">
            How it Works
          </a>
          <a className="text-sm font-semibold text-slate-700 hover:text-[#2a67ad]" href="#faq">
            FAQ
          </a>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/join">Join</ButtonLink>
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
            Menu
          </summary>
          <nav className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <a className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100" href="#memberships">
              Memberships
            </a>
            <a className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100" href="#how-it-works">
              How it Works
            </a>
            <a className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100" href="#faq">
              FAQ
            </a>
            <Link
              className="mt-1 block rounded-md bg-[#2a67ad] px-3 py-2 text-sm font-semibold text-white"
              href="/join"
            >
              Join
            </Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#f1c641] to-[#d89e07] px-6 py-12 text-[#1f3553]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_2fr_1fr]">
        <div>
          <p className="text-3xl font-black">ZIPSTERS</p>
          <p className="mt-2 text-sm font-medium">Refresh The Look USA</p>
          <p className="mt-4 text-sm">
            Flexible car membership with weekly dues and transparent requirements.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2 text-sm">
            <p className="font-bold">Company</p>
            <p>Memberships</p>
            <p>How it Works</p>
            <p>Vehicles</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold">Locations</p>
            <p>Dallas, TX</p>
            <p>Garland, TX</p>
            <p>Richardson, TX</p>
            <p>Irving, TX</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold">Legal</p>
            <Link href="/terms" className="block hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="block hover:underline">
              Privacy
            </Link>
            <Link href="/service-area" className="block hover:underline">
              Service Area
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-bold">Get the App</p>
          <a href="https://apps.apple.com/us/app/my-posh/id6498872817" target="_blank" rel="noreferrer">
            <Image
              src="/assets/posh/download-app-store.353d33f9.webp"
              alt="Download on the App Store"
              width={160}
              height={48}
            />
          </a>
          <Image
            src="/assets/posh/download-play-store.3e8ae67d.webp"
            alt="Download on Google Play"
            width={160}
            height={48}
          />
        </div>
      </div>
    </footer>
  );
}

export function HomeLanding() {
  return (
    <div className="bg-[#eef2f7]">
      <LandingHeader />

      <section className="relative overflow-hidden pb-12 pt-28">
        <Image
          src="/assets/posh/prism-bkg-light.021943f4.webp"
          alt=""
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-[#f3f7fd]/75 to-[#e6ecf6]/85" />

        <Container className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur sm:p-8">
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-4xl font-black tracking-tight sm:text-6xl">
              <p className="text-[#1f3553]">Join.</p>
              <p className="bg-gradient-to-br from-[#f0ce53] to-[#d79f1f] bg-clip-text text-transparent">
                Drive.
              </p>
              <p className="text-[#1f3553]">Swap.</p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex gap-3">
                <Circle className="mt-1 h-4 w-4 shrink-0 text-[#2a67ad]" />
                <div>
                  <p className="font-bold text-[#1f3553]">No Contracts. No Limits.</p>
                  <p className="text-sm text-slate-700">
                    Valid driver&apos;s license and full coverage insurance required.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Circle className="mt-1 h-4 w-4 shrink-0 text-[#2a67ad]" />
                <div>
                  <p className="font-bold text-[#1f3553]">Simple Weekly Dues</p>
                  <p className="text-sm text-slate-700">
                    Membership payments are weekly with transparent costs.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Circle className="mt-1 h-4 w-4 shrink-0 text-[#2a67ad]" />
                <div>
                  <p className="font-bold text-[#1f3553]">Freedom and Flexibility</p>
                  <p className="text-sm text-slate-700">
                    Drive what you want and swap or cancel anytime.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/vehicles" className="min-w-40">
                View Vehicles
              </ButtonLink>
              <ButtonLink href="/join" variant="secondary" className="min-w-40">
                Join
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[660px]">
            <Image
              src="/assets/posh/vehicle-porsche.b15b22ea.webp"
              alt="Featured membership vehicle"
              width={990}
              height={620}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </Container>

        <Container className="relative mt-10 hidden gap-8 lg:grid lg:grid-cols-6 lg:justify-items-center">
          {brandLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={110}
              height={60}
              className="h-12 w-auto object-contain"
            />
          ))}
        </Container>
      </section>

      <section className="px-4 py-14" id="problems">
        <Container>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b88719]">
              Problems With
            </p>
            <h2 className="mt-2 text-4xl font-black text-[#1f3553] sm:text-5xl">
              Buying <span className="text-[#d3a226]">&amp;</span> Leasing
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {problemCards.map((item) => (
              <article
                key={item.title}
                className="relative h-[360px] overflow-hidden rounded-2xl border border-slate-200 shadow-md"
              >
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-900/35 to-slate-950/75" />
                <div className="absolute inset-x-0 top-0 bg-white/55 px-4 py-3 backdrop-blur-sm">
                  <h3 className="text-center text-lg font-bold text-[#1f3553]">{item.title}</h3>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-white/70 px-4 py-3 backdrop-blur-sm">
                  <p className="text-sm text-slate-700">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[url('/assets/posh/prism-bkg-light.021943f4.webp')] bg-cover bg-center px-4 py-16">
        <Container>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b88719]">
              Solution
            </p>
            <h2 className="mt-2 text-4xl font-black text-[#1f3553] sm:text-5xl">
              Zipsters <span className="text-[#d3a226]">The Smarter Solution</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {solutionItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#12a66a]" />
                  <div>
                    <h3 className="text-2xl font-bold text-[#1f3553]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-4 py-16" id="memberships">
        <Container>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b88719]">
              Memberships
            </p>
            <h2 className="mt-2 text-4xl font-black text-[#1f3553] sm:text-6xl">
              Membership <span className="text-[#d3a226]">Plans</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {membershipPlans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-3xl bg-gradient-to-b p-6 text-white shadow-xl ${plan.gradient}`}
              >
                <h3 className={`text-5xl font-black uppercase ${plan.titleColor}`}>{plan.name}</h3>
                <p className="mt-6 text-sm font-semibold">vehicles starting at</p>
                <p className="mt-1 text-5xl font-extrabold">{plan.weekly}</p>
                <p className="mt-2 text-sm">{plan.fee}</p>
                <div className="my-5 h-px bg-white/60" />
                <ul className="space-y-3 text-lg">
                  <li>Regular Maintenance</li>
                  <li>Unlimited Mileage</li>
                  <li>24/7 Support</li>
                  <li>Insurance Available</li>
                </ul>
                <ButtonLink
                  href="/vehicles"
                  variant="secondary"
                  className="mt-8 w-full border-white/25 bg-white/15 text-white hover:bg-white/25"
                >
                  View Vehicles
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f5f7fb] px-4 py-16" id="how-it-works">
        <Container>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b88719]">
              4 Easy Steps
            </p>
            <h2 className="mt-2 text-4xl font-black text-[#1f3553] sm:text-6xl">
              How it <span className="text-[#d3a226]">Works</span>
            </h2>
          </div>

          <ol className="mt-12 grid gap-8 md:grid-cols-2">
            {stepItems.map((step, index) => (
              <li key={step.title} className="flex items-center gap-6 rounded-2xl bg-white p-5 shadow-sm">
                <Image src={step.image} alt={step.alt} width={150} height={120} className="h-24 w-28 object-contain sm:h-32 sm:w-36" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-[#b88719]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-[#1f3553]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="px-4 py-16" id="faq">
        <Container>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b88719]">
              Learn More
            </p>
            <h2 className="mt-2 text-4xl font-black text-[#1f3553] sm:text-5xl">
              Frequently Asked <span className="text-[#d3a226]">Questions</span>
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-[#f8fafd] p-4 open:border-[#2a67ad]/30 open:bg-white"
              >
                <summary className="cursor-pointer text-sm font-bold text-[#1f3553] sm:text-base">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <LandingFooter />
    </div>
  );
}
