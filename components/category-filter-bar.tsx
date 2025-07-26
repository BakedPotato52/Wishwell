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
      return
    }

    const hasSubSubcategories = !!subsubcategories?.[subcategory]?.length

    if (hasSubSubcategories) {
      /* Drill into SUBCATEGORY level - show subsubcategories */
      setNavigationHistory((prev) => [...prev, currentLevel])
      setSelectedSubcategory(subcategory)
      setCurrentLevel({
        type: LEVELS.SUBCATEGORY,
        parent: subcategory,
        title: subcategory,
        items: subsubcategories[subcategory] || [],
      })
      onSubcategoryChange?.(subcategory)
    } else {
      // No subsubcategories - just select this subcategory and show products
      setSelectedSubcategory(subcategory)
      setSelectedSubSubcategory(null)
      onSubcategoryChange?.(subcategory)
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
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-24 bg-white border-r shadow-sm">
        {/* Navigation */}
        {currentLevel.items.length > 0 && (
          <div className="p-2 overflow-y-scroll sm:max-h-[380px] scrollbar-hide ">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">

                <motion.h3
                  key={currentLevel.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-semibold"
                >
                  {"Categories"
                  }
                </motion.h3>
              </div>
            </div>

            {/* Category List */}
            <div className="space-y-2">

              {/* Category Items */}
              <AnimatePresence>
                {currentLevel.type === LEVELS.MAIN && currentLevel.items.map((item, i) => {
                  const isSelected = selectedSubcategory === item

                  return (
                    <CategoryListItem
                      key={`${currentLevel.type}-${i}-${item || "empty"}`}
                      label={item}
                      selected={isSelected}
                      image={subcategoryImages[item] ?? "/placeholder.svg"}
                      onClick={() =>
                        handleSubcategorySelect(item)
                      }
                      delay={(i + 1) * 0.05}
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
        {/* Subsubcategories */}

        {currentLevel.type === LEVELS.SUBCATEGORY && selectedSubcategory && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{selectedSubcategory}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 overflow-y-scroll max-h-64 scrollbar-hide">
              {subsubcategories[selectedSubcategory]?.map((subsubcategory, index) => (
                <motion.div
                  key={subsubcategory}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubSubcategorySelect(subsubcategory)}
                  className="cursor-pointer relative"
                >
                  <div
                    className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 max-w-[80px] ${selectedSubSubcategory === subsubcategory
                      ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
                      }`}
                  >
                    <div className="w-12 h-12 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm relative">
                      <Image
                        src={subcategoryImages[subsubcategory] ?? "/placeholder.svg"}
                        alt={subsubcategory}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span
                      className={`text-xs text-center font-medium leading-tight max-w-[70px] line-clamp-2 ${selectedSubSubcategory === subsubcategory ? "text-blue-700" : "text-gray-700"
                        }`}
                    >
                      {subsubcategory}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Active Selection */}

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
}

function CategoryListItem({ label, selected, image, onClick, delay }: CategoryListItemProps) {
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
          ? "bg-blue-100 border-2 border-blue-200 shadow-md"
          : "bg-gray-100 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
          }`}
      >
        <div className="w-12 h-12 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm relative">
          <Image src={image ?? "/placeholder.svg"} alt={label} width={48} height={48} className="object-contain" />

        </div>
        <span
          className={`text-xs text-center font-medium leading-tight max-w-[70px] line-clamp-2 ${selected ? "text-blue-700" : "text-gray-700"
            }`}
        >
          {label}
        </span>

      </div>
    </motion.div>
  )
}
