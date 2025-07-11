import { type NextRequest, NextResponse } from "next/server"
import { uploadToCloudinary, uploadMultipleToCloudinary } from "@/lib/cloudinary"

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

export async function POST(request: NextRequest) {
    try {
        const isAdmin = await checkAdminAccess(request)
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData()
        const files = formData.getAll("files") as File[]
        const folder = (formData.get("folder") as string) || "shopease/products"

        if (files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 })
        }

        if (files.length === 1) {
            const result = await uploadToCloudinary(files[0], folder)
            return NextResponse.json({ success: true, result })
        } else {
            const results = await uploadMultipleToCloudinary(files, folder)
            return NextResponse.json({ success: true, results })
        }
    } catch (error) {
        console.error("Error in POST /api/admin/upload:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
