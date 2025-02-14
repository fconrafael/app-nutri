/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                "verde-clarinho": '#D5FFEA',
                "verde-claro": '#85CFAA',
                "verde-escuro": '#41745A',
            }
        },
    },
    plugins: [],
}