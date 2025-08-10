"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    subscribeToWishlist,
    clearWishlist,
    moveToCart,
    createSharedWishlist,
    updateWishlistItemNotes,
} from "@/lib/firebase/wishlist"
import type { WishlistItem, UnifiedProduct } from "@/lib/types"
import { toast } from "sonner"
import { useAuth } from "./auth-context"

interface WishlistContextType {
    items: WishlistItem[]
    loading: boolean
    addItem: (
        product: UnifiedProduct,
        options?: {
            selectedAttributes?: Record<string, string>
            variantId?: string
            notes?: string
        },
    ) => Promise<void>
    removeItem: (itemId: string) => Promise<void>
    checkIsInWishlist: (productId: string, variantId?: string) => Promise<boolean>
    clearAll: () => Promise<void>
    moveItemToCart: (itemId: string) => Promise<void>
    shareWishlist: (name: string, description?: string, isPublic?: boolean) => Promise<string>
    updateItemNotes: (itemId: string, notes: string) => Promise<void>
    itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const { firebaseUser } = useAuth()
    const [items, setItems] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!firebaseUser?.uid) {
            setItems([])
            setLoading(false)
            return
        }

        setLoading(true)

        // Subscribe to real-time wishlist updates
        const unsubscribe = subscribeToWishlist(firebaseUser.uid, (wishlistItems) => {
            setItems(wishlistItems)
            setLoading(false)
        })

        return unsubscribe
    }, [firebaseUser?.uid])

    const addItem = async (
        product: UnifiedProduct,
        options?: {
            selectedAttributes?: Record<string, string>
            variantId?: string
            notes?: string
        },
    ) => {
        if (!firebaseUser?.uid) {
            toast.error("Please sign in to add items to wishlist")
            return
        }

        try {
            await addToWishlist(firebaseUser.uid, product, options)
            toast.success("Added to wishlist")
        } catch (error) {
            console.error("Error adding to wishlist:", error)
            toast.error("Failed to add to wishlist")
        }
    }

    const removeItem = async (itemId: string) => {
        if (!firebaseUser?.uid) return

        try {
            await removeFromWishlist(firebaseUser.uid, itemId)
            toast.success("Removed from wishlist")
        } catch (error) {
            console.error("Error removing from wishlist:", error)
            toast.error("Failed to remove from wishlist")
        }
    }

    const checkIsInWishlist = async (productId: string, variantId?: string): Promise<boolean> => {
        if (!firebaseUser?.uid) return false
        return await isInWishlist(firebaseUser.uid, productId, variantId)
    }

    const clearAll = async () => {
        if (!firebaseUser?.uid) return

        try {
            await clearWishlist(firebaseUser.uid)
            toast.success("Wishlist cleared")
        } catch (error) {
            console.error("Error clearing wishlist:", error)
            toast.error("Failed to clear wishlist")
        }
    }

    const moveItemToCart = async (itemId: string) => {
        if (!firebaseUser?.uid) return

        try {
            await moveToCart(firebaseUser.uid, itemId)
            toast.success("Moved to cart")
        } catch (error) {
            console.error("Error moving to cart:", error)
            toast.error("Failed to move to cart")
        }
    }

    const shareWishlist = async (name: string, description?: string, isPublic = false): Promise<string> => {
        if (!firebaseUser?.uid) throw new Error("firebaseUser not authenticated")

        try {
            const shareToken = await createSharedWishlist(firebaseUser.uid, name, description, isPublic)
            toast.success("Wishlist shared successfully")
            return shareToken
        } catch (error) {
            console.error("Error sharing wishlist:", error)
            toast.error("Failed to share wishlist")
            throw error
        }
    }

    const updateItemNotes = async (itemId: string, notes: string) => {
        if (!firebaseUser?.uid) return

        try {
            await updateWishlistItemNotes(firebaseUser.uid, itemId, notes)
            toast.success("Notes updated")
        } catch (error) {
            console.error("Error updating notes:", error)
            toast.error("Failed to update notes")
        }
    }

    return (
        <WishlistContext.Provider
            value={{
                items,
                loading,
                addItem,
                removeItem,
                checkIsInWishlist,
                clearAll,
                moveItemToCart,
                shareWishlist,
                updateItemNotes,
                itemCount: items.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}
