import type { Config } from "tailwindcss";

export default {
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
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        chewy: ["Chewy", "cursive"],
        inter: ["Inter", "sans-serif"],
        pr2p: ["Press Start 2P", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
