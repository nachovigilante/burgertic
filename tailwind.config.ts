import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                background: '#fffcf8',
                primary: '#d72300',
                hover: '#b3280e',
                active: '#f04c2d',
            },
            boxShadow: {
                standard: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                large: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            },
        },
    },
    plugins: [],
};
export default config;
