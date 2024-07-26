const colors = require("tailwindcss/colors");

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "empty-cart":
          "url('/product-list-cart-next/images/illustration-empty-cart.svg'), linear-gradient(to right, #FFF, #FFF)",
      },
    },
    fontFamily: {
      redhat: ["Red Hat Display"],
      redhatitalic: ["Red Hat Italic"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      red: "hsl(14, 86%, 42%)",
      green: "hsl(159, 69%, 38%)",
      rose: {
        50: "hsl(20, 50%, 98%)",
        100: "hsl(13, 31%, 94%)",
        300: "hsl(14, 25%, 72%)",
        400: "hsl(7, 20%, 60%)",
        500: "hsl(12, 20%, 44%)",
        900: "hsl(14, 65%, 9%)",
      },
    },
  },
  plugins: [],
};
export default config;
