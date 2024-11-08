import type { Config } from 'tailwindcss';
import withMT from '@material-tailwind/react/utils/withMT';

const config: Config = {
  content: [
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    borderRadius: {
      'button-default': '5px',
      'tag-button': '17.5px',
    },
    fontSize: {
      xs: [
        '12px',
        {
          lineHeight: '18px',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      sm: [
        '14px',
        {
          lineHeight: '21px',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '24px',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      xl: ['20px', '30px'],
      '2xl': [
        '24px',
        {
          lineHeight: '36px',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
    },
    colors: {
      // Brand Colors
      'brand-primary': '#7b3fe4',
      'brand-secondary': '#4aa1f5',
      'brand-background': '#f5f2fb',
      'brand-text': '#6b7280',

      // Group Colors
      'gang-primary': '#00b0ff',
      'gang-secondary': '#e1f5fe',
      'gang-text': '#01579b',

      'mystic-primary': '#8c3aff',
      'mystic-secondary': '#f3e5f5',
      'mystic-text': '#4a148c',

      'universe-primary': '#2962ff',
      'universe-secondary': '#e3f2fd',
      'universe-text': '#0d47a1',

      'cliche-primary': '#7b3fe4',
      'cliche-secondary': '#f3e5f5',
      'cliche-text': '#4a148c',

      // Member Colors
      'gang-member': '#00b0ff',
      'gang-member-accent': '#b3e5fc',
      'gang-member-text': '#01579b',

      'mystic-member-1': '#7b3fe4',
      'mystic-member-1-accent': '#e1bee7',
      'mystic-member-1-text': '#4a148c',

      'mystic-member-2': '#8c3aff',
      'mystic-member-2-accent': '#e1e2e6',
      'mystic-member-2-text': '#4a148c',

      'universe-member-1': '#e53935',
      'universe-member-1-accent': '#ffcdd2',
      'universe-member-1-text': '#c62828',

      'universe-member-2': '#757575',
      'universe-member-2-accent': '#f5f5f5',
      'universe-member-2-text': '#424242',

      'universe-member-3': '#ffa000',
      'universe-member-3-accent': '#ffe0b2',
      'universe-member-3-text': '#ef6c00',

      'universe-member-4': '#2962ff',
      'universe-member-4-accent': '#bbdefb',
      'universe-member-4-text': '#0d47a1',

      'cliche-member-1': '#8c3aff',
      'cliche-member-1-accent': '#e1bee7',
      'cliche-member-1-text': '#4a148c',

      'cliche-member-2': '#2962ff',
      'cliche-member-2-accent': '#bbdefb',
      'cliche-member-2-text': '#0d47a1',

      'cliche-member-3': '#e53935',
      'cliche-member-3-accent': '#ffcdd2',
      'cliche-member-3-text': '#c62828',

      'cliche-member-4': '#43a047',
      'cliche-member-4-accent': '#c8e6c9',
      'cliche-member-4-text': '#2e7d32',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default withMT(config);
