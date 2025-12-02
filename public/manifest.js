export default function manifest() {
  return {
    name: 'Nexvel Test Project',
    short_name: 'Nexvel Test',
    description: 'An awesome project built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico', // Ensure you have a favicon in your /public directory
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}