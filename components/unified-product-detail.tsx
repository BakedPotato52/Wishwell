"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Minus, Plus, Heart, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UnifiedProduct } from "@/lib/types"
import { isEnhancedProduct, getCurrentPrice, getStockStatus, getCurrentVariant } from "@/utils/product-migration"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface UnifiedProductDetailProps {
    product: UnifiedProduct
}

export default function UnifiedProductDetail({ product }: UnifiedProductDetailProps) {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
    const [quantity, setQuantity] = useState(1)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    // Get current price, stock, and variant based on product type and selected attributes
    const currentPrice = useMemo(() => getCurrentPrice(product, selectedAttributes), [product, selectedAttributes])
    const stockStatus = useMemo(() => getStockStatus(product, selectedAttributes), [product, selectedAttributes])
    const currentVariant = useMemo(() => {
        if (isEnhancedProduct(product)) {
            return getCurrentVariant(product, selectedAttributes)
        }
        return null
    }, [product, selectedAttributes])

    // Get product images
    const productImages = useMemo(() => {
        if (isEnhancedProduct(product)) {
            // Use variant images if available, otherwise product images
            const variantImages = currentVariant?.images
            if (variantImages && variantImages.length > 0) {
                return variantImages
            }
            return product.images || [product.image]
        }
        return product.images || [product.image]
    }, [product, currentVariant])

    // Handle attribute selection
    const handleAttributeChange = (attributeId: string, value: string) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attributeId]: value,
        }))
    }

    // Render attribute selector based on type
    const renderAttributeSelector = (attribute: any) => {
        const selectedValue = selectedAttributes[attribute.attributeId] || ""

        switch (attribute.type) {
            case "select":
                if (attribute.name.toLowerCase().includes("size") || attribute.name.toLowerCase().includes("color")) {
                    return (
                        <div key={attribute.attributeId} className="space-y-3">
                            <Label className="text-base font-medium">{attribute.name}</Label>
                            <RadioGroup
                                value={selectedValue}
                                onValueChange={(value) => handleAttributeChange(attribute.attributeId, value)}
                                className="flex flex-wrap gap-2"
                            >
                                {attribute.values.map((option: any) => (
                                    <div key={option.id} className="flex items-center">
                                        <RadioGroupItem
                                            value={option.value}
                                            id={`${attribute.attributeId}-${option.id}`}
                                            className="sr-only"
                                        />
                                        <Label
                                            htmlFor={`${attribute.attributeId}-${option.id}`}
                                            className={`
                        cursor-pointer rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors
                        ${selectedValue === option.value
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                                }
                      `}
                                        >
                                            {option.displayName}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )
                } else {
                    return (
                        <div key={attribute.attributeId} className="space-y-3">
                            <Label className="text-base font-medium">{attribute.name}</Label>
                            <Select
                                value={selectedValue}
                                onValueChange={(value) => handleAttributeChange(attribute.attributeId, value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={`Select ${attribute.name}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {attribute.values.map((option: any) => (
                                        <SelectItem key={option.id} value={option.value}>
                                            {option.displayName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )
                }

            default:
                return null
        }
    }

    // Render legacy product size/color selectors
    const renderLegacySelectors = () => {
        if (isEnhancedProduct(product)) return null

        return (
            <>
                {product.sizes && product.sizes.length > 0 && (
                    <div className="space-y-3">
                        <Label className="text-base font-medium">Size</Label>
                        <RadioGroup
                            value={selectedAttributes.size || ""}
                            onValueChange={(value) => handleAttributeChange("size", value)}
                            className="flex flex-wrap gap-2"
                        >
                            {product.sizes.map((size) => (
                                <div key={size} className="flex items-center">
                                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                                    <Label
                                        htmlFor={`size-${size}`}
                                        className={`
                      cursor-pointer rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors
                      ${selectedAttributes.size === size
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                            }
                    `}
                                    >
                                        {size}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )}

                {product.colors && product.colors.length > 0 && (
                    <div className="space-y-3">
                        <Label className="text-base font-medium">Color</Label>
                        <RadioGroup
                            value={selectedAttributes.color || ""}
                            onValueChange={(value) => handleAttributeChange("color", value)}
                            className="flex flex-wrap gap-2"
                        >
                            {product.colors.map((color) => (
                                <div key={color} className="flex items-center">
                                    <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                                    <Label
                                        htmlFor={`color-${color}`}
                                        className={`
                      cursor-pointer rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors
                      ${selectedAttributes.color === color
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                            }
                    `}
                                    >
                                        {color}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )}
            </>
        )
    }

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center mb-6">
                <Link href="/">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Products
                    </Button>
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square overflow-hidden rounded-lg border">
                        <Image
                            src={productImages[selectedImageIndex] || "/placeholder.svg?height=600&width=600"}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    {productImages.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`
                    flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors
                    ${selectedImageIndex === index ? "border-primary" : "border-transparent"}
                  `}
                                >
                                    <Image
                                        src={image || "/placeholder.svg?height=100&width=100"}
                                        alt={`${product.name} ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="h-20 w-20 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Product Details */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-muted-foreground mb-4">{product.description}</p>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="text-3xl font-bold text-primary">₹{currentPrice.toLocaleString()}</div>
                            {currentVariant?.compareAtPrice && currentVariant.compareAtPrice > currentPrice && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg text-muted-foreground line-through">
                                        ₹{currentVariant.compareAtPrice.toLocaleString()}
                                    </span>
                                    <Badge variant="destructive">
                                        {Math.round(((currentVariant.compareAtPrice - currentPrice) / currentVariant.compareAtPrice) * 100)}
                                        % OFF
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {stockStatus.inStock ? (
                                <Badge className="bg-green-100 text-green-800">In Stock ({stockStatus.quantity} available)</Badge>
                            ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                            )}
                        </div>
                    </div>

                    {/* Product Attributes */}
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {/* Enhanced product attributes */}
                            {isEnhancedProduct(product) && product.attributes && product.attributes.map(renderAttributeSelector)}

                            {/* Legacy product selectors */}
                            {renderLegacySelectors()}

                            {/* Quantity Selector */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium">Quantity</Label>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="px-4 py-2 border rounded text-center min-w-[60px]">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={stockStatus.quantity > 0 ? quantity >= stockStatus.quantity : false}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <AddToCartButton
                                    product={product}
                                    selectedAttributes={selectedAttributes}
                                    quantity={quantity}
                                    className="w-full"
                                    size="lg"
                                    disabled={!stockStatus.inStock}
                                    showText={true}
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" size="lg">
                                        <Heart className="h-5 w-5 mr-2" />
                                        Wishlist
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-2">
                                    <Truck className="h-6 w-6 mx-auto text-primary" />
                                    <div className="text-sm font-medium">Free Delivery</div>
                                    <div className="text-xs text-muted-foreground">On orders above ₹499</div>
                                </div>
                                <div className="space-y-2">
                                    <RotateCcw className="h-6 w-6 mx-auto text-primary" />
                                    <div className="text-sm font-medium">Easy Returns</div>
                                    <div className="text-xs text-muted-foreground">7 days return policy</div>
                                </div>
                                <div className="space-y-2">
                                    <Shield className="h-6 w-6 mx-auto text-primary" />
                                    <div className="text-sm font-medium">Secure Payment</div>
                                    <div className="text-xs text-muted-foreground">100% secure checkout</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="prose max-w-none">
                                    <p>{product.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {/* Enhanced product specifications */}
                                    {isEnhancedProduct(product) &&
                                        product.attributes &&
                                        product.attributes.map((attr) => (
                                            <div key={attr.attributeId} className="flex justify-between py-2 border-b">
                                                <span className="font-medium">{attr.name}</span>
                                                <span className="text-muted-foreground">
                                                    {attr.values.map((v) => v.displayName).join(", ")}
                                                </span>
                                            </div>
                                        ))}

                                    {/* Legacy product specifications */}
                                    {!isEnhancedProduct(product) && (
                                        <>
                                            {product.sizes && (
                                                <div className="flex justify-between py-2 border-b">
                                                    <span className="font-medium">Available Sizes</span>
                                                    <span className="text-muted-foreground">{product.sizes.join(", ")}</span>
                                                </div>
                                            )}
                                            {product.colors && (
                                                <div className="flex justify-between py-2 border-b">
                                                    <span className="font-medium">Available Colors</span>
                                                    <span className="text-muted-foreground">{product.colors.join(", ")}</span>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="flex justify-between py-2 border-b">
                                        <span className="font-medium">Category</span>
                                        <span className="text-muted-foreground">{product.category}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="font-medium">Subcategory</span>
                                        <span className="text-muted-foreground">{product.subcategory}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">Reviews coming soon...</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="shipping" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">Shipping Information</h3>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Free shipping on orders above ₹499</li>
                                            <li>• Standard delivery: 3-5 business days</li>
                                            <li>• Express delivery: 1-2 business days (additional charges apply)</li>
                                            <li>• Cash on delivery available</li>
                                        </ul>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="font-semibold mb-2">Return Policy</h3>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• 7-day return policy</li>
                                            <li>• Items must be in original condition</li>
                                            <li>• Free return pickup available</li>
                                            <li>• Refund processed within 5-7 business days</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
