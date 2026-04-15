import { EB_Garamond, Space_Grotesk } from "next/font/google";
import Navbar from "@/layout/Navbar"
import Footer from "@/layout/Footer"

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export default function TestingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${ebGaramond.variable} ${spaceGrotesk.variable} min-h-screen antialiased`}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
