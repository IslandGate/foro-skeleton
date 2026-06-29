import "@/app/globals.css";
import { ebGaramond, spaceGrotesk, inter } from "@/app/ui/fonts";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${ebGaramond.variable} ${inter.variable} ${spaceGrotesk.className} antialiased`}
      >
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}