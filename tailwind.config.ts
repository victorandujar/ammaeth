import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,css}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        foreground: "var(--foreground)",
        mainColor: "#888aff",
        primary: "#6bcbb8",
        secondary: "#005d63",
        tertiary: "#ff8958",
      },
      fontFamily: {
        ppModelPlastic: "var(--font-ppModel)",
        ppModelLine: "var(--font-ppModel-line)",
        ppValve: "var(--font-ppValve)",
      },
      fontSize: {
        xxl: "var(--font-XXL)",
        xl: "var(--font-XL)",
        l: "var(--font-L)",
        m: "var(--font-M)",
        s: "var(--font-S)",
        ms: "var(--font-MS)",
        mss: "var(--font-MSS)",
      },
      boxShadow: {
        "inner-lg": "inset 0 0 15px 10px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
