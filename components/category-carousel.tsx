"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel-ui"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getSubcategoryImage, subcategoryImages } from "@/lib/subcategoryImages"
import { Category } from "@/lib/types"
import { StylizedText } from "./elements/animated-text"

export default function CategoryCarousel({ category }: { category?: Category }) {
    // Create slug from subcategory name
    const createSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/,/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 select-none">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    <span className="text-black">SHOP BY</span> <span className="italic text-black">Category</span>
                </h1>
                <p className="text-gray-600 text-lg">Trending categories on WishWell:</p>
                <StylizedText className="text-4xl md:text-5xl lg:text-6xl">{category?.name}</StylizedText>
            </div>

            <div className="text-center mb-8 md:hidden">
                <h1 className="text-2xl font-bold mb-2">
                    <span className="text-black">SHOP BY</span> <span className="italic text-black">Category</span>
                </h1>
                <p className="text-gray-600 text-lg">Trending categories on WishWell: <StylizedText className="text-4xl md:text-5xl lg:text-6xl">{category?.name}</StylizedText></p>

            </div>

            {/* Category Carousel */}
            {category && (
                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {category.subcategories?.map((subcategory, index) => {
                            const slug = createSlug(subcategory)
                            const imageUrl = getSubcategoryImage(subcategory, category.name)

                            return (
                                <CarouselItem key={subcategory} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                    <Card className="h-full overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
                                        <CardContent className="p-0 h-full">
                                            <div className="relative h-80 overflow-hidden">
                                                {/* Category Image */}
                                                <Image
                                                    src={imageUrl || subcategoryImages[subcategory]?.toString() || "/placeholder.png"}
                                                    alt={subcategory}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-110 z-10"
                                                />
                                                {/* Overlay for better text readability */}
                                                <div className="absolute inset-0 bg-black/20"></div>
                                                {/* Category Title */}
                                                <div className="absolute top-4 left-4">
                                                    <h3 className="text-white text-xl font-semibold">{subcategory}</h3>
                                                </div>

                                                {/* Shop Now Button */}
                                                <Link
                                                    href={`/subcategory/${slug}`}
                                                    className="absolute bottom-4 left-4 right-4 z-20"
                                                >
                                                    <Button
                                                        className="w-full bg-black/80 hover:bg-black text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:bg-black"
                                                    >
                                                        SHOP NOW
                                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            )

                        })}


                    </CarouselContent>

                </Carousel>
            )}


        </div>
    )
}
