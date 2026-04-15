import type { Metadata } from "next";
import "@/src/app/globals.css";
import Image from "next/image";
import { spaceGrotesk } from "@/src/app/ui/fonts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Nested layouts must not return <html> or <body> — keep them in the root layout.
  return (
    <div>
      {children}
    </div>
  );
}
