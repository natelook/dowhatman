module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Roboto', 'ui-sans-serif'],
      headings: ['Staatliches'],
    },
    container: {
      center: true,
    },
    colors: {
      purple: '#9B5DE5',
      pink: '#F15BB5',
      yellow: '#FEE440',
      blue: '#00BBF9',
      green: '#00F5D4',
      black: '#000',
      white: '#fff',
      grayText: '#636363',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
