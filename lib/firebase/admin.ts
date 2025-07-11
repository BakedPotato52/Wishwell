import {
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    writeBatch,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore"
import { db } from "./config"
import type { Product, Category, Order, FirebaseUser } from "@/lib/types"

// Admin Products Management
export const adminGetProducts = async (
    pageSize = 20,
    lastDoc?: any,
    filters?: {
        category?: string
        inStock?: boolean
        searchTerm?: string
    },
): Promise<{ products: Product[]; lastDoc: any; hasMore: boolean }> => {
    try {
        let q = query(collection(db, "products"), orderBy("createdAt", "desc"))

        // Apply filters
        if (filters?.category) {
            q = query(q, where("category", "==", filters.category))
        }
        if (filters?.inStock !== undefined) {
            q = query(q, where("inStock", "==", filters.inStock))
        }

        // Pagination
        if (lastDoc) {
            q = query(q, startAfter(lastDoc))
        }
        q = query(q, limit(pageSize + 1))

        const snapshot = await getDocs(q)
        const products = snapshot.docs.slice(0, pageSize).map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Product[]

        // Search filter (client-side for simplicity)
        let filteredProducts = products
        if (filters?.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase()
            filteredProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
            )
        }

        return {
            products: filteredProducts,
            lastDoc: snapshot.docs[pageSize - 1] || null,
            hasMore: snapshot.docs.length > pageSize,
        }
    } catch (error) {
        console.error("Error fetching products:", error)
        throw error
    }
}

export const adminCreateProduct = async (productData: Omit<Product, "id">): Promise<string> => {
    try {
        const productRef = doc(collection(db, "products"))
        const product: Product = {
            id: productRef.id,
            ...productData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }

        await setDoc(productRef, product)
        return productRef.id
    } catch (error) {
        console.error("Error creating product:", error)
        throw error
    }
}

export const adminUpdateProduct = async (productId: string, updates: Partial<Product>): Promise<void> => {
    try {
        await updateDoc(doc(db, "products", productId), {
            ...updates,
            updatedAt: serverTimestamp(),
        })
    } catch (error) {
        console.error("Error updating product:", error)
        throw error
    }
}

export const adminDeleteProduct = async (productId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "products", productId))
    } catch (error) {
        console.error("Error deleting product:", error)
        throw error
    }
}

export const adminBulkCreateProducts = async (products: Omit<Product, "id">[]): Promise<string[]> => {
    try {
        const batch = writeBatch(db)
        const productIds: string[] = []

        for (const productData of products) {
            const productRef = doc(collection(db, "products"))
            const product: Product = {
                id: productRef.id,
                ...productData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }

            batch.set(productRef, product)
            productIds.push(productRef.id)
        }

        await batch.commit()
        return productIds
    } catch (error) {
        console.error("Error bulk creating products:", error)
        throw error
    }
}

// Admin Categories Management
export const adminGetCategories = async (): Promise<Category[]> => {
    try {
        const snapshot = await getDocs(collection(db, "categories"))
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Category[]
    } catch (error) {
        console.error("Error fetching categories:", error)
        throw error
    }
}

export const adminCreateCategory = async (categoryData: Omit<Category, "id">): Promise<string> => {
    try {
        const categoryRef = doc(collection(db, "categories"))
        const category: Category = {
            id: categoryRef.id,
            ...categoryData,
        }

        await setDoc(categoryRef, category)
        return categoryRef.id
    } catch (error) {
        console.error("Error creating category:", error)
        throw error
    }
}

export const adminUpdateCategory = async (categoryId: string, updates: Partial<Category>): Promise<void> => {
    try {
        await updateDoc(doc(db, "categories", categoryId), updates)
    } catch (error) {
        console.error("Error updating category:", error)
        throw error
    }
}

export const adminDeleteCategory = async (categoryId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "categories", categoryId))
    } catch (error) {
        console.error("Error deleting category:", error)
        throw error
    }
}

