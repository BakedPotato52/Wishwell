"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/contexts/auth-context" // You'll need this for userId
import { cn } from "@/lib/utils"
import type { UnifiedProduct } from "@/lib/types"

interface WishlistButtonProps {
    product: UnifiedProduct
    selectedAttributes?: Record<string, string>
    variantId?: string
    className?: string
    size?: "sm" | "default" | "lg"
    showText?: boolean
    notes?: string
}

export function WishlistButton({
    product,
    selectedAttributes,
    variantId,
    className,
    size = "default",
    showText = false,
    notes,
}: WishlistButtonProps) {
    const { addItem, removeItem, checkIsInWishlist } = useWishlist()
    const { firebaseUser } = useAuth() // Get current user
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const checkWishlistStatus = async () => {
            if (firebaseUser?.uid) {
                const inWishlist = await checkIsInWishlist(product.id, variantId)
                setIsInWishlist(inWishlist)
            }
        }

        checkWishlistStatus()
    }, [product.id, variantId, checkIsInWishlist, firebaseUser?.uid])

    const handleToggleWishlist = async () => {
        if (!firebaseUser?.uid) return

        setLoading(true)
        try {
            if (isInWishlist) {
                const itemId = variantId ? `${product.id}_${variantId}` : product.id
                await removeItem(itemId)
                setIsInWishlist(false)
            } else {
                await addItem(product, {
                    selectedAttributes,
                    variantId,
                    ...(notes && { notes })
                })
                setIsInWishlist(true)
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error)
        } finally {
            setLoading(false)
        }
    }

    if (!firebaseUser?.uid) return (
        <Button
            variant="outline"
            size={size}
            disabled
            className={cn("transition-colors", isInWishlist && "bg-rose-500 hover:bg-rose-700 text-white", className)}
        >
            <Heart className={cn("h-4 w-4", showText && "mr-2", isInWishlist && "fill-current")} />
        </Button>
    )

    return (
        <Button
            variant={isInWishlist ? "default" : "outline"}
            size={size}
            onClick={handleToggleWishlist}
            disabled={loading}
            className={cn("transition-colors", isInWishlist && "bg-rose-500 hover:bg-rose-700 text-white", className)}
        >
            <Heart className={cn("h-4 w-4", showText && "mr-2", isInWishlist && "fill-current")} />
            {showText && (isInWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
        </Button>
    )
}
