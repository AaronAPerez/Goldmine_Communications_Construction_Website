import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "./Header";
import Footer from "./Footer";

// Initialize font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Define metadata for SEO
export const metadata: Metadata = {
  title: {
    template: '%s | Goldmine Communications',
    default: 'Goldmine Communications - Building Tomorrow\'s Infrastructure Today',
  },
  description: "Leading provider of communications and construction services, delivering innovative solutions for modern connectivity needs.",
  keywords: [
    "communications infrastructure",
    "construction services",
    "network solutions",
    "fiber optics",
    "telecommunications"
  ],
  authors: [{ name: "Goldmine Communications" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans`}
    >
      <body className="min-h-screen bg-gray-50">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-gold-400 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <Header />
        <main>{children}</main>
      </body>
      <Footer />
    </html>
  );
}