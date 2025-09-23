/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#049DD9",
        secondary: "#64748b",
        dark: "#0f172a",
        biru: "#0903A6",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
