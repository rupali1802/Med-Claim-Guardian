module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "risk-low": "#10b981",
        "risk-medium": "#f59e0b",
        "risk-high": "#ef4444",
        "glass-dark": "rgba(15, 23, 42, 0.8)",
        "glass-light": "rgba(255, 255, 255, 0.1)",
      },
      animation: {
        blob: "blob 7s infinite",
        "blob-sm": "blob 5s infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "liquid-flow": "liquid-flow 8s ease-in-out infinite",
        "glass-glow": "glass-glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(14, 165, 233, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(14, 165, 233, 0.8)",
          },
        },
        "liquid-flow": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.8",
          },
          "50%": {
            transform: "translateY(-10px) rotate(5deg)",
            opacity: "1",
          },
        },
        "glass-glow": {
          "0%, 100%": {
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
          },
          "50%": {
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
          },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
      },
    },
  },
  plugins: [],
};
