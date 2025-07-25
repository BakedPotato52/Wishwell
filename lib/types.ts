import type { Timestamp, FieldValue } from "firebase/firestore"

// Legacy Product interface (keeping for backward compatibility)
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images?: string[]
  category: string
  subcategory: string
  subsubcategory?: string
  inStock: boolean
  sizes?: string[]
  colors?: string[]
  tags?: string[]
  quantity?: number
  rating: number
  reviews: number
  createdAt: Timestamp | FieldValue
  updatedAt: Timestamp | FieldValue
}

// Enhanced attribute system
export interface BaseAttribute {
  id: string
  name: string
  type: "select" | "multiselect" | "text" | "number" | "measurement"
  required: boolean
  displayOrder: number
}

export interface AttributeOption {
  id: string
  value: string
  displayName: string
  metadata?: Record<string, any>
}

export interface ProductAttribute {
  attributeId: string
  name: string
  type: BaseAttribute["type"]
  values: AttributeOption[]
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

// Enhanced Product interface that extends the legacy one
export interface EnhancedProduct extends Omit<Product, "price" | "inStock" | "quantity"> {
  // Enhanced fields
  basePrice: number
  attributes?: ProductAttribute[]
  variants?: ProductVariant[]

  // Computed fields for backward compatibility
  price: number // Will be basePrice or current variant price
  inStock: boolean // Computed from variants or legacy field
  quantity?: number // Computed from variants or legacy field

  // Additional enhanced fields
  inventory?: {
    trackQuantity: boolean
    quantity: number
    lowStockThreshold?: number
    allowBackorder: boolean
  }

  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }

  // Type discriminator
  isEnhanced?: boolean
}

// Union type for components that need to handle both
export type UnifiedProduct = Product | EnhancedProduct

// Type guards
export function isEnhancedProduct(product: UnifiedProduct): product is EnhancedProduct {
  return "isEnhanced" in product && product.isEnhanced === true
}

export function isLegacyProduct(product: UnifiedProduct): product is Product {
  return !isEnhancedProduct(product)
}

// Keep existing interfaces for compatibility
export interface CartItem {
  id: string
  product: UnifiedProduct
  quantity: number
  selectedAttributes?: Record<string, string> // For enhanced products
  variantId?: string // For enhanced products
  addedAt: Timestamp | FieldValue
  updatedAt: Timestamp | FieldValue
}

export interface FirebaseUser {
  uid: string
  email: string
  name: string
  phone: string
  whatsapp?: string
  gender: "Men" | "Women"
  address: string
  landmark?: string
  photoURL: string | null
  emailVerified: boolean
  createdAt: Timestamp | FieldValue
  updatedAt: Timestamp | FieldValue
  lastLoginAt?: Timestamp | FieldValue
  preferences: {
    notifications: boolean
    newsletter: boolean
  }
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  deliveryAddress: string
  paymentMethod?: string
  paymentStatus?: "pending" | "completed" | "failed"
  createdAt: Timestamp | FieldValue
  updatedAt: Timestamp | FieldValue
  estimatedDelivery?: Timestamp | FieldValue
}

export interface Category {
  id: string
  name: string
  image: string
  icon?: string
  subcategories?: string[]
  subsubcategories?: Record<string, string[]>
}

// Legacy types for compatibility
export interface User {
  id: string
  name: string
  email: string
  phone: string
  whatsapp?: string
  gender: "Men" | "Women"
  address: string
  landmark?: string
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
      id: "color",
      name: "Color",
      type: "select",
      required: true,
      displayOrder: 2,
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
  ],
}

// Predefined attribute options
export const ATTRIBUTE_OPTIONS: Record<string, AttributeOption[]> = {
  apparel_sizes: [
    { id: "xs", value: "XS", displayName: "Extra Small" },
    { id: "s", value: "S", displayName: "Small" },
    { id: "m", value: "M", displayName: "Medium" },
    { id: "l", value: "L", displayName: "Large" },
    { id: "xl", value: "XL", displayName: "Extra Large" },
    { id: "xxl", value: "XXL", displayName: "2X Large" },
    { id: "3xl", value: "3XL", displayName: "3X Large" },
  ],
  footwear_uk_sizes: Array.from({ length: 7 }, (_, i) => ({
    id: `uk_${i + 3}`,
    value: (i + 3).toString(),
    displayName: `UK ${i + 3}`,
  })),
  grocery_units: [
    { id: "g", value: "g", displayName: "Grams" },
    { id: "kg", value: "kg", displayName: "Kilograms" },
    { id: "pieces", value: "pieces", displayName: "Pieces" },
    { id: "ml", value: "ml", displayName: "Milliliters" },
    { id: "l", value: "l", displayName: "Liters" },
  ],
  colors: [
    { id: "black", value: "black", displayName: "Black" },
    { id: "white", value: "white", displayName: "White" },
    { id: "red", value: "red", displayName: "Red" },
    { id: "blue", value: "blue", displayName: "Blue" },
    { id: "green", value: "green", displayName: "Green" },
    { id: "yellow", value: "yellow", displayName: "Yellow" },
  ],
}
