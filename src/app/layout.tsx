import type { Metadata } from "next";
import Image from "next/image";

// You can add metadata specific to your login page here!
export const metadata: Metadata = {
  title: "Login | Foro",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Nested layouts must return standard UI elements (like main, div, or fragments)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* You can keep your Image imports and other UI wrapper logic here */}
      {children}
    </main>
  );
}