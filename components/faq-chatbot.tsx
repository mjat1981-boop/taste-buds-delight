"use client";

import { useState } from "react";

const QA = [
  {
    q: "What products do you sell?",
    a: "We sell gummies & sweets, vapes, brownies, cookies, and bundles. Check our shop for the full range and prices.",
  },
  {
    q: "How do I place an order?",
    a: "Browse the shop, add items to your cart, then fill in your delivery details at checkout. You'll get a confirmation email with your order number.",
  },
  {
    q: "How does delivery work?",
    a: "We deliver via Evri. Orders over £50 get free delivery — otherwise it's just £6. We'll dispatch as soon as your bank transfer clears.",
  },
  {
    q: "What's in the Mystery Box?",
    a: "It's a surprise selection of our top treats — worth more than the £45 price tag. Past boxes have included brownies, gummies, and more.",
  },
  {
    q: "How do I pay?",
    a: "We take bank transfer. After placing your order you'll receive our bank details by email. Use your order number as the reference.",
  },
  {
    q: "How do I contact you?",
    a: "WhatsApp us on +447871529852 or find us on TikTok @tbdo4.",
  },
];

export function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<{ q: string; a: string } | null>(null);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 rounded-2xl border border-tbd-green/20 bg-white shadow-xl overflow-hidden">
          <div className="flex items-center justify-between bg-tbd-green px-4 py-3">
            <span className="font-bold text-white">TBD Support</span>
            <button
              onClick={() => { setOpen(false); setAnswer(null); }}
              className="text-white/80 hover:text-white text-xl leading-none"
            >
              &times;
            </button>
          </div>

          <div className="p-4">
            {answer ? (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-tbd-green">{answer.q}</p>
                <div className="rounded-xl bg-tbd-bg px-4 py-3 text-sm text-tbd-text leading-relaxed">
                  {answer.a}
                </div>
                <button
                  onClick={() => setAnswer(null)}
                  className="mt-1 self-start text-xs font-semibold text-tbd-green hover:underline"
                >
                  ← Back to questions
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="mb-1 text-sm text-tbd-muted">Hi! What can we help you with?</p>
                {QA.map((item) => (
                  <button
                    key={item.q}
                    onClick={() => setAnswer(item)}
                    className="rounded-xl border border-tbd-green/30 px-3 py-2 text-left text-sm font-medium text-tbd-text hover:border-tbd-green hover:bg-tbd-bg transition-colors"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => { setOpen(!open); setAnswer(null); }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-tbd-green text-white shadow-lg hover:bg-tbd-green/80 transition-colors"
        aria-label="Chat support"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
