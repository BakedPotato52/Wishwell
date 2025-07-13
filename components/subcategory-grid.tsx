"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useSubcategories } from "@/hooks/use-subcategories"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw, ShoppingBag } from "lucide-react"

interface SubcategoryGridProps {
    title?: string
    featured?: boolean
    limit?: number
    categoryId?: string
    className?: string
}

export function SubcategoryGrid({
    title = "Shop by Category",
    featured = true,
    limit = 12,
    categoryId,
    className = "",
}: SubcategoryGridProps) {
    const { subcategories, loading, error, refetch } = useSubcategories({
        featured,
        limit,
        categoryId,
        realtime: true,
    })

    if (loading) {
        return (
            <section className={`py-8 ${className}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {Array.from({ length: limit }).map((_, index) => (
                            <SubcategorySkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className={`py-8 ${className}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center py-12">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h3 className="text-xl font-semibold mb-2 text-red-600">Failed to Load Categories</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={refetch} variant="outline" className="gap-2 bg-transparent">
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    if (subcategories.length === 0) {
        return (
            <section className={`py-8 ${className}`}>
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">{title}</h2>
                    <div className="text-center py-12">
                        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Categories Available</h3>
                        <p className="text-gray-600">Check back later for new categories!</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={`py-8 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold">
                        {title}
                    </motion.h2>
                    <span className="text-sm text-gray-500">{subcategories.length} categories</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {subcategories.map((subcategory, index) => (
                        <SubcategoryCard key={subcategory.id} subcategory={subcategory} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function SubcategoryCard({ subcategory, index }: { subcategory: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group"
        >
            <Link href={`/subcategory/${subcategory.id}`}>
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-gray-200">
                    <div className="flex flex-col items-center text-center space-y-3">
                        {/* Image/Icon Container */}
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-blue-50 group-hover:to-purple-50 transition-colors duration-300">
                            {subcategory.image ? (
                                <Image
                                    src={subcategory.image || "/placeholder.svg"}
                                    alt={subcategory.name}
                                    width={48}
                                    height={48}
                                    className="object-cover rounded-full"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.style.display = "none"
                                        target.nextElementSibling?.classList.remove("hidden")
                                    }}
                                />
                            ) : null}

                            {/* Fallback Icon */}
                            <div className={`text-2xl ${subcategory.image ? "hidden" : ""}`}>{subcategory.icon || "🛍️"}</div>
                        </div>

                        {/* Category Name */}
                        <div className="space-y-1">
                            <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                {subcategory.name}
                            </h3>

                            {/* Product Count */}
                            {subcategory.productCount && <p className="text-xs text-gray-500">{subcategory.productCount} items</p>}
                        </div>

                        {/* Featured Badge */}
                        {subcategory.featured && (
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Featured
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

function SubcategorySkeleton() {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center text-center space-y-3">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-1 w-full">
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    <Skeleton className="h-3 w-1/2 mx-auto" />
                </div>
            </div>
        </div>
    )
}
