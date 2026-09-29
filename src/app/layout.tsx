import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/geospatial/site-header";
import { SiteFooter } from "@/components/geospatial/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://geospatialabs.com"),
  title: {
    default: "GeoSpatia Labs — Preliminary Site Intelligence for Energy Development",
    template: "%s · GeoSpatia Labs",
  },
  description:
    "GeoSpatia Labs brings together source-backed grid, interconnection, parcel, permitting, environmental, and project context to help California BESS development teams screen candidate sites before committing deeper resources.",
  keywords: [
    "site intelligence",
    "preliminary site screening",
    "BESS development",
    "battery energy storage",
    "interconnection screening",
    "California energy development",
    "site diligence",
    "source-backed research",
  ],
  authors: [{ name: "GeoSpatia Labs" }],
  creator: "GeoSpatia Labs",
  publisher: "GeoSpatia Labs",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    title: "GeoSpatia Labs — Preliminary Site Intelligence for Energy Development",
    description:
      "Source-backed preliminary site screens for California BESS development teams. Bring the evidence together before committing deeper resources.",
    url: "https://geospatialabs.com",
    siteName: "GeoSpatia Labs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoSpatia Labs — Preliminary Site Intelligence for Energy Development",
    description:
      "Source-backed preliminary site screens for California BESS development teams. Bring the evidence together before committing deeper resources.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://geospatialabs.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} ${newsreader.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

