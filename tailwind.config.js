/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgdark': 'hsl(235, 24%, 19%)',
        'bglight':'hsl(236, 33%, 92%)',
        'darkblue':'hsl(233, 14%, 35%)',
        'lightgrayishblue':' hsl(0, 0%, 98%)',
        'lightblue':'hsl(234, 39%, 85%)',
        'darkgrayishblue':'hsl(234, 11%, 52%)',
        'darkgrayish':'hsl(233, 14%, 35%)',
        'darkhover' : 'hsl(233, 11%, 84%)'
      },
    },
  },
  plugins: [],
};
