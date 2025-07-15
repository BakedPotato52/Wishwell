import { NextRequest, NextResponse } from "next/server"
import { collection, getDocs, query, orderBy, where, limit, } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { Product } from "@/lib/types"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category")

        let q = query(collection(db, "products"), orderBy("createdAt", "desc"))

        if (category) {
            q = query(q, where("category", "==", category))
        }


        const snapshot = await getDocs(q)
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Product[]

        return NextResponse.json({
            success: true,
            products,
            total: products.length,
        })
    } catch (error) {
        console.error("Error fetching products:", error)
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }
}
