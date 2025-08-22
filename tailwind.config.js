/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'playfair': ['var(--font-playfair)', 'serif'],
        'cormorant': ['var(--font-cormorant)', 'serif'],
      },
      colors: {
        fashion: {
          // Dark theme backgrounds
          bg: '#0A0A0A',          // Pure black
          'bg-secondary': '#1A1A1A', // Deep charcoal
          'bg-tertiary': '#2A2A2A',   // Medium charcoal
          'bg-accent': '#1F1F1F',     // Dark gray
          'bg-card': '#151515',       // Card background
          
          // Text colors for dark theme
          fg: '#FFFFFF',          // Pure white
          'fg-secondary': '#E0E0E0',  // Light gray
          'fg-muted': '#B0B0B0',      // Medium gray
          'fg-subtle': '#808080',     // Subtle gray
          
          // Copper accent colors (kept from before)
          rose: '#D2691E',        // Primary copper
          gold: '#CD853F',        // Auburn copper
          copper: '#D2691E',      // Primary copper
          auburn: '#CD853F',      // Auburn hair color
          'copper-light': '#DEB887', // Light copper
          'copper-dark': '#A0522D',   // Dark copper/sienna
          mauve: '#B8860B',       // Golden copper
          
          // Dark theme specific
          'text': '#FFFFFF',      // Primary text
          'text-muted': '#B0B0B0', // Muted text
          'text-soft': '#808080', // Soft text
          accent: '#D2691E',      // Copper accent
          'accent-secondary': '#CD853F', // Auburn accent
          
          // Glass and effects for dark theme
          glass: 'rgba(0, 0, 0, 0.4)',
          'glass-border': 'rgba(210, 105, 30, 0.2)',
          
          // Borders for dark theme
          muted: '#404040',       // Dark muted
          'muted-dark': '#2A2A2A', // Darker muted
          border: 'rgba(255, 255, 255, 0.1)', // Subtle border
          'border-light': 'rgba(255, 255, 255, 0.05)', // Very subtle border
          'border-accent': 'rgba(210, 105, 30, 0.4)', // Copper border
        },
        brand: {
          bg: '#0A0A0A',          // Pure deep black
          'bg-secondary': '#141414', // Rich charcoal
          'bg-tertiary': '#1F1F1F',   // Dark gray
          'bg-accent': '#2A2A2A',     // Medium gray
          fg: '#FFFFFF',          // Pure white
          'fg-secondary': '#F8F8F8',  // Off white
          'fg-muted': '#CCCCCC',      // Light gray
          accent: '#C9A96E',      // Warm gold
          'accent-dark': '#A08A5A',   // Deep gold
          'accent-light': '#E4C78A',  // Light gold
          'accent-bright': '#F5D700', // Bright gold
          muted: '#888888',       // Medium gray
          'muted-dark': '#555555',    // Dark muted
          border: '#333333',      // Border color
          'border-light': '#444444',  // Light border
          'border-accent': '#C9A96E', // Gold border
          // Dramatic accent colors
          crimson: '#DC143C',     // Deep red
          emerald: '#50C878',     // Emerald green
          sapphire: '#0F52BA',    // Sapphire blue
          amethyst: '#9966CC',    // Purple
        },
        glass: {
          'bg': 'rgba(255, 255, 255, 0.08)',
          'bg-dark': 'rgba(0, 0, 0, 0.4)',
          'border': 'rgba(255, 255, 255, 0.15)',
          'border-gold': 'rgba(201, 169, 110, 0.3)',
          'backdrop': 'rgba(10, 10, 10, 0.85)',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '3rem', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '3.75rem', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '4.5rem', letterSpacing: '-0.025em' }],
        '8xl': ['6rem', { lineHeight: '6rem', letterSpacing: '-0.025em' }],
        '9xl': ['8rem', { lineHeight: '8rem', letterSpacing: '-0.025em' }],
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'gradient-y': 'gradientY 8s ease infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'text-glow': 'textGlow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(201, 169, 110, 0.4), 0 0 40px rgba(201, 169, 110, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(201, 169, 110, 0.8), 0 0 80px rgba(201, 169, 110, 0.4)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(201, 169, 110, 0.4), 0 0 40px rgba(201, 169, 110, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(201, 169, 110, 0.8), 0 0 80px rgba(201, 169, 110, 0.4)' 
          },
        },
        textGlow: {
          '0%, 100%': { 
            textShadow: '0 0 20px rgba(201, 169, 110, 0.5)' 
          },
          '50%': { 
            textShadow: '0 0 40px rgba(201, 169, 110, 0.8), 0 0 60px rgba(201, 169, 110, 0.4)' 
          },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(31, 31, 31, 0.8) 50%, rgba(42, 42, 42, 0.9) 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #F5D700 50%, #E4C78A 100%)',
        'gradient-mesh': 'radial-gradient(circle at 20% 80%, rgba(201, 169, 110, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(228, 199, 138, 0.1) 0%, transparent 50%)',
        'noise': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHJlc3VsdD0ibm9pc2UiIHNlZWQ9IjEiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-lg': '0 16px 64px 0 rgba(0, 0, 0, 0.5)',
        'glow': '0 0 30px rgba(201, 169, 110, 0.5)',
        'glow-lg': '0 0 60px rgba(201, 169, 110, 0.6)',
        'glow-xl': '0 0 100px rgba(201, 169, 110, 0.4)',
        'dramatic': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'cinematic': '0 35px 70px -12px rgba(0, 0, 0, 0.9)',
        'inset-glow': 'inset 0 0 20px rgba(201, 169, 110, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
};
