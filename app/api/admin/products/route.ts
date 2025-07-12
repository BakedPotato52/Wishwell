import { type NextRequest, NextResponse } from "next/server"
import { adminGetProducts, adminCreateProduct, adminBulkCreateProducts } from "@/lib/firebase/admin"

// Middleware to check admin access
async function checkAdminAccess(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            return false
        }

        const token = authHeader.split("Bearer ")[1]
        // In a real app, verify the token and check admin role
        // For now, we'll use a simple check
        return token === process.env.ADMIN_SECRET_TOKEN
    } catch (error) {
        return false
    }
}

export async function GET(request: NextRequest) {
    try {
        const isAdmin = await checkAdminAccess(request)
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const pageSize = Number.parseInt(searchParams.get("pageSize") || "20")
        const category = searchParams.get("category") || undefined
        const inStock = searchParams.get("inStock") ? searchParams.get("inStock") === "true" : undefined
        const searchTerm = searchParams.get("search") || undefined

        const result = await adminGetProducts(pageSize, null, {
            category,
            inStock,
            searchTerm,
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error("Error in GET /api/admin/products:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json()

        if (Array.isArray(body.products)) {
            // Bulk create
            const productIds = await adminBulkCreateProducts(body.products)
            return NextResponse.json({ success: true, productIds })
        } else {
            // Single create
            const productId = await adminCreateProduct(body)
            return NextResponse.json({ success: true, productId })
        }
    } catch (error) {
        console.error("Error in POST /api/admin/products:", error)
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}