import "./globals.css";
import "./fonts.css";

export const metadata = {
  // Use the environment variable with your localhost fallback
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "ABC Transportation Experience",
    template: "%s | ABC Transportation"
  },
  description: "Premium transportation services with professional drivers, real-time GPS tracking, and unmatched safety standards.",
  openGraph: {
    title: 'ABC Transportation',
    description: 'Premium transportation services.',
    // Update this to match the base URL dynamically as well
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'ABC Transportation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-euclid antialiased">
        {children}
      </body>
    </html>
  );
}