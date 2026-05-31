"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/store/cart-store";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div>
        Product not found. <Link href="/shop">Return to shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2">
        <div className="glass relative h-[420px] overflow-hidden rounded-3xl">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-budz-pink">{product.category}</p>
          <h1 className="text-4xl font-black">{product.name}</h1>
          <p className="text-budz-muted">{product.description}</p>
          <p className="text-3xl font-black text-budz-orange">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-3">
            <button
              className="h-10 w-10 rounded-full border border-white/20"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="w-6 text-center font-bold">{qty}</span>
            <button className="h-10 w-10 rounded-full border border-white/20" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
          <button
            className="rounded-full bg-budz-pink px-7 py-3 font-bold"
            onClick={() => addItem(product.id, qty)}
          >
            Add to Cart
          </button>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-black">Related Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link key={r.id} href={`/product/${r.slug}`} className="glass rounded-xl p-4 hover:border-budz-green">
              <p className="font-bold">{r.name}</p>
              <p className="text-sm text-budz-muted">{r.category}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
