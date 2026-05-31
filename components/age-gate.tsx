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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
      <div className="glass w-full max-w-md rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-black text-budz-green">Tasty Budz 21+ Entry</h2>
        <p className="mt-3 text-sm text-budz-muted">
          This store is intended for adults 21+ where allowed by law.
        </p>
        <div className="mt-6 grid gap-3">
          <button
            className="rounded-xl bg-budz-green px-4 py-3 font-bold text-black"
            onClick={() => setAgeVerified(true)}
          >
            I Am 21+ Enter
          </button>
          <button className="rounded-xl border border-white/20 px-4 py-3 text-budz-muted">
            I Am Under 21
          </button>
        </div>
      </div>
    </div>
  );
}
