"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useProducts } from "@/hooks/use-products"
import { ProductGrid } from "@/components/product-grid"
import { ProductGridSkeleton, ErrorMessage } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Grid, List } from "lucide-react"
import { categories } from "@/lib/categoryData"

// Helper functions for slug conversion
const createSlug = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/&/g, "and") // Replace & with "and"
        .replace(/,/g, "") // Remove commas
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

const getSubcategoryFromSlug = (slug: string): string | null => {
    // Create a mapping of all possible subcategories to their slugs
    const subcategoryMap = new Map<string, string>()

    categories.forEach((category) => {
        category.subcategories?.forEach((subcategory) => {
            const subcategorySlug = createSlug(subcategory)
            subcategoryMap.set(subcategorySlug, subcategory)
        })
    })

    return subcategoryMap.get(slug) || null
}

export default function SubcategoryPage() {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string

    // Get the actual subcategory name from slug
    const subcategoryName = getSubcategoryFromSlug(slug)

    console.log("Slug:", slug)
    console.log("Subcategory Name:", subcategoryName)

    // Find the category and subcategory info
    const [categoryInfo, setCategoryInfo] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<"name" | "price" | "createdAt">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    useEffect(() => {
        if (!subcategoryName) return

        // Find which category contains this subcategory
        for (const category of categories) {
            if (category.subcategories?.includes(subcategoryName)) {
                setCategoryInfo({
                    ...category,
                    currentSubcategory: subcategoryName,
                })
                break
            }
        }
    }, [subcategoryName])

    const { products, loading, error, refetch } = useProducts({
        subcategory: subcategoryName || "",
        searchQuery,
        sortBy,
        sortOrder,
        realtime: true,
    })

    const handleSortChange = (value: string) => {
        const [field, order] = value.split("-")
        setSortBy(field as "name" | "price" | "createdAt")
        setSortOrder(order as "asc" | "desc")
    }

    if (!categoryInfo) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">Category not found</h3>
                        <p className="text-gray-600 mb-4">The subcategory you're looking for doesn't exist.</p>
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
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Image
                                    src={categoryInfo.image || "/placeholder.svg"}
                                    alt={categoryInfo.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
                                />
                                <span className="text-sm text-gray-500">{categoryInfo.name}</span>
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold">{subcategoryName}</h1>
                        </div>
                        <div className="flex gap-2">
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

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
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
            <div className="container mx-auto px-4 py-8">
                {loading && <ProductGridSkeleton count={12} />}
                {error && <ErrorMessage message={error} onRetry={refetch} />}
                {!loading && !error && products.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="mb-6 flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Showing {products.length} product{products.length !== 1 ? "s" : ""} in {subcategoryName}
                            </p>
                            {searchQuery && <p className="text-sm text-blue-600">Search results for "{searchQuery}"</p>}
                        </div>
                        <ProductGrid products={products} />
                    </motion.div>
                )}
                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery
                                ? `No products match your search "${searchQuery}" in ${subcategoryName}.`
                                : `We couldn't find any products in ${subcategoryName} at the moment.`}
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
                <section className="bg-white py-8 mt-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl font-bold mb-6">More in {categoryInfo.name}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categoryInfo.subcategories
                                .filter((sub: string) => sub !== subcategoryName)
                                .slice(0, 6)
                                .map((subcategory: string) => {
                                    const subSlug = createSlug(subcategory)
                                    return (
                                        <Link key={subcategory} href={`/subcategory/${subSlug}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                            >
                                                <div className="flex flex-col items-center text-center">
                                                    <Image
                                                        src={categoryInfo.image || "/placeholder.svg"}
                                                        alt={subcategory}
                                                        width={48}
                                                        height={48}
                                                        className="mb-2 rounded-lg"
                                                    />
                                                    <span className="text-sm font-medium line-clamp-2">{subcategory}</span>
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
