import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0e0d0b",
        quartz: "#c4a882",
        concrete: {
          100: "#e2e0da",
          200: "#d0cec6",
          300: "#b5b2a8",
          400: "#a9a396",
          500: "#8e8778",
          600: "#706a5e",
          700: "#5a554b",
          800: "#3d3a33",
          900: "#1e1d19",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Outfit'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
      fontSize: {
        display: ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        heading: ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        subhead: ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.4" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },
      gridTemplateColumns: {
        asymmetric: "1.2fr 0.8fr",
        "asymmetric-reverse": "0.8fr 1.2fr",
      },
    },
  },
  plugins: [],
};

export default config;
