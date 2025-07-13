"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase/config"

export interface Subcategory {
    id: string
    name: string
    image: string
    icon?: string
    categoryId: string
    categoryName: string
    productCount?: number
    featured?: boolean
    description?: string
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

                const q = query(collection(db, "subcategories"), orderBy("name"))

                if (realtime) {
                    const unsubscribe = onSnapshot(
                        q,
                        (snapshot) => {
                            const subcategoriesData = snapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            })) as Subcategory[]

                            let filteredData = subcategoriesData

                            if (categoryId) {
                                filteredData = filteredData.filter((sub) => sub.categoryId === categoryId)
                            }

                            if (featured) {
                                filteredData = filteredData.filter((sub) => sub.featured === true)
                            }

                            if (limit) {
                                filteredData = filteredData.slice(0, limit)
                            }

                            setSubcategories(filteredData)
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

                    let filteredData = subcategoriesData

                    if (categoryId) {
                        filteredData = filteredData.filter((sub) => sub.categoryId === categoryId)
                    }

                    if (featured) {
                        filteredData = filteredData.filter((sub) => sub.featured === true)
                    }

                    if (limit) {
                        filteredData = filteredData.slice(0, limit)
                    }

                    setSubcategories(filteredData)
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error)
                setError("Failed to load subcategories")
                setLoading(false)
            }
        }

        fetchSubcategories()
    }, [categoryId, featured, limit, realtime])

    const refetch = () => {
        setLoading(true)
        setError(null)
        // Re-trigger the effect
    }

    return { subcategories, loading, error, refetch }
}
