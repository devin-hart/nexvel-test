export default function manifest() {
  return {
    name: 'ABC Transportation Experience',
    short_name: 'ABC Transport',
    description: 'Premium transportation services with professional drivers, real-time GPS tracking, and unmatched safety standards. A React/WordPress Test built by Devin Hart for NexVel Solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}