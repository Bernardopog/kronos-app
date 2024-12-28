import type { Config } from "tailwindcss";

import * as tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "425px",
      sm: "568px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1540px",
    },
    extend: {
      boxShadow: {
        base: "0 8px 4px",
        "base-floating": "0 24px 4px",
      },
      colors: {
        woodsmoke: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#1a1a1a",
        },
        poppy: {
          "300": "#f7aaaa",
          "400": "#f07979",
          "500": "#e54e4e",
          "600": "#d23030",
          "700": "#b12525",
          "800": "#922222",
          "900": "#792323",
        },
        apple: {
          "300": "#9be571",
          "400": "#79d546",
          "500": "#54b125",
          "600": "#42951b",
          "700": "#347219",
          "800": "#2d5a1a",
          "900": "#284d1a",
        },
      },
      keyframes: {
        "move-in": {
          "0%": {
            transform: "translateY(-10rem)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "move-in": "move-in 0.5s linear forwards",
      },
    },
  },
  plugins: [tailwindScrollbar.default],
} satisfies Config;
