import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { AuthProvider } from "@/components/providers/AuthProvider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://xonitspace.com'),
  title: {
    default: 'Xonit Space | Custom Software & AI Development',
    template: '%s | Xonit Space'
  },
  description: 'Xonit Space is a premier software development company specializing in custom software, SaaS, and AI development.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xonitspace.com',
    siteName: 'Xonit Space',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@XonitSpace',
  },
};

import { Viewport } from "next";
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation", "SoftwareCompany"],
    "@id": "https://xonitspace.com/#organization",
    "name": "Xonit Space",
    "url": "https://xonitspace.com",
    "logo": "https://xonitspace.com/logo/logo only colored transparent bg.png",
    "description": "Enterprise software development company specializing in Custom Software, SaaS, and AI Development.",
    "address": { "@type": "PostalAddress", "addressCountry": "LK" },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94-77-050-6722",
      "contactType": "customer service",
      "email": "contact@xonitspace.com"
    },
    "sameAs": [
      "https://github.com/Xonit-Space",
      "https://linkedin.com/company/xonit-space"
    ]
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-primary/30 selection:text-primary">
        <AuthProvider>
          <div className="noise-overlay" />
          {/* Cinematic Background Layer */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="video-bg"
          >
            <source src="/video/0428(1).mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" />
          
          <Navbar />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
