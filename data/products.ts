// Static product fallback — used by the cart store for price lookups.
// The shop and product pages fetch live data from the API (/api/products).
// Do NOT delete this file.
import { Product } from "@/types";

export const categories = [
  "Gummies & Sweets",
  "Vapes",
  "Brownies",
  "Cookies",
  "Bundles & Deals",
  "Best Sellers"
] as const;

export const products: Product[] = [
  // Gummies & Sweets
  {
    id: "1",
    slug: "cherrys",
    name: "Cherry's",
    category: "Gummies & Sweets",
    price: 10,
    image: "https://images.unsplash.com/photo-1582058091022-de7c69a81ece?w=600",
    description: "1000mg per pack. Juicy cherry-flavoured gummies packed with flavour.",
    isBestSeller: true
  },
  {
    id: "2",
    slug: "nerd-bites",
    name: "Nerd Bites",
    category: "Gummies & Sweets",
    price: 10,
    image: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?w=600",
    description: "1000mg per pack. Tangy Nerd-inspired bites with a crunch.",
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: "3",
    slug: "gummy-bears",
    name: "Gummy Bears",
    category: "Gummies & Sweets",
    price: 5,
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600",
    description: "800mg per pack. Classic gummy bears in a mix of fruit flavours.",
    isNewArrival: true
  },
  {
    id: "4",
    slug: "cola-bottles",
    name: "Cola Bottles",
    category: "Gummies & Sweets",
    price: 10,
    image: "https://images.unsplash.com/photo-1575224526797-5730d5f6bc65?w=600",
    description: "1000mg per pack. Fizzy cola bottle sweets with a tangy kick.",
    isBestSeller: true
  },
  // Vapes
  {
    id: "5",
    slug: "high-potency-vape-kit",
    name: "High Potency Vape Kit",
    category: "Vapes",
    price: 25,
    image: "https://images.unsplash.com/photo-1563170351-be14c343c0cc?w=600",
    description: "1000mg high potency vape kit. Available in a range of flavours.",
    isBestSeller: true
  },
  // Brownies
  {
    id: "6",
    slug: "half-tray-brownies",
    name: "Half Tray Brownies",
    category: "Brownies",
    price: 30,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
    description: "4 generous slices of our signature fudgy brownies. Rich, gooey, and baked to perfection.",
    isBestSeller: true
  },
  {
    id: "7",
    slug: "full-tray-brownies",
    name: "Full Tray Brownies",
    category: "Brownies",
    price: 55,
    image: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=600",
    description: "8 slices of pure brownie bliss. Perfect for sharing or treating yourself all week.",
    isBestSeller: true
  },
  // Cookies
  {
    id: "8",
    slug: "single-cookie",
    name: "Cookie",
    category: "Cookies",
    price: 10,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
    description: "One thick, soft-baked cookie. Comfort in every bite."
  },
  {
    id: "9",
    slug: "cookie-5-pack",
    name: "Cookie 5-Pack",
    category: "Cookies",
    price: 40,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600",
    description: "5 cookies for £40 — save £10. Our bestselling soft-baked cookies. Great for gifting.",
    isBestSeller: true,
    isNewArrival: true
  },
  // Bundles
  {
    id: "10",
    slug: "mystery-box",
    name: "Mystery Box",
    category: "Bundles & Deals",
    price: 45,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600",
    description: "Surprise selection of our top sweets and treats. Worth every penny.",
    isBestSeller: true,
    isNewArrival: true
  }
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
