"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SortAsc, Grid3X3, List, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { subcategoryImages } from "@/lib/subcategoryImages"
import type { Category, UnifiedProduct } from "@/lib/types"
import { EnhancedProductGrid } from "./enhanced-product-grid"

/* -------------------------------------------------------------------------- */
/*                              🔖  Type helpers                              */
/* -------------------------------------------------------------------------- */
const LEVELS = {
  MAIN: "main",
  SUBCATEGORY: "subcategory",
  SUBSUBCATEGORY: "subsubcategory",
} as const

type LevelType = (typeof LEVELS)[keyof typeof LEVELS]

interface NavigationLevel {
  type: LevelType
  /** parent label for SUBCATEGORY / SUBSUBCATEGORY levels */
  parent?: string
  items: string[]
  /** Shown in heading/breadcrumb */
  title: string
}

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
  onShowProducts?: (subcategory: string, hasSubcategories: boolean) => void
  currentView: "grid" | "list"
  sortedProducts?: UnifiedProduct[]
  view: "grid" | "list"
  loading?: boolean
}

/* -------------------------------------------------------------------------- */
/*                           📚  Filter‑bar component                         */
/* -------------------------------------------------------------------------- */
export function CategoryFilterBar({
  categoryName,
  subcategories = [],
  subsubcategories = {},
  totalProducts,
  onSortChange,
  onViewChange,
  onSubcategoryChange,
  onSubSubcategoryChange,
  onShowProducts,
  currentView,
  sortedProducts,
  view,
  loading
}: CategoryFilterBarProps) {
  /* -------------------------------- State -------------------------------- */
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string | null>(null)
  const [currentLevel, setCurrentLevel] = useState<NavigationLevel>({
    type: LEVELS.MAIN,
    items: subcategories,
    title: categoryName,
  })
  const [navigationHistory, setNavigationHistory] = useState<NavigationLevel[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const scrollRef = useRef<HTMLDivElement>(null)

  /* --------------------------- Keep scroller tidy ------------------------- */
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" })
  }, [currentLevel])

  /* -------------------------------- Handlers ----------------------------- */
  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onSortChange(sort)
  }

  /** User picked / cleared a 1st‑level sub‑category ("For Him") */
  const handleSubcategorySelect = (subcategory: string | null) => {
    if (!subcategory) {
      // Reset to MAIN
      setSelectedSubcategory(null)
      setSelectedSubSubcategory(null)
      setCurrentLevel({
        type: LEVELS.MAIN,
        items: subcategories,
        title: categoryName,
      })
      setNavigationHistory([])
      onSubcategoryChange?.(null)
      onSubSubcategoryChange?.(null, null)
      return
    }

    const hasSubSubcategories = !!subsubcategories?.[subcategory]?.length

    if (hasSubSubcategories) {
      /* Drill into SUBCATEGORY level - show subsubcategories */
      setNavigationHistory((prev) => [...prev, currentLevel])
      setSelectedSubcategory(subcategory)
      setSelectedSubSubcategory(null)
      setCurrentLevel({
        type: LEVELS.SUBCATEGORY,
        parent: subcategory,
        items: subsubcategories![subcategory],
        title: subcategory,
      })
      onSubcategoryChange?.(subcategory)
      onSubSubcategoryChange?.(subcategory, null)
    } else {
      /* No subsubcategories - show products directly */
      setSelectedSubcategory(subcategory)
      setSelectedSubSubcategory(null)
      onSubcategoryChange?.(subcategory)
      onSubSubcategoryChange?.(subcategory, null)

      // Trigger showing products for this subcategory
      onShowProducts?.(subcategory, false)
    }
  }

  /** User picked / cleared a 2nd‑level sub‑category ("Casual Shoes") */
  const handleSubSubcategorySelect = (subsubcategory: string | null) => {
    setSelectedSubSubcategory(subsubcategory)
    onSubSubcategoryChange?.(selectedSubcategory, subsubcategory)

    // When a subsubcategory is selected, show products for that specific combination
    if (subsubcategory && selectedSubcategory) {
      onShowProducts?.(selectedSubcategory, true)
    }
  }

  const navigateBack = () => {
    if (!navigationHistory.length) return

    const prev = navigationHistory.at(-1)!
    setCurrentLevel(prev)
    setNavigationHistory((h) => h.slice(0, -1))

    if (prev.type === LEVELS.MAIN) {
      setSelectedSubSubcategory(null)
      onSubSubcategoryChange?.(selectedSubcategory, null)

      // When going back to main, if we had a subcategory selected without subsubcategories,
      // we should show products for that subcategory
      if (selectedSubcategory && !subsubcategories?.[selectedSubcategory]?.length) {
        onShowProducts?.(selectedSubcategory, false)
      }
    }
  }

  /* -------------------------------- Helpers ------------------------------ */
  const getBreadcrumbs = () => {
    const crumbs = [categoryName]
    if (selectedSubcategory) crumbs.push(selectedSubcategory)
    if (selectedSubSubcategory) crumbs.push(selectedSubSubcategory)
    return crumbs
  }

  const getActiveSelectionText = () =>
    selectedSubSubcategory
      ? `${selectedSubcategory} > ${selectedSubSubcategory}`
      : (selectedSubcategory ?? "All Categories")

  /* ----------------------------------------------------------------------- */
  /*                                 ✨ UI                                   */
  /* ----------------------------------------------------------------------- */
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-24 bg-white border-r shadow-sm">
        {/* Header */}
        {/* <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold">{categoryName}</h1>
            {(selectedSubcategory || selectedSubSubcategory) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSubcategorySelect(null)}
                className="text-blue-600 hover:text-blue-800 text-xs"
              >
                Clear
              </Button>
            )}
          </div>

          
          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
            {getBreadcrumbs().map((crumb, i, arr) => (
              <div key={`breadcrumb-${i}-${crumb}`} className="flex items-center">
                {i > 0 && <ChevronRight className="h-3 w-3 mx-1" />}
                <span className={i === arr.length - 1 ? "font-medium text-gray-900" : ""}>{crumb}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600">{totalProducts} products</p>
        </div> */}

        {/* Navigation */}
        {currentLevel.items.length > 0 && (
          <div className="p-2 overflow-y-auto" ref={scrollRef}>
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {!!navigationHistory.length && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={navigateBack}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 p-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <motion.h3
                  key={currentLevel.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-semibold"
                >
                  {currentLevel.type === LEVELS.MAIN
                    ? "Categories"
                    : currentLevel.type === LEVELS.SUBCATEGORY
                      ? `${currentLevel.title}`
                      : currentLevel.title}
                </motion.h3>
              </div>
            </div>

            {/* Category List */}
            <div className="space-y-2">
              {/* "All" option */}
              {(currentLevel.type === LEVELS.MAIN || currentLevel.type === LEVELS.SUBCATEGORY) && (
                <CategoryListItem
                  label={currentLevel.type === LEVELS.MAIN ? "All Categories" : `All ${currentLevel.title}`}
                  selected={
                    currentLevel.type === LEVELS.MAIN
                      ? !selectedSubcategory && !selectedSubSubcategory
                      : selectedSubcategory === currentLevel.parent && !selectedSubSubcategory
                  }
                  image={subcategoryImages["All"] ?? "/placeholder.svg"}
                  onClick={() =>
                    currentLevel.type === LEVELS.MAIN ? handleSubcategorySelect(null) : handleSubSubcategorySelect(null)
                  }
                  delay={0}
                  hasSubItems={false}
                  key={`all-${currentLevel.type}-${currentLevel.title || "main"}`}
                />
              )}

              {/* Category Items */}
              <AnimatePresence>
                {currentLevel.items.map((item, i) => {
                  const hasChildren = currentLevel.type === LEVELS.MAIN && !!subsubcategories?.[item]?.length
                  const isSelected =
                    currentLevel.type === LEVELS.MAIN ? selectedSubcategory === item : selectedSubSubcategory === item

                  return (
                    <CategoryListItem
                      key={`${currentLevel.type}-${i}-${item || "empty"}`}
                      label={item}
                      selected={isSelected}
                      image={subcategoryImages[item] ?? "/placeholder.svg"}
                      onClick={() =>
                        currentLevel.type === LEVELS.MAIN
                          ? handleSubcategorySelect(item)
                          : handleSubSubcategorySelect(item)
                      }
                      delay={(i + 1) * 0.05}
                      hasSubItems={hasChildren}
                    />
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          {/* Active Selection Tag */}
          <div className="flex items-center space-x-2">
            {(selectedSubcategory || selectedSubSubcategory) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200"
              >
                <span className="text-sm font-medium text-blue-700">{getActiveSelectionText()}</span>
                <button
                  onClick={() => handleSubcategorySelect(null)}
                  className="text-blue-500 hover:text-blue-700 ml-1"
                >
                  ×
                </button>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
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

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[
                  ["featured", "Featured"],
                  ["price-low", "Price: Low to High"],
                  ["price-high", "Price: High to Low"],
                  ["rating", "Customer Rating"],
                  ["newest", "Newest First"],
                ].map(([val, label]) => (
                  <DropdownMenuItem key={val} onClick={() => handleSortChange(val)}>
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Products will be displayed here */}
        <EnhancedProductGrid products={sortedProducts || []} view={view} loading={loading} />

      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                        🟦  Sidebar list item component                     */
/* -------------------------------------------------------------------------- */
interface CategoryListItemProps {
  label: string
  selected: boolean
  image: string
  onClick: () => void
  delay: number
  hasSubItems: boolean
}

function CategoryListItem({ label, selected, image, onClick, delay, hasSubItems }: CategoryListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer relative"
    >
      <div
        className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 min-w-[80px] ${selected
          ? "bg-blue-50 border-2 border-blue-200 shadow-md"
          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
          }`}
      >
        <div className="w-12 h-12 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm relative">
          <Image src={image ?? "/placeholder.svg"} alt={label} width={48} height={48} className="object-contain" />
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
        {hasSubItems && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ChevronDown className={`h-3 w-3 ${selected ? "text-blue-600" : "text-gray-400"}`} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
