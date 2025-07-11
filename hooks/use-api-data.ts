"use client"

import { useState, useEffect } from "react"
import type { Product, Category } from "@/lib/types"

// Hook to fetch products from API instead of static data
export function useProducts(category?: string) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (category) params.set("category", category)

            const response = await fetch(`/api/products?${params.toString()}`)
            if (!response.ok) {
                throw new Error("Failed to fetch products")
            }

            const data = await response.json()
            setProducts(data.products)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [category])

    return { products, loading, error, refetch: () => fetchProducts() }
}

// Hook to fetch categories from API
export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/categories")
            if (!response.ok) {
                throw new Error("Failed to fetch categories")
            }

            const data = await response.json()
            setCategories(data.categories)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return { categories, loading, error, refetch: () => fetchCategories() }
}
