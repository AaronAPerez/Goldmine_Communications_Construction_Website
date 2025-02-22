import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../components/styles/globals.css';

import FloatingNavigation from '@/components/Navigation/FloatingNavigation';
import Footer from '@/components/Footer/Footer';
import { Analytics } from "@vercel/analytics/react";
import TopContactBar from '@/components/Contact/TopContactBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Goldmine Communications & Construction',
  description: 'Leading provider of communications and construction solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
              {/* Fixed Background Gradient */}
       <div className="fixed inset-0 bg-gradient-to-br from-primary-900 to-primary-800 -z-10" /> 

        {/* Fixed Top Contact Bar */}
        <TopContactBar />
        
        {/* Navigation */}
        <FloatingNavigation />

        {/* Main Content */}
        <main className="min-h-screen pt-[72px]">
          {children}
          <Analytics />
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}