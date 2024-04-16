/** @type {import('tailwindcss').Config} */
const plugin = require("./tailwind.plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      colors: {
        primary: {
          turquoise: "#19c2c9",
          blue: "#15569d",
          black: "#243032",
          grey: "#525f67",
        },
        neutral: {
          0: "#ffffff",
          15: "#f4f4f4",
          20: "#efeeee",
          25: "#d8d8d8",
          50: "#acb0b0",
          100: "#777e7f",
          150: "#424d4e",
          200: "#0c1a1c",
        },
        blue: {
          10: "#f5f9fa",
          15: "#e4edef",
          25: "#0044ff",
          50: "#9ec6de",
          75: "#6b9acd",
          100: "#3b76b6",
          150: "#15569d",
          200: "#11457e",
        },
        yellow: {
          25: "#fef2d2",
          50: "#fee6a5",
          100: "#fdd978",
          150: "#fdcd4b",
          200: "#fcc01e",
        },
        turquoise: {
          5: "#e9f9fa",
          10: "#ccf1f3",
          15: "#99e4e7",
          25: "#66d6db",
          50: "#33c9cf",
          75: "#00bbc3",
          100: "#00a8b0",
          150: "#00969c",
          200: "#008389",
        },
        state: {
          error: {
            60: "#ffdcdc",
            80: "#ffb8b8",
            100: "#ff4e4e",
          },
        },
        bgLinear: {
          blueGreen: "#c0e8ea",
        },
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
    },
  },
  plugins: [plugin],
};
