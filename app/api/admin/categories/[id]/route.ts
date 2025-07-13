import { type NextRequest, NextResponse } from "next/server"
import { adminUpdateCategory, adminDeleteCategory } from "@/lib/firebase/admin"
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
        await adminUpdateCategory(id, body)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error in PUT /api/admin/categories/[id]:", error)
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
        await adminDeleteCategory(id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error in DELETE /api/admin/categories/[id]:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

