"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart-store";

export function SiteHeader() {
  const { items } = useCart();
  const count = items.reduce((a, b) => a + b.quantity, 0);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-budz-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-budz-green/40">
            <Image
              src="/images/brand/tasty-budz-logo.png"
              alt="Tasty Budz logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-2xl font-black tracking-wide text-budz-green">
            Tasty <span className="text-budz-pink">Budz</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold">
          <Link href="/shop" className="hover:text-budz-orange">
            Shop
          </Link>
          <Link href="/checkout" className="hover:text-budz-orange">
            Checkout ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
