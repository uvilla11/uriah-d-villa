import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ScrollProgress } from "@/components/shell/ScrollProgress";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { ThemeScript } from "@/components/shell/ThemeScript";
import { profile } from "@/data/profile";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

import "./tokens.css";
import "./base.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: profile.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/media/hephaestus-poster.png",
        width: 1400,
        height: 919,
        alt: "Team Hephaestus engineering showcase poster: prototype asteroid lander, custom PCB, fabrication, and slope testing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/media/hephaestus-poster.png"],
  },
  robots: { index: true, follow: true },
};

/** Person structured data (§88). */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  affiliation: { "@type": "Organization", name: "Microchip Technology" },
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Mesa", addressRegion: "AZ" },
  sameAs: ["https://github.com/uvilla11", "https://www.linkedin.com/in/uriah-villa/"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
