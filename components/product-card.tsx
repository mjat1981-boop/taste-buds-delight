"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/store/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="glass overflow-hidden rounded-2xl shadow-neon">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-56 w-full">
          <div className="absolute left-3 top-3 z-10 flex gap-2">
            {product.isBestSeller && (
              <span className="rounded-full bg-budz-green px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                Best Seller
              </span>
            )}
            {product.isNewArrival && (
              <span className="rounded-full bg-budz-pink px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                New
              </span>
            )}
          </div>
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-budz-muted">{product.category}</p>
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-budz-orange">${product.price.toFixed(2)}</span>
          <button
            className="rounded-full bg-budz-pink px-4 py-2 text-sm font-bold hover:bg-budz-purple"
            onClick={() => addItem(product.id, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
