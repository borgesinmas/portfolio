import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#10B981",
        "accent-light": "#34D399",
        "brand-blue": "#3B82F6",
        success: "#10B981",
        warning: "#D29922",
        error: "#DA3633",
        bg: {
          primary: "#090C10",
          secondary: "#0E1117",
          tertiary: "#12161D",
          card: "#161B22",
          "card-hover": "#1C2129",
        },
        border: { DEFAULT: "#21262D", hover: "#30363D" },
        text: { primary: "#F0F2F5", secondary: "#8B949E", muted: "#6E7681", dim: "#484F58" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: { content: "1400px" },
      borderRadius: { DEFAULT: "12px", lg: "16px", xl: "20px" },
    },
  },
  plugins: [],
};

export default config;