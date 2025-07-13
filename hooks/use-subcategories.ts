"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, onSnapshot, where, limit as firestoreLimit } from "firebase/firestore"
import { db } from "@/lib/firebase/config"

export interface Subcategory {
    id: string
    name: string
    slug: string
    categoryId: string
    categoryName: string
    image?: string
    icon?: string
    description?: string
    productCount?: number
    featured?: boolean
    createdAt?: any
    updatedAt?: any
}

interface UseSubcategoriesOptions {
    categoryId?: string
    featured?: boolean
    limit?: number
    realtime?: boolean
}

export function useSubcategories(options: UseSubcategoriesOptions = {}) {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { categoryId, featured, limit, realtime = false } = options

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                setLoading(true)
                setError(null)

                let q = query(collection(db, "subcategories"))

                // Add filters
                if (categoryId) {
                    q = query(q, where("categoryId", "==", categoryId))
                }

                if (featured) {
                    q = query(q, where("featured", "==", true))
                }

                // Add ordering - using name instead of createdAt to avoid index issues
                q = query(q, orderBy("name", "asc"))

                // Add limit
                if (limit) {
                    q = query(q, firestoreLimit(limit))
                }

                if (realtime) {
                    const unsubscribe = onSnapshot(
                        q,
                        (snapshot) => {
                            const subcategoriesData = snapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            })) as Subcategory[]

                            setSubcategories(subcategoriesData)
                            setLoading(false)
                        },
                        (error) => {
                            console.error("Error fetching subcategories:", error)
                            setError("Failed to load subcategories")
                            setLoading(false)
                        },
                    )

                    return unsubscribe
                } else {
                    const snapshot = await getDocs(q)
                    const subcategoriesData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as Subcategory[]

                    setSubcategories(subcategoriesData)
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error)
                setError("Failed to load subcategories")
            } finally {
                setLoading(false)
            }
        }

        fetchSubcategories()
    }, [categoryId, featured, limit, realtime])

    const refetch = () => {
        setLoading(true)
        setError(null)
    }

    return { subcategories, loading, error, refetch }
}

export function useSubcategory(subcategoryId: string) {
    const [subcategory, setSubcategory] = useState<Subcategory | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSubcategory = async () => {
            try {
                setLoading(true)
                setError(null)

                const q = query(collection(db, "subcategories"), where("id", "==", subcategoryId))
                const snapshot = await getDocs(q)

                if (!snapshot.empty) {
                    const doc = snapshot.docs[0]
                    setSubcategory({ id: doc.id, ...doc.data() } as Subcategory)
                } else {
                    setError("Subcategory not found")
                }

                setLoading(false)
            } catch (error) {
                console.error("Error fetching subcategory:", error)
                setError("Failed to load subcategory")
                setLoading(false)
            }
        }

        if (subcategoryId) {
            fetchSubcategory()
        }
    }, [subcategoryId])

    return { subcategory, loading, error }
}
