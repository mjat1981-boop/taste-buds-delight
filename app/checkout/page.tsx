"use client";

import { CartSummary } from "@/components/cart-summary";
import { StepProgress } from "@/components/step-progress";
import { products } from "@/data/products";
import { useCart } from "@/store/cart-store";

export default function CheckoutPage() {
  const {
    items,
    step,
    shipping,
    payment,
    setShipping,
    setPayment,
    setStep,
    updateQty,
    removeItem,
    clearCart
  } = useCart();

  const canShipping = items.length > 0;
  const canPayment =
    shipping.fullName && shipping.email && shipping.address && shipping.city && shipping.zip;

  return (
    <div>
      <h1 className="mb-4 text-4xl font-black">Checkout</h1>
      <StepProgress step={step} />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="glass rounded-2xl p-5">
          {step === "cart" && (
            <div className="space-y-4">
              {items.length === 0 && <p>Your cart is empty.</p>}
              {items.map((item) => {
                const p = products.find((x) => x.id === item.productId);
                if (!p) return null;
                return (
                  <div key={item.productId} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <p className="font-bold">{p.name}</p>
                      <p className="text-sm text-budz-muted">${p.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="h-8 w-8 rounded border border-white/20" onClick={() => updateQty(p.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="h-8 w-8 rounded border border-white/20" onClick={() => updateQty(p.id, item.quantity + 1)}>
                        +
                      </button>
                      <button className="ml-2 text-xs text-budz-pink" onClick={() => removeItem(p.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              <button
                disabled={!canShipping}
                className="rounded-full bg-budz-green px-6 py-3 font-bold text-black disabled:opacity-40"
                onClick={() => setStep("shipping")}
              >
                Continue to Shipping
              </button>
            </div>
          )}

          {step === "shipping" && (
            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (canPayment) setStep("payment");
              }}
            >
              <input className="rounded-lg bg-budz-panel p-3" placeholder="Full Name" value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} />
              <input className="rounded-lg bg-budz-panel p-3" placeholder="Email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
              <input className="rounded-lg bg-budz-panel p-3" placeholder="Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
              <div className="grid gap-3 md:grid-cols-2">
                <input className="rounded-lg bg-budz-panel p-3" placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                <input className="rounded-lg bg-budz-panel p-3" placeholder="ZIP" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
              </div>
              <div className="flex gap-3">
                <button type="button" className="rounded-full border border-white/20 px-6 py-3 font-bold" onClick={() => setStep("cart")}>
                  Back
                </button>
                <button className="rounded-full bg-budz-green px-6 py-3 font-bold text-black">Continue to Payment</button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-4">
              <div className="grid gap-3">
                <label className="glass flex cursor-pointer items-center gap-3 rounded-xl p-3">
                  <input type="radio" checked={payment === "card"} onChange={() => setPayment("card")} />
                  Card
                </label>
                <label className="glass flex cursor-pointer items-center gap-3 rounded-xl p-3">
                  <input type="radio" checked={payment === "paypal"} onChange={() => setPayment("paypal")} />
                  PayPal
                </label>
              </div>
              <div className="flex gap-3">
                <button className="rounded-full border border-white/20 px-6 py-3 font-bold" onClick={() => setStep("shipping")}>
                  Back
                </button>
                <button className="rounded-full bg-budz-pink px-6 py-3 font-bold" onClick={() => setStep("confirmation")}>
                  Place Order
                </button>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-budz-green">Order Confirmed</h2>
              <p className="text-budz-muted">
                Thanks for ordering from Tasty Budz. You will receive a confirmation email shortly.
              </p>
              <p className="text-xs text-budz-muted">
                Adult-use products are sold where legal. Please verify local laws.
              </p>
              <button
                className="rounded-full bg-budz-orange px-6 py-3 font-bold"
                onClick={() => {
                  clearCart();
                  setStep("cart");
                }}
              >
                Start New Order
              </button>
            </div>
          )}
        </section>

        <div className="lg:sticky lg:top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
