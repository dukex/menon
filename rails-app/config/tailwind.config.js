module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    colors: {
      brand: {
        default: "#80EECD",
        dark: "#080135"
      },
      blue: {
        900: "#35C89C",
        700: "#35C89C",
        300: "#B0F8E3",
        100: "#EAFEF8"
      },
      gray: {
        900: "#111827",
        700: "#374151",
        500: "#6B7280",
        300: "#E5E7EB",
        100: "#F9FAFB"
      },
      pink: {
        900: "#F34067",
        700: "#F86282",
        500: "#FB87A0",
        300: "#FEB4C4",
        100: "#FFEAEF"
      },
      yellow: {
        900: "#FFB544",
        700: "#FFC264",
        500: "#FFD189",
        300: "#FFE2B5",
        100: "#FFF7EA"
      },
      purple: {
        700: "#201562",
        500: "#3B2E86",
        300: "#D7D3EE",
        100: "#F1F0F8"
      },
      white: "#FFF"
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ]
}
