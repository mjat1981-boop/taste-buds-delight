"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart-store";
import { categories } from "@/data/products";

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

function ProductCard({ product }: { product: DbProduct }) {
  const { addItem } = useCart();
  return (
    <div className="tbd-card overflow-hidden rounded-2xl shadow-tbd-soft">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-56 w-full">
          <div className="absolute left-3 top-3 z-10 flex gap-2">
            {product.is_best_seller && (
              <span className="rounded-full bg-tbd-green px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                Best Seller
              </span>
            )}
            {product.is_new_arrival && (
              <span className="rounded-full bg-tbd-brown px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                New
              </span>
            )}
          </div>
          <Image
            src={product.image_url || "/images/products/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-tbd-muted">{product.category}</p>
        <h3 className="text-lg font-bold text-tbd-text">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-tbd-green">£{product.price.toFixed(2)}</span>
          <button
            className="rounded-full bg-tbd-green px-4 py-2 text-sm font-bold text-white hover:bg-tbd-green/80 transition-colors"
            onClick={() => addItem(product.id, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShopClient({ products }: { products: DbProduct[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      category === "All"
        ? true
        : category === "Best Sellers"
        ? p.is_best_seller
        : p.category === category
    );
    if (query.trim()) {
      list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, category, query, sort]);

  return (
    <>
      <div className="tbd-card mb-6 grid gap-3 rounded-2xl p-4 md:grid-cols-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
        >
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text placeholder:text-tbd-muted focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
          placeholder="Search sweets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
        >
          <option value="featured">Featured</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
