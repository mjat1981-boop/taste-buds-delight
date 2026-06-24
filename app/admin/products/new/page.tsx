"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  "Gummies & Chews",
  "Cookies",
  "Chocolate & Truffles",
  "Hard Candy & Lollipops",
  "Vapes & Disposables",
  "Edibles",
  "Snacks",
  "Bundles & Deals",
  "Best Sellers",
];

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: "",
    name: "",
    category: CATEGORIES[0],
    price: "",
    description: "",
    is_best_seller: false,
    is_new_arrival: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let image_url = "";
      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const upRes = await fetch("/api/upload", { method: "POST", body: fd });
        const upJson = await upRes.json() as { url?: string; error?: string };
        if (!upRes.ok || !upJson.url) throw new Error(upJson.error ?? "Upload failed");
        image_url = upJson.url;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), image_url }),
      });
      const json = await res.json() as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to create product");

      router.push("/admin/products");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-tbd-bg p-6">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/products" className="text-tbd-muted hover:text-tbd-green text-sm">
            ← Products
          </Link>
          <h1 className="text-2xl font-black text-tbd-green">New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="tbd-card rounded-2xl p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-tbd-text mb-1">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-tbd-text mb-1">Slug</label>
              <input
                required
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="e.g. my-product"
                className="w-full rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-tbd-text mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-tbd-text mb-1">Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="w-full rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-tbd-text mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-tbd-text mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-tbd-muted file:mr-3 file:rounded-full file:border-0 file:bg-tbd-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-tbd-green/80"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-tbd-text cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_best_seller}
                onChange={(e) => set("is_best_seller", e.target.checked)}
                className="accent-tbd-green"
              />
              Best Seller
            </label>
            <label className="flex items-center gap-2 text-sm text-tbd-text cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_new_arrival}
                onChange={(e) => set("is_new_arrival", e.target.checked)}
                className="accent-tbd-green"
              />
              New Arrival
            </label>
          </div>

          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Link
              href="/admin/products"
              className="rounded-full border border-tbd-green/30 px-6 py-3 font-bold text-tbd-text hover:bg-tbd-green/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-tbd-green px-6 py-3 font-bold text-white hover:bg-tbd-green/80 transition-colors disabled:opacity-60"
            >
              {loading ? "Saving…" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
