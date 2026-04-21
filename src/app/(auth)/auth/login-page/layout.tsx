import type { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";
import { spaceGrotesk } from "@/app/ui/fonts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Nested layouts must not return <html> or <body> — keep them in the root layout.
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
