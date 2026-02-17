import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.remove('dark');else document.documentElement.classList.add('dark');})();`,
          }}
        />
      </head>
      <body
        className={`${manrope.variable} bg-stone-100 text-stone-900 antialiased transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only z-50 rounded-md bg-yellow-500 px-4 py-2 text-stone-900 focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" className="scroll-mt-[72px]">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
