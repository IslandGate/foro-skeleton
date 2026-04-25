import "@/app/globals.css";
import { spaceGrotesk } from "@/app/ui/fonts";
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
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}