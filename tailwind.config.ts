import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08020d",
        "ink-2": "#0e0517",
        "ink-3": "#160a24",
        bone: "#f4eff7",
        ash: "#9a8fa6",
        magenta: "#d400d1",
        "magenta-deep": "#960095",
        volt: "#5b30ff",
        "volt-deep": "#3906FE",
      },
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"Space Grotesk"', "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(100deg, #d400d1 0%, #5b30ff 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
