import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        charcoal: "var(--charcoal)",
        lightBg: "var(--lightBg)",
        darkBg: "var(--darkBg)",
        darkCharcoal: "var(--darkCharcoal)",
        hoverBg: "var(--hoverBg)",
        numbersBg: "var(--numbersBg)",
      },
    },
  },
  plugins: [],
};
export default config;
