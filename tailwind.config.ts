import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy dark theme — kept for backwards compat with existing components
        budz: {
          bg: "#0A0A0F",
          panel: "#121220",
          pink: "#FF3EA5",
          purple: "#8A42FF",
          green: "#43FF7A",
          orange: "#FF8A3D",
          text: "#F5F5FA",
          muted: "#B5B5CC"
        },
        // TBD green/cream/earth theme
        tbd: {
          bg: "#F5F0E8",
          card: "#FFF8ED",
          green: "#2A6B2A",
          "green-light": "#4CAF50",
          brown: "#5C3D1E",
          text: "#1A1A1A",
          muted: "#6B5C45"
        }
      },
      boxShadow: {
        neon: "0 0 18px rgba(138,66,255,0.45), 0 0 36px rgba(255,62,165,0.25)",
        "tbd-soft": "0 2px 12px rgba(42,107,42,0.15)"
      },
      backgroundImage: {
        "budz-gradient":
          "radial-gradient(circle at 15% 20%, rgba(67,255,122,0.18), transparent 35%), radial-gradient(circle at 85% 10%, rgba(255,62,165,0.16), transparent 30%), linear-gradient(180deg, #0A0A0F 0%, #111224 100%)",
        "tbd-gradient":
          "linear-gradient(135deg, #F5F0E8 0%, #FFF8ED 50%, #F0EBE0 100%)"
      }
    }
  },
  plugins: []
};

export default config;
