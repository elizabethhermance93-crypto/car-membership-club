export type NavLink = {
  label: string;
  href: string;
};

export type HeaderCta = {
  signIn: { label: string; href: string };
  menu: { label: string; href: string };
};

export type HeroBullet = {
  title: string;
  description: string;
};

export type HeroBanner = {
  id: string;
  name: string;
  bgSrc: string;
  carSrc: string;
  logoSrc: string;
  alt: string;
};

export type HeroContent = {
  badge?: string;
  heading: string;
  highlighted: string;
  headingSuffix?: string;
  tagline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  bullets: HeroBullet[];
  /** @deprecated Use heroBanners[].bgSrc for 6-banner hero */
  backgroundImage?: string;
  backgroundImageLight?: string;
  /** @deprecated Use heroBanners[].carSrc for 6-banner hero */
  vehicleImage?: string;
};

export type StepItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type StepsSectionContent = {
  preheadline: string;
  headline: string;
  highlighted: string;
};

export type PlanItem = {
  name: string;
  price: string;
  cadence: string;
  setupFee: string;
  features: string[];
  highlighted?: boolean;
  gradient?: "blue" | "green" | "orange" | "violet";
};

export type PricingSectionContent = {
  preheadline: string;
  headline: string;
  seeFullComparison: { label: string; href: string };
};

export type BrandLogoItem = {
  id: string;
  name: string;
  image: string;
};

export type VideoBlockContent = {
  preheadline: string;
  headline: string;
  highlighted: string;
  thumbnail: string;
  thumbnailAlt: string;
  videoEmbedUrl: string | null;
};

export type ProblemCard = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type ProblemsSectionContent = {
  preheadline: string;
  headline: string;
  cards: ProblemCard[];
};

export type SolutionBenefit = {
  id: string;
  title: string;
  description: string;
};

export type SolutionSectionContent = {
  preheadline: string;
  headline: string;
  highlighted: string;
  benefits: SolutionBenefit[];
};

export type CarSubscriptionCard = {
  id: string;
  title: string;
  highlighted: string;
  /** "white" = bold white (card 1); "gold" = gold accent (card 2) */
  highlightVariant?: "white" | "gold";
  titleSuffix?: string;
  paragraphs: string[];
};

export type CarSubscriptionSectionContent = {
  preheadline: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  cards: CarSubscriptionCard[];
};

export type VehicleSlide = {
  id: string;
  name: string;
  category: string;
  image: string;
  blurb: string;
};

/** Single inventory vehicle (year, make, model, membership, category, image). */
export type InventoryItem = {
  id: string;
  year: number;
  make: string;
  model: string;
  membershipTier: string;
  category: "SUV" | "Sedan" | "Coupe";
  image: string;
  blurb?: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  date: string;
  /** URL to the reviewer's profile/face image (user avatar). */
  avatar: string;
  quote: string;
  /** Optional image for bottom of card (e.g. car or dealership). */
  photo?: string;
};

