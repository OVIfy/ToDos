/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./views/**/*.ejs"],
  theme: {
    extend: {},
  },
  
  plugins: [
    // require('@tailwindcss/forms'),
    require("daisyui")
  ],
}

