import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface CloudinaryUploadResult {
    public_id: string
    secure_url: string
    width: number
    height: number
    format: string
    resource_type: string
}

export const uploadToCloudinary = async (file: File, folder = "wishwell"): Promise<CloudinaryUploadResult> => {
    try {
        // Validate Cloudinary configuration
        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            throw new Error("Cloudinary configuration is missing. Please check your environment variables.")
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder,
                        resource_type: "auto",
                        transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }, { format: "webp" }],
                        // Generate a unique filename
                        public_id: `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}`,
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error)
                            reject(new Error(`Cloudinary upload failed: ${error.message}`))
                        } else if (result) {
                            resolve(result as CloudinaryUploadResult)
                        } else {
                            reject(new Error("Upload failed: No result returned"))
                        }
                    },
                )
                .end(buffer)
        })
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error)
        throw error
    }
}

export const uploadMultipleToCloudinary = async (
    files: File[],
    folder = "wishwell",
): Promise<CloudinaryUploadResult[]> => {
    try {
        const uploadPromises = files.map((file) => uploadToCloudinary(file, folder))
        return await Promise.all(uploadPromises)
    } catch (error) {
        console.error("Error uploading multiple files to Cloudinary:", error)
        throw error
    }
}

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error)
        throw error
    }
}



export default cloudinary
