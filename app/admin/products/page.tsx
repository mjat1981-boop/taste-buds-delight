import { supabaseAdmin } from "@/lib/supabase-server";
import Image from "next/image";
import Link from "next/link";
import { AdminDeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen bg-tbd-bg p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-tbd-green">Products</h1>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm font-semibold">
              <Link href="/admin/orders" className="text-tbd-muted hover:text-tbd-green">Orders</Link>
              <Link href="/admin/products" className="text-tbd-green hover:underline">Products</Link>
            </nav>
            <Link
              href="/admin/products/new"
              className="rounded-full bg-tbd-green px-4 py-2 text-sm font-bold text-white hover:bg-tbd-green/80 transition-colors"
            >
              + Add Product
            </Link>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 mb-4">
            {error.message}
          </div>
        )}

        {!products || products.length === 0 ? (
          <p className="text-tbd-muted">No products yet.</p>
        ) : (
          <div className="tbd-card rounded-2xl overflow-hidden shadow-tbd-soft">
            <table className="w-full text-sm">
              <thead className="border-b border-tbd-green/20 bg-tbd-green/5">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-tbd-green">Image</th>
                  <th className="px-4 py-3 text-left font-bold text-tbd-text">Name</th>
                  <th className="px-4 py-3 text-left font-bold text-tbd-text">Category</th>
                  <th className="px-4 py-3 text-left font-bold text-tbd-text">Price</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-tbd-green/10 hover:bg-tbd-green/5 transition-colors">
                    <td className="px-4 py-3">
                      {product.image_url ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-tbd-green/20">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-tbd-green/10 flex items-center justify-center text-tbd-muted text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-tbd-text">{product.name}</td>
                    <td className="px-4 py-3 text-tbd-muted">{product.category}</td>
                    <td className="px-4 py-3 font-bold text-tbd-text">£{Number(product.price).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 justify-end">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs font-semibold text-tbd-green hover:underline"
                        >
                          Edit
                        </Link>
                        <AdminDeleteButton productId={product.id} productName={product.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
