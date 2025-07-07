"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, ShoppingCart, User, Menu, X, MessageCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { MobileCategoryNav } from "@/components/mobile-category-nav"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { state: cartState } = useCart()
  const { state: authState } = useAuth()

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-blue-600">
              ShopEase
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>

            <Button variant="ghost" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartState.items && cartState.items.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartState.items.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href={authState.isAuthenticated ? "/account" : "/login"}>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>
      </div>



      <div className="container mx-auto px-4">
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t pt-4 mb-20" // Added mb-20 for bottom nav space
          >
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" className="justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button variant="ghost" className="justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
              <Link href="/cart">
                <Button variant="ghost" className="justify-start w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({cartState.items ? cartState.items.length : 0})
                </Button>
              </Link>
              <Link href={authState.isAuthenticated ? "/account" : "/login"}>
                <Button variant="ghost" className="justify-start w-full">
                  <User className="h-4 w-4 mr-2" />
                  {authState.isAuthenticated ? "My Account" : "Login"}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
