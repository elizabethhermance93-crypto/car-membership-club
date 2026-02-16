export type NavLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  badge: string;
  heading: string;
  highlighted: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  bullets: string[];
  backgroundImage: string;
  vehicleImage: string;
};

export type StepItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type PlanItem = {
  name: string;
  price: string;
  cadence: string;
  setupFee: string;
  features: string[];
  highlighted?: boolean;
};

export type VehicleSlide = {
  id: string;
  name: string;
  category: string;
  image: string;
  blurb: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
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
    name: "Velocity Club",
    tagline: "Membership Vehicles",
    logo: "/placeholders/logo-placeholder.svg",
    supportPhone: "+1 (000) 000-0000",
    supportEmail: "hello@example.com",
  },
  navigation: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  hero: {
    badge: "New Flexible Access",
    heading: "Subscribe. Drive.",
    highlighted: "Swap.",
    description:
      "Placeholder hero copy for your membership program. This section is built for high-conversion messaging and easy content replacement.",
    primaryCta: { label: "View vehicles", href: "/pricing" },
    secondaryCta: { label: "Start application", href: "/apply" },
    bullets: [
      "No long-term contract required",
      "Single recurring payment model",
      "Swap vehicle options as your needs change",
    ],
    backgroundImage: "/placeholders/hero-bg.svg",
    vehicleImage: "/placeholders/hero-vehicle.svg",
  } satisfies HeroContent,
  steps: [
    {
      id: "step-1",
      title: "Create your profile",
      description:
        "Complete a short onboarding form and upload basic documents to begin.",
      image: "/placeholders/media-placeholder.svg",
    },
    {
      id: "step-2",
      title: "Choose a plan",
      description:
        "Pick a plan that matches your budget and preferred vehicle range.",
      image: "/placeholders/media-placeholder.svg",
    },
    {
      id: "step-3",
      title: "Select a vehicle",
      description:
        "Browse available inventory and reserve your first vehicle quickly.",
      image: "/placeholders/media-placeholder.svg",
    },
    {
      id: "step-4",
      title: "Drive and swap",
      description:
        "Start driving and switch vehicles over time as needed.",
      image: "/placeholders/media-placeholder.svg",
    },
  ] satisfies StepItem[],
  plans: [
    {
      name: "Starter",
      price: "$199",
      cadence: "/week",
      setupFee: "One-time setup fee: $999",
      features: [
        "Maintenance package",
        "Flexible swaps",
        "Standard support",
        "Insurance options",
      ],
    },
    {
      name: "Plus",
      price: "$299",
      cadence: "/week",
      setupFee: "One-time setup fee: $1499",
      highlighted: true,
      features: [
        "Expanded inventory",
        "Priority swaps",
        "Roadside support",
        "Insurance options",
      ],
    },
    {
      name: "Premium",
      price: "$399",
      cadence: "/week",
      setupFee: "One-time setup fee: $1999",
      features: [
        "Premium inventory",
        "Priority support",
        "Dedicated advisor",
        "Insurance options",
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
  testimonials: [
    {
      id: "testimonial-1",
      name: "Alex M.",
      role: "Member • 8 months",
      avatar: "/placeholders/avatar-placeholder.svg",
      quote:
        "Placeholder testimonial text. This card demonstrates final design and spacing for social proof content.",
    },
    {
      id: "testimonial-2",
      name: "Jordan P.",
      role: "Member • 1 year",
      avatar: "/placeholders/avatar-placeholder.svg",
      quote:
        "The structure is intentionally polished so you can drop in real reviews with minimal design changes.",
    },
    {
      id: "testimonial-3",
      name: "Taylor S.",
      role: "Member • 5 months",
      avatar: "/placeholders/avatar-placeholder.svg",
      quote:
        "Use this section for trust-building copy and customer outcomes once final testimonials are available.",
    },
  ] satisfies TestimonialItem[],
  faqs: [
    {
      question: "How quickly can I start?",
      answer:
        "Placeholder FAQ answer. Replace with your real onboarding timeline and approval details.",
    },
    {
      question: "What documents are required?",
      answer:
        "Placeholder FAQ answer. Replace with your real verification requirements and checklist.",
    },
    {
      question: "Can I swap vehicles?",
      answer:
        "Placeholder FAQ answer. Replace with your real swap policy and any applicable conditions.",
    },
    {
      question: "Are there additional costs?",
      answer:
        "Placeholder FAQ answer. Replace with your real fee breakdown and transparency policy.",
    },
    {
      question: "How do cancellations work?",
      answer:
        "Placeholder FAQ answer. Replace with your cancellation policy and required notice period.",
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
    about:
      "Placeholder footer copy. Replace with your mission statement, licensing details, and trust messaging.",
    columns: [
      {
        title: "Company",
        links: [
          { label: "Home", href: "/" },
          { label: "How it works", href: "/how-it-works" },
          { label: "Pricing", href: "/pricing" },
          { label: "Apply", href: "/apply" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ] satisfies FooterColumn[],
    social: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "#" },
    ] satisfies SocialLink[],
    legalLinks: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
};