export type TestimonialsSectionContent = {
  preheadline: string;
  headline: string;
  highlighted: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSectionContent = {
  headline: string;
  highlighted: string;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type FooterLocations = {
  title: string;
  items: string[];
  moreLabel: string;
  moreHref: string;
};

export type FooterDarkMode = {
  labelOn: string;
  labelOff: string;
};

export type AppStoreBadge = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteContent = {
  seo: {
    siteName: "Velocity Club",
    siteUrl: "https://example.com",
    defaultTitle: "Velocity Club | Flexible Car Membership",
    defaultDescription:
      "A polished marketing scaffold inspired by modern car membership websites. Replace placeholder copy, media, and logo with your brand assets.",
    ogImage: "/placeholders/og-default.svg",
  },
  brand: {
    name: "Refresh The Look USA",
    tagline: "Membership Vehicles",
    logo: "/logo.png",
    supportPhone: "+1 (000) 000-0000",
    supportEmail: "hello@example.com",
  },
  navigation: [
    { label: "Vehicles", href: "/vehicles" },
    { label: "Memberships", href: "/pricing" },
    { label: "How it Works", href: "/how-it-works" },
  ] satisfies NavLink[],
  headerCta: {
    signIn: { label: "Sign In", href: "/apply" },
    menu: { label: "Menu", href: "#" },
  } satisfies HeaderCta,
  hero: {
    heading: "Join. ",
    highlighted: "Drive.",
    headingSuffix: " Swap.",
    tagline: "No Contracts. No Limits.",
    primaryCta: { label: "View Vehicles", href: "/#vehicles" },
    secondaryCta: { label: "Learn More", href: "/how-it-works" },
    bullets: [
      {
        title: "No Contracts. No Limits.",
        description: "Only driver's license and payment method required.",
      },
      {
        title: "Weekly Dues",
        description: "Insurance, Maintenance & Roadside Assistance Included.",
      },
      {
        title: "Freedom and Flexibility.",
        description: "Drive what you want, when you want - swap or cancel anytime.",
      },
    ],
  } satisfies HeroContent,
  /** 6 hero banners: match inventory brands. Paths in public/hero/ or public/vehicles/. */
  heroBanners: [
    { id: "porsche", name: "Porsche", bgSrc: "/hero/bg-placeholder.svg", carSrc: "/vehicles/2016-porsche-panamera.jpeg", logoSrc: "/images/logo-porsche.svg", alt: "Porsche Panamera" },
    { id: "cadillac", name: "Cadillac", bgSrc: "/hero/bg-placeholder.svg", carSrc: "/vehicles/2018-cadillac-escalade.jpeg", logoSrc: "/images/logo-cadillac.svg", alt: "Cadillac Escalade" },
    { id: "bmw", name: "BMW", bgSrc: "/hero/bg-placeholder.svg", carSrc: "/vehicles/2015-bmw-750xi.jpeg", logoSrc: "/images/logo-bmw.svg", alt: "BMW 750 Xi" },
    { id: "alfa-romeo", name: "Alfa Romeo", bgSrc: "/hero/bg-placeholder.svg", carSrc: "/vehicles/2022-alfa-romeo-giulia.jpeg", logoSrc: "/images/logo-alfa-romeo.svg", alt: "Alfa Romeo Giulia" },
    { id: "mercedes", name: "Mercedes-Benz", bgSrc: "/hero/bg-placeholder.svg", carSrc: "/vehicles/2018-mercedes-c300.jpeg", logoSrc: "/images/logo-mercedes.svg", alt: "Mercedes-Benz C 300" },
  ] satisfies HeroBanner[],
  brandLogos: [
    { id: "porsche", name: "Porsche", image: "/images/logo-porsche.svg" },
    { id: "cadillac", name: "Cadillac", image: "/images/logo-cadillac.svg" },
    { id: "bmw", name: "BMW", image: "/images/logo-bmw.svg" },
    { id: "alfa-romeo", name: "Alfa Romeo", image: "/images/logo-alfa-romeo.svg" },
    { id: "gmc", name: "GMC", image: "/images/logo-gmc.svg" },
    { id: "mercedes", name: "Mercedes-Benz", image: "/images/logo-mercedes.svg" },
  ] satisfies BrandLogoItem[],
  videoBlock: {
    preheadline: "LEARN ABOUT",
    headline: "Zipsters in ",
    highlighted: "60 seconds",
    thumbnail: "/images/intro-thumbnail.8cc39350.webp",
    thumbnailAlt: "Watch: How it works in 60 seconds",
    videoEmbedUrl: null,
  } satisfies VideoBlockContent,
  problemsSection: {
    preheadline: "PROBLEMS WITH",
    headline: "Buying & Leasing",
    cards: [
      {
        id: "depreciation",
        title: "Vehicle Depreciation",
        description: "New vehicles lose 20–40% of their value in the first year.",
        image: "/images/depreciation.0bb6f6aa.webp",
      },
      {
        id: "aprs",
        title: "High Interest Rates",
        description: "Interest rates have increased by almost 90% in the last decade.",
        image: "/images/interest.8efb1d8f.webp",
      },
      {
        id: "insurance",
        title: "Insurance Premiums",
        description: "Insurance premiums have doubled in the last 4 years.",
        image: "/images/insurance.4067759e.webp",
      },
      {
        id: "maintenance",
        title: "Expensive Maintenance & Repairs",
        description: "Routine service and repairs add up fast.",
        image: "/images/maintenance.c9c4560b.webp",
      },
      {
        id: "contracts",
        title: "Rigid Contracts",
        description: "Leases lock you in for years with early-termination fees.",
        image: "/images/contract.bd3c8b14.webp",
      },
      {
        id: "hidden-fees",
        title: "Hidden Fees",
        description: "Documentation, acquisition, and surprise surcharges.",
        image: "/images/fees.4bf26808.webp",
      },
    ],
  } satisfies ProblemsSectionContent,
  solutionSection: {
    preheadline: "SOLUTION",
    headline: "Zipsters ",
    highlighted: "The Smarter Solution",
    benefits: [
      {
        id: "depreciation",
        title: "Depreciation Losses",
        description:
          "The average car depreciates 70-80% over the term of a loan leaving your car fairly worthless at the end of your loan.",
      },
      {
        id: "apr",
        title: "High Interest Rates Eliminated.",
        description: "There are no interest charges with a membership.",
      },
      {
        id: "insurance",
        title: "Insurance Included",
        description: "We have an option to include insurance.",
      },
      {
        id: "maintenance",
        title: "Zero Maintenance",
        description:
          "All routine maintenance covered at no charge.*\nA repair program is available to cover mechanical problems.",
      },
      {
        id: "no-strings",
        title: "Easy 5 minute deal.",
        description: "No Games No Gimmicks, No Application required",
      },
      {
        id: "pricing",
        title: "Straightforward Pricing",
        description: "No hidden fees, no surcharges, no surprises.",
      },
      {
        id: "mileage",
        title: "Unlimited Mileage",
        description: "No mileage restrictions to worry about.",
      },
      {
        id: "paperwork",
        title: "Less Paperwork Less Hassle",
        description: "All documentation expenses are taken care of.",
      },
    ],
  } satisfies SolutionSectionContent,
  carSubscriptionSection: {
    preheadline: "WHAT IS",
    headline: "Car ",
    headlineHighlight: "Membership",
    subtitle: "A Smarter Alternative to Traditional Car Rentals/Leases",
    cards: [
      {
        id: "all-inclusive",
        title: "Think monthly car rental, but better. ",
        highlighted: "All-inclusive. No surprises.",
        highlightVariant: "white",
        paragraphs: [
          "If you've ever needed a car for more than a few weeks, you know your options are limited. Traditional car rentals work great for a weekend trip, but they get expensive fast when you need a vehicle for a month or longer. That's where car membership changes everything.",
          "Zipsters is like a monthly car rental—but with everything included. One flat fee covers your vehicle, insurance, maintenance, roadside assistance, registration, and even the freedom to swap cars whenever you want. No contracts. No hidden fees. No hassle.",
        ],
      },
      {
        id: "how-it-works",
        title: "How Car ",
        highlighted: "Membership",
        highlightVariant: "gold",
        titleSuffix: " Works.",
        paragraphs: [
          "It's simple: you pay one monthly fee and get access to luxury vehicles without the commitment of buying or leasing. Need a car for three months while your new vehicle is being built? Relocating to Dallas or Boston for a work assignment? Just want to drive a luxury car without the depreciation headache? Zipsters gives you the flexibility to drive what you want, for as long as you need, with the ability to cancel anytime.",
          "Unlike traditional long-term rentals that charge you separately for insurance, maintenance, and endless fees, Zipsters bundles everything into one transparent monthly payment.",
          "And unlike leases that lock you into 3-5 years with strict mileage limits, Zipsters lets you drive up to 2,400 miles per month with no long-term commitment.",
        ],
      },
    ],
  } satisfies CarSubscriptionSectionContent,
  stepsSection: {
    preheadline: "4 EASY STEPS",
    headline: "How it ",
    highlighted: "Works",
  } satisfies StepsSectionContent,
  steps: [
    {
      id: "step-1",
      title: "Create an account",
      description: "Verify your phone number, upload driver's license.",
      image: "/images/sign-up.a9a4f7ba.svg",
    },
    {
      id: "step-2",
      title: "Choose a plan",
      description:
        "Each plan has a different set of vehicles. You can always swap into any vehicle included in your plan.",
      image: "/images/choose-plan.572d5ac1.svg",
    },
    {
      id: "step-3",
      title: "Select a car",
      description:
        "After choosing a plan, select which vehicle you want to begin with.",
      image: "/images/choose-car.ab598b8e.svg",
    },
    {
      id: "step-4",
      title: "Drive away in style",
      description:
        "You can always check online for available cars and swap as you like.",
      image: "/images/car.8755593e.svg",
    },
  ] satisfies StepItem[],
  pricingSection: {
    preheadline: "PRICING",
    headline: "Membership Plans",
    seeFullComparison: { label: "See Full Comparison", href: "/pricing" },
  } satisfies PricingSectionContent,
  plans: [
    {
      name: "Silver",
      price: "$125",
      cadence: "/week",
      setupFee: "Requires a one time fee of $1000.00",
      gradient: "blue",
      features: [
        "Regular Maintenance",
        "Unlimited Miles per month",
        "24/7 Support",
        "Insurance available",
      ],
    },
    {
      name: "Gold",
      price: "$150",
      cadence: "/week",
      setupFee: "Requires a one time fee of $1500.00",
      highlighted: true,
      gradient: "green",
      features: [
        "Regular Maintenance",
        "Unlimited Miles per month",
        "24/7 Support",
        "Insurance available",
      ],
    },
    {
      name: "Platinum",
      price: "$200",
      cadence: "/week",
      setupFee: "Requires a one time fee of $2000.00",
      gradient: "orange",
      features: [
        "Regular Maintenance",
        "Unlimited Miles per month",
        "24/7 Support",
        "Insurance available",
      ],
    },
    {
      name: "Exotics",
      price: "$250",
      cadence: "/week",
      setupFee: "Requires a one time fee of $2500.00",
      gradient: "violet",
      features: [
        "Regular Maintenance",
        "Unlimited Miles per month",
        "24/7 Support",
        "Insurance available",
      ],
    },
  ] satisfies PlanItem[],
  vehicles: [
    {
      id: "vehicle-1",
      name: "Placeholder Sedan",
      category: "Starter",
      image: "/placeholders/media-placeholder.svg",
      blurb: "Comfortable daily vehicle with practical features.",
    },
    {
      id: "vehicle-2",
      name: "Placeholder SUV",
      category: "Plus",
      image: "/placeholders/media-placeholder.svg",
      blurb: "Versatile SUV for family and weekend travel.",
    },
    {
      id: "vehicle-3",
      name: "Placeholder Crossover",
      category: "Plus",
      image: "/placeholders/media-placeholder.svg",
      blurb: "Balanced option with style and utility.",
    },
    {
      id: "vehicle-4",
      name: "Placeholder Performance",
      category: "Premium",
      image: "/placeholders/media-placeholder.svg",
      blurb: "Higher trim option with upgraded comfort.",
    },
    {
      id: "vehicle-5",
      name: "Placeholder Executive",
      category: "Premium",
      image: "/placeholders/media-placeholder.svg",
      blurb: "Executive-class style and premium cabin feel.",
    },
  ] satisfies VehicleSlide[],
  /** Current inventory: real vehicles and membership tiers. Images in public/vehicles/. */
  inventory: [
    { id: "inv-2", year: 2016, make: "Porsche", model: "Panamera", membershipTier: "Platinum", category: "Sedan", image: "/vehicles/2016-porsche-panamera.jpeg", blurb: "Dark gray 2016 Porsche Panamera. Platinum Membership." },
    { id: "inv-3", year: 2018, make: "Cadillac", model: "Escalade", membershipTier: "Exotics", category: "SUV", image: "/vehicles/2018-cadillac-escalade.jpeg", blurb: "White 2018 Cadillac Escalade. Exotic Membership." },
    { id: "inv-4", year: 2015, make: "BMW", model: "750 Xi", membershipTier: "Gold", category: "Sedan", image: "/vehicles/2015-bmw-750xi.jpeg", blurb: "White 2015 BMW 750 Xi. Gold Membership." },
    { id: "inv-5", year: 2022, make: "Alfa Romeo", model: "Giulia", membershipTier: "Platinum", category: "Sedan", image: "/vehicles/2022-alfa-romeo-giulia.jpeg", blurb: "Black 2022 Alfa Romeo Giulia. Platinum Membership." },
    { id: "inv-6", year: 2016, make: "Porsche", model: "Cayenne", membershipTier: "Gold", category: "SUV", image: "/vehicles/2016-porsche-cayenne.jpeg", blurb: "White 2016 Porsche Cayenne. Gold Membership." },
    { id: "inv-7", year: 2022, make: "GMC", model: "Acadia Denali", membershipTier: "Platinum", category: "SUV", image: "/vehicles/2022-gmc-acadia-denali.jpeg", blurb: "Charcoal 2022 GMC Acadia Denali. Platinum Membership." },
    { id: "inv-8", year: 2014, make: "BMW", model: "328 Sedan", membershipTier: "Silver", category: "Sedan", image: "/vehicles/2014-bmw-328-sedan.jpeg", blurb: "Red 2014 BMW 328 Sedan. Silver Membership." },
    { id: "inv-9", year: 2018, make: "Alfa Romeo", model: "Stelvio", membershipTier: "Gold", category: "SUV", image: "/vehicles/2018-alfa-romeo-stelvio.jpeg", blurb: "Red 2018 Alfa Romeo Stelvio. Gold Membership." },
    { id: "inv-10", year: 2018, make: "Mercedes-Benz", model: "C 300", membershipTier: "Gold", category: "Coupe", image: "/vehicles/2018-mercedes-c300.jpeg", blurb: "White 2018 Mercedes C 300 Coupe. Gold Membership." },
    { id: "inv-11", year: 2015, make: "Mercedes-Benz", model: "E 350 Sedan", membershipTier: "Platinum", category: "Sedan", image: "/vehicles/2015-mercedes-e350-sedan.jpeg", blurb: "Silver 2015 Mercedes E 350 Sedan. Platinum Membership." },
    { id: "inv-12", year: 2014, make: "Mercedes-Benz", model: "E 400 Coupe", membershipTier: "Platinum", category: "Coupe", image: "/vehicles/2014-mercedes-e400-coupe.jpeg", blurb: "White 2014 Mercedes E 400 Coupe. Platinum Membership." },
  ] satisfies InventoryItem[],
  testimonialsSection: {
    preheadline: "REVIEWS",
    headline: "Our ",
    highlighted: "Customers Say",
  } satisfies TestimonialsSectionContent,
  /**
   * Fallback reviews based on Refreshthelook (shown when Google API is not configured).
   * When GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set, real Google reviews replace these.
   */
  testimonials: [
    {
      id: "review-bryan-rojo",
      name: "Bryan Rojo",
      date: "Oct 2017",
      avatar: "",
      quote:
        "Great experience. Flexible options and no long-term commitment. Exactly what I needed for my situation. Would definitely come back.",
      photo: "/vehicles/2016-porsche-panamera.jpeg",
    },
    {
      id: "review-sam-jentsch",
      name: "Sam Jentsch",
      date: "Nov 2017",
      avatar: "",
      quote:
        "Smooth process from start to finish. Would recommend to anyone looking for a flexible vehicle solution. The team was helpful and made everything easy.",
      photo: "/vehicles/2016-porsche-panamera.jpeg",
    },
    {
      id: "review-marc-limotte",
      name: "Marc Limotte",
      date: "Mar 2022",
      avatar: "",
      quote:
        "Good service. Very few vehicle options if you need something last minute, but overall solid experience. Fair pricing and no surprises.",
      photo: "/vehicles/2018-cadillac-escalade.jpeg",
    },
    {
      id: "review-gabby-patrick",
      name: "Gabby & Patrick",
      date: "Jun 2020",
      avatar: "",
      quote:
        "Excellent work, very professional! We had a great experience from start to finish and would recommend Refreshthelook to anyone.",
      photo: "/vehicles/2015-bmw-750xi.jpeg",
    },
    {
      id: "review-scott-rhodes",
      name: "Scott Rhodes",
      date: "Aug 2020",
      avatar: "",
      quote:
        "Professional team and hassle-free. Made switching vehicles easy when my needs changed. Couldn't ask for a better car membership experience.",
      photo: "/vehicles/2022-alfa-romeo-giulia.jpeg",
    },
    {
      id: "review-alex-rivera",
      name: "Alex Rivera",
      date: "Jan 2021",
      avatar: "",
      quote:
        "Best car membership in the area. No hidden fees, clear terms. Will use again. The whole process was straightforward and stress-free.",
      photo: "/vehicles/2018-mercedes-c300.jpeg",
    },
  ] satisfies TestimonialItem[],
  faqSection: {
    headline: "Frequently Asked ",
    highlighted: "Questions",
  } satisfies FaqSectionContent,
  faqs: [
    {
      question: "How is membership at Zipsters different than buying a car from a dealer?",
      answer:
        "With a Zipsters membership you have the ability to change cars anytime you choose unlike buying a car from a dealer. When you buy a car from a dealer there is a payoff on the car that you purchase and if you try to trade that car in for another before the car is paid off you may find out that the payoff on the car is higher than the value of the car making it difficult to change cars. With Zipsters there is no payoff to worry about so you can change vehicles as much as you like.",
    },
    {
      question: "What do I need to qualify for Zipsters membership?",
      answer:
        "All that is needed to become a member. 1.) valid driver's license. 2.) full coverage insurance. THERE IS NO CREDIT CHECKS OR EMPLOYMENT VERIFICATION REQUIRED!!",
    },
    {
      question: "Can I use my membership short term?",
      answer:
        "Yes, just simply return the vehicle once your done driving. It's that simple.",
    },
    {
      question: "Can I get insurance through Zipsters?",
      answer:
        "In some cases yes, we can get you a quote through our insurance company. Rates will depend on members driving record.",
    },
    {
      question: "How often can I swap vehicles?",
      answer:
        "You can swap vehicles as much as you like at no additional cost provided the vehicle you would like to swap to qualifies for the same membership plan that you have. If the vehicle that you would like to swap for qualifies for a different membership plan then there may be a slight up charge. Your representative can go into more detail.",
    },
    {
      question: "How do I pay for my membership?",
      answer:
        "Membership dues are paid on a weekly basis. We accept payment by Zelle for ease to our members. Ask a representative for details.",
    },
    {
      question: "Are there any other costs?",
      answer:
        "The only costs you will have are initial deposit, due payments and Insurance.",
    },
    {
      question: "Can I cancel my membership anytime?",
      answer:
        "Yes, Membership gives you the freedom to cancel whenever you choose, simply bring the vehicle back to a Zipsters location.",
    },
    {
      question: "Is the member responsible for maintenance and or repairs?",
      answer:
        "Zipsters membership includes all scheduled maintenance (e.g. oil changes). Repair programs are available for your membership. One of our representatives will be happy to explain different options available.",
    },
    {
      question: "Can anyone else drive the car?",
      answer:
        "As long as the other person is listed on your insurance as a driver then yes, they can drive.",
    },
    {
      question: "How is this different from leasing a car?",
      answer:
        "No long-term contract (month-to-month), cancel anytime, swap vehicles, and insurance/maintenance/registration are included. Leases lock you in for 3–5 years with one car, separate insurance costs, and early-termination fees.",
    },
    {
      question: "What happens if I go over my mileage limit?",
      answer:
        "Each Zipsters membership plan includes generous monthly mileage (1800-2400 miles depending on your plan)—that's 3x more than traditional leases. Unused miles roll over month-to-month, so you have flexibility. If you do exceed your annual mileage allowance, there's a simple overage fee of $0.40 per extra mile, charged at the end of your subscription term. You can track your mileage anytime in the Zipsters app.",
    },
    {
      question: "Are there any restrictions regarding my membership with Zipsters?",
      answer:
        "If a member wants to alter anything cosmetic or mechanical to their vehicle, they must notify Zipsters prior to changes for approval. Other than that, there are no other restrictions.",
    },
  ] satisfies FaqItem[],
  finalCta: {
    title: "Ready to launch your membership journey?",
    description:
      "Use this section for your strongest conversion message. It is optimized for desktop and mobile attention.",
    primary: { label: "Apply now", href: "/apply" },
    secondary: { label: "Contact sales", href: "/contact" },
  },
  footer: {
    brandLinks: [
      { label: "Newsroom", href: "/newsroom" },
      { label: "Brands", href: "/brands" },
      { label: "Policies", href: "/policies" },
    ],
    locations: {
      title: "Locations",
      items: ["Zipsters, LLC.", "1501 Oreilly Ct.", "Austin, TX 78734"],
      moreLabel: "more…",
      moreHref: "/locations",
    } satisfies FooterLocations,
    exploreLinks: [
      { label: "Partner Program", href: "/partner-program" },
      { label: "Trade-ins", href: "/trade-ins" },
      { label: "Invest", href: "https://invest.poshcars.io" },
      { label: "Newsroom", href: "/newsroom" },
    ],
    contact: {
      phone: "512-987-9576",
      email: "jerry@refreshthelook.com",
      appointmentLabel: "Jerry Small (CEO)",
      appointmentHref: "/contact",
    },
    darkMode: {
      labelOn: "Dark mode: on",
      labelOff: "Dark mode: off",
    } satisfies FooterDarkMode,
    appStoreBadges: [
      { label: "Download on the App Store", href: "#" },
      { label: "GET IT ON Google Play", href: "#" },
    ] satisfies AppStoreBadge[],
    social: [
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Google", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "LinkedIn", href: "#" },
    ] satisfies SocialLink[],
    legalLinks: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
    copyright: "©2026 Zipsters, LLC.",
  },
};
