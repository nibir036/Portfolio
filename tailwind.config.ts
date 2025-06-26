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
      animation: {
        "gradient-x": "gradientX 8s ease infinite",
      },
      keyframes: {
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        200: "200% 200%",
      },
    },
  },
  plugins: [],
} satisfies Config;
