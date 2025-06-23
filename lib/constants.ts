import { Clock, MailCheck, MapPin, PhoneCall } from "lucide-react";

export const NAV_ITEMS = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "About",
    href: "/about",
  },
  {
    id: 3,
    label: "Services",
    href: "/services",
  },
  {
    id: 4,
    label: "Menu",
    href: "/menu",
  },
  {
    id: 5,
    label: "Contact",
    href: "/contact-us",
  },
];

export const BENEFITS = [
  "Strengthens immunity through antioxidant-rich ingredients",
  "Boosts energy with natural caffeine",
  "Relieves stress and promotes relaxation",
  "Aids digestion and gut health",
  "Supports heart health by improving circulation",
  "Reduces inflammation with spices",
];

export const MENU_ITEMS = [
  { id: 1, label: "Cammomile Tea", price: 5.3 },
  { id: 2, label: "Sweet Cinnamon Tea", price: 5.3 },
  { id: 3, label: "Japanese Green Tea", price: 5.3 },
  { id: 4, label: "Herbal Spice Tea", price: 5.3 },
  { id: 5, label: "Earl Grey Tea", price: 5.3 },
];

export const WHYUS_DATA = [
  {
    id: 1,
    imageSrc: "/images/leaf-glass.png",
    label: "Organic Tea",
  },
  {
    id: 2,
    imageSrc: "/images/tea-pot.png",
    label: "Best Quality",
  },
  {
    id: 3,
    imageSrc: "/images/tea-bag.png",
    label: "Local Taste",
  },
  {
    id: 4,
    imageSrc: "/images/tea-cup.png",
    label: "Fresh & Healing",
  },
];

export const CONTACT_DATA = [
  {
    id: 1,
    icon: MapPin,
    label: "Our Office",
    description: "Station Road, Bambalapitiya, CMB",
  },
  {
    id: 2,
    icon: PhoneCall,
    label: "Call Us",
    description: "+94-75-310-2400",
  },
  {
    id: 3,
    icon: MailCheck,
    label: "Email Us",
    description: "info@chaiyoceylon.com",
  },
  {
    id: 4,
    icon: Clock,
    label: "Opening Hours",
    description: "Mon - Sat : 9:00 PM - 11:30 PM",
  },
];

export const CONTENT = [
  {
    title: "Tea Kiosk",
    description: "Compact tea station for high-footfall areas and storefront",
    points: [
      "Ideal for malls, campuses, and coworking spaces",
      "Minimal footprint with high throughput",
      "Fully trained staff & operational setup",
      "Menu customization based on location",
      "Branding and co-partnering options available",
    ],
    imageSrc: "/images/tea-kiosk.jpg",
  },
  {
    title: "Tea Box",
    description: "A bicycle-mounted mobile tea unit for neighborhood routes",
    points: [
      "Includes 3–6 signature chai blends",
      "Comes with honey sticks, cinnamon, and a clay cup",
      "Beautifully packaged with personalized notes",
      "Bulk order discounts available",
      "Delivery across Sri Lanka",
    ],
    imageSrc: "/images/tea-box.jpg",
  },
  {
    title: "Tea Cart",
    description: "Ideal for weddings, birthdays & indoor events",
    points: [
      "Perfect for weddings, corporate events & private parties",
      "Professionally dressed chai servers",
      "Live brewing experience with authentic spices",
      "Customizable branding available",
      "Power & water supply options included",
    ],
    imageSrc: "/images/tea-cart.jpg",
  },
  {
    title: "Tea Wheel",
    description:
      "A converted three-wheeler for outdoor events and mobile sales",
    points: [
      "Perfect for weddings, corporate events & private parties",
      "Professionally dressed chai servers",
      "Live brewing experience with authentic spices",
      "Customizable branding available",
      "Power & water supply options included",
    ],
    imageSrc: "/images/tea-cart.jpg",
  },
  {
    title: "Tea Bar",
    description:
      "A stylish sit-down setup for cafes, restaurants, and loungese",
    points: [
      "Wide range of chai varieties: classic, iced, herbal, & more",
      "Instagrammable interior with traditional-modern blend",
      "Dine-in with fusion snacks and desserts",
      "Ideal for high-footfall areas or franchise models",
      "Barista-led experiences & chai-making workshops",
    ],
    imageSrc: "/images/banner3.jpg",
  },
  {
    title: "Tea Shop",
    description:
      " Permanent retail location offering the full Chaiyo experience",
    points: [
      "Wide range of chai varieties: classic, iced, herbal, & more",
      "Instagrammable interior with traditional-modern blend",
      "Dine-in with fusion snacks and desserts",
      "Ideal for high-footfall areas or franchise models",
      "Barista-led experiences & chai-making workshops",
    ],
    imageSrc: "/images/banner3.jpg",
  },
];

export const US_SPECIAL_DATA = [
  "Ready-Made & Fresh: Enjoy your favorite tea without the wait.",
  "Authentic Sri Lankan Flavors: From classic milk tea to bold spice blends.",
  "High-Quality Ingredients: Pure Ceylon tea, natural spices, and real flavor.",
  "Affordable Indulgence: Delicious drinks at prices everyone can enjoy.",
  "Locally Rooted: Proudly made in Sri Lanka, for tea lovers everywhere.",
];

export const SIGNATURE_OFFERINGS = [
  {
    id: 1,
    name: "Spice Milk Tea",
    overlayedText: "Comfort in every cup",
    imageSrc: "/images/spice-milk.jpg",
  },
  {
    id: 2,
    name: "Cardamom Tea",
    overlayedText: "Fragrant, calming, and rich",
    imageSrc: "/images/cardamon-tea.jpg",
  },
  {
    id: 3,
    name: "Ginger & Cinnamon Tea",
    overlayedText: "Great for digestion and warmth",
    imageSrc: "/images/ginger-cinnamon.jpg",
  },
  {
    id: 4,
    name: "Qahwa (Arabic Coffee)",
    overlayedText: "Spiced coffee for deep flavor seekers",
    imageSrc: "/images/qahwa.jpg",
  },
  {
    id: 5,
    name: "Badham Doodh",
    overlayedText: "Creamy almond milk infused with saffron",
    imageSrc: "/images/badam-doodh.jpeg",
  },
  {
    id: 6,
    name: "Samosas & Rolls",
    overlayedText: "The perfect savory side to your tea",
    imageSrc: "/images/samosa.jpg",
  },
];

export const BRANDING_HIGHLIGHTS = [
  {
    id: 1,
    title: "We bring the authentic taste of Ceylon to:",
    points: [
      "Streets & Markets",
      "Offices & Events",
      "Community Gatherings & Private Functions",
    ],
  },
  {
    id: 2,
    title: "What We Serve:",
    points: [
      "Authentic Ceylon Milk Teas",
      "Spiced Herbal Teas & Qahwa",
      "Traditional Savoury Snacks",
      "Breakfast Packs Inspired by Local Flavours",
    ],
  },
];
