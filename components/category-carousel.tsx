"use client"

import React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel-ui"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel-ui"
import { getSubcategoryImage, subcategoryImages } from "@/lib/subcategoryImages"
import type { Category } from "@/lib/types"
import { StylizedText } from "./elements/animated-text"
import { createContextualSlug } from "@/utils/category-utils"

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

    // const [api, setApi] = React.useState<CarouselApi>()

    // // Pause auto-scroll on hover
    // const [isPaused, setIsPaused] = React.useState(false)

    // const handleMouseEnter = useCallback(() => {
    //     if (!api) return
    //     setIsPaused(true)
    // }, [api])

    // const handleMouseLeave = useCallback(() => {
    //     if (!api) return
    //     setIsPaused(false)
    // }, [api])

    // // Auto-scroll functionality with pause
    // useEffect(() => {
    //     if (!api || isPaused) return

    //     const autoScroll = setInterval(() => {
    //         api.scrollNext()
    //     }, 10000) // Auto-scroll every 10 seconds

    //     return () => clearInterval(autoScroll)
    // }, [api, isPaused])

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

            {/* Category Carousel */}
            {category && (
                <Carousel
                    className="w-full"
                    opts={{
                        align: "start",

                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {category.subcategories?.map((subcategory, index) => {
                            // const contextualSlug = createContextualSlug(category.name, subcategory, (category.subsubcategories?.[subcategory] || []).join('-'))
                            const slug = createSlug(subcategory)

                            const imageUrl = getSubcategoryImage(subcategory, category.name)

                            return (
                                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <div className="h-full overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-105 transform-gpu">
                                        <CardContent className="p-0 h-full">
                                            <div className="relative h-80 overflow-hidden">
                                                {/* Category Image */}
                                                <Image
                                                    src={imageUrl || subcategoryImages[subcategory]?.toString() || "/placeholder.png"}
                                                    alt={subcategory}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110 z-10"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    priority={index < 3} // Prioritize first 3 images
                                                />

                                                {/* Overlay for better text readability */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-rose-400 via-blue-200 to-transparent transition-opacity duration-300 group-hover:from-rose-500"></div>

                                                {/* Category Title */}
                                                <div className="absolute top-4 left-4 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-zinc-800 to-stone-800 text-xl font-bold drop-shadow-lg">{subcategory}</h3>
                                                </div>

                                                {/* Shop Now Button */}
                                                <Link href={`/products/${slug}`} className="absolute bottom-4 left-4 right-4 z-20">
                                                    <Button className="w-full bg-black/80 hover:bg-black text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:bg-black group-hover:shadow-lg transform group-hover:translate-y-[-2px]">
                                                        SHOP NOW
                                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-lg border-0 transition-all duration-300 hover:scale-110" />
                    <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-lg border-0 transition-all duration-300 hover:scale-110" />
                </Carousel>
            )}
        </div>
    )
}
