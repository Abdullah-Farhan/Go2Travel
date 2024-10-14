/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'], 
        montserrat: ['Montserrat', 'sans-serif'], 
        
      },
      boxShadow: {
        'custom': '0 2px 5px rgba(0, 0, 0, 0.25)',
        'search': '5px 3px 15px rgba(0, 0, 0, 0.25)', 
        'search-container': '0 4px 7px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, rgba(82, 91, 49, 0.6) 0%, rgba(190, 210, 6, 0.6) 50%, rgba(82, 91, 49, 0.6) 100%)',
      },
    },
  },
  plugins: [],
}
