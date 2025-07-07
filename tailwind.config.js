/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'background': '#000c1a',
        'background-dark': '#000410',
        'background-light': "#00192f",
        'foreground': '#d4f8ff',
        'foreground-muted': '#6cbce7',
        'highlight': '#006da1',
        'border': '#004f78',
        'border-muted': '#003352',
        'primary': '#00c0ff',
        'secondary': '#fe9140',
        'danger': '#f17260',
        'warning': '#b69f00',
        'success': '#00bc7b',
        'info': '#619dff',
      },
    },
  },
  plugins: [],
}