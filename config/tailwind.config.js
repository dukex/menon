const { gray, blue } = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    colors: {
      gray,
      blue,
      red: {
        100: "#FB87A0",
        300: "#FFEAEF",
        500: "#FEB4C4",
        700: "#F86282",
        900: "#F34067"
      },
      brand: {
        100: "#80EECD",
        300: "#EAFEF8",
        500: "#B0F8E3",
        700: "#58DFB6",
        900: "#35C89C"
      },
      yellow: {
        100: "#FFD189",
        300: "#FFF7EA",
        500: "#FFE2B5",
        700: "#FFC264",
        900: "#FFB544"
      }
    },
    extend: {

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ]
}
