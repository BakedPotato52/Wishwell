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
        const folder = (formData.get("folder") as string) || "wishwell/products"

        if (files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 })
        }

        // Validate file types
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        const invalidFiles = files.filter((file) => !allowedTypes.includes(file.type))

        if (invalidFiles.length > 0) {
            return NextResponse.json(
                {
                    error: `Invalid file types: ${invalidFiles.map((f) => f.name).join(", ")}. Only JPEG, PNG, and WebP are allowed.`,
                },
                { status: 400 },
            )
        }

        // Check file sizes (max 10MB per file)
        const maxSize = 10 * 1024 * 1024 // 10MB
        const oversizedFiles = files.filter((file) => file.size > maxSize)

        if (oversizedFiles.length > 0) {
            return NextResponse.json(
                {
                    error: `Files too large: ${oversizedFiles.map((f) => f.name).join(", ")}. Maximum size is 10MB per file.`,
                },
                { status: 400 },
            )
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
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 },
        )
    }
}
