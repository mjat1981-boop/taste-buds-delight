import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        budz: {
          bg: "#0A0A0F",
          panel: "#121220",
          pink: "#FF3EA5",
          purple: "#8A42FF",
          green: "#43FF7A",
          orange: "#FF8A3D",
          text: "#F5F5FA",
          muted: "#B5B5CC"
        }
      },
      boxShadow: {
        neon: "0 0 18px rgba(138,66,255,0.45), 0 0 36px rgba(255,62,165,0.25)"
      },
      backgroundImage: {
        "budz-gradient":
          "radial-gradient(circle at 15% 20%, rgba(67,255,122,0.18), transparent 35%), radial-gradient(circle at 85% 10%, rgba(255,62,165,0.16), transparent 30%), linear-gradient(180deg, #0A0A0F 0%, #111224 100%)"
      }
    }
  },
  plugins: []
};

export default config;
