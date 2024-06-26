/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'stardos': ['Stardos Stencil', 'system-ui'],
        'protest-revolution': ['Protest Revolution', 'sans-serif'],
        'philosopher': ['Philosopher', 'sans-serif'],
        'raleway': ['Raleway Dots', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'playfair': ['Playfair Display', 'system-ui'],
        'roboto-mono': ['Roboto Mono', 'monospace'],

      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

