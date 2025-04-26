import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // Import Navbar

export const metadata: Metadata = {
  title: "Nibir's Portfolio",
  description: "Welcome to my portfolio!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Navbar />  {/* Navbar appears on all pages */}
        <main className="pt-16">{children}</main> {/* Add padding to avoid navbar overlap */}
      </body>
    </html>
  );
}
