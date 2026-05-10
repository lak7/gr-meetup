import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FireShield Desktop Prototype",
  description: "Simple desktop emergency flow prototype"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
