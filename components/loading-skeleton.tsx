"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface ProductGridSkeletonProps {
    count?: number
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </div>
        </div>
    )
}

export function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Skeleton className="w-full h-96 rounded-lg" />
                    <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-20 rounded" />
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CategorySkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="space-y-1 w-full">
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                            <Skeleton className="h-3 w-1/2 mx-auto" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

interface ErrorMessageProps {
    message: string
    onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2 text-red-600">Something went wrong</h3>
            <p className="text-gray-600 mb-4">{message}</p>
            {onRetry && (
                <Button onClick={onRetry} variant="outline" className="gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>
            )}
        </div>
    )
}
