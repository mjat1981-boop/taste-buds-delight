import { Product } from "@/types";

export const categories = [
  "Gummies & Chews",
  "Cookies",
  "Chocolate & Truffles",
  "Hard Candy & Lollipops",
  "Vapes & Disposables",
  "Edibles",
  "Snacks",
  "Bundles & Deals",
  "Best Sellers"
] as const;

export const products: Product[] = [
  {
    id: "1",
    slug: "sour-neon-gummies",
    name: "Sour Neon Gummies",
    category: "Gummies & Chews",
    price: 18.99,
    image: "/images/products/gummies-signature.png",
    description: "Tangy fruit chews with bold flavor and soft bite.",
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: "2",
    slug: "cosmic-cookie-truffle-bar",
    name: "Cosmic Cookie Truffle Bar",
    category: "Cookies",
    price: 21.5,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b",
    description: "Rich chocolate with crunchy cookie bits.",
    isBestSeller: true
  },
  {
    id: "3",
    slug: "galaxy-lollipop-pack",
    name: "Galaxy Lollipop Pack",
    category: "Hard Candy & Lollipops",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1575224526797-5730d5f6bc65",
    description: "Colorful hard candy swirls in mixed fruit flavors.",
    isNewArrival: true
  },
  {
    id: "4",
    slug: "mint-frost-disposable",
    name: "Mint Frost Disposable",
    category: "Vapes & Disposables",
    price: 24.99,
    image: "/images/products/vape-kit-baked-to-perfection.png",
    description: "Cool mint profile in a sleek disposable format."
  },
  {
    id: "5",
    slug: "chill-bites-edibles",
    name: "Chill Bites Edibles",
    category: "Edibles",
    price: 29.99,
    image: "/images/products/edibles-handcrafted-display.png",
    description: "Balanced, tasty bites crafted for mellow enjoyment.",
    isBestSeller: true
  },
  {
    id: "6",
    slug: "spicy-night-snack-mix",
    name: "Spicy Night Snack Mix",
    category: "Snacks",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087",
    description: "Crunchy snack blend with a sweet-heat kick."
  },
  {
    id: "7",
    slug: "late-night-bundle",
    name: "Late Night Bundle",
    category: "Bundles & Deals",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    description: "Curated combo pack for max value and variety.",
    isBestSeller: true
  },
  {
    id: "8",
    slug: "budz-signature-box",
    name: "Budz Signature Box",
    category: "Best Sellers",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    description: "Top-rated picks in one premium assortment.",
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: "9",
    slug: "rainbow-chew-rings",
    name: "Rainbow Chew Rings",
    category: "Gummies & Chews",
    price: 16.49,
    image: "https://images.unsplash.com/photo-1534706936160-d5ee67737249",
    description: "Bright chewy rings with juicy fruit punch flavor.",
    isNewArrival: true
  },
  {
    id: "10",
    slug: "velvet-cocoa-bites",
    name: "Velvet Cocoa Bites",
    category: "Chocolate & Truffles",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    description: "Silky chocolate cubes with crunchy nut fragments."
  },
  {
    id: "11",
    slug: "electric-soda-bottles",
    name: "Electric Soda Bottles",
    category: "Hard Candy & Lollipops",
    price: 11.49,
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b",
    description: "Classic soda-bottle candy with a fizzy finish."
  },
  {
    id: "12",
    slug: "snack-attack-pack",
    name: "Snack Attack Pack",
    category: "Snacks",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1598679253544-2c97992403ea",
    description: "Loaded snack assortment for late-night cravings."
  },
  {
    id: "13",
    slug: "triple-chip-cookies",
    name: "Triple Chip Cookies",
    category: "Cookies",
    price: 15.99,
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/pmn/ABYZ3V2PKVF6BCSGO3V7LIQY3M.jpg",
    description: "Soft-baked cookies loaded with dark, milk, and white chocolate chips.",
    isBestSeller: true
  },
  {
    id: "14",
    slug: "salted-caramel-cookie-stack",
    name: "Salted Caramel Cookie Stack",
    category: "Cookies",
    price: 17.49,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
    description: "Golden cookies with gooey caramel centers and a hint of sea salt.",
    isNewArrival: true
  }
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
