/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        '19xl': '1900px',
        '11xl': '1100px',
        '14xl': '1400px',
        '15xl': '1500px',
        '5xl': '500px',
        '6xl': '600px',
        '12xl': '1200px',
        '13xl': '1300px',
        '6xl': '600px',
        '9xl': '900px',
      },
    },
  },
  plugins: [require('daisyui')],
};
