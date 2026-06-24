import { products } from "@/data/products";
import { useCart } from "@/store/cart-store";

export function CartSummary() {
  const { items, subtotal, tax, shippingCost, total } = useCart();
  return (
    <aside className="glass h-fit rounded-2xl p-5">
      <h3 className="text-lg font-black">Order Summary</h3>
      <div className="mt-4 space-y-2 text-sm">
        {items.map((item) => {
          const p = products.find((x) => x.id === item.productId);
          if (!p) return null;
          return (
            <div key={item.productId} className="flex justify-between text-budz-muted">
              <span>
                {p.name} x {item.quantity}
              </span>
              <span>£{(p.price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>£{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Evri Delivery</span>
          <span>{shippingCost === 0 ? "Free" : `£${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="mt-2 flex justify-between text-lg font-black text-budz-orange">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}
