"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { cn } from "@/lib/utils"
import type { UnifiedProduct } from "@/lib/types"

interface WishlistButtonProps {
    product: UnifiedProduct
    selectedAttributes?: Record<string, string>
    variantId?: string
    className?: string
    size?: "sm" | "default" | "lg"
    showText?: boolean
}

export function WishlistButton({
    product,
    selectedAttributes,
    variantId,
    className,
    size = "default",
    showText = false,
}: WishlistButtonProps) {
    const { addItem, removeItem, checkIsInWishlist } = useWishlist()
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const checkWishlistStatus = async () => {
            const inWishlist = await checkIsInWishlist(product.id, variantId)
            setIsInWishlist(inWishlist)
        }

        checkWishlistStatus()
    }, [product.id, variantId, checkIsInWishlist])

    const handleToggleWishlist = async () => {
        setLoading(true)
        try {
            if (isInWishlist) {
                const itemId = variantId ? `${product.id}_${variantId}` : product.id
                await removeItem(itemId)
                setIsInWishlist(false)
            } else {
                await addItem(product, { selectedAttributes, variantId })
                setIsInWishlist(true)
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant={isInWishlist ? "default" : "outline"}
            size={size}
            onClick={handleToggleWishlist}
            disabled={loading}
            className={cn("transition-colors", isInWishlist && "bg-red-500 hover:bg-red-600 text-white", className)}
        >
            <Heart className={cn("h-4 w-4", showText && "mr-2", isInWishlist && "fill-current")} />
            {showText && (isInWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
        </Button>
    )
}
