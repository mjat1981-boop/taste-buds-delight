import Image from "next/image";
import Link from "next/link";
import { CategoryGrid } from "@/components/category-grid";
import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { products } from "@/data/products";

export default function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl min-h-[480px] md:min-h-[560px]">
        {/* Background image */}
        <Image
          src="/images/brand/hero-bg.jpg"
          alt="Taste Buds Delight — brownies and cookies"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative flex flex-col items-center justify-center h-full min-h-[480px] md:min-h-[560px] px-8 py-16 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-tbd-green font-semibold">
            Taste Buds Delight
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl text-white drop-shadow-lg">
            Sweet Temptations <span className="text-tbd-green">Delivered</span>
          </h1>
          <p className="mt-3 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-wider text-white">
            Baked to Perfection
          </p>
          <p className="mt-4 max-w-xl text-white/80">
            Mouth-watering brownies, cookies, and sweet treats crafted with love and delivered to your door via Evri.
          </p>
          <div className="mt-7 flex gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-tbd-green px-6 py-3 font-bold text-white hover:bg-tbd-green/80 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/shop?category=Best%20Sellers"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-bold text-white hover:bg-white/20 transition-colors"
            >
              Best Sellers
            </Link>
          </div>
        </div>
      </section>

      <CategoryGrid />

      <section>
        <SectionTitle title="Best Sellers" eyebrow="Top Picks" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="New Arrivals" eyebrow="Fresh Drop" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Mouth-Watering Picks" eyebrow="Gallery" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1481391032119-d89fee407e44",
            "https://images.unsplash.com/photo-1519869325930-281384150729",
            "https://images.unsplash.com/photo-1551024601-bec78aea704b",
            "https://images.unsplash.com/photo-1621939514649-280e2ee25f60"
          ].map((src, idx) => (
            <div key={src} className="relative h-56 overflow-hidden rounded-2xl border border-tbd-green/15">
              <Image
                src={src}
                alt={`Taste Buds Delight product visual ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
