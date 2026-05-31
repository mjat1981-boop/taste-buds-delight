import Link from "next/link";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-black">Shop by Category</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/shop?category=${encodeURIComponent(cat)}`}
            className="glass rounded-xl p-4 font-semibold transition hover:border-budz-pink hover:text-budz-green"
          >
            {cat}
          </Link>
        ))}
      </div>
    </section>
  );
}
