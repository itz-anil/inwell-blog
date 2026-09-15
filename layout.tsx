import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers";
import AuthSessionProvider from "@/components/session-provider";
import AnimatedBackground from "@/components/animated-background";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"]
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: {
    default: "Inkwell — Essays on design, craft and the future",
    template: "%s · Inkwell"
  },
  description:
    "Inkwell is a premium multi-author publication covering design, technology and culture — written slowly, for people who read the same way.",
  metadataBase: new URL("https://inkwell.example.com"),
  openGraph: {
    title: "Inkwell",
    description: "Essays on design, craft and the future.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b10" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6fb" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${sansFont.variable} font-sans antialiased`}
      >
        {/* Skip link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="glass sr-only fixed left-4 top-4 z-[100] rounded-lg px-4 py-2 text-sm text-ink focus:not-sr-only"
        >
          Skip to content
        </a>

        <AuthSessionProvider>
          <AppProviders>
            <AnimatedBackground />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </AppProviders>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
