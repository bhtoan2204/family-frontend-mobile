/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: function (theme) {
        return {
          'gradient-blue':
            'linear-gradient(to right, #4c669f, #3b5998, #192f6a)',
          'gradient-red':
            'linear-gradient(to right, #ff0000, #ff7f00, #ffff00)',
        };
      },
    },
  },
  plugins: [],
};