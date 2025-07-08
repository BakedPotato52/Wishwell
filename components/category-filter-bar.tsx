"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SortAsc, Grid3X3, List, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { subcategoryImages } from "@/lib/subcategoryImages"
import type { Category } from "@/lib/types"

interface CategoryFilterBarProps {
  categoryName: string
  category?: Category
  subcategories?: string[]
  subsubcategories?: Record<string, string[]>
  totalProducts: number
  onSortChange: (sort: string) => void
  onViewChange: (view: "grid" | "list") => void
  onSubcategoryChange?: (subcategory: string | null) => void
  onSubSubcategoryChange?: (subcategory: string | null, subsubcategory: string | null) => void
  currentView: "grid" | "list"
}

interface NavigationLevel {
  type: "main" | "subcategory" | "subsubcategory"
  parent?: string
  items: string[]
  title: string
}

export function CategoryFilterBar({
  categoryName,
  category,
  subcategories = [],
  subsubcategories = {},
  totalProducts,
  onSortChange,
  onViewChange,
  onSubcategoryChange,
  onSubSubcategoryChange,
  currentView,
}: CategoryFilterBarProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string | null>(null)
  const [currentLevel, setCurrentLevel] = useState<NavigationLevel>({
    type: "main",
    items: subcategories,
    title: categoryName,
  })
  const [navigationHistory, setNavigationHistory] = useState<NavigationLevel[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onSortChange(sort)
  }

  const handleSubcategorySelect = (subcategory: string | null) => {
    if (!subcategory) {
      // Reset to main level
      setSelectedSubcategory(null)
      setSelectedSubSubcategory(null)
      setCurrentLevel({
        type: "main",
        items: subcategories,
        title: categoryName,
      })
      setNavigationHistory([])
      onSubcategoryChange?.(null)
      onSubSubcategoryChange?.(null, null)
      return
    }

    // Check if this subcategory has sub-subcategories
    const hasSubSubcategories = subsubcategories[subcategory]?.length > 0

    if (hasSubSubcategories) {
      // Navigate to sub-subcategories level
      const newLevel: NavigationLevel = {
        type: "subsubcategory",
        parent: subcategory,
        items: subsubcategories[subcategory],
        title: subcategory,
      }

      setNavigationHistory([...navigationHistory, currentLevel])
      setCurrentLevel(newLevel)
      setSelectedSubcategory(subcategory)
      setSelectedSubSubcategory(null)
      onSubcategoryChange?.(subcategory)
    } else {
      // Direct selection without sub-subcategories
      setSelectedSubcategory(subcategory)
      setSelectedSubSubcategory(null)
      onSubcategoryChange?.(subcategory)
      onSubSubcategoryChange?.(subcategory, null)
    }
  }

  const handleSubSubcategorySelect = (subsubcategory: string | null) => {
    setSelectedSubSubcategory(subsubcategory)
    onSubSubcategoryChange?.(selectedSubcategory, subsubcategory)
  }

  const navigateBack = () => {
    if (navigationHistory.length > 0) {
      const previousLevel = navigationHistory[navigationHistory.length - 1]
      setCurrentLevel(previousLevel)
      setNavigationHistory(navigationHistory.slice(0, -1))

      if (previousLevel.type === "main") {
        setSelectedSubcategory(null)
        setSelectedSubSubcategory(null)
        onSubcategoryChange?.(null)
        onSubSubcategoryChange?.(null, null)
      }
    }
  }

  const clearAllSelections = () => {
    setSelectedSubcategory(null)
    setSelectedSubSubcategory(null)
    setCurrentLevel({
      type: "main",
      items: subcategories,
      title: categoryName,
    })
    setNavigationHistory([])
    onSubcategoryChange?.(null)
    onSubSubcategoryChange?.(null, null)
  }

  const getBreadcrumbs = () => {
    const breadcrumbs = [categoryName]
    if (selectedSubcategory) breadcrumbs.push(selectedSubcategory)
    if (selectedSubSubcategory) breadcrumbs.push(selectedSubSubcategory)
    return breadcrumbs
  }

  const getActiveSelectionText = () => {
    if (selectedSubSubcategory) {
      return `${selectedSubcategory} > ${selectedSubSubcategory}`
    }
    if (selectedSubcategory) {
      return selectedSubcategory
    }
    return "All Categories"
  }

  return (
    <div className="bg-white border-b z-30 py-4">
      <div className="container mx-auto px-4">
        {/* Category header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-xl font-bold">{categoryName}</h1>
              {(selectedSubcategory || selectedSubSubcategory) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllSelections}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* Breadcrumb navigation */}
            <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
              {getBreadcrumbs().map((crumb, index) => (
                <div key={crumb} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-3 w-3 mx-1" />}
                  <span className={index === getBreadcrumbs().length - 1 ? "font-medium text-gray-900" : ""}>
                    {crumb}
                  </span>
                </div>
              ))}
            </div>

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

        {/* Sort and active selection display */}
        <div className="flex items-center justify-between mb-4">
          {/* Active selection tag */}
          <div className="flex items-center space-x-2">
            {(selectedSubcategory || selectedSubSubcategory) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200"
              >
                <span className="text-sm font-medium text-blue-700">{getActiveSelectionText()}</span>
                <button onClick={clearAllSelections} className="text-blue-500 hover:text-blue-700 ml-1">
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

        {/* Dynamic category navigation */}
        {currentLevel.items.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {navigationHistory.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={navigateBack}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </Button>
                )}
                <motion.h3
                  key={currentLevel.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-semibold"
                >
                  {currentLevel.type === "main"
                    ? "Shop by Category"
                    : currentLevel.type === "subsubcategory"
                      ? `${currentLevel.title} Categories`
                      : currentLevel.title}
                </motion.h3>
              </div>
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
              {/* All categories card - only show at main level */}
              {currentLevel.type === "main" && (
                <CategoryCard
                  label="All"
                  selected={!selectedSubcategory && !selectedSubSubcategory}
                  image={subcategoryImages["All"]}
                  onClick={() => handleSubcategorySelect(null)}
                  delay={0}
                  hasSubItems={false}
                />
              )}

              {/* Dynamic category items */}
              <AnimatePresence mode="wait">
                {currentLevel.items.map((item, i) => {
                  const hasSubItems = currentLevel.type === "main" && subsubcategories[item]?.length > 0
                  const isSelected =
                    currentLevel.type === "main" ? selectedSubcategory === item : selectedSubSubcategory === item

                  return (
                    <CategoryCard
                      key={`${currentLevel.type}-${item}`}
                      label={item}
                      selected={isSelected}
                      image={subcategoryImages[item] || subcategoryImages.default}
                      onClick={() => {
                        if (currentLevel.type === "main") {
                          handleSubcategorySelect(item)
                        } else {
                          handleSubSubcategorySelect(item)
                        }
                      }}
                      delay={(i + 1) * 0.05}
                      hasSubItems={hasSubItems}
                    />
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                        🟦 Enhanced card component                         */
/* -------------------------------------------------------------------------- */
interface CategoryCardProps {
  label: string
  selected: boolean
  image: string
  onClick: () => void
  delay: number
  hasSubItems: boolean
}

function CategoryCard({ label, selected, image, onClick, delay, hasSubItems }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer relative"
      onClick={onClick}
    >
      <div
        className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 min-w-[80px] ${selected
            ? "bg-blue-50 border-2 border-blue-200 shadow-md"
            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
          }`}
      >
        <div className="w-12 h-12 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm relative">
          <Image src={image || "/placeholder.svg"} alt={label} width={48} height={48} className="object-contain" />

          {/* Indicator for items with sub-items */}
          {hasSubItems && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <ChevronRight className="h-2 w-2 text-white" />
            </div>
          )}
        </div>

        <span
          className={`text-xs text-center font-medium leading-tight max-w-[70px] line-clamp-2 ${selected ? "text-blue-700" : "text-gray-700"
            }`}
        >
          {label}
        </span>

        {/* Expand indicator for items with sub-items */}
        {hasSubItems && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1">
            <ChevronDown className={`h-3 w-3 ${selected ? "text-blue-600" : "text-gray-400"}`} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
