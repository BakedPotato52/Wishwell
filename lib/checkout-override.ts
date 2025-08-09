export type CheckoutItem = {
    id: string
    product: { id: string; name: string; price: number; image?: string }
    quantity: number
}

export type CheckoutOverride = {
    items: CheckoutItem[]
    returnTo?: string
    createdAt: number
}

const KEY = "checkout-override:v1"

export function setCheckoutOverride(payload: CheckoutOverride) {
    if (typeof window === "undefined") return
    sessionStorage.setItem(KEY, JSON.stringify(payload))
}

export function getCheckoutOverride(): CheckoutOverride | null {
    if (typeof window === "undefined") return null
    try {
        const raw = sessionStorage.getItem(KEY)
        if (!raw) return null
        const data = JSON.parse(raw) as CheckoutOverride
        return data
    } catch {
        return null
    }
}

export function clearCheckoutOverride() {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(KEY)
}

export function computeSubtotal(items: CheckoutItem[]) {
    return items.reduce((sum, it) => sum + (it.product.price || 0) * it.quantity, 0)
}

// Helper to convert checkout items to proper CartItem format for orders
export function convertToCartItems(items: CheckoutItem[]): any[] {
    return items.map((item) => ({
        id: item.id,
        product: {
            id: item.product.id,
            name: item.product.name,
            description: "", // Required field, use empty string as default
            price: item.product.price,
            image: item.product.image || "",
            images: item.product.image ? [item.product.image] : [],
            category: "general", // Required field, use default
            subcategory: "general", // Required field, use default
            inStock: true, // Required field, assume in stock
            rating: 0, // Required field, use default
            reviews: 0, // Required field, use default
            createdAt: new Date(),
            updatedAt: new Date(),
            // Enhanced product fields for compatibility
            basePrice: item.product.price,
            quantity: item.quantity,
        },
        quantity: item.quantity,
        selectedAttributes: null,
        variantId: null,
        addedAt: new Date(),
        updatedAt: new Date(),
    }))
}
