"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useProducts } from "@/hooks/use-products"
import { ProductGrid } from "@/components/product-grid"
import { ProductGridSkeleton, ErrorMessage } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Grid, List, Home } from 'lucide-react'
import { categories } from "@/lib/categoryData"
import { subcategoryImages } from "@/lib/subcategoryImages"
import {
    createSlug,
    getSubsubcategoryFromSlug,
    parseContextualSlug,
    createContextualSlug
} from "@/utils/category-utils"

export default function SubsubcategoryProductPage() {
    const params = useParams()
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug]

    // Handle both old single slug format and new contextual format
    const isContextualUrl = slugArray.length === 3
    const slug = isContextualUrl ? slugArray.join('/') : slugArray[0]

    // Get the actual subsubcategory info from slug
    const subsubcategoryInfo = isContextualUrl && slug
        ? parseContextualSlug(slug)
        : slugArray[0] ? getSubsubcategoryFromSlug(slugArray[0]) : null

    // Find the full category info
    const [categoryInfo, setCategoryInfo] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<"name" | "price" | "createdAt">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    useEffect(() => {
        if (!subsubcategoryInfo) return

        // Find the full category information
        const category = categories.find((cat) => cat.name === subsubcategoryInfo.category)
        if (category) {
            setCategoryInfo({
                ...category,
                currentSubcategory: subsubcategoryInfo.subcategory,
                currentSubsubcategory: subsubcategoryInfo.subsubcategory,
            })
        }
    }, [slug])

    const { products, loading, error, refetch } = useProducts({
        category: subsubcategoryInfo?.category || "",
        subcategory: subsubcategoryInfo?.subcategory || "",
        searchQuery,
        sortBy,
        sortOrder,
        realtime: true,
    })

    // Filter products by subsubcategory since the hook doesn't support it directly
    const filteredProducts = subsubcategoryInfo
        ? products.filter((product) => product.subsubcategory === subsubcategoryInfo.subsubcategory)
        : []

    const handleSortChange = (value: string) => {
        const [field, order] = value.split("-")
        setSortBy(field as "name" | "price" | "createdAt")
        setSortOrder(order as "asc" | "desc")
    }

    if (!subsubcategoryInfo || !categoryInfo) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">Product category not found</h3>
                        <p className="text-gray-600 mb-4">The product category you're looking for doesn't exist.</p>
                        <Link href="/">
                            <Button>Go Back Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                                <Link href="/" className="hover:text-blue-600 transition-colors">
                                    <Home className="h-4 w-4" />
                                </Link>
                                <span>/</span>
                                <Link
                                    href={`/category/${categoryInfo.id}`}
                                    className="hover:text-blue-600 transition-colors flex items-center gap-1"
                                >
                                    <Image
                                        src={categoryInfo.image || "/placeholder.svg?height=16&width=16"}
                                        alt={categoryInfo.name}
                                        width={16}
                                        height={16}
                                        className="rounded"
                                    />
                                    {categoryInfo.name}
                                </Link>
                                <span>/</span>
                                <Link
                                    href={`/subcategory/${createSlug(subsubcategoryInfo.subcategory)}`}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    {subsubcategoryInfo.subcategory}
                                </Link>
                                <span>/</span>
                                <span className="text-gray-700 font-medium">{subsubcategoryInfo.subsubcategory}</span>
                            </div>
                            <div className="flex gap-2 p-2">
                                <div className="flex-1">
                                    <h1 className="text-xl md:text-2xl font-bold">{subsubcategoryInfo.subsubcategory}</h1>
                                    <p className="text-sm text-gray-600">in {subsubcategoryInfo.subcategory} - {subsubcategoryInfo.category}</p>
                                </div>
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                                <SelectItem value="createdAt-desc">Newest First</SelectItem>
                                <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-2">
                {loading && <ProductGridSkeleton count={12} />}
                {error && <ErrorMessage message={error} onRetry={refetch} />}
                {!loading && !error && filteredProducts.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="mb-2 flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} in{" "}
                                {subsubcategoryInfo.subsubcategory}
                            </p>
                            {searchQuery && <p className="text-sm text-blue-600">Search results for "{searchQuery}"</p>}
                        </div>
                        <ProductGrid products={filteredProducts} />
                    </motion.div>
                )}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery
                                ? `No products match your search "${searchQuery}" in ${subsubcategoryInfo.subsubcategory}.`
                                : `We couldn't find any products in ${subsubcategoryInfo.subsubcategory} at the moment.`}
                        </p>
                        <div className="flex gap-4 justify-center">
                            {searchQuery && (
                                <Button variant="outline" onClick={() => setSearchQuery("")}>
                                    Clear Search
                                </Button>
                            )}
                            <Link href="/">
                                <Button>Browse All Categories</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Related Subcategories */}
            {categoryInfo.subcategories && categoryInfo.subcategories.length > 1 && (
                <section className="bg-gray-100 py-4">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl font-bold mb-6">Other categories in {categoryInfo.name}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categoryInfo.subcategories
                                .filter((sub: string) => sub !== subsubcategoryInfo.subsubcategory)
                                .slice(0, 6)
                                .map((subsubcategory: string) => {
                                    // Use contextual URL generation
                                    const contextualSlug = createContextualSlug(
                                        categoryInfo.name,
                                        subsubcategoryInfo.subcategory,
                                        subsubcategory
                                    )
                                    return (
                                        <Link key={subsubcategory} href={`/products/${contextualSlug}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                                            >
                                                <div className="flex flex-col items-center text-center">
                                                    <Image
                                                        src={
                                                            typeof subcategoryImages[subsubcategory] === 'string'
                                                                ? subcategoryImages[subsubcategory] as string
                                                                : (subcategoryImages[subsubcategory] as any)?.src || "/placeholder.svg?height=64&width=64"
                                                        }
                                                        alt={subsubcategory}
                                                        width={64}
                                                        height={64}
                                                        className="mb-2 rounded-lg"
                                                    />
                                                    <span className="text-sm font-medium line-clamp-2">{subsubcategory}</span>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    )
                                })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
