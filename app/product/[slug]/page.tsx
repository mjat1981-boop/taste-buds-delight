"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductBySlug, products as staticProducts } from "@/data/products";
import { useCart } from "@/store/cart-store";
import { Product } from "@/types";

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

function dbToProduct(p: DbProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category as Product["category"],
    price: p.price,
    image: p.image_url,
    description: p.description,
    isBestSeller: p.is_best_seller,
    isNewArrival: p.is_new_arrival,
  };
}

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json() as DbProduct[];
          if (data.length > 0) {
            const p = dbToProduct(data[0]);
            setProduct(p);
            // Fetch all for related
            const allRes = await fetch("/api/products");
            if (allRes.ok) {
              const all = await allRes.json() as DbProduct[];
              setRelated(
                all
                  .filter((x) => x.category === data[0].category && x.id !== data[0].id)
                  .slice(0, 4)
                  .map(dbToProduct)
              );
            }
            return;
          }
        }
      } catch {
        // fall through to static
      }
      // Static fallback
      const p = getProductBySlug(slug);
      setProduct(p ?? null);
      if (p) {
        setRelated(
          staticProducts
            .filter((x) => x.category === p.category && x.id !== p.id)
            .slice(0, 4)
        );
      }
    }
    fetchProduct();
  }, [slug]);

  if (product === undefined) {
    return (
      <div className="flex items-center justify-center py-20 text-tbd-muted">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center text-tbd-muted">
        Product not found.{" "}
        <Link href="/shop" className="text-tbd-green hover:underline">
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2">
        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-tbd-green/15">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-tbd-brown font-semibold">{product.category}</p>
          <h1 className="text-4xl font-black text-tbd-text">{product.name}</h1>
          <p className="text-tbd-muted">{product.description}</p>
          <p className="text-3xl font-black text-tbd-green">£{product.price.toFixed(2)}</p>
          <div className="flex items-center gap-3">
            <button
              className="h-10 w-10 rounded-full border border-tbd-green/30 text-tbd-text hover:bg-tbd-green/10 transition-colors"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="w-6 text-center font-bold">{qty}</span>
            <button
              className="h-10 w-10 rounded-full border border-tbd-green/30 text-tbd-text hover:bg-tbd-green/10 transition-colors"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
          <button
            className="rounded-full bg-tbd-green px-7 py-3 font-bold text-white hover:bg-tbd-green/80 transition-colors"
            onClick={() => addItem(product.id, qty)}
          >
            Add to Cart
          </button>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-black text-tbd-text">Related Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/product/${r.slug}`}
                className="tbd-card rounded-xl p-4 hover:border-tbd-green transition-colors"
              >
                <p className="font-bold text-tbd-text">{r.name}</p>
                <p className="text-sm text-tbd-muted">{r.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
