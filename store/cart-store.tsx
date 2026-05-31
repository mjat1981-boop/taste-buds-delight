"use client";

import { products } from "@/data/products";
import { CartItem, CheckoutStep, PaymentMethod, ShippingInfo } from "@/types";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CartContextType = {
  items: CartItem[];
  step: CheckoutStep;
  shipping: ShippingInfo;
  payment: PaymentMethod;
  ageVerified: boolean;
  addItem: (productId: string, quantity: number) => void;
  updateQty: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setStep: (step: CheckoutStep) => void;
  setShipping: (value: ShippingInfo) => void;
  setPayment: (value: PaymentMethod) => void;
  setAgeVerified: (value: boolean) => void;
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
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [ageVerified, setAgeVerifiedState] = useState<boolean>(false);

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

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items]);

  const tax = subtotal * 0.08;
  const shippingCost = subtotal > 50 ? 0 : 6.99;
  const total = subtotal + tax + shippingCost;

  const setAgeVerified = (value: boolean) => {
    setAgeVerifiedState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tb_age_verified", value ? "1" : "0");
    }
  };

  const value: CartContextType = {
    items,
    step,
    shipping,
    payment,
    ageVerified,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    setStep,
    setShipping,
    setPayment,
    setAgeVerified,
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
