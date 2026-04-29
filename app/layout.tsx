import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

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
  title: "Xonit | Smart Business Automation & Growth Systems",
  description: "Xonit builds smart automation systems that handle customers, operations, and growth—so you don't have to. Specialized in Hotel Systems, WhatsApp Automation, and POS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary/30 selection:text-primary">
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
      </body>
    </html>
  );
}
