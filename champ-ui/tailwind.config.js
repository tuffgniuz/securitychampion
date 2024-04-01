/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.morning'),
            'code::before': { content: 'none'},
            'code::after': { content: 'none'},
            h1: {
              color: theme('colors.mauve'),
              marginBottom: '.5em'
            },
            h2: {
              color: theme('colors.yellow'),
              marginTop: '1em',
              marginBottom: '.5em',
            },
            /* h3: { */
            /*   color: theme('colors.afternoon'), */
            /* }, */
            /* h4: { */
            /*   color: theme('colors.afternoon'), */
            /* }, */
            /* h5: { */
            /*   color: theme('colors.afternoon'), */
            /* }, */
            a: {
              color: theme('colors.sapphire')
            },
            strong: {
              color: theme('colors.afternoon'),
            },
            hr: {
              borderColor: theme('colors.midnightshadow'),
              borderTopWidth: '1px', 
              marginTop: '0',
              marginBottom: '1em'
            },
            blockquote: {
              /* backgroundColor: theme('colors.mantle'), */
              padding: '.5em',
              color: theme('colors.morning'),
              borderLeft: '1px solid',
              borderColor: theme('colors.midnightshadow'),
              /* borderWidth: '0', */
              /* borderRadius: '.5em' */
            },
            code: {
              backgroundColor: theme('colors.mantle')
            },
            pre: {
              backgroundColor: theme('colors.crust'),
            },
            'pre code': {
              backgroundColor: theme('colors.crust'),
            },
            lineHeight: '1.75',
          }
        }
      }),
      colors: {
        midnightshadow: '#363a4f',
        base: '#24273a',
        crust: '#181926',
        mantle: '#1e2030',
        morning: '#cad3f5',
        muted: '#a2a9c2',
        green: '#a6da95',
        teal: '#8bd5ca',
        afternoon: '#ebeefb',
        rosewater: '#f4dbd6',
        flamingo: '#f0c6c6',
        mauve: '#d4b7f8',
        maroon: '#ee99a0',
        yellow: '#eed49f',
        sapphire: '#7dc4e4',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
