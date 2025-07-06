"use client"

import { useState } from "react"
import { SortAsc, Grid3X3, List } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CategoryFilterBarProps {
  categoryName: string
  subcategories?: Array<{ name: string; image: string }> | string[]
  totalProducts: number
  onSortChange: (sort: string) => void
  onViewChange: (view: "grid" | "list") => void
  currentView: "grid" | "list"
}

export function CategoryFilterBar({
  categoryName,
  subcategories = [],
  totalProducts,
  onSortChange,
  onViewChange,
  currentView,
}: CategoryFilterBarProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")


  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onSortChange(sort)
  }

  return (
    <div className="bg-white border-b sticky top-[140px] md:top-[72px] z-30 py-3">
      <div className="container mx-auto px-4">
        {/* Category info */}
        <div className="flex items-center justify-between mb-3">
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
        {/* Filters and Sort */}
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
                  key={typeof subcategory === "string" ? subcategory : subcategory.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index + 1) * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <div
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${selectedSubcategory === subcategory
                      ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                  >
                    <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                      <img
                        src={typeof subcategory === "string"
                          ? `/categories/subcategories/${subcategory.toLowerCase()}.svg`
                          : subcategory.image || "/placeholder.svg"}
                        alt={typeof subcategory === "string" ? subcategory : subcategory.name}
                        className="object-cover w-8 h-8"
                      />
                    </div>
                    <span
                      className={`text-xs text-center font-medium leading-tight max-w-[60px] line-clamp-2 ${selectedSubcategory === subcategory ? "text-blue-700" : "text-gray-700"
                        }`}
                    >

                      {typeof subcategory === "string" ? subcategory : subcategory.name}
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
