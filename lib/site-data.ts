export type NavItem = {
  label: string;
  href: string;
};

export type ProblemItem = {
  title: string;
  description: string;
};

export type SolutionItem = {
  title: string;
  description: string;
};

export type MembershipPlan = {
  name: string;
  weeklyPrice: number;
  oneTimeFee: number;
  featured?: boolean;
  description: string;
  features: string[];
};

export type StepItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type VehicleType = {
  name: string;
  plan: string;
  summary: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

export const siteConfig = {
  brand: "Refresh The Look USA",
  product: "Zipsters Membership Club",
  shortName: "Zipsters",
  siteUrl: "https://www.zipstersclub.com",
  defaultTitle: "Zipsters Membership Club | Refresh The Look USA",
  defaultDescription:
    "Zipsters is a flexible car membership club with weekly dues, optional insurance support, unlimited mileage options, and no credit check or employment verification requirements.",
};

export const navigationItems: NavItem[] = [
  { label: "Vehicles", href: "/vehicles" },
  { label: "Memberships", href: "/memberships" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Join", href: "/join" },
];

export const heroBullets = [
  "No Credit Checks. No Employment Verification.",
  "Simple weekly membership dues.",
  "Drive what fits your life and swap or cancel anytime.",
];

export const problemsWithBuyingAndLeasing: ProblemItem[] = [
  {
    title: "Vehicle Depreciation",
    description:
      "Most financed vehicles lose value quickly, often leaving owners with little equity after years of payments.",
  },
  {
    title: "High Interest Rates",
    description:
      "Traditional financing can stack up expensive interest costs over time, especially for credit-challenge buyers.",
  },
  {
    title: "Insurance Premiums",
    description:
      "Insurance expenses can be unpredictable and difficult to budget when costs rise throughout the year.",
  },
  {
    title: "Expensive Maintenance & Repairs",
    description:
      "Unexpected maintenance and mechanical repairs can create large out-of-pocket costs without warning.",
  },
];

export const smarterSolutionItems: SolutionItem[] = [
  {
    title: "Depreciation Losses",
    description:
      "The average car can depreciate 70-80% over the term of a loan, leaving you with a much lower value at payoff time.",
  },
  {
    title: "Insurance Available",
    description:
      "Insurance is available as an option, and representatives can help discuss the right coverage setup.",
  },
  {
    title: "Easy 5 Minute Deal",
    description:
      "No games, no gimmicks, and no application required. The process is designed to be quick and clear.",
  },
  {
    title: "Unlimited Mileage",
    description: "No mileage restrictions to worry about.",
  },
  {
    title: "High Interest Rates Eliminated",
    description: "There are no interest charges with a membership.",
  },
  {
    title: "Zero Maintenance",
    description:
      "All routine maintenance is covered at no charge, and a repair program is available for mechanical problems.",
  },
  {
    title: "Less Paperwork Less Hassle",
    description:
      "A simple 9-page membership agreement is all the paperwork needed to get started.",
  },
];

export const membershipPlans: MembershipPlan[] = [
  {
    name: "Silver",
    weeklyPrice: 125,
    oneTimeFee: 1000,
    description: "A practical entry membership with flexible weekly dues.",
    features: [
      "Regular maintenance included",
      "Unlimited mileage",
      "24/7 member support",
      "Insurance available",
      "Swap into same-plan vehicles",
    ],
  },
  {
    name: "Gold",
    weeklyPrice: 150,
    oneTimeFee: 1500,
    featured: true,
    description: "A balanced plan with added vehicle options and flexibility.",
    features: [
      "Regular maintenance included",
      "Unlimited mileage",
      "24/7 member support",
      "Insurance available",
      "Swap into same-plan vehicles",
    ],
  },
  {
    name: "Platinum",
    weeklyPrice: 200,
    oneTimeFee: 2000,
    description: "Higher-tier vehicles with the same simple membership model.",
    features: [
      "Regular maintenance included",
      "Unlimited mileage",
      "24/7 member support",
      "Insurance available",
      "Swap into same-plan vehicles",
    ],
  },
  {
    name: "Exotics",
    weeklyPrice: 250,
    oneTimeFee: 2500,
    description:
      "Our premium membership tier for members wanting standout inventory.",
    features: [
      "Regular maintenance included",
      "Unlimited mileage",
      "24/7 member support",
      "Insurance available",
      "Swap options by membership tier",
    ],
  },
];

export const howItWorksSteps: StepItem[] = [
  {
    title: "Create your membership profile",
    description:
      "Verify your valid driver license details and review membership requirements with a representative.",
  },
  {
    title: "Choose a membership plan",
    description:
      "Pick the plan that matches your budget and preferred vehicle types.",
  },
  {
    title: "Select your first vehicle",
    description:
      "Choose the vehicle you want to begin with and finalize your membership agreement.",
  },
  {
    title: "Drive away in style",
    description:
      "Enjoy your vehicle and swap when needed based on your active membership plan.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question:
      "How is membership at Zipsters different than buying a car from a dealer?",
    answer:
      "With a Zipsters membership, you can change cars anytime you choose. Buying from a dealer usually means financing with a payoff balance, and trading early can be difficult when the payoff is higher than the car value. With Zipsters there is no payoff balance to manage, so swapping is much easier.",
  },
  {
    question: "What do I need to qualify for Zipsters membership?",
    answer:
      "To become a member you need a valid driver's license and full coverage insurance. There are no credit checks and no employment verification required.",
  },
  {
    question: "Can I use my membership short term?",
    answer:
      "Yes. You can return the vehicle whenever you are done driving and close out your membership based on your agreement.",
  },
  {
    question: "How often can I swap vehicles?",
    answer:
      "You can swap vehicles as much as you like at no additional cost when moving to another vehicle in the same membership plan. If you want a vehicle in a different tier, there may be an upcharge.",
  },
  {
    question: "How do I pay for my membership?",
    answer:
      "Membership dues are paid weekly. We currently accept payment by Zelle for member convenience.",
  },
  {
    question: "Are there any other costs?",
    answer:
      "Your costs are the initial deposit, weekly dues, and insurance.",
  },
  {
    question: "Can I get insurance through Zipsters?",
    answer:
      "In some cases, yes. We can request a quote through our insurance partner, and rates depend on your driving record.",
  },
  {
    question: "Are there restrictions regarding my membership with Zipsters?",
    answer:
      "If you want to make cosmetic or mechanical changes to your vehicle, you must notify Zipsters first for approval. Outside of that, there are no additional restrictions.",
  },
  {
    question: "Is the member responsible for maintenance and/or repairs?",
    answer:
      "Membership includes all scheduled maintenance such as oil changes. Repair program options are available, and a representative can explain the available coverage levels.",
  },
  {
    question: "Can I cancel my membership anytime?",
    answer:
      "Yes. Membership gives you the flexibility to cancel anytime by returning the vehicle to a Zipsters location.",
  },
  {
    question: "Can anyone else drive the car?",
    answer:
      "Yes, as long as the person is listed on your insurance policy as an approved driver.",
  },
];

export const vehicleTypes: VehicleType[] = [
  {
    name: "City Friendly Sedans",
    plan: "Silver",
    summary:
      "Comfortable daily drivers built for commuting, errands, and reliable weekly use.",
  },
  {
    name: "SUV & Family Options",
    plan: "Gold",
    summary:
      "Roomy and practical vehicles designed for family schedules and weekend trips.",
  },
  {
    name: "Executive Performance",
    plan: "Platinum",
    summary:
      "Higher-end models for members who want extra performance and comfort.",
  },
  {
    name: "Statement Vehicles",
    plan: "Exotics",
    summary:
      "Distinctive inventory for members looking for premium styling and standout options.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "I needed transportation fast and did not want another high-interest loan. Zipsters made the process simple and respectful.",
    name: "Monique R.",
    context: "Member for 11 months",
  },
  {
    quote:
      "The weekly dues fit my budget better, and being able to swap to another vehicle helped when my family needs changed.",
    name: "Carlos D.",
    context: "Member for 8 months",
  },
  {
    quote:
      "Everything was straightforward. No hidden surprises and support was easy to reach when I had questions.",
    name: "Ashley P.",
    context: "Member for 1 year",
  },
];

export const trustHighlights = [
  "Operating as a car membership club for 3 years",
  "Weekly dues with transparent costs",
  "No credit checks or employment verification required",
];
