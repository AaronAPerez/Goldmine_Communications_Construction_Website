import HomePage from '@/components/landing/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goldmine Communications & Construction',
  description: 'Leading provider of communications and construction solutions in Northern California',
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
  // viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


// Home page component that renders the HomePage component
export default function Home() {



  return <HomePage />;
}