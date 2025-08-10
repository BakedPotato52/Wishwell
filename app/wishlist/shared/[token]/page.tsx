"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSharedWishlist } from "@/lib/firebase/wishlist"
import type { SharedWishlist } from "@/lib/types"
import { getCurrentPrice, getStockStatus } from "@/utils/product-migration"
import { toast } from "sonner"

export default function SharedWishlistPage() {
    const params = useParams()
    const token = params.token as string
    const [wishlist, setWishlist] = useState<SharedWishlist | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSharedWishlist = async () => {
            try {
                const sharedWishlist = await getSharedWishlist(token)
                if (!sharedWishlist) {
                    setError("Wishlist not found or no longer available")
                } else {
                    setWishlist(sharedWishlist)
                }
            } catch (err) {
                setError("Failed to load wishlist")
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchSharedWishlist()
        }
    }, [token])

    const handleShare = async () => {
        const shareUrl = window.location.href

        if (navigator.share) {
            try {
                await navigator.share({
                    title: wishlist?.name,
                    text: wishlist?.description,
                    url: shareUrl,
                })
            } catch (err) {
                // User cancelled sharing
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl)
                toast.success("Link copied to clipboard!")
            } catch (err) {
                toast.error("Failed to copy link")
            }
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        )
    }

    if (error || !wishlist) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Wishlist Not Found</h2>
                        <p className="text-muted-foreground text-center mb-6">
                            {error || "This wishlist may have been removed or the link is invalid"}
                        </p>
                        <Button asChild>
                            <Link href="/">Go to Homepage</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div>
                        <h1 className="text-3xl font-bold">{wishlist.name}</h1>
                        {wishlist.description && <p className="text-muted-foreground">{wishlist.description}</p>}
                        <p className="text-sm text-muted-foreground mt-1">
                            {wishlist.items.length} {wishlist.items.length === 1 ? "item" : "items"}
                        </p>
                    </div>
                </div>

                <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                </Button>
            </div>

            {/* Wishlist Items */}
            {wishlist.items.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold mb-2">This wishlist is empty</h2>
                        <p className="text-muted-foreground text-center">No items have been added to this wishlist yet</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {wishlist.items.map((item) => {
                        const currentPrice = getCurrentPrice(item.product, item.selectedAttributes || {})
                        const stockStatus = getStockStatus(item.product, item.selectedAttributes || {})

                        return (
                            <Card key={item.id} className="overflow-hidden">
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
                                                <Link
                                                    href={`/products/${item.product.id}`}
                                                    className="font-semibold text-sm hover:text-primary truncate"
                                                >
                                                    {item.product.name}
                                                </Link>
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

                                            {/* Notes */}
                                            {item.notes && <p className="text-sm text-muted-foreground italic mb-3">"{item.notes}"</p>}

                                            {/* Action Button */}
                                            <Button size="sm" disabled={!stockStatus.inStock} asChild>
                                                <Link href={`/products/${item.product.id}`}>
                                                    <ShoppingCart className="h-3 w-3 mr-1" />
                                                    View Product
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
