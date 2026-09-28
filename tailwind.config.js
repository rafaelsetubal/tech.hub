/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',    // Tablet
      'lg': '1024px',   // Desktop
      'xl': '1280px',   // Large Desktop / Container Max Width
      '2xl': '1440px',
    },
    extend: {
      colors: {
        /* Primitive Colors */
        night: 'var(--color-primitive-night)',
        blue: {
          DEFAULT: 'var(--color-primitive-blue)',
          brand: 'var(--color-primitive-blue)',
        },
        sky: {
          DEFAULT: 'var(--color-primitive-sky)',
          brand: 'var(--color-primitive-sky)',
        },
        violet: {
          DEFAULT: 'var(--color-primitive-violet)',
          brand: 'var(--color-primitive-violet)',
        },
        lilac: {
          DEFAULT: 'var(--color-primitive-lilac)',
          brand: 'var(--color-primitive-lilac)',
        },
        ice: {
          DEFAULT: 'var(--color-primitive-ice)',
          brand: 'var(--color-primitive-ice)',
        },
        white: 'var(--color-primitive-white)',
        
        /* Support Colors */
        coral: 'var(--color-primitive-coral)',
        peach: 'var(--color-primitive-peach)',
        mint: 'var(--color-primitive-mint)',
        slate: {
          DEFAULT: 'var(--color-primitive-slate)',
          muted: 'var(--color-primitive-slate)',
        },

        /* Semantic Colors */
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          dark: 'var(--color-bg-dark)',
          light: 'var(--color-bg-light)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          glass: 'var(--color-surface-glass)',
          hover: 'var(--color-surface-hover)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
          accent: 'var(--color-brand-accent)',
          highlight: 'var(--color-brand-highlight)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          bright: 'var(--color-border-bright)',
        },
        state: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
        }
      },
      backgroundImage: {
        'gradient-electric': 'var(--gradient-electric)',
        'gradient-blue-lilac': 'var(--gradient-blue-lilac)',
        'gradient-aurora': 'var(--gradient-aurora)',
        'gradient-glass': 'var(--gradient-glass)',
        'gradient-deep': 'var(--gradient-deep)',
        'gradient-material': 'var(--gradient-material)',
        'gradient-light-lilac': 'var(--gradient-light-lilac)',
        'gradient-text-electric': 'var(--gradient-text-electric)',
        'gradient-text-aurora': 'var(--gradient-text-aurora)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        'display-xl': ['var(--font-size-display-xl)', { lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-tighter)' }],
        'display-lg': ['var(--font-size-display-lg)', { lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'display-md': ['var(--font-size-display-md)', { lineHeight: 'var(--line-height-snug)', letterSpacing: 'var(--letter-spacing-tight)' }],

        'heading-xl': ['var(--font-size-heading-xl)', { lineHeight: 'var(--line-height-snug)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'heading-lg': ['var(--font-size-heading-lg)', { lineHeight: 'var(--line-height-heading)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'heading-md': ['var(--font-size-heading-md)', { lineHeight: 'var(--line-height-heading)', letterSpacing: 'var(--letter-spacing-normal)' }],
        'heading-sm': ['var(--font-size-heading-sm)', { lineHeight: 'var(--line-height-heading)', letterSpacing: 'var(--letter-spacing-normal)' }],

        'body-lg': ['var(--font-size-body-lg)', { lineHeight: 'var(--line-height-body)' }],
        'body-md': ['var(--font-size-body-md)', { lineHeight: 'var(--line-height-body)' }],
        'body-sm': ['var(--font-size-body-sm)', { lineHeight: 'var(--line-height-body)' }],

        'label-lg': ['var(--font-size-label-lg)', { lineHeight: '1.2', letterSpacing: 'var(--letter-spacing-wide)' }],
        'label-md': ['var(--font-size-label-md)', { lineHeight: '1.2', letterSpacing: 'var(--letter-spacing-wider)' }],
        'label-sm': ['var(--font-size-label-sm)', { lineHeight: '1.2', letterSpacing: 'var(--letter-spacing-widest)' }],

        'caption': ['var(--font-size-caption)', { lineHeight: '1.4' }],
      },
      spacing: {
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-6': 'var(--space-6)',
        'space-8': 'var(--space-8)',
        'space-10': 'var(--space-10)',
        'space-12': 'var(--space-12)',
        'space-16': 'var(--space-16)',
        'space-20': 'var(--space-20)',
        'space-24': 'var(--space-24)',
        'space-32': 'var(--space-32)',
      },
      borderRadius: {
        'radius-sm': 'var(--radius-sm)',
        'radius-md': 'var(--radius-md)',
        'radius-lg': 'var(--radius-lg)',
        'radius-xl': 'var(--radius-xl)',
        'radius-pill': 'var(--radius-pill)',
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'glow': 'var(--shadow-glow)',
        'glow-violet': 'var(--shadow-glow-violet)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'standard': 'var(--ease-standard)',
        'smooth': 'var(--ease-smooth)',
        'expressive': 'var(--ease-expressive)',
      }
    },
  },
  plugins: [],
};
