/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070a1a",
          900: "#0a0d22",
          850: "#101430",
          800: "#151a3e"
        },
        violetGlow: "#a855f7"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(168, 85, 247, 0.32)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.28)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
