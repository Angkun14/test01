/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'blush':     '#e8a0b4',
        'rose-mid':  '#d4708e',
        'rose-deep': '#b84870',
        'gold':      '#e8cda0',
        'gold-dark': '#c9a87a',
        'cream':     '#f5ede8',
        'bg':        '#0d0608',
        'bg-mid':    '#180c10',
      },
      fontFamily: {
        'display':       ['"Playfair Display"', 'serif'],
        'italic-serif':  ['"Cormorant Garamond"', 'serif'],
        'script':        ['"Great Vibes"', 'cursive'],
        'body':          ['"Jost"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
