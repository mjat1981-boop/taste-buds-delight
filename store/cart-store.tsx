"use client";

import { products } from "@/data/products";
import { CartItem, CheckoutStep, PaymentMethod, ShippingInfo } from "@/types";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type CartContextType = {
  items: CartItem[];
  step: CheckoutStep;
  shipping: ShippingInfo;
  payment: PaymentMethod;
  ageVerified: boolean;
  orderId: string | null;
  orderNumber: string | null;
  isSubmitting: boolean;
  submitError: string | null;
  addItem: (productId: string, quantity: number) => void;
  updateQty: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setStep: (step: CheckoutStep) => void;
  setShipping: (value: ShippingInfo) => void;
  setPayment: (value: PaymentMethod) => void;
  setAgeVerified: (value: boolean) => void;
  placeOrder: () => Promise<void>;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
};

const defaultShipping: ShippingInfo = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  zip: ""
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [shipping, setShipping] = useState<ShippingInfo>(defaultShipping);
  const [payment, setPayment] = useState<PaymentMethod>("bank_transfer");
  const [ageVerified, setAgeVerifiedState] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const addItem = (productId: string, quantity: number) => {
    setItems((prev) => {
      const found = prev.find((x) => x.productId === productId);
      if (found) {
        return prev.map((x) =>
          x.productId === productId ? { ...x, quantity: x.quantity + quantity } : x
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const updateQty = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    setItems((prev) => prev.map((x) => (x.productId === productId ? { ...x, quantity } : x)));
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setOrderId(null);
    setOrderNumber(null);
    setSubmitError(null);
    setStep("cart");
  };

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items]);

  const tax = subtotal * 0.08;
  const shippingCost = subtotal > 50 ? 0 : 6;
  const total = subtotal + tax + shippingCost;

  const setAgeVerified = (value: boolean) => {
    setAgeVerifiedState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tb_age_verified", value ? "1" : "0");
    }
  };

  const placeOrder = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shipping_info: shipping,
          subtotal,
          tax,
          shipping_cost: shippingCost,
          total,
        }),
      });
      const json = await res.json() as { success?: boolean; orderId?: string; orderNumber?: string; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Order submission failed");
      }
      setOrderId(json.orderId ?? null);
      setOrderNumber(json.orderNumber ?? null);
      setStep("confirmation");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [items, shipping, subtotal, tax, shippingCost, total]);

  const value: CartContextType = {
    items,
    step,
    shipping,
    payment,
    ageVerified,
    orderId,
    orderNumber,
    isSubmitting,
    submitError,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    setStep,
    setShipping,
    setPayment,
    setAgeVerified,
    placeOrder,
    subtotal,
    tax,
    shippingCost,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
