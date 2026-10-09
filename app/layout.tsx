import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { SsgoiRouteBoundary } from "@ssgoi/react/nextjs";
import { SsgoiProvider } from "./ssgoi-provider";
import { Background } from "@/components/background";
import { Chrome } from "@/components/chrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://humza-portfolio.vercel.app"),
  title: "Humza Khaliq",
  description:
    "Software QA Co-op at Berkshire Grey. I build software, AI and hardware: JARVIS, Volt, The Cutfish and more.",
  openGraph: {
    title: "Humza Khaliq",
    description: "Software QA Co-op at Berkshire Grey. Software, AI and hardware that actually work.",
    images: [],
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Background />
        <main id="main" className="relative z-10 min-h-dvh overflow-x-clip">
          <SsgoiProvider>
            <SsgoiRouteBoundary>{children}</SsgoiRouteBoundary>
          </SsgoiProvider>
        </main>
        <Chrome />
      </body>
    </html>
  );
}
