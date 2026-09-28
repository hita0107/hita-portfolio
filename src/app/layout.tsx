import type { Metadata, Viewport } from "next";
import { DM_Mono, Hanken_Grotesk, Jost } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { LightboxProvider } from "@/components/Lightbox";
import { Dock } from "@/components/Dock";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Hita Shah, Architecture Portfolio",
    template: "%s | Hita Shah",
  },
  description:
    "Selected works 2022-2026 by Hita Shah, MArch / RIBA Part 2, University of Dundee: community infrastructure, a music theatre, a timber and vertical farming block, and tender work in the UAE.",
};

export const viewport: Viewport = {
  themeColor: "#fcfbf7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jost.variable} ${hanken.variable} ${dmMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <LightboxProvider>
          <SmoothScroll />
          {children}
          <Dock />
        </LightboxProvider>
      </body>
    </html>
  );
}
