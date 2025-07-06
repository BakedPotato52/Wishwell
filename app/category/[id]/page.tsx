"use client"

import { useState, useMemo, use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryFilterBar } from "@/components/category-filter-bar"
import { EnhancedProductGrid } from "@/components/enhanced-product-grid"
import { categories } from "@/lib/categoryData"
import { products } from "@/lib/productData"

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [loading, setLoading] = useState(false)

  const category = categories.find((c) => c.id === resolvedParams.id)
  const categoryProducts = products.filter((p) => p.category.toLowerCase() === category?.name.toLowerCase())

  // Sort products based on selected sort option
  const sortedProducts = useMemo(() => {
    const sorted = [...categoryProducts]

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
      default:
        return sorted
    }
  }, [categoryProducts, sortBy])

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSortChange = (sort: string) => {
    setLoading(true)
    setSortBy(sort)
    // Simulate loading delay
    setTimeout(() => setLoading(false), 300)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <CategoryFilterBar
        categoryName={category.name}
        subcategories={category.subcategories.map(sub => sub.name)}
        totalProducts={sortedProducts.length}
        onSortChange={handleSortChange}
        onViewChange={setView}
        currentView={view}
      />

      {/* Products Grid */}
      <EnhancedProductGrid products={sortedProducts} view={view} loading={loading} />

      {/* Load More Button - for pagination */}
      {sortedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-8 text-center">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      )}
    </motion.div>
  )
}
