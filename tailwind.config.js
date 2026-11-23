/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
                ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
                graphite: 'rgb(var(--graphite-rgb) / <alpha-value>)',
                rule: 'rgb(var(--rule-rgb) / <alpha-value>)',
                cite: 'rgb(var(--cite-rgb) / <alpha-value>)',
                well: 'rgb(var(--well-rgb) / <alpha-value>)'
            },
            fontFamily: {
                sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif']
            },
            keyframes: {
                blink: { '50%': { opacity: '0' } },
                rise: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } }
            },
            animation: {
                blink: 'blink 1s steps(1) infinite',
                rise: 'rise 700ms cubic-bezier(.2,.7,.1,1) both'
            }
        }
    },
    plugins: [],
}
