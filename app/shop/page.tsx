"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { categories, products } from "@/data/products";

export default function ShopPage() {
  const params = useSearchParams();
  const initialCategory = params.get("category") ?? "All";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      category === "All" ? true : category === "Best Sellers" ? p.isBestSeller : p.category === category
    );
    if (query.trim()) {
      list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <div>
      <SectionTitle title="Shop Products" eyebrow="Browse Catalog" />
      <div className="glass mb-6 grid gap-3 rounded-2xl p-4 md:grid-cols-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg bg-budz-panel p-3"
        >
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          className="rounded-lg bg-budz-panel p-3"
          placeholder="Search sweets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg bg-budz-panel p-3"
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
    </div>
  );
}
