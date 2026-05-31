import { CheckoutStep } from "@/types";

const steps: CheckoutStep[] = ["cart", "shipping", "payment", "confirmation"];
const labels: Record<CheckoutStep, string> = {
  cart: "Cart",
  shipping: "Shipping",
  payment: "Payment",
  confirmation: "Confirmation"
};

export function StepProgress({ step }: { step: CheckoutStep }) {
  const current = steps.indexOf(step);
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {steps.map((s, idx) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
              idx <= current ? "bg-budz-green text-black" : "bg-white/10 text-budz-muted"
            }`}
          >
            {labels[s]}
          </div>
          {idx < steps.length - 1 && <span className="text-budz-muted">→</span>}
        </div>
      ))}
    </div>
  );
}
