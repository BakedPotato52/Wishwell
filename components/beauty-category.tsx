"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getSubcategoryImage } from "@/lib/subcategoryImages"
import { categories } from "@/lib/categoryData"

// Get the Beauty & Personal Care category
const beautyCategory = categories.find(cat => cat.name === "Beauty & Personal care")

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
            "Skincare": "Hypoallergenic | Paraben-free",
            "Makeup": "Long-lasting | Professional quality",
            "Hair Care": "Strengthening | Color safe",
            "Fragrances": "Premium | Long-lasting scents",
            "Bath & Body": "Moisturizing | Natural ingredients",
            "Oral Care": "Whitening | Fresh breath",
            "Grooming": "Professional | Precision tools",
            "Baby Care": "Gentle | Pediatrician tested",
            "Protein & Supplements": "Nutritional | Health boosting",
            "Feminine Hygiene": "Comfortable | Reliable protection",
            "Sexual Wellness": "Safe | Discreet packaging",
            "Health & Pharma": "Trusted | Doctor recommended"
        }
        return descriptions[subcategory] || "Premium quality products"
    }

    if (!beautyCategory) {
        return <div>Category not found</div>
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 select-none">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    <span className="text-black">SHOP BY</span> <span className="italic text-black">Category</span>
                </h1>
                <p className="text-gray-600 text-lg mb-4">Trending categories on WishWell:</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                    {beautyCategory.name}
                </h2>
            </div>

            {/* Vertical Scrolling Container */}
            <div className="flex flex-col overflow-y-scroll scrollbar-hide max-h-[80vh] space-y-4 md:space-y-6">
                {beautyCategory.subcategories?.map((subcategory, index) => {
                    const slug = createSlug(subcategory)
                    const imageUrl = getSubcategoryImage(subcategory, beautyCategory.name)
                    const description = getSubcategoryDescription(subcategory)

                    return (
                        <Card
                            key={index}
                            className="overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] transform-gpu"
                        >
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Image Section */}
                                    <div className="relative h-48 md:h-32 md:w-48 lg:w-56 overflow-hidden">
                                        <Image
                                            src={imageUrl || "/placeholder.svg?height=200&width=300&query=beauty+products"}
                                            alt={subcategory}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                            priority={index < 4}
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-200/20 to-transparent transition-opacity duration-300 group-hover:from-pink-500/30 group-hover:via-purple-300/30"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                                        <div className="mb-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                                                {subcategory}
                                            </h3>
                                            <p className="text-gray-600 text-sm md:text-base">
                                                {description}
                                            </p>

                                            {/* Show some subsubcategories if available */}
                                            {beautyCategory.subsubcategories?.[subcategory] && (
                                                <div className="mt-2">
                                                    <p className="text-xs text-gray-500 mb-1">Popular items:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {beautyCategory.subsubcategories[subcategory].slice(0, 3).map((item, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                        {beautyCategory.subsubcategories[subcategory].length > 3 && (
                                                            <span className="text-xs text-gray-500">
                                                                +{beautyCategory.subsubcategories[subcategory].length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Shop Now Button */}
                                        <Link href={`/subcategory/${slug}`} className="w-full md:w-auto">
                                            <Button className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-lg transform group-hover:translate-y-[-1px]">
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

            {/* Bottom fade effect for better UX */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
        </div>
    )
}
