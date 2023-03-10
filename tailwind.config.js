/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lexend', 'sans-serif']
      },
      fontSize: {
        'xss': '8px'
      },
      screens: {
        'xs': '480px'
      },
      backgroundImage: () => ({
        gradient: "url('../public/bg-gradient.jpg')",
        grid: "url('../public/grid.png')"
      })
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}