"use client"

import { motion } from "framer-motion"
import { Carousel } from "@/components/ui/carousel"
import { CategoryGrid } from "@/components/category-grid"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/productData"

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      {/* Hero Carousel */}
      <section className="container mx-auto px-4 py-6">
        <div className="h-64 md:h-96 rounded-lg overflow-hidden">
          <Carousel />
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Special Offer!</h2>
          <p className="text-lg">Get 30% off on your first order. Use code: WELCOME30</p>
        </motion.div>
      </section>

      {/* Categories - Desktop only, mobile has horizontal nav */}
      <div className="hidden md:block">
        <CategoryGrid />
      </div>

      {/* Featured Products */}
      <ProductGrid products={products.slice(0, 8)} title="Featured Products" />

      {/* Top Searched Categories for Men */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-6">
            Top Searched Categories in Men
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Jackets", "Jeans", "Hoodies & Sweatshirts", "Bottoms"].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-sm text-center cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs">photo</span>
                </div>
                <span className="text-sm font-medium">{category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Searched Categories for Women */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-6">
            Top Searched Categories in Women
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Midi", "Cargos & Joggers", "Shirts", "Jackets"].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-sm text-center cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img className="text-xs" src={'/categories/subcategories/shirts.png'} />
                </div>
                <span className="text-sm font-medium">{category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
