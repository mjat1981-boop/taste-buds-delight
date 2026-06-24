import { supabaseAdmin } from "@/lib/supabase-server";
import { OrderRow } from "@/components/admin/order-row";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-tbd-bg p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-tbd-green">Orders</h1>
          <nav className="flex gap-4 text-sm font-semibold">
            <Link href="/admin/orders" className="text-tbd-green hover:underline">Orders</Link>
            <Link href="/admin/products" className="text-tbd-muted hover:text-tbd-green">Products</Link>
          </nav>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 mb-4">
            {error.message}
          </div>
        )}

        {!orders || orders.length === 0 ? (
          <p className="text-tbd-muted">No orders yet.</p>
        ) : (
          <div className="tbd-card rounded-2xl overflow-hidden shadow-tbd-soft">
            <table className="w-full text-sm">
              <thead className="border-b border-tbd-green/20 bg-tbd-green/5">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-tbd-green">Order #</th>
                  <th className="px-4 py-3 text-left font-bold text-tbd-text">Customer</th>
                  <th className="px-4 py-3 text-left font-bold text-tbd-text">Email</th>
                  <th className="px-4 py-3 text-left font-bold text-tbd-text">Total</th>
                  <th className="px-4 py-3 text-left font-bold text-tbd-text">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
