import { ATTRIBUTE_OPTIONS, CATEGORY_ATTRIBUTES } from "@/types/product-attributes"
import type { BaseAttribute, AttributeOption, EnhancedProduct } from "@/types/product-attributes"

// Helper function to get attributes for a specific category
export function getCategoryAttributes(category: string): BaseAttribute[] {
    const categoryKey = category.toLowerCase().replace(/\s+/g, "_")
    return CATEGORY_ATTRIBUTES[categoryKey] || []
}

// Helper function to get attribute options
export function getAttributeOptions(attributeId: string, category?: string): AttributeOption[] {
    // Category-specific options
    if (category) {
        const categoryKey = category.toLowerCase().replace(/\s+/g, "_")
        const optionKey = `${categoryKey}_${attributeId}`
        if (ATTRIBUTE_OPTIONS[optionKey]) {
            return ATTRIBUTE_OPTIONS[optionKey]
        }
    }

    // Generic options
    if (ATTRIBUTE_OPTIONS[attributeId]) {
        return ATTRIBUTE_OPTIONS[attributeId]
    }

    // Fallback for common attributes
    switch (attributeId) {
        case "size":
            return ATTRIBUTE_OPTIONS["apparel_sizes"]
        case "color":
            return ATTRIBUTE_OPTIONS["colors"]
        case "unit":
            return ATTRIBUTE_OPTIONS["grocery_units"]
        default:
            return []
    }
}

// Helper function to generate size options for footwear
export function generateFootwearSizes() {
    return {
        uk: Array.from({ length: 7 }, (_, i) => i + 3),
        eu: Array.from({ length: 7 }, (_, i) => i + 36),
        us: Array.from({ length: 7 }, (_, i) => i + 5),
    }
}

// Helper function to generate grocery measurement options
export function generateGroceryMeasurements(baseUnit: string, quantities: number[]) {
    return quantities.map((qty) => ({
        id: `${baseUnit}_${qty}`,
        value: `${qty}${baseUnit}`,
        displayName: `${qty} ${baseUnit}`,
        metadata: { quantity: qty, unit: baseUnit },
    }))
}

// Helper function to validate product attributes
export function validateProductAttributes(product: EnhancedProduct): string[] {
    const errors: string[] = []

    // Check required attributes
    const categoryAttributes = getCategoryAttributes(product.category)
    const requiredAttributes = categoryAttributes.filter((attr) => attr.required)

    for (const requiredAttr of requiredAttributes) {
        const productAttr = product.attributes.find((attr) => attr.attributeId === requiredAttr.id)
        if (!productAttr || !productAttr.values || productAttr.values.length === 0) {
            errors.push(`Missing required attribute: ${requiredAttr.name}`)
        }
    }

    // Validate variants have all required attributes
    for (const variant of product.variants) {
        for (const requiredAttr of requiredAttributes) {
            if (!variant.attributes[requiredAttr.id]) {
                errors.push(`Variant ${variant.sku} missing required attribute: ${requiredAttr.name}`)
            }
        }
    }

    return errors
}

// Helper function to generate SKU
export function generateSKU(product: EnhancedProduct, variantAttributes: Record<string, string>): string {
    const productCode = product.name.substring(0, 3).toUpperCase()
    const categoryCode = product.category.substring(0, 2).toUpperCase()
    const attributeCodes = Object.values(variantAttributes)
        .map((value) => value.substring(0, 2).toUpperCase())
        .join("")

    return `${productCode}-${categoryCode}-${attributeCodes}-${Date.now().toString().slice(-4)}`
}

// Helper function to calculate variant price based on attributes
export function calculateVariantPrice(
    basePrice: number,
    attributes: Record<string, string>,
    priceModifiers?: Record<string, Record<string, number>>,
): number {
    let finalPrice = basePrice

    if (priceModifiers) {
        for (const [attrId, attrValue] of Object.entries(attributes)) {
            if (priceModifiers[attrId] && priceModifiers[attrId][attrValue]) {
                finalPrice += priceModifiers[attrId][attrValue]
            }
        }
    }

    return Math.max(0, finalPrice)
}

// Helper function to format attribute display
export function formatAttributeDisplay(attributeId: string, value: string, category?: string): string {
    // Special formatting for specific attributes
    switch (attributeId) {
        case "size_uk":
            return `UK ${value}`
        case "size_eu":
            return `EU ${value}`
        case "size_us":
            return `US ${value}`
        case "weight":
            return `${value}g`
        case "volume":
            return `${value}ml`
        default:
            return value
    }
}
