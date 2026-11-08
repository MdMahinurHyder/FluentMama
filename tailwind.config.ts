import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14101F",
        muted: "#5F5873",
        line: "#E3DDF2",
        canvas: "#F7F5FB",
        brand: { DEFAULT: "#6B3FD4", dark: "#4B2AA8", soft: "#F0EBFC" },
        sky: "#E9E4FA",
        sun: "#FFC93C",
      },
      fontFamily: {
        sans: ["var(--font-dm)", "var(--font-bn)", "system-ui", "sans-serif"],
      },
      boxShadow: { card: "0 10px 30px -12px rgba(43,20,100,.20)" },
    },
  },
  plugins: [],
};
export default config;
