/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('nativewind/preset'),
    require('super-app-showcase-sdk/tailwind-preset'),
  ],
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      // news-specific overrides go here.
      // NOTE: do NOT set `brand` here — it's a shared `var(--color-brand)`.
      // Set news's brand at runtime via vars() in MainNavigator.tsx.
    },
  },
  plugins: [],
};
