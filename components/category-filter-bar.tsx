"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { SortAsc, Grid3X3, List, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { subcategoryImages } from "@/lib/subcategoryImages"

interface CategoryFilterBarProps {
  categoryName: string
  subcategories?: string[]
  subsubcategories?: Record<string, string[]>
  totalProducts: number
  onSortChange: (sort: string) => void
  onViewChange: (view: "grid" | "list") => void
  onSubcategoryChange?: (subcategory: string | null) => void
  onSubsubcategoryChange?: (subsubcategory: string | null) => void
  currentView: "grid" | "list"
}

export function CategoryFilterBar({
  categoryName,
  subcategories = [],
  subsubcategories = {},
  totalProducts,
  onSortChange,
  onViewChange,
  onSubcategoryChange,
  onSubsubcategoryChange,
  currentView,
}: CategoryFilterBarProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState<string | null>(null)
  const [showSubsubcategories, setShowSubsubcategories] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onSortChange(sort)
  }

  const handleSubcategorySelect = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory)
    setSelectedSubsubcategory(null)
    setShowSubsubcategories(false)
    onSubcategoryChange?.(subcategory)
    onSubsubcategoryChange?.(null)

    // If subcategory has subsubcategories, show them
    if (subcategory && subsubcategories[subcategory]?.length > 0) {
      setShowSubsubcategories(true)
    }
  }

  const handleSubsubcategorySelect = (subsubcategory: string | null) => {
    setSelectedSubsubcategory(subsubcategory)
    onSubsubcategoryChange?.(subsubcategory)
  }

  const handleBackToSubcategories = () => {
    setShowSubsubcategories(false)
    setSelectedSubsubcategory(null)
    onSubsubcategoryChange?.(null)
  }

  const clearAllSelections = () => {
    setSelectedSubcategory(null)
    setSelectedSubsubcategory(null)
    setShowSubsubcategories(false)
    onSubcategoryChange?.(null)
    onSubsubcategoryChange?.(null)
  }

  return (
    <div className="bg-white border-b z-30 py-4">
      <div className="container mx-auto px-4">
        {/* Category header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">{categoryName}</h1>
            <p className="text-sm text-gray-600">{totalProducts} products</p>
          </div>

          {/* View toggle */}
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

        {/* Sort + selected tags */}
        <div className="flex items-center justify-between">
          {/* Selected tags */}
          <div className="flex items-center space-x-2">
            {selectedSubcategory && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200"
              >
                <span className="text-sm font-medium text-blue-700">
                  {selectedSubcategory}
                </span>
                <button
                  onClick={clearAllSelections}
                  className="text-blue-500 hover:text-blue-700 ml-1"
                >
                  ×
                </button>
              </motion.div>
            )}
            {selectedSubsubcategory && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-200"
              >
                <span className="text-sm font-medium text-green-700">
                  {selectedSubsubcategory}
                </span>
                <button
                  onClick={() => handleSubsubcategorySelect(null)}
                  className="text-green-500 hover:text-green-700 ml-1"
                >
                  ×
                </button>
              </motion.div>
            )}
          </div>

          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 bg-transparent"
              >
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange("featured")}>
                Featured
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price-low")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price-high")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("rating")}>
                Customer Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("newest")}>
                Newest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Categories/Subcategories/Subsubcategories */}
        {subcategories.length > 0 && (
          <div className="mb-4">
            {/* Header with back button for subsubcategories */}
            <div className="flex items-center mb-3">
              {showSubsubcategories && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToSubcategories}
                  className="mr-2 p-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold"
              >
                {showSubsubcategories
                  ? `${selectedSubcategory} Categories`
                  : "Shop by Category"
                }
              </motion.h3>
            </div>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 px-4 pb-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {!showSubsubcategories ? (
                <>
                  {/* All categories card */}
                  <SubcategoryCard
                    label="All"
                    selected={selectedSubcategory === null}
                    image="/categories/subcategory/all.png"
                    onClick={() => handleSubcategorySelect(null)}
                    delay={0}
                  />

                  {/* Subcategories */}
                  {subcategories.map((subcategory, i) => (
                    <SubcategoryCard
                      key={subcategory}
                      label={subcategory}
                      selected={selectedSubcategory === subcategory}
                      image={subcategoryImages[subcategory] || subcategoryImages.default}
                      onClick={() => handleSubcategorySelect(subcategory)}
                      delay={(i + 1) * 0.05}
                    />
                  ))}
                </>
              ) : (
                <>
                  {/* All subsubcategories card */}
                  <SubcategoryCard
                    label="All"
                    selected={selectedSubsubcategory === null}
                    image="/categories/subcategory/all.png"
                    onClick={() => handleSubsubcategorySelect(null)}
                    delay={0}
                  />

                  {/* Subsubcategories */}
                  {selectedSubcategory && subsubcategories[selectedSubcategory]?.map((subsubcategory, i) => (
                    <SubcategoryCard
                      key={subsubcategory}
                      label={subsubcategory}
                      selected={selectedSubsubcategory === subsubcategory}
                      image={subcategoryImages[subsubcategory] || subcategoryImages.default}
                      onClick={() => handleSubsubcategorySelect(subsubcategory)}
                      delay={(i + 1) * 0.05}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface CardProps {
  label: string
  selected: boolean
  image: string
  onClick: () => void
  delay: number
}

function SubcategoryCard({
  label,
  selected,
  image,
  onClick,
  delay,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`flex flex-col items-center p-4 rounded-lg transition-colors duration-200 ${selected
            ? "bg-blue-50 border-2 border-blue-200 shadow-md"
            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
          }`}
      >
        <div className="w-12 h-12 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
          <Image
            src={image}
            alt={label}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <span
          className={`text-xs text-center font-medium leading-tight max-w-[60px] line-clamp-2 ${selected ? "text-blue-700" : "text-gray-700"
            }`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  )
}
