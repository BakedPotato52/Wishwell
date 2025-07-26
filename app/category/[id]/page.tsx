"use client"

import { useState, useMemo, use, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryFilterBar } from "@/components/category-filter-bar"
import { EnhancedProductGrid } from "@/components/enhanced-product-grid"
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

  // Filter products by category, subcategory, and subsubcategory
  const baseProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.category.toLowerCase() === category?.name.toLowerCase() &&
        (selectedSub ? p.subcategory === selectedSub : true) &&
        (selectedSubSub ? p.subsubcategory === selectedSubSub : true),
    )
  }, [products, category?.name, selectedSub, selectedSubSub])

  // Sort products after filtering
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
        return sorted // "featured" keeps original order
    }
  }, [baseProducts, sortBy])

  // Handlers
  const handleSortChange = (sort: string) => {
    setLoading(true)
    setSortBy(sort)
    setTimeout(() => setLoading(false), 300) // simulate delay
  }

  const handleShowProducts = (subcategory: string, hasSubcategories: boolean) => {
    console.log(`Showing products for: ${subcategory}, has subcategories: ${hasSubcategories}`)
    setShowingProducts(true)
    // Products will be filtered automatically by the baseProducts useMemo
  }

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
        <Button onClick={fetchProducts}>Try Again</Button>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto pt-2">
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

      {/* Filter / Sort / View bar */}
      <aside className="">
        <CategoryFilterBar
          categoryName={category.name}
          category={category}
          subcategories={category.subcategories}
          subsubcategories={subsubcategories}
          totalProducts={sortedProducts.length}
          currentView={view}
          onViewChange={setView}
          onSortChange={handleSortChange}
          onSubcategoryChange={handleSubcategoryChange}
          onSubSubcategoryChange={handleSubSubcategoryChange}
          onShowProducts={handleShowProducts}
          sortedProducts={sortedProducts}
          view={view}
          loading={loading}
        />
      </aside>

      {/* Product grid */}


    </motion.div>
  )
}
