import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#7CB9FF',
                background: '#F5F7FA',
                surface: '#FFFFFF',
                text: '#111827',
                muted: '#6B7280',
                border: '#111827',
                darkbg: '#0B0F19',
                darksurface: '#111827',
                darktext: '#F9FAFB',
                darkmuted: '#9CA3AF'
            },
            boxShadow: {
                soft: '0 10px 30px rgba(17, 24, 39, 0.12)',
                neo: '6px 6px 0 rgba(17,24,39,0.9)'
            },
            borderRadius: {
                xl: '1rem'
            }
        }
    },
    plugins: []
};

export default config;
