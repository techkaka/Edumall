import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './App.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Additional Tailwind customizations can go here
      // Most theme configuration is handled in globals.css with @theme directive
    }
  },
  plugins: []
};

export default config;