// Enhanced product attribute system for different categories
export interface BaseAttribute {
    id: string
    name: string
    type: "select" | "multiselect" | "text" | "number" | "measurement"
    required: boolean
    displayOrder: number
}

export interface SelectAttribute extends BaseAttribute {
    type: "select" | "multiselect"
    options: AttributeOption[]
}

export interface MeasurementAttribute extends BaseAttribute {
    type: "measurement"
    unit: string
    minValue?: number
    maxValue?: number
    step?: number
}

export interface AttributeOption {
    id: string
    value: string
    displayName: string
    metadata?: Record<string, any>
}

// Apparel specific attributes
export interface ApparelSizes {
    standard: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL")[]
    measurements?: {
        chest?: number
        waist?: number
        hip?: number
        length?: number
        sleeve?: number
    }
}

// Footwear specific attributes
export interface FootwearSizes {
    uk: number[] // 3-9
    eu: number[] // 36-42
    us: number[] // 5-11
    measurements?: {
        length?: number // in cm
        width?: "Narrow" | "Regular" | "Wide"
    }
}

// Grocery specific attributes
export interface GroceryMeasurements {
    unit: "g" | "kg" | "pieces" | "ml" | "l" | "dozen" | "pack"
    quantity: number
    variants?: {
        unit: string
        quantity: number
        price: number
    }[]
}

// Enhanced Product interface
export interface EnhancedProduct {
    id: string
    name: string
    description: string
    basePrice: number
    category: string
    subcategory: string
    subsubcategory?: string

    // Enhanced attribute system
    attributes: ProductAttribute[]
    variants: ProductVariant[]

    // Media
    images: string[]
    videos?: string[]

    // Inventory
    inventory: InventoryInfo

    // SEO and metadata
    seo: {
        title?: string
        description?: string
        keywords?: string[]
    }

    // Ratings and reviews
    rating: number
    reviewCount: number

    // Timestamps
    createdAt: any
    updatedAt: any
}

export interface ProductAttribute {
    attributeId: string
    name: string
    type: BaseAttribute["type"]
    values: string[] | number[] | AttributeOption[]
    required: boolean
}

export interface ProductVariant {
    id: string
    sku: string
    attributes: Record<string, string | number>
    price: number
    compareAtPrice?: number
    inventory: {
        quantity: number
        trackQuantity: boolean
        allowBackorder: boolean
    }
    images?: string[]
    weight?: number
    dimensions?: {
        length: number
        width: number
        height: number
        unit: "cm" | "in"
    }
}

export interface InventoryInfo {
    trackQuantity: boolean
    quantity: number
    lowStockThreshold?: number
    allowBackorder: boolean
    locations?: {
        locationId: string
        quantity: number
    }[]
}

// Category-specific attribute templates
export const CATEGORY_ATTRIBUTES: Record<string, BaseAttribute[]> = {
    apparel: [
        {
            id: "size",
            name: "Size",
            type: "select",
            required: true,
            displayOrder: 1,
        },
        {
            id: "color",
            name: "Color",
            type: "select",
            required: true,
            displayOrder: 2,
        },
        {
            id: "material",
            name: "Material",
            type: "select",
            required: false,
            displayOrder: 3,
        },
        {
            id: "fit",
            name: "Fit",
            type: "select",
            required: false,
            displayOrder: 4,
        },
    ],
    footwear: [
        {
            id: "size_uk",
            name: "UK Size",
            type: "select",
            required: true,
            displayOrder: 1,
        },
        {
            id: "size_eu",
            name: "EU Size",
            type: "select",
            required: false,
            displayOrder: 2,
        },
        {
            id: "size_us",
            name: "US Size",
            type: "select",
            required: false,
            displayOrder: 3,
        },
        {
            id: "color",
            name: "Color",
            type: "select",
            required: true,
            displayOrder: 4,
        },
        {
            id: "width",
            name: "Width",
            type: "select",
            required: false,
            displayOrder: 5,
        },
    ],
    grocery: [
        {
            id: "weight",
            name: "Weight/Quantity",
            type: "measurement",
            required: true,
            displayOrder: 1,
        },
        {
            id: "unit",
            name: "Unit",
            type: "select",
            required: true,
            displayOrder: 2,
        },
        {
            id: "brand",
            name: "Brand",
            type: "select",
            required: false,
            displayOrder: 3,
        },
        {
            id: "expiry",
            name: "Expiry Date",
            type: "text",
            required: false,
            displayOrder: 4,
        },
    ],
}

// Predefined attribute options
export const ATTRIBUTE_OPTIONS: Record<string, AttributeOption[]> = {
    apparel_sizes: [
        { id: "xs", value: "XS", displayName: "XS" },
        { id: "s", value: "S", displayName: "S" },
        { id: "m", value: "M", displayName: "M" },
        { id: "l", value: "L", displayName: "L" },
        { id: "xl", value: "XL", displayName: "XL" },
        { id: "xxl", value: "XXL", displayName: "XXL" },
        { id: "3xl", value: "3XL", displayName: "3XL" },
    ],
    footwear_uk_sizes: Array.from({ length: 7 }, (_, i) => ({
        id: `uk_${i + 3}`,
        value: (i + 3).toString(),
        displayName: `UK ${i + 3}`,
    })),
    footwear_eu_sizes: Array.from({ length: 7 }, (_, i) => ({
        id: `eu_${i + 36}`,
        value: (i + 36).toString(),
        displayName: `EU ${i + 36}`,
    })),
    footwear_us_sizes: Array.from({ length: 7 }, (_, i) => ({
        id: `us_${i + 5}`,
        value: (i + 5).toString(),
        displayName: `US ${i + 5}`,
    })),
    grocery_units: [
        { id: "g", value: "g", displayName: "Grams" },
        { id: "kg", value: "kg", displayName: "Kilograms" },
        { id: "pieces", value: "pieces", displayName: "Pieces" },
        { id: "ml", value: "ml", displayName: "Milliliters" },
        { id: "l", value: "l", displayName: "Liters" },
        { id: "dozen", value: "dozen", displayName: "Dozen" },
        { id: "pack", value: "pack", displayName: "Pack" },
    ],
    colors: [
        { id: "black", value: "black", displayName: "Black" },
        { id: "white", value: "white", displayName: "White" },
        { id: "red", value: "red", displayName: "Red" },
        { id: "blue", value: "blue", displayName: "Blue" },
        { id: "green", value: "green", displayName: "Green" },
        { id: "yellow", value: "yellow", displayName: "Yellow" },
        { id: "pink", value: "pink", displayName: "Pink" },
        { id: "purple", value: "purple", displayName: "Purple" },
        { id: "orange", value: "orange", displayName: "Orange" },
        { id: "brown", value: "brown", displayName: "Brown" },
        { id: "grey", value: "grey", displayName: "Grey" },
        { id: "navy", value: "navy", displayName: "Navy Blue" },
    ],
}
