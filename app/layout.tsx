import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/store/cart-store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AgeGate } from "@/components/age-gate";

export const metadata: Metadata = {
  title: "Tasty Budz",
  description: "Sweet Temptations Delivered"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-budz-gradient">
        <CartProvider>
          <AgeGate />
          <SiteHeader />
          <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
