import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  increment,
} from "firebase/firestore"
import { db } from "./config"
import type { Product, EnhancedProduct, UnifiedProduct, CartItem, Order } from "@/lib/types"

// Products Collection
export const getProducts = async (): Promise<UnifiedProduct[]> => {
  try {
    const productsRef = collection(db, "products")
    const snapshot = await getDocs(query(productsRef, orderBy("createdAt", "desc")))

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        // Ensure backward compatibility
        price: data.price || data.basePrice || 0,
        inStock: data.inStock !== undefined ? data.inStock : data.inventory?.quantity > 0 || false,
        quantity: data.quantity || data.inventory?.quantity || 0,
      }
    }) as UnifiedProduct[]
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const getProduct = async (productId: string): Promise<UnifiedProduct | null> => {
  try {
    const productDoc = await getDoc(doc(db, "products", productId))
    if (productDoc.exists()) {
      const data = productDoc.data()
      return {
        id: productDoc.id,
        ...data,
        // Ensure backward compatibility
        price: data.price || data.basePrice || 0,
        inStock: data.inStock !== undefined ? data.inStock : data.inventory?.quantity > 0 || false,
        quantity: data.quantity || data.inventory?.quantity || 0,
      } as UnifiedProduct
    }
    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products")
    const q = query(
      productsRef,
      where("category", "==", category),
      where("inStock", "==", true),
      orderBy("createdAt", "desc"),
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[]
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

export const createProduct = async (productData: Omit<EnhancedProduct, "id">): Promise<string> => {
  try {
    const productRef = doc(collection(db, "products"))
    const product: EnhancedProduct = {
      id: productRef.id,
      ...productData,
      isEnhanced: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    await setDoc(productRef, product)
    return productRef.id
  } catch (error) {
    console.error("Error creating enhanced product:", error)
    throw error
  }
}
// Cart Management
export const getUserCart = async (userId: string): Promise<CartItem[]> => {
  try {
    const cartRef = collection(db, "users", userId, "cart")
    const snapshot = await getDocs(cartRef)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CartItem[]
  } catch (error) {
    console.error("Error fetching user cart:", error)
    return []
  }
}

export const addToCart = async (
  userId: string,
  product: UnifiedProduct,
  quantity = 1,
  options?: {
    selectedAttributes?: Record<string, string>
    variantId?: string
  },
): Promise<void> => {
  try {
    // Create a unique cart item ID based on product and selected attributes
    const cartItemId = options?.variantId ? `${product.id}_${options.variantId}` : product.id

    const cartItemRef = doc(db, "users", userId, "cart", cartItemId)
    const existingItem = await getDoc(cartItemRef)

    // Clean up undefined values for Firestore
    const cleanOptions = {
      selectedAttributes: options?.selectedAttributes || null, // Use null instead of undefined
      variantId: options?.variantId || null, // Use null instead of undefined
    }

    if (existingItem.exists()) {
      // Update quantity if item already exists
      await updateDoc(cartItemRef, {
        quantity: increment(quantity),
        updatedAt: serverTimestamp(),
        // Update options if they changed
        ...(cleanOptions.selectedAttributes && { selectedAttributes: cleanOptions.selectedAttributes }),
        ...(cleanOptions.variantId && { variantId: cleanOptions.variantId }),
      })
    } else {
      // Add new item to cart - only include fields that are not null
      const cartItem: any = {
        id: cartItemId,
        product,
        quantity,
        addedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      // Only add optional fields if they have values
      if (cleanOptions.selectedAttributes) {
        cartItem.selectedAttributes = cleanOptions.selectedAttributes
      }

      if (cleanOptions.variantId) {
        cartItem.variantId = cleanOptions.variantId
      }

      await setDoc(cartItemRef, cartItem)
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    throw error
  }
}

export const updateCartItemQuantity = async (userId: string, productId: string, quantity: number): Promise<void> => {
  try {
    const cartItemRef = doc(db, "users", userId, "cart", productId)

    if (quantity <= 0) {
      await deleteDoc(cartItemRef)
    } else {
      await updateDoc(cartItemRef, {
        quantity,
        updatedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error("Error updating cart item quantity:", error)
    throw error
  }
}

export const removeFromCart = async (userId: string, productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "users", userId, "cart", productId))
  } catch (error) {
    console.error("Error removing from cart:", error)
    throw error
  }
}

export const clearCart = async (userId: string): Promise<void> => {
  try {
    const cartRef = collection(db, "users", userId, "cart")
    const snapshot = await getDocs(cartRef)

    const batch = writeBatch(db)
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })

    await batch.commit()
  } catch (error) {
    console.error("Error clearing cart:", error)
    throw error
  }
}

// Real-time cart listener
export const subscribeToCart = (userId: string, callback: (cartItems: CartItem[]) => void) => {
  const cartRef = collection(db, "users", userId, "cart")

  return onSnapshot(
    cartRef,
    (snapshot) => {
      const cartItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CartItem[]

      callback(cartItems)
    },
    (error) => {
      console.error("Error listening to cart changes:", error)
    },
  )
}

// Orders Management
export const createOrder = async (userId: string, orderData: Omit<Order, "id">): Promise<string> => {
  try {
    const orderRef = doc(collection(db, "orders"))
    const order: Order = {
      id: orderRef.id,
      ...orderData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    await setDoc(orderRef, order)

    // Clear user's cart after successful order
    await clearCart(userId)

    return orderRef.id
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, "orders")
    const q = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[]
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

export const updateOrderStatus = async (orderId: string, status: Order["status"]): Promise<void> => {
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

// Enhanced product creation
export const createEnhancedProduct = async (productData: Omit<EnhancedProduct, "id">): Promise<string> => {
  try {
    const productRef = doc(collection(db, "products"))
    const product: EnhancedProduct = {
      id: productRef.id,
      ...productData,
      isEnhanced: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    await setDoc(productRef, product)
    return productRef.id
  } catch (error) {
    console.error("Error creating enhanced product:", error)
    throw error
  }
}

// Migration utility to convert legacy products to enhanced
export const migrateProductToEnhanced = async (productId: string): Promise<void> => {
  try {
    const productDoc = await getDoc(doc(db, "products", productId))
    if (!productDoc.exists()) {
      throw new Error("Product not found")
    }

    const legacyProduct = { id: productDoc.id, ...productDoc.data() } as Product

    // Use the migration utility
    const { migrateProductToEnhanced } = await import("../../utils/product-migration")
    const enhancedProduct = migrateProductToEnhanced(legacyProduct)

    // Update the product in Firestore
    await updateDoc(doc(db, "products", productId), {
      ...enhancedProduct,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error migrating product:", error)
    throw error
  }
}

// Batch migration for all legacy products
export const batchMigrateProducts = async (): Promise<void> => {
  try {
    const productsRef = collection(db, "products")
    const snapshot = await getDocs(query(productsRef, where("isEnhanced", "!=", true)))

    const batch = writeBatch(db)
    const { migrateProductToEnhanced } = await import("../../utils/product-migration")

    snapshot.docs.forEach((doc) => {
      const legacyProduct = { id: doc.id, ...doc.data() } as Product
      const enhancedProduct = migrateProductToEnhanced(legacyProduct)

      batch.update(doc.ref, {
        ...enhancedProduct,
        updatedAt: serverTimestamp(),
      })
    })

    await batch.commit()
    console.log(`Migrated ${snapshot.docs.length} products to enhanced format`)
  } catch (error) {
    console.error("Error batch migrating products:", error)
    throw error
  }
}