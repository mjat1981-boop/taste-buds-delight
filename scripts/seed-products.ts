/**
 * Node script — inserts the 14 products into Supabase using the service key.
 * Run with: npx tsx scripts/seed-products.ts
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const products = [
  { slug: "sour-neon-gummies", name: "Sour Neon Gummies", category: "Gummies & Chews", price: 18.99, description: "Tangy fruit chews with bold flavor and soft bite.", image_url: "/images/products/gummies-signature.png", is_best_seller: true, is_new_arrival: true },
  { slug: "cookie-truffle-bar", name: "Cookie Truffle Bar", category: "Cookies", price: 21.50, description: "Rich chocolate with crunchy cookie bits.", image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b", is_best_seller: true, is_new_arrival: false },
  { slug: "lollipop-party-pack", name: "Lollipop Party Pack", category: "Hard Candy & Lollipops", price: 12.99, description: "Colorful hard candy swirls in mixed fruit flavors.", image_url: "https://images.unsplash.com/photo-1575224526797-5730d5f6bc65", is_best_seller: false, is_new_arrival: true },
  { slug: "mint-frost-disposable", name: "Mint Frost Disposable", category: "Vapes & Disposables", price: 24.99, description: "Cool mint profile in a sleek disposable format.", image_url: "/images/products/vape-kit-baked-to-perfection.png", is_best_seller: false, is_new_arrival: false },
  { slug: "chill-bites-edibles", name: "Chill Bites Edibles", category: "Edibles", price: 29.99, description: "Balanced, tasty bites crafted for mellow enjoyment.", image_url: "/images/products/edibles-handcrafted-display.png", is_best_seller: true, is_new_arrival: false },
  { slug: "spicy-night-snack-mix", name: "Spicy Night Snack Mix", category: "Snacks", price: 9.99, description: "Crunchy snack blend with a sweet-heat kick.", image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087", is_best_seller: false, is_new_arrival: false },
  { slug: "late-night-bundle", name: "Late Night Bundle", category: "Bundles & Deals", price: 44.99, description: "Curated combo pack for max value and variety.", image_url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc", is_best_seller: true, is_new_arrival: false },
  { slug: "budz-signature-box", name: "TBD Signature Box", category: "Best Sellers", price: 54.99, description: "Top-rated picks in one premium assortment.", image_url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e", is_best_seller: true, is_new_arrival: true },
  { slug: "rainbow-chew-rings", name: "Rainbow Chew Rings", category: "Gummies & Chews", price: 16.49, description: "Bright chewy rings with juicy fruit punch flavor.", image_url: "https://images.unsplash.com/photo-1534706936160-d5ee67737249", is_best_seller: false, is_new_arrival: true },
  { slug: "velvet-cocoa-bites", name: "Velvet Cocoa Bites", category: "Chocolate & Truffles", price: 19.99, description: "Silky chocolate cubes with crunchy nut fragments.", image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c", is_best_seller: false, is_new_arrival: false },
  { slug: "electric-soda-bottles", name: "Electric Soda Bottles", category: "Hard Candy & Lollipops", price: 11.49, description: "Classic soda-bottle candy with a fizzy finish.", image_url: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b", is_best_seller: false, is_new_arrival: false },
  { slug: "snack-attack-pack", name: "Snack Attack Pack", category: "Snacks", price: 14.99, description: "Loaded snack assortment for late-night cravings.", image_url: "https://images.unsplash.com/photo-1598679253544-2c97992403ea", is_best_seller: false, is_new_arrival: false },
  { slug: "triple-chip-cookies", name: "Triple Chip Cookies", category: "Cookies", price: 15.99, description: "Soft-baked cookies loaded with dark, milk, and white chocolate chips.", image_url: "https://cloudfront-us-east-1.images.arcpublishing.com/pmn/ABYZ3V2PKVF6BCSGO3V7LIQY3M.jpg", is_best_seller: true, is_new_arrival: false },
  { slug: "salted-caramel-cookie-stack", name: "Salted Caramel Cookie Stack", category: "Cookies", price: 17.49, description: "Golden cookies with gooey caramel centers and a hint of sea salt.", image_url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35", is_best_seller: false, is_new_arrival: true },
];

async function seed() {
  const { data, error } = await supabase
    .from("products")
    .upsert(products, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${data?.length ?? 0} products successfully.`);
}

seed();
