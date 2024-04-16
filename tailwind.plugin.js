const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addBase, addUtilities, theme }) {
  addBase({
    h1: {
      fontWeight: theme("fontWeight.bold"),
      fontSize: "140px",
      lineHeight: "1.1",
    },
    h2: {
      fontWeight: theme("fontWeight.bold"),
      fontSize: "80px",
      lineHeight: "1.1",
    },
    h3: {
      fontWeight: theme("fontWeight.bold"),
      fontSize: "64px",
      lineHeight: "normal",
    },
    h4: {
      fontWeight: theme("fontWeight.bold"),
      fontSize: "40px",
      lineHeight: "1.3",
    },
    h5: {
      fontWeight: theme("fontWeight.semibold"),
      fontSize: "36px",
      lineHeight: "1.4",
    },
    h6: {
      fontWeight: theme("fontWeight.semibold"),
      fontSize: "24px",
      lineHeight: "1.3",
    },
  });
  addUtilities({
    ".subtitle": {
      fontWeight: theme("fontWeight.bold"),
      fontSize: "16px",
      lineHeight: "1.6",
      letterSpacing: "1.6px",
    },
    ".body-20-semibold": {
      fontWeight: theme("fontWeight.semibold"),
      fontSize: "20px",
      lineHeight: "1.5",
    },
    ".body-20-medium": {
      fontWeight: theme("fontWeight.medium"),
      fontSize: "20px",
      lineHeight: "1.5",
    },
    ".body-16-semibold": {
      fontWeight: theme("fontWeight.semibold"),
      fontSize: "16px",
      lineHeight: "1.6",
    },
    ".body-16-medium": {
      fontWeight: theme("fontWeight.medium"),
      fontSize: "16px",
      lineHeight: "1.6",
    },
    ".body-16-regular": {
      fontWeight: theme("fontWeight.normal"),
      fontSize: "16px",
      lineHeight: "1.6",
    },
    ".body-14-semibold": {
      fontWeight: theme("fontWeight.semibold"),
      fontSize: "14px",
      lineHeight: "normal",
    },
    ".body-14-medium": {
      fontWeight: theme("fontWeight.medium"),
      fontSize: "14px",
      lineHeight: "1.6",
    },
    ".body-14-regular": {
      fontWeight: theme("fontWeight.normal"),
      fontSize: "14px",
      lineHeight: "1.6",
    },
    ".body-12-bold": {
      fontWeight: theme("fontWeight.bold"),
      fontSize: "12px",
      lineHeight: "1.2",
      letterSpacing: "1.2px",
    },
    ".body-12-regular": {
      fontWeight: theme("fontWeight.normal"),
      fontSize: "12px",
      lineHeight: "1.6",
    },
  });
});
