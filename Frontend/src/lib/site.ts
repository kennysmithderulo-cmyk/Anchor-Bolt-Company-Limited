export const COMPANY = {
  name: "Anchor-Bolt Company Limited",
  short: "Anchor-Bolt",
  tagline: "Building Strong Foundations. Creating Lasting Value.",
  statement:
    "Anchor-Bolt Company Limited delivers quality construction and real-estate solutions built on strength, precision, and reliability.",
  industry: "Construction & Real Estate Development",
  phoneDisplay: "+233 244 57 96 89",
  phoneHref: "tel:+233244579689",
  whatsappHref:
    "https://wa.me/233244579689?text=" +
    encodeURIComponent(
      "Hello Anchor-Bolt, I would like to discuss a construction or property development project.",
    ),
  street: "12 Sanderling Street, Airport Ridge",
  city: "Sekondi-Takoradi, Western Region, Ghana",
  fullAddress:
    "12 Sanderling Street, Airport Ridge, Sekondi-Takoradi, Western Region, Ghana",
  hours: "Monday – Friday · 08:00 – 17:00 GMT",
  mapsEmbed:
    "https://www.google.com/maps?q=Sanderling%20Street%2C%20Airport%20Ridge%2C%20Sekondi-Takoradi%2C%20Ghana&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Sanderling+Street,+Airport+Ridge,+Sekondi-Takoradi,+Ghana",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/our-work" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export const PROJECT_TYPES = [
  "Building Construction",
  "Residential Development",
  "Commercial Construction",
  "Property Development",
  "Renovation & Remodeling",
  "Project Management",
  "Civil & Structural Works",
  "Real Estate Solutions",
  "Other",
];

export const WHY_CHOOSE = [
  {
    icon: "hardhat",
    title: "Quality workmanship",
    description:
      "Materials and methods are agreed in writing and checked on site, so the finished building matches the specification.",
  },
  {
    icon: "ruler",
    title: "Attention to detail",
    description:
      "Junctions, levels, drainage falls and finishes are inspected before they are covered up and closed off.",
  },
  {
    icon: "calendar",
    title: "Reliable project delivery",
    description:
      "Programme commitments are set with realistic sequencing, then tracked and reported against every month.",
  },
  {
    icon: "shield",
    title: "Professional standards",
    description:
      "Site safety, supervision, staged inspections and documentation are maintained to professional construction practice.",
  },
  {
    icon: "messages",
    title: "Transparent communication",
    description:
      "One accountable point of contact, written progress updates and variations raised before work proceeds.",
  },
  {
    icon: "handshake",
    title: "Customer-focused service",
    description:
      "We work to the client's priorities on budget, sequence and end use — not to the convenience of the site.",
  },
];

export function img(url: string, width = 1600): string {
  return url.includes("w=1080") ? url.replace("w=1080", `w=${width}`) : url;
}
