import type { Config } from "tailwindcss";

// Design tokens for "Inkwell" — an editorial, ink-and-violet premium blog theme.
// Colors are wired to CSS variables (see app/globals.css) so the dark/light
// toggle can swap the whole palette without re-rendering Tailwind classes.
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        surface: "var(--surface)",
        "surface-border": "var(--surface-border)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-ink": "var(--accent-ink)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      maxWidth: {
        prose: "68ch"
      },
      boxShadow: {
        glass: "0 1px 1px rgba(255,255,255,0.06) inset, 0 20px 60px -20px rgba(0,0,0,0.55)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards"
      }
    }
  },
  plugins: []
};

export default config;
