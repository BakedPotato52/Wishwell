import { type NextRequest, NextResponse } from "next/server"
import { adminUpdateProduct, adminDeleteProduct } from "@/lib/firebase/admin"

async function checkAdminAccess(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            return false
        }

        const token = authHeader.split("Bearer ")[1]
        return token === process.env.ADMIN_SECRET_TOKEN
    } catch (error) {
        return false
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const isAdmin = await checkAdminAccess(request)
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        await adminUpdateProduct(id, body)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error in PUT /api/admin/products/[id]:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const isAdmin = await checkAdminAccess(request)
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        await adminDeleteProduct(id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error in DELETE /api/admin/products/[id]:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

