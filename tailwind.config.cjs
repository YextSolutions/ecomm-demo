const { ComponentsContentPath } = require("@yext/search-ui-react");


module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./lib/**/*.{js,jsx}", ComponentsContentPath],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Sora"],
      },
      colors: {
        primary: "var(--primary-color, #2563eb)",
        "primary-light": "var(--primary-color-light, #dbeafe)",
        "primary-dark": "var(--primary-color-dark, #1e40af)",
        neutral: "var(--neutral-color, #4b5563)",
        "neutral-light": "var(--neutral-color-light, #9ca3af)",
        "neutral-dark": "var(--neutral-color-dark, #1f2937)",
        "light-orange": "#FFEEDB",
        orange: "#FFB563",
        "dark-orange": "#F85E00",
        red: "#A41632",
        blue: "#17AABE",
        gray: "#c4c4c442",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
