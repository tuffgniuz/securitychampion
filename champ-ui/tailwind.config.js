/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        midnightshadow: '#363a4f',
        base: '#24273a',
        eclipse: '#24273a',
        morning: '#cad3f5',
        muted: '#a2a9c2',
        afternoon: '#ebeefb',
        rosewater: '#f4dbd6',
        flamingo: '#f0c6c6',
        mauve: '#c6a0f6',
        maroon: '#ee99a0',
        yellow: '#eed49f',
        sapphire: '#7dc4e4',
      }
    }
  },
  plugins: []
};
