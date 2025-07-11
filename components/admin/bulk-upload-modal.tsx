"use client"

import { useState, useCallback } from "react"
import { Upload, Download, FileText, Loader2, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDropzone } from "react-dropzone"
import Papa from "papaparse"

interface BulkUploadModalProps {
    isOpen: boolean
    onClose: () => void
    onComplete: () => void
}

interface ParsedProduct {
    name: string
    description: string
    price: number
    category: string
    inStock: boolean
    rating: number
    reviews: number
    imageUrl?: string
}

interface UploadResult {
    success: boolean
    message: string
    productId?: string
}

export function BulkUploadModal({ isOpen, onClose, onComplete }: BulkUploadModalProps) {
    const [step, setStep] = useState<"upload" | "preview" | "processing" | "complete">("upload")
    const [csvFile, setCsvFile] = useState<File | null>(null)
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [parsedProducts, setParsedProducts] = useState<ParsedProduct[]>([])
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadResults, setUploadResults] = useState<UploadResult[]>([])
    const [errors, setErrors] = useState<string[]>([])

    const onDropCSV = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file && file.type === "text/csv") {
            setCsvFile(file)
            parseCSV(file)
        }
    }, [])

    const onDropImages = useCallback((acceptedFiles: File[]) => {
        setImageFiles(acceptedFiles)
    }, [])

    const {
        getRootProps: getCSVRootProps,
        getInputProps: getCSVInputProps,
        isDragActive: isCSVDragActive,
    } = useDropzone({
        onDrop: onDropCSV,
        accept: {
            "text/csv": [".csv"],
        },
        maxFiles: 1,
    })

    const {
        getRootProps: getImagesRootProps,
        getInputProps: getImagesInputProps,
        isDragActive: isImagesDragActive,
    } = useDropzone({
        onDrop: onDropImages,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        multiple: true,
    })

    const parseCSV = (file: File) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const products: ParsedProduct[] = []
                const parseErrors: string[] = []

                results.data.forEach((row: any, index: number) => {
                    try {
                        const product: ParsedProduct = {
                            name: row.name || "",
                            description: row.description || "",
                            price: Number.parseFloat(row.price) || 0,
                            category: row.category || "",
                            inStock: row.inStock === "true" || row.inStock === true,
                            rating: Number.parseFloat(row.rating) || 4.5,
                            reviews: Number.parseInt(row.reviews) || 0,
                            imageUrl: row.imageUrl || "",
                        }

                        // Validate required fields
                        if (!product.name || !product.description || !product.category || product.price <= 0) {
                            parseErrors.push(`Row ${index + 2}: Missing required fields`)
                        } else {
                            products.push(product)
                        }
                    } catch (error) {
                        parseErrors.push(`Row ${index + 2}: Invalid data format`)
                    }
                })

                setParsedProducts(products)
                setErrors(parseErrors)
                if (products.length > 0) {
                    setStep("preview")
                }
            },
            error: (error) => {
                setErrors([`CSV parsing error: ${error.message}`])
            },
        })
    }

    const uploadImages = async (): Promise<Record<string, string>> => {
        if (imageFiles.length === 0) return {}

        const formData = new FormData()
        imageFiles.forEach((file) => {
            formData.append("files", file)
        })
        formData.append("folder", "shopease/products")

        const response = await fetch("/api/admin/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
            },
            body: formData,
        })

        if (!response.ok) {
            throw new Error("Failed to upload images")
        }

        const data = await response.json()
        const imageMap: Record<string, string> = {}

        if (Array.isArray(data.results)) {
            data.results.forEach((result: any, index: number) => {
                const fileName = imageFiles[index].name.split(".")[0].toLowerCase()
                imageMap[fileName] = result.secure_url
            })
        }

        return imageMap
    }

    const processUpload = async () => {
        try {
            setStep("processing")
            setUploadProgress(0)

            // Upload images first
            const imageMap = await uploadImages()
            setUploadProgress(20)

            // Prepare products with image URLs
            const productsToUpload = parsedProducts.map((product) => {
                const productNameKey = product.name.toLowerCase().replace(/\s+/g, "-")
                const imageUrl = product.imageUrl || imageMap[productNameKey] || "/placeholder.svg?height=300&width=300"

                return {
                    ...product,
                    image: imageUrl,
                }
            })

            setUploadProgress(40)

            // Bulk create products
            const response = await fetch("/api/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
                },
                body: JSON.stringify({ products: productsToUpload }),
            })

            setUploadProgress(80)

            if (response.ok) {
                const data = await response.json()
                const results: UploadResult[] = data.productIds.map((id: string, index: number) => ({
                    success: true,
                    message: `Product "${productsToUpload[index].name}" created successfully`,
                    productId: id,
                }))
                setUploadResults(results)
                setUploadProgress(100)
                setStep("complete")
            } else {
                throw new Error("Failed to create products")
            }
        } catch (error) {
            console.error("Error processing upload:", error)
            setErrors([`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`])
            setStep("preview")
        }
    }

    const downloadTemplate = () => {
        const template = [
            {
                name: "Sample Product",
                description: "This is a sample product description",
                price: 150,
                category: "Men",
                inStock: true,
                rating: 4.5,
                reviews: 100,
                imageUrl: "https://example.com/image.jpg",
            },
        ]

        const csv = Papa.unparse(template)
        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "product-template.csv"
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const resetModal = () => {
        setStep("upload")
        setCsvFile(null)
        setImageFiles([])
        setParsedProducts([])
        setUploadProgress(0)
        setUploadResults([])
        setErrors([])
    }

    const handleClose = () => {
        resetModal()
        onClose()
    }

    const handleComplete = () => {
        resetModal()
        onComplete()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Bulk Product Upload</DialogTitle>
                </DialogHeader>

                {step === "upload" && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <p className="text-gray-600 mb-4">
                                Upload products in bulk using a CSV file. You can also upload images to match with your products.
                            </p>
                            <Button onClick={downloadTemplate} variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download CSV Template
                            </Button>
                        </div>

                        {/* CSV Upload */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">1. Upload CSV File</h3>
                                <div
                                    {...getCSVRootProps()}
                                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isCSVDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <input {...getCSVInputProps()} />
                                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    {csvFile ? (
                                        <div>
                                            <p className="text-sm font-medium">{csvFile.name}</p>
                                            <p className="text-xs text-gray-500">CSV file selected</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {isCSVDragActive ? "Drop the CSV file here" : "Drag & drop a CSV file, or click to select"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Only .csv files are accepted</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Images Upload */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">2. Upload Product Images (Optional)</h3>
                                <div
                                    {...getImagesRootProps()}
                                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isImagesDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <input {...getImagesInputProps()} />
                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    {imageFiles.length > 0 ? (
                                        <div>
                                            <p className="text-sm font-medium">{imageFiles.length} images selected</p>
                                            <p className="text-xs text-gray-500">Images will be matched by filename</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {isImagesDragActive ? "Drop images here" : "Drag & drop images, or click to select"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Name images to match product names (e.g., "sample-product.jpg")
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {errors.length > 0 && (
                            <Card className="border-red-200 bg-red-50">
                                <CardContent className="p-4">
                                    <h4 className="text-red-800 font-medium mb-2">Errors:</h4>
                                    <ul className="text-red-700 text-sm space-y-1">
                                        {errors.map((error, index) => (
                                            <li key={index}>• {error}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {step === "preview" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Preview Products ({parsedProducts.length})</h3>
                            <Button onClick={() => setStep("upload")} variant="outline">
                                Back to Upload
                            </Button>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="text-left p-2">Name</th>
                                        <th className="text-left p-2">Category</th>
                                        <th className="text-left p-2">Price</th>
                                        <th className="text-left p-2">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parsedProducts.map((product, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-2">{product.name}</td>
                                            <td className="p-2">{product.category}</td>
                                            <td className="p-2">₹{product.price}</td>
                                            <td className="p-2">{product.inStock ? "In Stock" : "Out of Stock"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button onClick={handleClose} variant="outline">
                                Cancel
                            </Button>
                            <Button onClick={processUpload}>Upload {parsedProducts.length} Products</Button>
                        </div>
                    </div>
                )}

                {step === "processing" && (
                    <div className="space-y-6 text-center">
                        <div>
                            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Processing Upload</h3>
                            <p className="text-gray-600">Please wait while we upload your products...</p>
                        </div>

                        <div className="space-y-2">
                            <Progress value={uploadProgress} className="w-full" />
                            <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
                        </div>
                    </div>
                )}

                {step === "complete" && (
                    <div className="space-y-6 text-center">
                        <div>
                            <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Upload Complete!</h3>
                            <p className="text-gray-600">
                                Successfully uploaded {uploadResults.filter((r) => r.success).length} products
                            </p>
                        </div>

                        {uploadResults.some((r) => !r.success) && (
                            <Card className="border-red-200 bg-red-50">
                                <CardContent className="p-4">
                                    <h4 className="text-red-800 font-medium mb-2">Some uploads failed:</h4>
                                    <ul className="text-red-700 text-sm space-y-1">
                                        {uploadResults
                                            .filter((r) => !r.success)
                                            .map((result, index) => (
                                                <li key={index}>• {result.message}</li>
                                            ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        <Button onClick={handleComplete}>Done</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
