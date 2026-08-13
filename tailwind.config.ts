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
        burgundy: {
          DEFAULT: "#5A0A0A",
          dark: "#3A0606",
        },
        gold: {
          DEFAULT: "#D4A830",
          light: "#E8C66A",
        },
        cream: {
          DEFAULT: "#F5E6C8",
          light: "#FBF4E4",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.18em",
      },
    },
  },
  plugins: [],
};
export default config;
