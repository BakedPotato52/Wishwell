import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    writeBatch,
} from "firebase/firestore"
import { db } from "./config"
import type { UnifiedProduct } from "@/lib/types"
import type { WishlistItem, SharedWishlist } from "@/lib/types"


// Add item to wishlist
export const addToWishlist = async (
    userId: string,
    product: UnifiedProduct,
    options?: {
        selectedAttributes?: Record<string, string>
        variantId?: string
        notes?: string
    },
): Promise<void> => {
    try {
        const wishlistItemId = options?.variantId ? `${product.id}_${options.variantId}` : product.id
        const wishlistItemRef = doc(db, "users", userId, "wishlist", wishlistItemId)

        const wishlistItem: WishlistItem = {
            id: wishlistItemId,
            userId,
            product,
            addedAt: serverTimestamp(),
            selectedAttributes: options?.selectedAttributes,
            variantId: options?.variantId,
            notes: options?.notes,
        }

        await setDoc(wishlistItemRef, wishlistItem)
    } catch (error) {
        console.error("Error adding to wishlist:", error)
        throw error
    }
}

// Remove item from wishlist
export const removeFromWishlist = async (userId: string, itemId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "users", userId, "wishlist", itemId))
    } catch (error) {
        console.error("Error removing from wishlist:", error)
        throw error
    }
}

// Get user's wishlist
export const getUserWishlist = async (userId: string): Promise<WishlistItem[]> => {
    try {
        const wishlistRef = collection(db, "users", userId, "wishlist")
        const snapshot = await getDocs(query(wishlistRef, orderBy("addedAt", "desc")))

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as WishlistItem[]
    } catch (error) {
        console.error("Error fetching wishlist:", error)
        return []
    }
}

// Check if item is in wishlist
export const isInWishlist = async (userId: string, productId: string, variantId?: string): Promise<boolean> => {
    try {
        const itemId = variantId ? `${productId}_${variantId}` : productId
        const wishlistItemRef = doc(db, "users", userId, "wishlist", itemId)
        const docSnap = await getDoc(wishlistItemRef)
        return docSnap.exists()
    } catch (error) {
        console.error("Error checking wishlist:", error)
        return false
    }
}

// Real-time wishlist listener
export const subscribeToWishlist = (userId: string, callback: (items: WishlistItem[]) => void) => {
    const wishlistRef = collection(db, "users", userId, "wishlist")

    return onSnapshot(
        query(wishlistRef, orderBy("addedAt", "desc")),
        (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as WishlistItem[]

            callback(items)
        },
        (error) => {
            console.error("Error listening to wishlist changes:", error)
        },
    )
}

// Clear entire wishlist
export const clearWishlist = async (userId: string): Promise<void> => {
    try {
        const wishlistRef = collection(db, "users", userId, "wishlist")
        const snapshot = await getDocs(wishlistRef)

        const batch = writeBatch(db)
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()
    } catch (error) {
        console.error("Error clearing wishlist:", error)
        throw error
    }
}

// Move wishlist item to cart
export const moveToCart = async (userId: string, wishlistItemId: string): Promise<void> => {
    try {
        const wishlistItemRef = doc(db, "users", userId, "wishlist", wishlistItemId)
        const wishlistItem = await getDoc(wishlistItemRef)

        if (!wishlistItem.exists()) {
            throw new Error("Wishlist item not found")
        }

        const item = wishlistItem.data() as WishlistItem

        // Add to cart (assuming you have this function from your existing code)
        const { addToCart } = await import("./firestore")
        await addToCart(userId, item.product, 1, {
            selectedAttributes: item.selectedAttributes || undefined,
            variantId: item.variantId || undefined,
        })

        // Remove from wishlist
        await deleteDoc(wishlistItemRef)
    } catch (error) {
        console.error("Error moving to cart:", error)
        throw error
    }
}

// Create shared wishlist
export const createSharedWishlist = async (
    userId: string,
    name: string,
    description?: string,
    isPublic = false,
): Promise<string> => {
    try {
        const shareToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const sharedWishlistRef = doc(collection(db, "sharedWishlists"))

        const userWishlist = await getUserWishlist(userId)

        const sharedWishlist: SharedWishlist = {
            id: sharedWishlistRef.id,
            userId,
            name,
            description,
            items: userWishlist,
            isPublic,
            shareToken,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }

        await setDoc(sharedWishlistRef, sharedWishlist)
        return shareToken
    } catch (error) {
        console.error("Error creating shared wishlist:", error)
        throw error
    }
}

// Get shared wishlist by token
export const getSharedWishlist = async (shareToken: string): Promise<SharedWishlist | null> => {
    try {
        const sharedWishlistsRef = collection(db, "sharedWishlists")
        const q = query(sharedWishlistsRef, where("shareToken", "==", shareToken))
        const snapshot = await getDocs(q)

        if (snapshot.empty) {
            return null
        }

        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as SharedWishlist
    } catch (error) {
        console.error("Error fetching shared wishlist:", error)
        return null
    }
}

// Update wishlist item notes
export const updateWishlistItemNotes = async (userId: string, itemId: string, notes: string): Promise<void> => {
    try {
        const wishlistItemRef = doc(db, "users", userId, "wishlist", itemId)
        await setDoc(wishlistItemRef, { notes, updatedAt: serverTimestamp() }, { merge: true })
    } catch (error) {
        console.error("Error updating wishlist item notes:", error)
        throw error
    }
}
