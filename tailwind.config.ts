import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-navy": "#0A2540",
        "electric-cyan": "#00B4D8",
        "vibrant-orange": "#FF6B35",
        "sky-blue": "#F0F7FF",
        "slate-gray": "#4A5568",
        "dark-cyan": "#0077A8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        input: "4px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,180,216,0.12)",
        "card-hover": "0 8px 32px rgba(0,180,216,0.2)",
        navbar: "0 2px 8px rgba(10,37,64,0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "counter-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "draw-line": "draw-line 1.5s ease-in-out forwards",
        marquee: "marquee 30s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "counter-up": "counter-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
