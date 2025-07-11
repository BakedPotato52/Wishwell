import { v2 as cloudinary } from "cloudinary"

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

export const uploadToCloudinary = async (file: File, folder = "products"): Promise<CloudinaryUploadResult> => {
    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder,
                        resource_type: "auto",
                        transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }, { format: "webp" }],
                    },
                    (error, result) => {
                        if (error) {
                            reject(error)
                        } else if (result) {
                            resolve(result as CloudinaryUploadResult)
                        } else {
                            reject(new Error("Upload failed"))
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
    folder = "products",
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
