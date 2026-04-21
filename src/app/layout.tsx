import type { Metadata } from "next";
import { ebGaramond, spaceGrotesk, inter } from "@/app/ui/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Foro",
  description: "Discover and track competitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.className} ${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}