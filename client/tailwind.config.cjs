module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        },
        'tilt': {
          '0%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
          '100%': { transform: 'rotate(-1deg)' }
        },
        'neon': {
          '0%': { textShadow: '0 0 6px rgba(56, 189, 248, 0.0), 0 0 12px rgba(34,197,94,0.0)' },
          '50%': { textShadow: '0 0 8px rgba(56, 189, 248, .35), 0 0 16px rgba(34,197,94,.25)' },
          '100%': { textShadow: '0 0 6px rgba(56, 189, 248, 0.0), 0 0 12px rgba(34,197,94,0.0)' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        },
        pop: {
          '0%': { transform: 'scale(.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 500ms ease-out both',
        'shimmer': 'shimmer 1.8s linear infinite',
        'blob': 'blob 8s ease-in-out infinite',
        'tilt': 'tilt 5s ease-in-out infinite',
        'neon': 'neon 2.5s ease-in-out infinite',
        'slide-up': 'slide-up 450ms cubic-bezier(.22,1,.36,1) both',
        float: 'float 4s ease-in-out infinite',
        pop: 'pop 350ms cubic-bezier(.2,.8,.2,1) both'
      }
    }
  },
  plugins: []
};







