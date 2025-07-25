import type { Product, EnhancedProduct, ProductAttribute, ProductVariant, AttributeOption } from "@/lib/types"

// Convert legacy product to enhanced product
export function migrateProductToEnhanced(legacyProduct: Product): EnhancedProduct {
    const attributes: ProductAttribute[] = []
    const variants: ProductVariant[] = []

    // Convert sizes to size attribute
    if (legacyProduct.sizes && legacyProduct.sizes.length > 0) {
        const sizeOptions: AttributeOption[] = legacyProduct.sizes.map((size, index) => ({
            id: `size_${size.toLowerCase()}`,
            value: size,
            displayName: size,
        }))

        attributes.push({
            attributeId: "size",
            name: "Size",
            type: "select",
            values: sizeOptions,
            required: true,
        })
    }

    // Convert colors to color attribute
    if (legacyProduct.colors && legacyProduct.colors.length > 0) {
        const colorOptions: AttributeOption[] = legacyProduct.colors.map((color, index) => ({
            id: `color_${color.toLowerCase()}`,
            value: color,
            displayName: color,
        }))

        attributes.push({
            attributeId: "color",
            name: "Color",
            type: "select",
            values: colorOptions,
            required: true,
        })
    }

    // Generate variants from size and color combinations
    if (legacyProduct.sizes || legacyProduct.colors) {
        const sizes = legacyProduct.sizes || ["default"]
        const colors = legacyProduct.colors || ["default"]

        sizes.forEach((size) => {
            colors.forEach((color) => {
                const variantAttributes: Record<string, string> = {}
                if (legacyProduct.sizes) variantAttributes.size = size
                if (legacyProduct.colors) variantAttributes.color = color

                const variantId = `${legacyProduct.id}_${size}_${color}`.replace(/\s+/g, "_").toLowerCase()

                variants.push({
                    id: variantId,
                    sku: `${legacyProduct.id.toUpperCase()}-${size}-${color}`.replace(/\s+/g, "-"),
                    attributes: variantAttributes,
                    price: legacyProduct.price,
                    inventory: {
                        quantity: legacyProduct.quantity || 0,
                        trackQuantity: true,
                        allowBackorder: false,
                    },
                })
            })
        })
    } else {
        // Create a single default variant
        variants.push({
            id: `${legacyProduct.id}_default`,
            sku: `${legacyProduct.id.toUpperCase()}-DEFAULT`,
            attributes: {},
            price: legacyProduct.price,
            inventory: {
                quantity: legacyProduct.quantity || 0,
                trackQuantity: true,
                allowBackorder: false,
            },
        })
    }

    const enhancedProduct: EnhancedProduct = {
        ...legacyProduct,
        basePrice: legacyProduct.price,
        attributes,
        variants,
        isEnhanced: true,
        inventory: {
            trackQuantity: true,
            quantity: legacyProduct.quantity || 0,
            allowBackorder: false,
        },
        images: legacyProduct.images || [legacyProduct.image],
    }

    return enhancedProduct
}

// Get current variant for enhanced product
export function getCurrentVariant(
    product: EnhancedProduct,
    selectedAttributes: Record<string, string> = {},
): ProductVariant | null {
    if (!product.variants || product.variants.length === 0) return null

    // If no attributes selected, return first variant
    if (Object.keys(selectedAttributes).length === 0) {
        return product.variants[0]
    }

    // Find variant that matches selected attributes
    return (
        product.variants.find((variant) => {
            return Object.entries(selectedAttributes).every(([key, value]) => variant.attributes[key] === value)
        }) || product.variants[0]
    )
}

// Get current price for any product type
export function getCurrentPrice(
    product: Product | EnhancedProduct,
    selectedAttributes?: Record<string, string>,
): number {
    if (isEnhancedProduct(product)) {
        const variant = getCurrentVariant(product, selectedAttributes)
        return variant?.price || product.basePrice
    }
    return product.price
}

// Get current stock status for any product type
export function getStockStatus(
    product: Product | EnhancedProduct,
    selectedAttributes?: Record<string, string>,
): {
    inStock: boolean
    quantity: number
} {
    if (isEnhancedProduct(product)) {
        const variant = getCurrentVariant(product, selectedAttributes)
        return {
            inStock: variant ? variant.inventory.quantity > 0 : false,
            quantity: variant?.inventory.quantity || 0,
        }
    }
    return {
        inStock: product.inStock,
        quantity: product.quantity || 0,
    }
}

// Helper to check if product is enhanced
export function isEnhancedProduct(product: Product | EnhancedProduct): product is EnhancedProduct {
    return "isEnhanced" in product && product.isEnhanced === true
}
