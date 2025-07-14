"use client"

import { useState, useMemo, use, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryFilterBar } from "@/components/category-filter-bar"
import { EnhancedProductGrid } from "@/components/enhanced-product-grid"
import { categories } from "@/lib/categoryData"
import { MobileCategoryNav } from "@/components/mobile-category-nav"
import { useProducts } from "@/hooks/use-api-data"
import { Product } from "@/lib/types"

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const category = categories.find((c) => c.id === resolvedParams.id)


  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (category) params.set("category", category.name)

      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [category])


  /* ------------------------- NEW local state -------------------------- */
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")


  /* -------- filter products by category AND (optionally) sub‑category -------- */
  const baseProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.category.toLowerCase() === category?.name.toLowerCase() &&
        (selectedSub ? p.subcategory === selectedSub : true),
    )
  }, [category?.name, selectedSub])

  /* ------------------------- sort after filtering --------------------------- */
  const sortedProducts = useMemo(() => {
    const sorted = [...baseProducts]
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
        return sorted         // “featured” keeps original order
    }
  }, [baseProducts, sortBy])

  /* -------------------------------- UI --------------------------------- */
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  const handleSortChange = (sort: string) => {
    setLoading(true)
    setSortBy(sort)
    setTimeout(() => setLoading(false), 300)   // sim delay
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
          {/* Mobile Category Navigation - outside the main container */}
          <MobileCategoryNav />
        </div>
      </div>

      {/* Filter / Sort / View bar */}
      <CategoryFilterBar
        categoryName={category.name}
        subcategories={category.subcategories}
        totalProducts={sortedProducts.length}
        currentView={view}
        onViewChange={setView}
        onSortChange={handleSortChange}
        onSubcategoryChange={setSelectedSub}
      />

      {/* Product grid */}
      <EnhancedProductGrid products={sortedProducts} view={view} loading={loading} />

      {/* (Optional) Load‑more button */}
      {sortedProducts.length > 20 && (
        <div className="container mx-auto px-4 py-8 text-center">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      )}
    </motion.div>
  )
}
