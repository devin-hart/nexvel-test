import "./globals.css";
import "./fonts.css";


export const metadata = {
  metadataBase: new URL('https://devin-hart-nexvel-test.netlify.app/'),
  title: {
    default: "ABC Transportation Experience",
    template: "%s | ABC Transportation"
  },
  description: "Premium transportation services with professional drivers, real-time GPS tracking, and unmatched safety standards.",
  openGraph: {
    title: 'ABC Transportation',
    description: 'Premium transportation services.',
    url: 'https://devin-hart-nexvel-test.netlify.app/',
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