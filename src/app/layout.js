import "./globals.css";
import "./fonts.css";

export const metadata = {
  title: "ABC Transportation Experience",
  description: "Premium transportation services with professional drivers, real-time GPS tracking, and unmatched safety standards.",
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