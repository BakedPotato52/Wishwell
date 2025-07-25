"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/use-api-data"
import { migrateProductToEnhanced } from "@/utils/product-migration"
import UnifiedProductDetail from "@/components/unified-product-detail"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const products = useProducts().products || []

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Convert legacy product to enhanced format for display
  const enhancedProduct = migrateProductToEnhanced(product)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <UnifiedProductDetail product={enhancedProduct} />
    </motion.div>
  )
}
