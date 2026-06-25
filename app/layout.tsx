import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/store/cart-store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AgeGate } from "@/components/age-gate";
import { FaqChatbot } from "@/components/faq-chatbot";
import { SocialProof } from "@/components/social-proof";

export const metadata: Metadata = {
  title: "Taste Buds Delight",
  description: "Sweet Temptations Delivered"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-tbd-bg text-tbd-text">
        <CartProvider>
          <AgeGate />
          <SiteHeader />
          <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">{children}</main>
          <SiteFooter />
          <FaqChatbot />
          <SocialProof />
        </CartProvider>
      </body>
    </html>
  );
}
