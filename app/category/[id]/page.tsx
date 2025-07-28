"use client"

import { useState, useMemo, use, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CategoryFilterBar } from "@/components/category-filter-bar"
import { categories } from "@/lib/categoryData"
import type { Product } from "@/lib/types"
import { MobileCategoryNav } from "@/components/mobile-category-nav"

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const category = categories.find((c) => c.id === resolvedParams.id)

  // Product data state
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter and view state
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [selectedSubSub, setSelectedSubSub] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showingProducts, setShowingProducts] = useState(false)

  const subsubcategories = useMemo(() => {
    if (!category?.subsubcategories) return {}
    return category.subsubcategories
  }, [category?.subsubcategories])


  // Filter products by category, subcategory, and subsubcategory
  const baseProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.category.toLowerCase() === category?.name.toLowerCase() &&
        (selectedSub ? p.subcategory === selectedSub : true) &&
        (selectedSubSub ? p.subsubcategory === selectedSubSub : true),
    )
  }, [products, category?.name, selectedSub, selectedSubSub])


  const handleSubSubcategoryChange = (subcategory: string | null, subsubcategory: string | null) => {
    setSelectedSub(subcategory)
    setSelectedSubSub(subsubcategory)
    setShowingProducts(true)
  }

  const handleSubcategoryChange = (subcategory: string | null) => {
    setSelectedSub(subcategory)
    setSelectedSubSub(null) // Reset subsubcategory when subcategory changes
    if (subcategory === null) {
      setShowingProducts(false) // Hide products when clearing all filters
    }
  }

  // Error handling
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-gray-600 mb-4">{error}</p>
      </div>
    )
  }

  // Category not found
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-h-dvh scrollbar-hide overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto pt-2 top-0 z-10">
          {/* Mobile Category Navigation - outside the main container */}
          <MobileCategoryNav />
        </div>
      </div>

      {/* Filter / Sort / View bar */}
      <CategoryFilterBar
        categoryName={category.name}
        subcategories={category.subcategories}
        subsubcategories={subsubcategories}
        onSubcategoryChange={handleSubcategoryChange}
        onSubSubcategoryChange={handleSubSubcategoryChange}
        view={view}
        loading={loading}
        totalProducts={baseProducts.length}
        onSortChange={setSortBy}
        onViewChange={setView}
        currentView={view}
      />



    </motion.div>
  )
}
