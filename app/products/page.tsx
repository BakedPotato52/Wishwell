import EnhancedProductDetail from "@/components/enhanced-product-detail"
import type { EnhancedProduct } from "@/types/product-attributes"

const DUMMY_PRODUCT: EnhancedProduct = {
    id: "1",
    name: "Sample Product",
    description: "This is a sample product description.",
    basePrice: 100,
    category: "apparel",
    subcategory: "shirts",
    attributes: [
        {
            attributeId: "size",
            name: "Size",
            type: "select",
            values: [
                { id: "s", value: "S", displayName: "Small" },
                { id: "m", value: "M", displayName: "Medium" },
            ],
            required: true,
        },
        {
            attributeId: "color",
            name: "Color",
            type: "select",
            values: [
                { id: "red", value: "red", displayName: "Red" },
                { id: "blue", value: "blue", displayName: "Blue" },
            ],
            required: true,
        },
    ],
    variants: [
        {
            id: "1-s-red",
            sku: "SP-S-RED",
            attributes: { size: "S", color: "red" },
            price: 110,
            inventory: { quantity: 10, trackQuantity: true, allowBackorder: false },
            images: [],
        },
        {
            id: "1-m-blue",
            sku: "SP-M-BLUE",
            attributes: { size: "M", color: "blue" },
            price: 120,
            inventory: { quantity: 5, trackQuantity: true, allowBackorder: true },
            images: [],
        },
    ],
    images: [
        "https://res.cloudinary.com/wishwell/image/upload/v1752476977/Menshirt1_uobrrv.jpg",
        "https://res.cloudinary.com/wishwell/image/upload/v1752476977/Menshirt2_n7quaw.jpg",
        "https://res.cloudinary.com/wishwell/image/upload/v1752476977/Menshirt3_dzo3zy.jpg",
    ],
    inventory: { trackQuantity: true, quantity: 15, allowBackorder: true },
    seo: { title: "Sample Product", description: "Sample product SEO", keywords: [] },
    rating: 4.5,
    reviewCount: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
}

export default function Page() {
    return (
        <div>
            <EnhancedProductDetail product={DUMMY_PRODUCT} />
        </div>
    )
}
