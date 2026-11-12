import type { Config } from "tailwindcss";

/**
 * Sycamore Royals design tokens: the original site's palette on Apple-style surfaces.
 * `leaf` is decorative; use `leaf-deep` whenever green carries small text (it meets contrast on white).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        mist: "#F5F5F7",
        ink: {
          DEFAULT: "#1D1D1F",
          secondary: "#6E6E73",
          tertiary: "#86868B",
        },
        // The original palette.
        leaf: {
          DEFAULT: "#72BC5B",
          deep: "#3F7F2E",
          dark: "#356B26",
          tint: "#EFF7EC",
        },
        aqua: "#D8FDFC",
        bark: "#81390C",
        clay: "#D38253",
        donate: {
          DEFAULT: "#964936",
          hover: "#E65C00",
          dark: "#81390C",
        },
        spark: "#F7891C",
        // Future sites on the footprint map (the brief asks for blue trees).
        sky: {
          DEFAULT: "#2F7CC9",
          tint: "#E3EFFA",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        serif: ["var(--font-tinos)", '"Times New Roman"', "Times", "serif"],
        corben: ["var(--font-corben)", "Georgia", "serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.25rem, 5.4vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "0.02em" }],
        "display-md": ["clamp(1.875rem, 3.8vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.005em" }],
      },
      borderColor: {
        hairline: "rgba(0, 0, 0, 0.08)",
      },
      boxShadow: {
        header: "0 2px 10px rgba(0, 0, 0, 0.22)",
        card: "0 1px 2px rgba(0, 0, 0, 0.04), 0 10px 30px -14px rgba(53, 107, 38, 0.22)",
        lift: "0 2px 6px rgba(0, 0, 0, 0.05), 0 26px 60px -26px rgba(53, 107, 38, 0.38)",
        sheet: "0 30px 90px -20px rgba(0, 0, 0, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      spacing: {
        header: "var(--header-h)",
      },
    },
  },
  plugins: [],
};

export default config;
