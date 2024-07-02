/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors:{
        primary:"#BE123C",
        secondary:"rgb(252,165,165)",
        background_clr:"#eae8e9", 
        secondary_bg:"#1F2937",
        
      },
    },
  },
  plugins: [],
}
