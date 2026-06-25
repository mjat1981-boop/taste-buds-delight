"use client";

import { useEffect, useState } from "react";

const NAMES = ["Sarah", "Jake", "Chloe", "Marcus", "Priya", "Tom", "Lexi", "Dan", "Amara", "Ryan"];
const LOCATIONS = ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Liverpool", "Sheffield", "Glasgow", "Cardiff", "Nottingham"];
const PRODUCTS = [
  { name: "Cherry's", emoji: "🍒" },
  { name: "Nerd Bites", emoji: "🍬" },
  { name: "Cola Bottles", emoji: "🥤" },
  { name: "Gummy Bears", emoji: "🐻" },
  { name: "Half Tray Brownies", emoji: "🍫" },
  { name: "Full Tray Brownies", emoji: "🍫" },
  { name: "Cookie 5-Pack", emoji: "🍪" },
  { name: "Mystery Box", emoji: "🎁" },
  { name: "High Potency Vape Kit", emoji: "💨" },
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function minutesAgo() {
  const n = Math.floor(Math.random() * 12) + 1;
  return `${n} minute${n === 1 ? "" : "s"} ago`;
}

export function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState({ name: "", location: "", product: "", emoji: "", time: "" });

  useEffect(() => {
    const show = () => {
      setToast({
        name: random(NAMES),
        location: random(LOCATIONS),
        product: random(PRODUCTS).name,
        emoji: random(PRODUCTS).emoji,
        time: minutesAgo(),
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // First popup after 8s, then every 35–60s
    const first = setTimeout(show, 8000);
    const interval = setInterval(show, Math.random() * 25000 + 35000);

    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-2xl border border-tbd-green/20 bg-white px-4 py-3 shadow-xl"
      style={{ animation: "fadeInUp 0.4s ease" }}
    >
      <span className="text-2xl">{toast.emoji}</span>
      <div>
        <p className="text-sm font-semibold text-tbd-text">
          {toast.name} from {toast.location}
        </p>
        <p className="text-xs text-tbd-muted">
          just bought <span className="font-semibold text-tbd-green">{toast.product}</span>
        </p>
        <p className="text-xs text-tbd-muted">{toast.time}</p>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
