import { ebGaramond, spaceGrotesk, inter } from "@/app/ui/fonts";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.className} ${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        {children} 
      </body>
    </html>
  );
}