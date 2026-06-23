/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      // news-specific overrides go here.
    },
  },
  plugins: [],
};
