import type { Metadata } from "next";
import "@/app/globals.css";
// import Image from "next/image"; // Only keep if using it elsewhere
import { spaceGrotesk } from "@/app/ui/fonts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We remove <html> and <body> because they are already provided by app/layout.tsx
  return (
    <div className={`${spaceGrotesk.className} antialiased`}>
      {children}
    </div>
  );
}