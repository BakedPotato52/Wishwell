"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingCart, Edit3, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useWishlist } from "@/contexts/wishlist-context"
import type { WishlistItem } from "@/lib/types"
import { getCurrentPrice, getStockStatus } from "@/utils/product-migration"

interface WishlistItemCardProps {
    item: WishlistItem
}

export function WishlistItemCard({ item }: WishlistItemCardProps) {
    const { removeItem, moveItemToCart, updateItemNotes } = useWishlist()
    const [isEditingNotes, setIsEditingNotes] = useState(false)
    const [notes, setNotes] = useState(item.notes || "")
    const [loading, setLoading] = useState(false)

    const currentPrice = getCurrentPrice(item.product, item.selectedAttributes || {})
    const stockStatus = getStockStatus(item.product, item.selectedAttributes || {})

    const handleRemove = async () => {
        setLoading(true)
        try {
            await removeItem(item.id)
        } catch (error) {
            console.error("Error removing item:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleMoveToCart = async () => {
        setLoading(true)
        try {
            await moveItemToCart(item.id)
        } catch (error) {
            console.error("Error moving to cart:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveNotes = async () => {
        try {
            await updateItemNotes(item.id, notes)
            setIsEditingNotes(false)
        } catch (error) {
            console.error("Error saving notes:", error)
        }
    }

    const handleCancelNotes = () => {
        setNotes(item.notes || "")
        setIsEditingNotes(false)
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                            src={item.product.image || "/placeholder.svg?height=96&width=96"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                            <Link href={`/products/${item.product.id}`} className="font-semibold text-sm hover:text-primary truncate">
                                {item.product.name}
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRemove}
                                disabled={loading}
                                className="text-red-500 hover:text-red-700 p-1"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.product.description}</p>

                        {/* Selected Attributes */}
                        {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {Object.entries(item.selectedAttributes).map(([key, value]) => (
                                    <Badge key={key} variant="secondary" className="text-xs">
                                        {key}: {value}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Price and Stock */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-lg font-bold text-primary">₹{currentPrice.toLocaleString()}</div>
                            <Badge variant={stockStatus.inStock ? "default" : "destructive"} className="text-xs">
                                {stockStatus.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                        </div>

                        {/* Notes Section */}
                        <div className="mb-3">
                            {isEditingNotes ? (
                                <div className="space-y-2">
                                    <Textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add notes about this item..."
                                        className="text-sm"
                                        rows={2}
                                    />
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={handleSaveNotes}>
                                            <Check className="h-3 w-3 mr-1" />
                                            Save
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={handleCancelNotes}>
                                            <X className="h-3 w-3 mr-1" />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start gap-2">
                                    <div className="flex-1">
                                        {item.notes ? (
                                            <p className="text-sm text-muted-foreground italic">"{item.notes}"</p>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No notes added</p>
                                        )}
                                    </div>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingNotes(true)} className="p-1">
                                        <Edit3 className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={handleMoveToCart}
                                disabled={!stockStatus.inStock || loading}
                                className="flex-1"
                            >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
