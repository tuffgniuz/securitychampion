import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "4xl": "2500px",
      },
      colors: {
        nord: {
          polarnight: {
            25: "#262b35",
            50: "#2e3440",
            100: "#3b4252",
            200: "#434c5e",
            300: "#4c566a",
          },
          snowstorm: {
            50: "#d8dee9",
            100: "#e5e9f0",
            200: "#eceff4",
          },
          frost: {
            50: "#8fbcbb",
            100: "#88c0d0",
            200: "#81a1c1",
            300: "#5e81ac",
          },
          aurora: {
            100: "#bf616a",
            200: "#d08770",
            300: "#ebcb8b",
            400: "#a3be8c",
            500: "#b48ead",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
