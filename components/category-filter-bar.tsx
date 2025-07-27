"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { subcategoryImages } from "@/lib/subcategoryImages"
import type { Category, UnifiedProduct } from "@/lib/types"

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
  loading,
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

  /* --------------------------- Auto-select on reload ------------------------- */
  useEffect(() => {
    // Auto-execute handleSubcategorySelect on component mount if there's a selected subcategory
    // This ensures subsubcategories are displayed immediately after page reload
    if (selectedSubcategory && subsubcategories[selectedSubcategory]?.length > 0) {
      // Use setTimeout to ensure the component is fully mounted before executing
      const timeoutId = setTimeout(() => {
        handleSubcategorySelect(selectedSubcategory)
      }, 0)

      return () => clearTimeout(timeoutId)
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  /* -------------------------------- Handlers ----------------------------- */
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleSubcategorySelect = (subcategory: string | null) => {
    if (!subcategory) {
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

    // Prevent unnecessary re-execution if the same subcategory is already selected
    if (selectedSubcategory === subcategory) {
      return
    }

    setSelectedSubcategory(subcategory)
    setSelectedSubSubcategory(null)
    onSubcategoryChange?.(subcategory)
    onSubSubcategoryChange?.(subcategory, null)
    onShowProducts?.(subcategory, false)
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

  /* ----------------------------------------------------------------------- */
  /*                                 ✨ UI                                   */
  /* ----------------------------------------------------------------------- */
  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-24 bg-white border-r shadow-sm">
        {/* Navigation */}
        {currentLevel.items.length > 0 && (
          <div className="p-2 max-h-dvh  overflow-y-scroll scrollbar-hide" ref={scrollRef}>
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
                  className="text-md font-semibold text-gray-800"
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
              {/* Category Items */}
              <AnimatePresence>
                {currentLevel.items.map((item, i) => {
                  const isSelected =
                    currentLevel.type === LEVELS.MAIN &&
                    (selectedSubcategory === item || (selectedSubcategory === null && i === 0))

                  return (
                    <CategoryListItem
                      key={`${currentLevel.type}-${i}-${item || "empty"}`}
                      label={item}
                      selected={isSelected}
                      image={subcategoryImages[item] ?? "/placeholder.svg"}
                      onClick={() => currentLevel.type === LEVELS.MAIN && handleSubcategorySelect(item)}
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
      <section className="flex-1 p-3 max-h-dvh overflow-y-scroll scrollbar-hide">
        {/* Subsubcategories - Alternative display in main content area */}
        {currentLevel.type === LEVELS.MAIN &&
          selectedSubcategory &&
          subsubcategories[selectedSubcategory]?.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">{selectedSubcategory}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {subsubcategories[selectedSubcategory]?.map((subsubcategory, index) => {
                  const slug = createSlug(subsubcategory)
                  return (
                    <Link key={subsubcategory} href={`/products/${slug}`}>
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
                          className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 max-w-[120px] ${selectedSubSubcategory === subsubcategory
                            ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
                            }`}
                        >
                          <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm relative">
                            <Image
                              src={subcategoryImages[subsubcategory] ?? "/placeholder.svg"}
                              alt={subsubcategory}
                              width={64}
                              height={64}
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
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

        {/* Active Selection */}
      </section>
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
        className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 min-w-[80px] ${selected
          ? "bg-blue-200 border-2 border-blue-400 shadow-md"
          : "bg-gray-200 hover:bg-gray-300 border-2 border-transparent hover:border-gray-400"
          }`}
      >
        <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm relative">
          <Image src={image ?? "/placeholder.svg"} alt={label} width={64} height={64} className="object-contain" />
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
