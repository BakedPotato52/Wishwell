"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getSubcategoryImage } from "@/lib/subcategoryImages"
import { categories } from "@/lib/categoryData"
import { PlaywriteStylizedText, StylizedText } from "./elements/animated-text"

// Get the Beauty & Personal Care category
const beautyCategory = categories.find((cat) => cat.name === "Beauty & Personal care")

export default function BeautyCategoryVertical() {
    // Create slug from subcategory name
    const createSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/,/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
    }

    // Get subcategory descriptions
    const getSubcategoryDescription = (subcategory: string) => {
        const descriptions: Record<string, string> = {
            Skincare: "Hypoallergenic | Paraben-free",
            Makeup: "Long-lasting | Professional quality",
            "Hair Care": "Strengthening | Color safe",
            Fragrances: "Premium | Long-lasting scents",
            "Bath & Body": "Moisturizing | Natural ingredients",
            "Oral Care": "Whitening | Fresh breath",
            Grooming: "Professional | Precision tools",
            "Baby Care": "Gentle | Pediatrician tested",
            "Protein & Supplements": "Nutritional | Health boosting",
            "Feminine Hygiene": "Comfortable | Reliable protection",
            "Sexual Wellness": "Safe | Discreet packaging",
            "Health & Pharma": "Trusted | Doctor recommended",
        }
        return descriptions[subcategory] || "Premium quality products"
    }

    if (!beautyCategory) {
        return <div>Category not found</div>
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-4 select-none">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    <span className="text-black">SHOP BY</span> <span className="italic text-black">Category</span>
                </h1>
                <p className="text-gray-600 text-lg mb-4">Trending categories on WishWell:</p>
                <StylizedText className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                    {beautyCategory.name}
                </StylizedText>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="relative">
                <div className="flex flex-row overflow-x-scroll scrollbar-hide gap-3 md:gap-6 pb-2">
                    {beautyCategory.subcategories?.map((subcategory, index) => {
                        const slug = createSlug(subcategory)
                        const imageUrl = getSubcategoryImage(subcategory, beautyCategory.name)
                        const description = getSubcategoryDescription(subcategory)

                        return (
                            <Card
                                key={index}
                                className="flex-shrink-0 w-80 md:w-96 overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-105 transform-gpu"
                            >
                                <CardContent className="p-0 h-full">
                                    <div className="flex flex-col h-full">
                                        {/* Image Section */}
                                        <div className="relative h-48 md:h-56 overflow-hidden">
                                            <Image
                                                src={imageUrl || "/placeholder.svg?height=200&width=300&query=beauty+products"}
                                                alt={subcategory}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110 z-10"
                                                sizes="400px"
                                                priority={index < 4}
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-rose-400 via-purple-200/20 to-transparent transition-opacity duration-300 group-hover:from-pink-500 group-hover:via-purple-300"></div>

                                            {/* Category Title Overlay */}
                                            <div className="absolute top-4 left-4 right-4">
                                                <h3 className="text-xl md:text-2xl font-bold text-black drop-shadow-lg group-hover:text-rose-900 transition-colors duration-300">
                                                    {subcategory}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between bg-white">
                                            <div className="mb-4">
                                                <p className="text-gray-600 text-sm md:text-base mb-3">{description}</p>

                                                {/* Show some subsubcategories if available */}
                                                {beautyCategory.subsubcategories?.[subcategory] && (
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-2">Popular items:</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {beautyCategory.subsubcategories[subcategory].slice(0, 3).map((item, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 px-2 py-1 rounded-full border border-pink-200"
                                                                >
                                                                    {item}
                                                                </span>
                                                            ))}
                                                            {beautyCategory.subsubcategories[subcategory].length > 3 && (
                                                                <span className="text-xs text-gray-500 px-2 py-1">
                                                                    +{beautyCategory.subsubcategories[subcategory].length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Shop Now Button */}
                                            <Link href={`/subcategory/${slug}`} className="w-full">
                                                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-lg transform group-hover:translate-y-[-1px]">
                                                    SHOP NOW
                                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Scroll indicators */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none opacity-50"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none opacity-50"></div>
            </div>

            {/* Scroll hint for mobile */}
            <div className="text-center mt-2 md:hidden">
                <PlaywriteStylizedText className="text-sm text-gray-500">← Swipe to explore more categories →</PlaywriteStylizedText>
            </div>
        </div>
    )
}
