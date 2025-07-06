"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { categories } from "@/lib/categoryData"

export function MobileCategoryNav() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <section className="py-4 bg-white sticky top-[72px] z-40 border-b md:hidden">
      <div className="relative">
        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 px-4 pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link href={`/category/${category.id}`}>
                <div className="flex flex-col items-center space-y-2 p-2 rounded-xl hover:bg-gray-50 transition-colors min-w-[80px] touch-manipulation">
                  {/* Icon container */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm border border-blue-100">
                    <img className="text-2xl" role="img" src={category.image} aria-label={category.name}>
                    </img>
                  </div>

                  {/* Category name */}
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight max-w-[70px] line-clamp-2">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Gradient overlays for scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
