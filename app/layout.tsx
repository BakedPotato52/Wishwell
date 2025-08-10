import type React from "react"
import type { Metadata } from "next"
import type { Viewport } from 'next'
import { Inter, Pacifico, Zain } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { MobileBottomNav } from "@/components/mobile-bottom-navigation"
import { ProductProvider } from "@/hooks/use-product-context"
import { WishlistNotification } from "@/components/wishlist-notifications"

const inter = Inter({ subsets: ["latin"] })
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const zain = Zain({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zain",
})

export const metadata: Metadata = {
  title: "WishWell - Your Ultimate Shopping Destination",
  description:
    "Discover amazing products at unbeatable prices. Shop fashion, electronics, home goods and more with fast delivery and secure checkout.",
  keywords: "ecommerce, shopping, fashion, electronics, home goods, online store",
  authors: [{ name: "Kanak Acharjee" }],
  openGraph: {
    title: "WishWell - Your Ultimate Shopping Destination",
    description: "Discover amazing products at unbeatable prices",
    type: "website",
    locale: "en_US",
  },
  manifest: "/manifest.json",
}


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pacifico.variable} ${zain.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <WishlistProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1 bg-background">{children}</main>
                  <Footer />
                  <MobileBottomNav />
                  <WishlistNotification />
                  <Toaster position="top-center" richColors closeButton duration={5000} />
                </div>
              </WishlistProvider>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
