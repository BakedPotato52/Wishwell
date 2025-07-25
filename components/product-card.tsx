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

  // Handle attribute selection for enhanced products
  const handleAttributeChange = (attributeId: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: value,
    }))
  }

  // Render attribute selectors for enhanced products
  const renderAttributeSelectors = () => {
    if (!isEnhancedProduct(product) || !product.attributes) return null

    return (
      <div className="space-y-2 mt-2">
        {product.attributes.slice(0, 2).map(
          (
            attribute, // Show only first 2 attributes in card
          ) => (
            <div key={attribute.attributeId} className="flex items-center space-x-2">
              <span className="text-xs text-gray-600 min-w-[40px]">{attribute.name}:</span>
              <Select
                value={selectedAttributes[attribute.attributeId] || ""}
                onValueChange={(value) => handleAttributeChange(attribute.attributeId, value)}
              >
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {attribute.values.map((option) => (
                    <SelectItem key={option.id} value={option.value} className="text-xs">
                      {option.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ),
        )}
      </div>
    )
  }

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg shadow-md overflow-hidden group"
      >
        <Link href={`/product/${product.id}`}>
          <div className="flex">
            <div className="relative aspect-square w-32 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={128}
                height={128}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!stockStatus.inStock && <Badge className="absolute top-2 left-2 bg-red-500">Out of Stock</Badge>}
            </div>

            <div className="p-4 flex-1">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
              </div>

              {renderAttributeSelectors()}

              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-blue-600">₹{currentPrice.toLocaleString()}</span>
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
      className="bg-white rounded-lg shadow-md overflow-hidden group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!stockStatus.inStock && <Badge className="absolute top-2 left-2 bg-red-500">Out of Stock</Badge>}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>

          {renderAttributeSelectors()}

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-blue-600">₹{currentPrice.toLocaleString()}</span>
            <AddToCartButton
              product={product}
              selectedAttributes={selectedAttributes}
              size="sm"
              disabled={!stockStatus.inStock}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
