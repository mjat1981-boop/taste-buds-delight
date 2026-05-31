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
      <section className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-budz-purple/30 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-budz-green/30 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-budz-pink">Tasty Budz</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Sweet Temptations <span className="text-budz-green">Delivered</span>
            </h1>
            <p className="mt-3 inline-block rounded-full border border-budz-orange/40 bg-budz-orange/10 px-4 py-2 text-sm font-black uppercase tracking-wider text-budz-orange">
              Baked to Perfection
            </p>
            <p className="mt-4 max-w-xl text-budz-muted">
              Mouth-watering sweets, candies, cookies, snacks, and elevated favorites in a vibrant,
              legal-friendly experience.
            </p>
            <div className="mt-7 flex gap-3">
              <Link href="/shop" className="rounded-full bg-budz-pink px-6 py-3 font-bold">
                Shop Now
              </Link>
              <Link
                href="/shop?category=Best%20Sellers"
                className="rounded-full border border-white/20 px-6 py-3 font-bold"
              >
                Best Sellers
              </Link>
            </div>
          </div>
          <div className="glass rounded-3xl p-8 shadow-neon">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-budz-green">
              Brand Visual
            </p>
            <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/brand/tasty-budz-logo.png"
                alt="Tasty Budz official logo"
                fill
                className="object-cover"
                priority
              />
            </div>
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
            <div key={src} className="glass relative h-56 overflow-hidden rounded-2xl">
              <Image
                src={src}
                alt={`Tasty Budz product visual ${idx + 1}`}
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
