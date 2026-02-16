import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site-data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteUrl = siteConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | Zipsters Membership Club",
  },
  description: siteConfig.defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    siteName: "Zipsters Membership Club",
    images: [
      {
        url: "/assets/refresh-the-look-logo.png",
        width: 791,
        height: 1190,
        alt: "Refresh The Look USA logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: ["/assets/refresh-the-look-logo.png"],
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
