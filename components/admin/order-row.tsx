"use client";

import { useState } from "react";

type OrderItem = { productId: string; quantity: number };
type ShippingInfo = { fullName: string; email: string; address: string; city: string; zip: string };

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total: number;
  created_at: string;
  items: OrderItem[];
  shipping_info: ShippingInfo;
  subtotal: number;
  tax: number;
  shipping_cost: number;
};

export function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="border-b border-tbd-green/10 hover:bg-tbd-green/5 transition-colors">
        <td className="px-4 py-3 font-mono text-sm font-bold text-tbd-green">{order.order_number}</td>
        <td className="px-4 py-3 text-tbd-text">{order.customer_name}</td>
        <td className="px-4 py-3 text-tbd-muted text-sm">{order.customer_email}</td>
        <td className="px-4 py-3 font-bold text-tbd-text">£{Number(order.total).toFixed(2)}</td>
        <td className="px-4 py-3 text-tbd-muted text-sm">
          {new Date(order.created_at).toLocaleDateString()}
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-semibold text-tbd-green hover:underline"
          >
            {expanded ? "Hide" : "View"}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-tbd-card">
          <td colSpan={6} className="px-6 py-4">
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <p className="font-bold text-tbd-text mb-2">Items</p>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-tbd-muted">
                    Product ID: {item.productId} × {item.quantity}
                  </p>
                ))}
                <div className="mt-2 space-y-1 border-t border-tbd-green/15 pt-2">
                  <div className="flex justify-between"><span className="text-tbd-muted">Subtotal</span><span>£{Number(order.subtotal).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-tbd-muted">Tax</span><span>£{Number(order.tax).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-tbd-muted">Shipping</span><span>£{Number(order.shipping_cost).toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-tbd-green"><span>Total</span><span>£{Number(order.total).toFixed(2)}</span></div>
                </div>
              </div>
              <div>
                <p className="font-bold text-tbd-text mb-2">Ship To</p>
                <p className="text-tbd-muted">{order.shipping_info.fullName}</p>
                <p className="text-tbd-muted">{order.shipping_info.address}</p>
                <p className="text-tbd-muted">{order.shipping_info.city}, {order.shipping_info.zip}</p>
                <p className="text-tbd-muted mt-1">{order.shipping_info.email}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
