import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import LayoutContent from "@/components/LayoutContent";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeoAlert | Disaster Risk Analysis",
  description: "AI-powered disaster early warning system utilizing Gemini risk assessment.",
  keywords: ["disaster", "risk analysis", "gemini ai", "nextjs", "mapbox", "early warning"],
  authors: [{ name: "BallSpins" }],
  openGraph: {
    title: "GeoAlert",
    description: "AI-driven real-time disaster risk analysis and early warning system.",
    url: "https://geo-alert-one.vercel.app",
    siteName: "GeoAlert",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <LayoutContent>{children}</LayoutContent>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