// Admin Analytics
export const adminGetAnalytics = async (dateRange: { start: Date; end: Date }) => {
    try {
        const startTimestamp = Timestamp.fromDate(dateRange.start)
        const endTimestamp = Timestamp.fromDate(dateRange.end)

        // Get orders in date range
        const ordersQuery = query(
            collection(db, "orders"),
            where("createdAt", ">=", startTimestamp),
            where("createdAt", "<=", endTimestamp),
            orderBy("createdAt", "desc"),
        )
        const ordersSnapshot = await getDocs(ordersQuery)
        const orders = ordersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Order[]

        // Calculate metrics
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
        const totalOrders = orders.length
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

        // Category performance
        const categoryStats: Record<string, { revenue: number; orders: number; items: number }> = {}
        orders.forEach((order) => {
            order.items.forEach((item) => {
                const category = item.product.category
                if (!categoryStats[category]) {
                    categoryStats[category] = { revenue: 0, orders: 0, items: 0 }
                }
                categoryStats[category].revenue += item.product.price * item.quantity
                categoryStats[category].items += item.quantity
            })
        })

        // Top products
        const productStats: Record<string, { name: string; quantity: number; revenue: number }> = {}
        orders.forEach((order) => {
            order.items.forEach((item) => {
                const productId = item.product.id
                if (!productStats[productId]) {
                    productStats[productId] = {
                        name: item.product.name,
                        quantity: 0,
                        revenue: 0,
                    }
                }
                productStats[productId].quantity += item.quantity
                productStats[productId].revenue += item.product.price * item.quantity
            })
        })

        const topProducts = Object.entries(productStats)
            .sort(([, a], [, b]) => b.quantity - a.quantity)
            .slice(0, 10)
            .map(([id, stats]) => ({ id, ...stats }))

        // Daily sales
        const dailySales: Record<string, number> = {}
        orders.forEach((order) => {
            const date = (order.createdAt as Timestamp).toDate().toISOString().split("T")[0]
            dailySales[date] = (dailySales[date] || 0) + order.total
        })

        return {
            totalRevenue,
            totalOrders,
            averageOrderValue,
            categoryStats,
            topProducts,
            dailySales,
            orders,
        }
    } catch (error) {
        console.error("Error fetching analytics:", error)
        throw error
    }
}

// Admin Users Management
export const adminGetUsers = async (
    pageSize = 20,
    lastDoc?: any,
): Promise<{ users: FirebaseUser[]; lastDoc: any; hasMore: boolean }> => {
    try {
        let q = query(collection(db, "users"), orderBy("createdAt", "desc"))

        if (lastDoc) {
            q = query(q, startAfter(lastDoc))
        }
        q = query(q, limit(pageSize + 1))

        const snapshot = await getDocs(q)
        const users = snapshot.docs.slice(0, pageSize).map((doc) => ({
            uid: doc.id,
            ...doc.data(),
        })) as FirebaseUser[]

        return {
            users,
            lastDoc: snapshot.docs[pageSize - 1] || null,
            hasMore: snapshot.docs.length > pageSize,
        }
    } catch (error) {
        console.error("Error fetching users:", error)
        throw error
    }
}

// Admin Orders Management
export const adminGetOrders = async (
    pageSize = 20,
    lastDoc?: any,
    filters?: {
        status?: string
        userId?: string
    },
): Promise<{ orders: Order[]; lastDoc: any; hasMore: boolean }> => {
    try {
        let q = query(collection(db, "orders"), orderBy("createdAt", "desc"))

        if (filters?.status) {
            q = query(q, where("status", "==", filters.status))
        }
        if (filters?.userId) {
            q = query(q, where("userId", "==", filters.userId))
        }

        if (lastDoc) {
            q = query(q, startAfter(lastDoc))
        }
        q = query(q, limit(pageSize + 1))

        const snapshot = await getDocs(q)
        const orders = snapshot.docs.slice(0, pageSize).map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Order[]

        return {
            orders,
            lastDoc: snapshot.docs[pageSize - 1] || null,
            hasMore: snapshot.docs.length > pageSize,
        }
    } catch (error) {
        console.error("Error fetching orders:", error)
        throw error
    }
}

export const adminUpdateOrderStatus = async (orderId: string, status: Order["status"]): Promise<void> => {
    try {
        await updateDoc(doc(db, "orders", orderId), {
            status,
            updatedAt: serverTimestamp(),
        })
    } catch (error) {
        console.error("Error updating order status:", error)
        throw error
    }
}

// Initialize categories from existing data
export const initializeCategories = async (): Promise<void> => {
    try {
        const { categories } = await import("@/lib/categoryData")
        const batch = writeBatch(db)

        for (const category of categories) {
            const categoryRef = doc(db, "categories", category.id)
            batch.set(categoryRef, category)
        }

        await batch.commit()
        console.log("Categories initialized successfully")
    } catch (error) {
        console.error("Error initializing categories:", error)
        throw error
    }
}

// Initialize products from existing data
export const initializeProducts = async (): Promise<void> => {
    try {
        const { products } = await import("@/lib/productData")
        const batch = writeBatch(db)

        for (const product of products) {
            const productRef = doc(db, "products", product.id)
            const productData = {
                ...product,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }
            batch.set(productRef, productData)
        }

        await batch.commit()
        console.log("Products initialized successfully")
    } catch (error) {
        console.error("Error initializing products:", error)
        throw error
    }
}
