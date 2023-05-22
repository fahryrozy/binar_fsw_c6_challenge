/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    ".src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        20: "20deg",
      },
    },
    colors: {
      brown: "#9C835F",
      primary: "#F9B23D",
      secondary: "#724C21",
      red: "#BD0000",
      gray: "#C4C4C4",
      white: "#FFFFFF",
      green: "#4C9654",
    },
  },
  plugins: [],
};
