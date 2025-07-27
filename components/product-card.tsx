"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UnifiedProduct } from "@/lib/types"
import { isEnhancedProduct, getCurrentPrice, getStockStatus } from "@/utils/product-migration"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface UnifiedProductCardProps {
  product: UnifiedProduct
  view?: "grid" | "list"
}

export function ProductCard({ product, view = "grid" }: UnifiedProductCardProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})

  // Get current price and stock based on product type and selected attributes
  const currentPrice = useMemo(() => getCurrentPrice(product, selectedAttributes), [product, selectedAttributes])
  const stockStatus = useMemo(() => getStockStatus(product, selectedAttributes), [product, selectedAttributes])

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg shadow-md overflow-hidden group"
      >
        <Link href={`/product/${product.id}`}>
          <div className="flex flex-col sm:flex-row">
            <div className="relative aspect-square w-full sm:w-32 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={128}
                height={128}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!stockStatus.inStock && <Badge className="absolute top-2 left-2 bg-red-500 text-xs">Out of Stock</Badge>}
            </div>

            <div className="p-3 sm:p-4 flex-1">
              <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">{product.description}</p>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 ml-2">({product.reviews})</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4">
                <span className="text-lg sm:text-xl font-bold text-blue-600">₹{currentPrice}</span>
                <AddToCartButton
                  product={product}
                  selectedAttributes={selectedAttributes}
                  size="sm"
                  disabled={!stockStatus.inStock}
                />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group w-full"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!stockStatus.inStock && <Badge className="absolute top-2 left-2 bg-red-500 text-xs">Out of Stock</Badge>}
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-sm sm:text-lg mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem]">{product.name}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">{product.description}</p>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>

          <div className="flex flex-col flex-end  sm:items-center sm:justify-between gap-2 mt-4">
            <span className="text-lg sm:text-xl font-bold text-blue-600">₹{currentPrice}</span>
            <AddToCartButton
              product={product}
              selectedAttributes={selectedAttributes}
              size="sm"
              disabled={!stockStatus.inStock}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
