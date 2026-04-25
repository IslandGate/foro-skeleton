export default function AuthLayout({
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
