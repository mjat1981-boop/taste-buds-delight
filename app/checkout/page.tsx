"use client";

import { useRouter } from "next/navigation";
import { CartSummary } from "@/components/cart-summary";
import { StepProgress } from "@/components/step-progress";
import { products } from "@/data/products";
import { useCart } from "@/store/cart-store";

const BANK_DETAILS = {
  bank: "First National Bank",
  accountName: "Taste Buds Delight",
  accountNumber: "XXXX-XXXX-XXXX",
  sortCode: "XX-XX-XX",
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    step,
    shipping,
    orderNumber,
    subtotal,
    tax,
    shippingCost,
    total,
    isSubmitting,
    submitError,
    setShipping,
    setStep,
    updateQty,
    removeItem,
    clearCart,
    placeOrder,
  } = useCart();

  const canShipping = items.length > 0;
  const canPayment =
    shipping.fullName && shipping.email && shipping.address && shipping.city && shipping.zip;

  return (
    <div>
      <h1 className="mb-4 text-4xl font-black text-tbd-text">Checkout</h1>
      <StepProgress step={step} />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="tbd-card rounded-2xl p-5">

          {/* CART STEP */}
          {step === "cart" && (
            <div className="space-y-4">
              {items.length === 0 && (
                <p className="text-tbd-muted">Your cart is empty.</p>
              )}
              {items.map((item) => {
                const p = products.find((x) => x.id === item.productId);
                if (!p) return null;
                return (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between border-b border-tbd-green/15 pb-3"
                  >
                    <div>
                      <p className="font-bold text-tbd-text">{p.name}</p>
                      <p className="text-sm text-tbd-muted">£{p.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="h-8 w-8 rounded border border-tbd-green/30 text-tbd-text hover:bg-tbd-green/10 transition-colors"
                        onClick={() => updateQty(p.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold">{item.quantity}</span>
                      <button
                        className="h-8 w-8 rounded border border-tbd-green/30 text-tbd-text hover:bg-tbd-green/10 transition-colors"
                        onClick={() => updateQty(p.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-2 text-xs text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => removeItem(p.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              <button
                disabled={!canShipping}
                className="rounded-full bg-tbd-green px-6 py-3 font-bold text-white disabled:opacity-40 hover:bg-tbd-green/80 transition-colors"
                onClick={() => setStep("shipping")}
              >
                Continue to Shipping
              </button>
            </div>
          )}

          {/* SHIPPING STEP */}
          {step === "shipping" && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-tbd-green/30 bg-tbd-green/5 px-4 py-3 text-sm">
              <span className="text-xl">📦</span>
              <div>
                <p className="font-bold text-tbd-green">Delivered by Evri</p>
                <p className="text-tbd-muted">£6 delivery · Free on orders over £50</p>
              </div>
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
              <input
                className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text placeholder:text-tbd-muted focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
                placeholder="Full Name"
                value={shipping.fullName}
                onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
              />
              <input
                className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text placeholder:text-tbd-muted focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
                placeholder="Email"
                type="email"
                value={shipping.email}
                onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
              />
              <input
                className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text placeholder:text-tbd-muted focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
                placeholder="Address"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
              />
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text placeholder:text-tbd-muted focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
                  placeholder="City"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                />
                <input
                  className="rounded-lg border border-tbd-green/30 bg-tbd-bg p-3 text-tbd-text placeholder:text-tbd-muted focus:outline-none focus:ring-2 focus:ring-tbd-green/40"
                  placeholder="ZIP / Postcode"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-full border border-tbd-green/30 px-6 py-3 font-bold text-tbd-text hover:bg-tbd-green/10 transition-colors"
                  onClick={() => setStep("cart")}
                >
                  Back
                </button>
                <button
                  className="rounded-full bg-tbd-green px-6 py-3 font-bold text-white hover:bg-tbd-green/80 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {/* PAYMENT STEP */}
          {step === "payment" && (
            <div className="space-y-5">
              <h2 className="text-lg font-black text-tbd-text">Payment Method</h2>

              {/* Bank transfer info box */}
              <div className="rounded-xl border-2 border-tbd-green bg-tbd-green/5 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-5 w-5 rounded-full border-2 border-tbd-green bg-tbd-green flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <span className="font-bold text-tbd-green">Bank Transfer</span>
                </div>
                <p className="text-sm text-tbd-muted mb-3">
                  After placing your order you will receive your order number. Use the details
                  below to complete your payment. Orders are processed once payment is confirmed.
                </p>
                <div className="rounded-lg bg-tbd-bg border border-tbd-green/20 p-4 font-mono text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Bank</span>
                    <span className="font-semibold text-tbd-text">{BANK_DETAILS.bank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Account Name</span>
                    <span className="font-semibold text-tbd-text">{BANK_DETAILS.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Account Number</span>
                    <span className="font-semibold text-tbd-text">{BANK_DETAILS.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Sort Code</span>
                    <span className="font-semibold text-tbd-text">{BANK_DETAILS.sortCode}</span>
                  </div>
                  <div className="flex justify-between border-t border-tbd-green/20 pt-2 mt-2">
                    <span className="text-tbd-muted">Reference</span>
                    <span className="font-bold text-tbd-green">Your Order Number</span>
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  className="rounded-full border border-tbd-green/30 px-6 py-3 font-bold text-tbd-text hover:bg-tbd-green/10 transition-colors"
                  onClick={() => setStep("shipping")}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  className="flex items-center gap-2 rounded-full bg-tbd-green px-6 py-3 font-bold text-white hover:bg-tbd-green/80 transition-colors disabled:opacity-60"
                  onClick={placeOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  )}
                  {isSubmitting ? "Placing Order…" : "Place Order"}
                </button>
              </div>
            </div>
          )}

          {/* CONFIRMATION STEP */}
          {step === "confirmation" && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="text-5xl mb-3">✓</div>
                <h2 className="text-3xl font-black text-tbd-green">Order Confirmed!</h2>
                <p className="mt-2 text-tbd-muted">
                  Thank you for ordering from Taste Buds Delight.
                </p>
              </div>

              {orderNumber && (
                <div className="rounded-xl border-2 border-tbd-green bg-tbd-green/5 p-5 text-center">
                  <p className="text-sm text-tbd-muted mb-1">Your Order Number</p>
                  <p className="text-3xl font-black tracking-widest text-tbd-green">{orderNumber}</p>
                  <p className="text-xs text-tbd-muted mt-2">
                    A confirmation email has been sent to {shipping.email}
                  </p>
                </div>
              )}

              {/* Itemized receipt */}
              <div className="tbd-card rounded-xl p-5">
                <h3 className="font-black text-tbd-text mb-3">Receipt</h3>
                <div className="space-y-2 text-sm">
                  {items.map((item) => {
                    const p = products.find((x) => x.id === item.productId);
                    if (!p) return null;
                    return (
                      <div key={item.productId} className="flex justify-between text-tbd-muted">
                        <span>{p.name} x {item.quantity}</span>
                        <span>£{(p.price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-tbd-green/15 pt-2 mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-tbd-muted">Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tbd-muted">Tax</span>
                      <span>£{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tbd-muted">Evri Delivery</span>
                      <span>{shippingCost === 0 ? "Free" : `£${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-black text-tbd-green text-lg mt-1">
                      <span>Total</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping recap */}
              <div className="tbd-card rounded-xl p-5">
                <h3 className="font-black text-tbd-text mb-2">Shipping To</h3>
                <p className="text-tbd-muted text-sm">{shipping.fullName}</p>
                <p className="text-tbd-muted text-sm">{shipping.address}</p>
                <p className="text-tbd-muted text-sm">{shipping.city}, {shipping.zip}</p>
              </div>

              {/* Bank transfer instructions */}
              <div className="rounded-xl border border-tbd-brown/30 bg-tbd-brown/5 p-5">
                <h3 className="font-black text-tbd-brown mb-3">Complete Your Payment</h3>
                <p className="text-sm text-tbd-muted mb-3">
                  Transfer the total amount using the details below. Use your order number as the reference.
                </p>
                <div className="rounded-lg bg-tbd-bg border border-tbd-brown/20 p-4 font-mono text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Bank</span>
                    <span className="font-semibold">{BANK_DETAILS.bank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Account Name</span>
                    <span className="font-semibold">{BANK_DETAILS.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Account Number</span>
                    <span className="font-semibold">{BANK_DETAILS.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tbd-muted">Sort Code</span>
                    <span className="font-semibold">{BANK_DETAILS.sortCode}</span>
                  </div>
                  <div className="flex justify-between border-t border-tbd-brown/20 pt-2 mt-2">
                    <span className="text-tbd-muted">Reference</span>
                    <span className="font-bold text-tbd-green">{orderNumber}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full rounded-full bg-tbd-green px-6 py-3 font-bold text-white hover:bg-tbd-green/80 transition-colors"
                onClick={() => {
                  clearCart();
                  router.push("/shop");
                }}
              >
                Continue Shopping
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
