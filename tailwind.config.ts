import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,css}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        foreground: "var(--foreground)",
        mainColor: "#888aff",
        primary: "#00FF8B",
        secondary: "#005d63",
        tertiary: "#0057FF",
      },
      fontFamily: {
        ppModelPlastic: "var(--font-ppmodel)",
        ppModelLine: "var(--font-ppmodel-line)",
        ppValve: "var(--font-ppvalve)",
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
      animation: {
        "slide-down": "slide-down 0.3s ease-in-out forwards",
        "slide-up": "slide-up 0.3s ease-in-out forwards",
      },
      keyframes: {
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
