/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,html}'],
    theme: {
        container: {
            center: true,
            padding: '5rem',
        },

        extend: {},
    },
    plugins: [require('@tailwindcss/forms'), require('daisyui')],
};
