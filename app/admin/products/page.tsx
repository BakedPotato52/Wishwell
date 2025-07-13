"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ProductUploadModal } from "@/components/admin/product-upload-modal"
import { BulkUploadModal } from "@/components/admin/bulk-upload-modal"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { initializeProducts } from "@/lib/firebase/admin"
import { categories } from "@/lib/categoryData"

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [showBulkModal, setShowBulkModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (searchTerm) params.set("search", searchTerm)
            if (selectedCategory) params.set("category", selectedCategory)

            const response = await fetch(`/api/admin/products?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setProducts(data.products)
            }
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [searchTerm, selectedCategory])

    const handleInitializeProducts = async () => {
        try {
            await initializeProducts()
            setProducts([]) // Clear current products
            setLoading(true) // Set loading state to true
            fetchProducts() // Refresh product list after initialization
        } catch (error) {
            console.error("Error initializing products:", error)
        }
    }

    const handleDeleteProduct = async (productId: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return

        try {
            const response = await fetch(`/api/admin/products/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
                },
            })

            if (response.ok) {
                setProducts(products.filter((p) => p.id !== productId))
            }
        } catch (error) {
            console.error("Error deleting product:", error)
        }
    }

    const handleProductSaved = () => {
        fetchProducts()
        setShowUploadModal(false)
        setEditingProduct(null)
    }

    const handleBulkUploadComplete = () => {
        fetchProducts()
        setShowBulkModal(false)
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        )
    }
    const action = "initialize"
    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Products</h1>
                        <p className="text-gray-600">Manage your product catalog</p>
                    </div>

                    <div className="flex space-x-2">
                        <Button onClick={() => setShowBulkModal(true)} variant="outline">
                            <Upload className="h-4 w-4 mr-2" />
                            Bulk Upload
                        </Button>
                        <Button onClick={() => setShowUploadModal(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-48">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <Button onClick={() => handleInitializeProducts()}>Initialize</Button>
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="overflow-hidden">
                                <div className="relative h-48">
                                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                                    <div className="absolute top-2 right-2 flex space-x-1">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setEditingProduct(product)
                                                setShowUploadModal(true)
                                            }}
                                            className="bg-white/90 hover:bg-white"
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
                                        <Badge variant={product.inStock ? "default" : "destructive"}>
                                            {product.inStock ? "In Stock" : "Out of Stock"}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{product.category}</span>
                                        <span>
                                            ★ {product.rating} ({product.reviews})
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">Get started by adding your first product</p>
                        <Button onClick={() => setShowUploadModal(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Button>
                    </div>
                )}
            </div>

            {/* Modals */}
            <ProductUploadModal
                isOpen={showUploadModal}
                onClose={() => {
                    setShowUploadModal(false)
                    setEditingProduct(null)
                }}
                onSave={handleProductSaved}
                product={editingProduct}
            />

            <BulkUploadModal
                isOpen={showBulkModal}
                onClose={() => setShowBulkModal(false)}
                onComplete={handleBulkUploadComplete}
            />
        </AdminLayout>
    )
}
