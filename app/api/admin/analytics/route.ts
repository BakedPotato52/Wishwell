import { type NextRequest, NextResponse } from "next/server"
import { adminGetAnalytics } from "@/lib/firebase/admin"

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

export async function GET(request: NextRequest) {
    try {
        const isAdmin = await checkAdminAccess(request)
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("endDate")

        if (!startDate || !endDate) {
            return NextResponse.json({ error: "Start date and end date are required" }, { status: 400 })
        }

        const analytics = await adminGetAnalytics({
            start: new Date(startDate),
            end: new Date(endDate),
        })

        return NextResponse.json(analytics)
    } catch (error) {
        console.error("Error in GET /api/admin/analytics:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
