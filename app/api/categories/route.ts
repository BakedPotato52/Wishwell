import { NextResponse } from "next/server"
import { adminGetCategories } from "@/lib/firebase/admin"

export async function GET() {
    try {
        const categories = await adminGetCategories()
        return NextResponse.json({ categories })
    } catch (error) {
        console.error("Error in GET /api/categories:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
