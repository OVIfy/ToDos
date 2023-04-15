/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily : {
        hand : ['Gochi Hand', 'cursive'],
      }
    },
  },
  
  plugins: [
    // require('@tailwindcss/forms'),
    require("daisyui")
  ],
}

