module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ff5722',
        // Add custom colors here
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        // Add custom font families here
      },
      // Extend other parts of the theme as needed
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Include form-related utilities
    // Add more plugins here as needed
  ],
};
