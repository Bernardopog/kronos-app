import type { Config } from "tailwindcss";

import * as tailwindScrollbar from "tailwind-scrollbar";

export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/mod/**/*.{js,ts,jsx,tsx,mdx}",
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
        side: "0px 0 24px",
        btn: "0 0 5px 3px",
      },
      colors: {
        priority: {
          none: "#42f051",
          lowest: "#7cf042",
          lower: "#c4f042",
          medium: "#f0d342",
          higher: "#f08b42",
          highest: "#f04242",
        },
        crud: {
          create: {
            light: "#2b8e32",
            dark: "#1d4a22",
          },
          read: {
            light: "#9640bf",
            dark: "#572768",
          },
          update: {
            light: "#4784c9",
            dark: "#314e77",
          },
          delete: {
            light: "#bf4040",
            dark: "#73282f",
          },
        },
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
          "925": "#202020",
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
        "move-left-to-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "move-in": "move-in 0.5s linear forwards",
        "move-left-to-right": "move-left-to-right 0.5s linear forwards",
      },
    },
  },
  plugins: [tailwindScrollbar.default],
} satisfies Config;
