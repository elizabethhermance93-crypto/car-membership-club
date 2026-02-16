import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteContent } from "@/content/siteContent";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteUrl = siteContent.seo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteContent.seo.defaultTitle,
    template: `%s | ${siteContent.seo.siteName}`,
  },
  description: siteContent.seo.defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteContent.seo.defaultTitle,
    description: siteContent.seo.defaultDescription,
    siteName: siteContent.seo.siteName,
    images: [
      {
        url: siteContent.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteContent.seo.siteName} OpenGraph image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.defaultTitle,
    description: siteContent.seo.defaultDescription,
    images: [siteContent.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} bg-[#f8fafd] text-slate-900 antialiased`}>
        <a
          href="#main-content"
          className="sr-only z-50 rounded-md bg-[#2a67ad] px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
