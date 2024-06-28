// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,ejs}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontSize: {
      sm: ['14px', '1.25rem'],
      base: ['16px', '1.25rem'],
      lg: ['20px', '1.25rem'],
      xl: ['24px', '1.25rem'],
      leadText: ['24px', '5rem'],
    },
    extend: {
      colors: {
        lightwhite: '#f7faff',
      },
      backgroundImage:{
        bgabout: ''
      }
    },
  },
  plugins: [],
}

 