import { SectionTitle } from "@/components/section-title";
import { ShopClient } from "@/components/shop-client";

export const dynamic = "force-dynamic";

type DbProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  is_best_seller: boolean;
  is_new_arrival: boolean;
};

async function getProducts(): Promise<DbProduct[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API error");
    return res.json() as Promise<DbProduct[]>;
  } catch {
    // Fall back to static data if API is unavailable
    const { products } = await import("@/data/products");
    return products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      image_url: p.image,
      is_best_seller: p.isBestSeller ?? false,
      is_new_arrival: p.isNewArrival ?? false,
    }));
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div>
      <SectionTitle title="Shop Products" eyebrow="Browse Catalog" />
      <ShopClient products={products} />
    </div>
  );
}
