import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        "bg-2": "#12100E",
        panel: "#161210",
        soft: "#241511",
        ink: {
          DEFAULT: "#F9F8F6",
          dim: "#B9B2AA",
          faint: "#8A837C"
        },
        accent: {
          DEFAULT: "#E05A33",
          deep: "#C94A25"
        },
        violet: { DEFAULT: "#A8471F" },
        mint: "#34D399",
        amber: "#FBBF24",
        coral: "#FB923C",
        rose: "#F87171",
        sky: "#F59E0B"
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(224,90,51,0.35)",
        "glow-violet": "0 0 40px rgba(224,90,51,0.2)",
        panel: "0 10px 40px rgba(0,0,0,0.5)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #E05A33 0%, #C94A25 100%)"
      }
    }
  },
  plugins: []
};

export default config;
