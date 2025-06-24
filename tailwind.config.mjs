import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('tailwindcss-motion'),

    plugin(function({ matchUtilities }) {
      matchUtilities(
        {
          zoom: (value) => ({
            zoom: value,
          }),
        },
        {
          values: {
            '80': '0.8',
            '90': '0.9',
            '100': '1',
            '110': '1.1',
            '120': '1.2',
            '130': '1.3',
            '140': '1.4',
            '150': '1.5',
          },
          // biar bisa pakai arbitrary value, misal zoom-[1.37]
        }
      )
    }),
  ],
};
