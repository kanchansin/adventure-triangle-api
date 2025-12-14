import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adventure Triangle | Pre-Launch",
  description: "The world's first global adventure ecosystem. Join the beta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
