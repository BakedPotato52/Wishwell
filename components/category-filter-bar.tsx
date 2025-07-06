"use client"

import { useState } from "react"
import { SortAsc, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CategoryFilterBarProps {
  categoryName: string
  subcategories?: string[]
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
        <div className="flex items-center justify-between overflow-x-scroll scrollbar-hide">
          {/* Subcategories - horizontal scroll on mobile */}
          {subcategories.length > 0 && (
            <div className="flex-1 mr-4">
              <div className="flex  gap-2 pb-1">
                <Button
                  variant={selectedSubcategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubcategory(null)}
                  className="flex-shrink-0"
                >
                  All
                </Button>
                {subcategories.map((sub) => (
                  <Button
                    key={sub}
                    variant={selectedSubcategory === sub ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubcategory(sub)}
                    className="flex-shrink-0"
                  >
                    {sub}
                  </Button>
                ))}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}
