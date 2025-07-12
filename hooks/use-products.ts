"use client"

import { useState, useEffect, useMemo } from "react"
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    type QueryConstraint,
} from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { Product } from "@/lib/types"

interface UseProductsOptions {
    category?: string
    subcategory?: string
    limit?: number
    realtime?: boolean
}

interface UseProductsReturn {
    products: Product[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { category, subcategory, limit: limitCount = 50, realtime = false } = options

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")]

            if (category) {
                constraints.push(where("category", "==", category))
            }

            if (subcategory) {
                constraints.push(where("subcategory", "==", subcategory))
            }

            if (limitCount) {
                constraints.push(limit(limitCount))
            }

            const q = query(collection(db, "products"), ...constraints)

            if (realtime) {
                const unsubscribe = onSnapshot(
                    q,
                    (snapshot) => {
                        const productsData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        })) as Product[]
                        setProducts(productsData)
                        setLoading(false)
                    },
                    (error) => {
                        console.error("Error fetching products:", error)
                        setError("Failed to fetch products")
                        setLoading(false)
                    },
                )

                return unsubscribe
            } else {
                const snapshot = await getDocs(q)
                const productsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Product[]

                setProducts(productsData)
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching products:", error)
            setError("Failed to fetch products")
            setLoading(false)
        }
    }

    useEffect(() => {
        let unsubscribe: (() => void) | undefined

        const initFetch = async () => {
            if (realtime) {
                unsubscribe = (await fetchProducts()) as (() => void) | undefined
            } else {
                await fetchProducts()
            }
        }

        initFetch()

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [category, subcategory, limitCount, realtime])

    const refetch = () => {
        fetchProducts()
    }

    return { products, loading, error, refetch }
}

export function useProduct(productId: string) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!productId) {
            setLoading(false)
            return
        }

        const fetchProduct = async () => {
            try {
                setLoading(true)
                setError(null)

                const docRef = doc(db, "products", productId)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setProduct({
                        id: docSnap.id,
                        ...docSnap.data(),
                    } as Product)
                } else {
                    setError("Product not found")
                }
            } catch (error) {
                console.error("Error fetching product:", error)
                setError("Failed to fetch product")
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productId])

    return { product, loading, error }
}

export function useSearchProducts(searchQuery: string) {
    const { products, loading, error } = useProducts({ realtime: true })

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return products

        const query = searchQuery.toLowerCase()
        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.subcategory?.toLowerCase().includes(query),
        )
    }, [products, searchQuery])

    return {
        products: filteredProducts,
        loading,
        error,
    }
}
