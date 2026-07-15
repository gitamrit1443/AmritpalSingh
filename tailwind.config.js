/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // ── Surfaces ───────────────────────────────────
        'surface-base':    '#070707',
        'surface-raised':  '#0c0c0c',
        'surface-overlay': '#121212',
        'surface-float':   '#1a1a1a',

        // ── Typography ─────────────────────────────────
        'ink-primary':   '#ede8e3',
        'ink-secondary': '#78716c',
        'ink-muted':     '#44403c',
        'ink-faint':     '#282420',

        // ── Brand accent ───────────────────────────────
        'gold':       '#c8923a',
        'gold-light': '#dba04a',
        'gold-dim':   '#6b4b1a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"',  'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        // Enables: bg-gradient-radial from-X to-Y
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float-slow':   'floatSlow 9s ease-in-out infinite',
        'float-slower': 'floatSlow 13s ease-in-out 4s infinite reverse',
        'scroll-line':  'scrollLine 2.4s ease-in-out infinite',
        'fade-in':      'fadeIn 0.6s ease forwards',
        'spin-slow':    'spin 24s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(-18px, 14px) scale(1.025)' },
          '66%':     { transform: 'translate(12px, -16px) scale(0.975)' },
        },
        scrollLine: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '15%':  { opacity: '1' },
          '85%':  { opacity: '1' },
          '100%': { transform: 'translateY(200%)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        portfolio: {
          // Map daisyUI semantic tokens to our palette
          'primary':          '#c8923a',
          'primary-content':  '#070707',
          'secondary':        '#1a1a1a',
          'secondary-content':'#ede8e3',
          'accent':           '#c8923a',
          'accent-content':   '#070707',
          'neutral':          '#121212',
          'neutral-content':  '#ede8e3',
          'base-100':         '#070707',
          'base-200':         '#0c0c0c',
          'base-300':         '#121212',
          'base-content':     '#ede8e3',
          'info':             '#3abff8',
          'success':          '#36d399',
          'warning':          '#fbbd23',
          'error':            '#f87272',
          // Remove all rounding — sharp edges = editorial premium
          '--rounded-box':   '0rem',
          '--rounded-btn':   '0rem',
          '--rounded-badge': '0rem',
          '--animation-btn': '0',
          '--animation-input': '0',
          '--btn-focus-scale': '0.98',
          '--border-btn': '1px',
        },
      },
    ],
    darkTheme: 'portfolio',
    base:   true,
    styled: true,
    utils:  true,
    prefix: '',
    logs:   false,
  },
};
