import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const description =
  "A cinematic digital experience celebrating MOJO cola. Scroll through the splash, feel the fizz, and meet the can.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MOJO Cola — Unleash the Refresh",
  description,
  applicationName: "MOJO Cola",
  keywords: ["MOJO Cola", "MOJO", "cola", "Bangladesh", "carbonated beverage"],
  openGraph: {
    title: "MOJO Cola — Unleash the Refresh",
    description,
    type: "website",
    images: [
      {
          url: "/images/mojo-splash-poster.png",
          width: 1280,
          height: 720,
        alt: "A red MOJO cola can surrounded by a cola splash, ice, and lime.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOJO Cola — Unleash the Refresh",
    description,
    images: ["/images/mojo-splash-poster.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f20d1a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/mojo-poster-desktop.webp"
          media="(min-width: 640px)"
        />
        <link
          rel="preload"
          as="image"
          href="/images/mojo-poster-mobile.webp"
          media="(max-width: 639px)"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
