"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Upload, X, Loader2, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import type { Product } from "@/lib/types"

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be positive"),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().optional(),
    inStock: z.boolean(),
    rating: z.number().min(0).max(5),
    reviews: z.number().min(0),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductUploadModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    product?: Product | null
}

export function ProductUploadModal({ isOpen, onClose, onSave, product }: ProductUploadModalProps) {
    const [uploading, setUploading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [uploadError, setUploadError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            subcategory: "",
            inStock: true,
            rating: 4.5,
            reviews: 0,
        },
    })

    const inStock = watch("inStock")

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                subcategory: product.subcategory || "",
                inStock: product.inStock,
                rating: product.rating,
                reviews: product.reviews,
            })
            setImagePreview(product.image)
        } else {
            reset({
                name: "",
                description: "",
                price: 0,
                category: "",
                subcategory: "",
                inStock: true,
                rating: 4.5,
                reviews: 0,
            })
            setImagePreview("")
        }
        setImageFile(null)
        setUploadError(null)
    }, [product, reset])

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setUploadError("File size must be less than 10MB")
                return
            }

            // Validate file type
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
            if (!allowedTypes.includes(file.type)) {
                setUploadError("Only JPEG, PNG, and WebP images are allowed")
                return
            }

            setUploadError(null)
            setImageFile(file)
            const reader = new FileReader()
            reader.onload = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxFiles: 1,
    })

    const uploadImage = async (): Promise<string> => {
        if (!imageFile) {
            return product?.image || ""
        }

        try {
            const formData = new FormData()
            formData.append("files", imageFile)
            formData.append("folder", "WishWell/products")

            const response = await fetch("/api/admin/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
                },
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to upload image")
            }

            const data = await response.json()
            return data.result.secure_url
        } catch (error) {
            console.error("Image upload error:", error)
            throw new Error(error instanceof Error ? error.message : "Failed to upload image")
        }
    }

    const onSubmit = async (data: ProductFormData) => {
        try {
            setUploading(true)
            setUploadError(null)

            // Upload image if new file selected
            let imageUrl = product?.image || ""

            if (imageFile) {
                try {
                    imageUrl = await uploadImage()
                } catch (error) {
                    setUploadError(error instanceof Error ? error.message : "Failed to upload image")
                    return
                }
            }

            const productData = {
                ...data,
                image: imageUrl,
                subcategory: data.subcategory || data.category, // Fallback to category if subcategory is empty
            }

            const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products"
            const method = product ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
                },
                body: JSON.stringify(productData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to save product")
            }

            onSave()
        } catch (error) {
            console.error("Error saving product:", error)
            setUploadError(error instanceof Error ? error.message : "Failed to save product")
        } finally {
            setUploading(false)
        }
    }

    const handleClose = () => {
        if (!uploading) {
            setUploadError(null)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>

                {uploadError && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-800">{uploadError}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <Label>Product Image</Label>
                        <div
                            {...getRootProps()}
                            className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            <input {...getInputProps()} />
                            {imagePreview ? (
                                <div className="relative w-32 h-32 mx-auto">
                                    <Image
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Preview"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setImagePreview("")
                                            setImageFile(null)
                                        }}
                                        className="absolute -top-2 -right-2 bg-white"
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">
                                        {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" {...register("name")} className="mt-1" />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                {...register("category")}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Category</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Beauty & Personal care">Beauty & Personal care</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Grocery & Kitchen">Grocery & Kitchen</option>
                                <option value="Household Essentials">Household Essentials</option>
                                <option value="Snacks & Drinks">Snacks & Drinks</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                            <Input
                                id="subcategory"
                                {...register("subcategory")}
                                className="mt-1"
                                placeholder="e.g., T-Shirts, Jeans"
                            />
                        </div>

                        <div>
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                {...register("price", { valueAsNumber: true })}
                                className="mt-1"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="rating">Rating</Label>
                            <Input
                                id="rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                {...register("rating", { valueAsNumber: true })}
                                className="mt-1"
                            />
                            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="reviews">Number of Reviews</Label>
                            <Input
                                id="reviews"
                                type="number"
                                min="0"
                                {...register("reviews", { valueAsNumber: true })}
                                className="mt-1"
                            />
                            {errors.reviews && <p className="text-red-500 text-sm mt-1">{errors.reviews.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch id="inStock" checked={inStock} onCheckedChange={(checked) => setValue("inStock", checked)} />
                        <Label htmlFor="inStock">In Stock</Label>
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            rows={4}
                            className="mt-1"
                            placeholder="Enter product description..."
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={uploading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={uploading}>
                            {uploading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {product ? "Updating..." : "Creating..."}
                                </>
                            ) : product ? (
                                "Update Product"
                            ) : (
                                "Create Product"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
