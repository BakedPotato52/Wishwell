"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SortAsc, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CategoryFilterBarProps {
  categoryName: string
  subcategories?: string[]
  totalProducts: number
  onSortChange: (sort: string) => void
  onViewChange: (view: "grid" | "list") => void
  onSubcategoryChange?: (subcategory: string | null) => void
  currentView: "grid" | "list"
}

// Subcategory icons mapping
const subcategoryIcons: Record<string, string> = {
  // Men's subcategories
  Jackets: "🧥",
  Jeans: "👖",
  "Hoodies & Sweatshirts": "👕",
  Bottoms: "👖",
  "T-Shirts": "/categories/subcategory/shirts.png", // Placeholder for T-Shirts icon
  "Formal Wear": "👔",

  // Women's subcategories
  Midi: "👗",
  "Cargos & Joggers": "👖",
  Shirts: "👚",
  Dresses: "👗",
  Tops: "👚",

  // Kids subcategories
  Boys: "👦",
  Girls: "👧",
  Infants: "👶",
  "School Wear": "🎒",

  // Beauty subcategories
  Skincare: "🧴",
  Makeup: "💄",
  "Hair Care": "💇",
  Fragrances: "🌸",

  // Accessories subcategories
  Bags: "👜",
  Jewelry: "💍",
  Watches: "⌚",
  Sunglasses: "🕶️",

  // Footwear subcategories
  Sneakers: "👟",
  "Formal Shoes": "👞",
  Sandals: "👡",
  Boots: "🥾",

  // Default fallback
  default: "📦",
}

export function CategoryFilterBar({
  categoryName,
  subcategories = [],
  totalProducts,
  onSortChange,
  onViewChange,
  onSubcategoryChange,
  currentView,
}: CategoryFilterBarProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onSortChange(sort)
  }

  const handleSubcategorySelect = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory)
    onSubcategoryChange?.(subcategory)
  }

  return (
    <div className="bg-white border-b sticky top-[140px] md:top-[72px] z-30 py-4">
      <div className="container mx-auto px-4">
        {/* Category info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">{categoryName}</h1>
            <p className="text-sm text-gray-600">{totalProducts} products</p>
          </div>

          {/* View toggle - desktop only */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant={currentView === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>



        {/* Sort Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {selectedSubcategory && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200"
              >
                <span className="text-sm font-medium text-blue-700">{selectedSubcategory}</span>
                <button
                  onClick={() => handleSubcategorySelect(null)}
                  className="text-blue-500 hover:text-blue-700 ml-1"
                >
                  ×
                </button>
              </motion.div>
            )}
          </div>

          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange("featured")}>Featured</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price-low")}>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price-high")}>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("rating")}>Customer Rating</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("newest")}>Newest First</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Subcategories Section */}
        {subcategories.length > 0 && (
          <div className="mb-4">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold mb-3"
            >
              Shop by Category
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {/* All Categories Option */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => handleSubcategorySelect(null)}
              >
                <div
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${selectedSubcategory === null
                    ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                    : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                >
                  <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                    <span className="text-xl" role="img" aria-label="All Categories">
                      🛍️
                    </span>
                  </div>
                  <span
                    className={`text-xs text-center font-medium leading-tight ${selectedSubcategory === null ? "text-blue-700" : "text-gray-700"
                      }`}
                  >
                    All
                  </span>
                </div>
              </motion.div>

              {/* Individual Subcategories */}
              {subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index + 1) * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => handleSubcategorySelect(subcategory)}
                >
                  <div
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${selectedSubcategory === subcategory
                      ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                  >
                    <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                      <span className="text-xl" role="img" aria-label={subcategory}>
                        {subcategoryIcons[subcategory] || subcategoryIcons.default}
                      </span>
                    </div>
                    <span
                      className={`text-xs text-center font-medium leading-tight max-w-[60px] line-clamp-2 ${selectedSubcategory === subcategory ? "text-blue-700" : "text-gray-700"
                        }`}
                    >
                      {subcategory}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
