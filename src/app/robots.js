export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://www.yourdomain.com/sitemap.xml', // Change to your actual domain
  }
}