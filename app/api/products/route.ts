import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/firebase/firestore"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category") || undefined

        let products
        if (category) {
            const { getProductsByCategory } = await import("@/lib/firebase/firestore")
            products = await getProductsByCategory(category)
        } else {
            products = await getProducts()
        }

        return NextResponse.json({ products })
    } catch (error) {
        console.error("Error in GET /api/products:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
