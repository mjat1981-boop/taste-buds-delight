import Link from "next/link";

const categoryItems = [
  { label: "Gummies & Sweets", emoji: "🍬", href: "/shop?category=Gummies+%26+Sweets" },
  { label: "Vapes", emoji: "💨", href: "/shop?category=Vapes" },
  { label: "Brownies", emoji: "🍫", href: "/shop?category=Brownies" },
  { label: "Cookies", emoji: "🍪", href: "/shop?category=Cookies" },
  { label: "Bundles & Deals", emoji: "🎁", href: "/shop?category=Bundles+%26+Deals" },
  { label: "Best Sellers", emoji: "⭐", href: "/shop?category=Best+Sellers" },
];

export function CategoryGrid() {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-black text-tbd-text">Shop by Category</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categoryItems.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="tbd-card flex items-center gap-3 rounded-xl p-4 font-semibold text-tbd-text transition hover:border-tbd-green hover:text-tbd-green border border-tbd-green/20"
          >
            <span className="text-2xl">{cat.emoji}</span>
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
