"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart-store";

export function SiteHeader() {
  const { items } = useCart();
  const count = items.reduce((a, b) => a + b.quantity, 0);
  return (
    <header className="sticky top-0 z-40 border-b border-tbd-green/20 bg-tbd-bg/95 backdrop-blur shadow-tbd-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-tbd-green/40">
            <Image
              src="/images/brand/tbd-logo.png"
              alt="Taste Buds Delight logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-xl font-black tracking-wide text-tbd-green">
            Taste Buds <span className="text-tbd-brown">Delight</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold text-tbd-text">
          <Link href="/shop" className="hover:text-tbd-green transition-colors">
            Shop
          </Link>
          <a
            href="https://www.tiktok.com/@tbdo4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-tbd-green transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
            TikTok
          </a>
          <a
            href="https://wa.me/447871529852"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-tbd-green transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <Link
            href="/checkout"
            className="flex items-center gap-1.5 rounded-full bg-tbd-green px-4 py-2 text-white hover:bg-tbd-green/80 transition-colors"
          >
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
