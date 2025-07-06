"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6 text-center"
        >
          Categories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/category/${category.id}`}>
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-center font-medium">{category.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
