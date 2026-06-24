"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart-store";

export function AgeGate() {
  const { ageVerified, setAgeVerified } = useCart();

  useEffect(() => {
    const saved = window.localStorage.getItem("tb_age_verified");
    if (saved === "1") setAgeVerified(true);
  }, [setAgeVerified]);

  if (ageVerified) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-tbd-green/20 bg-tbd-card p-6 text-center shadow-tbd-soft">
        <h2 className="text-2xl font-black text-tbd-green">Taste Buds Delight</h2>
        <p className="mt-1 text-sm font-semibold text-tbd-brown">Age Verification Required</p>
        <p className="mt-3 text-sm text-tbd-muted">
          This store is intended for adults 21 and over where permitted by law.
        </p>
        <div className="mt-6 grid gap-3">
          <button
            className="rounded-xl bg-tbd-green px-4 py-3 font-bold text-white hover:bg-tbd-green/80 transition-colors"
            onClick={() => setAgeVerified(true)}
          >
            I Am 21+ — Enter
          </button>
          <button className="rounded-xl border border-tbd-green/20 px-4 py-3 text-tbd-muted hover:bg-tbd-green/5 transition-colors">
            I Am Under 21
          </button>
        </div>
      </div>
    </div>
  );
}
