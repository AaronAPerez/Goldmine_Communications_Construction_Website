import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../components/styles/globals.css';
import TopContactBar from '@/components/Contact/TopContactBar';
import FloatingNavigation from '@/components/Navigation/FloatingNavigation';
import Footer from '@/components/Footer/Footer';
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from '@/components/Navigation/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Goldmine Communications & Construction',
  description: 'Leading provider of communications and construction solutions',
  keywords: 'communications, construction, fiber optics, network infrastructure, commercial construction',
  openGraph: {
    title: 'Goldmine Communications & Construction',
    description: 'Leading provider of communications and construction solutions',
    url: 'https://goldminecomm.net',
    siteName: 'Goldmine Communications & Construction',
    images: [
      {
        url: '/images/logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'Goldmine Communications & Construction',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-gray-100">
      <body className={inter.className}>
        {/* Fixed Top Contact Bar */}
        <TopContactBar />
        
        {/* Navigation */}
        <FloatingNavigation /> 

        {/* Main Content - Added padding for fixed header */}
        <main className="min-h-screen pt-14">
          {children}
          <Analytics />
        </main>
              {/* Scroll To Top Button */}
      <div className="fixed bottom-4 right-4 z-50">
            <ScrollToTop />
          </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}