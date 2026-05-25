import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6A00',
          blue: '#5C81FF',
          black: '#000000',
        },
      },
    },
  },
  plugins: [],
};

export default config;
