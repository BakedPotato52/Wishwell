"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthPromptModal } from "@/components/auth-prompt-modal"
import { useCart } from "@/contexts/cart-context"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import type { UnifiedProduct } from "@/lib/types"
import { isEnhancedProduct, getCurrentVariant } from "@/utils/product-migration"

interface AddToCartButtonProps {
  product: UnifiedProduct
  selectedAttributes?: Record<string, string>
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
  className?: string
  showText?: boolean
  disabled?: boolean
  quantity?: number
}

export function AddToCartButton({
  product,
  selectedAttributes = {},
  size = "sm",
  variant = "default",
  className = "",
  showText = true,
  disabled = false,
  quantity = 1,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { requireAuth, buildAuthUrl } = useAuthGuard()

  // Listen for post-login add to cart events
  useEffect(() => {
    const handleAddToCartAfterLogin = (event: CustomEvent) => {
      if (event.detail.productId === product.id) {
        handleAddToCart()
      }
    }

    window.addEventListener("addToCartAfterLogin", handleAddToCartAfterLogin as EventListener)
    return () => {
      window.removeEventListener("addToCartAfterLogin", handleAddToCartAfterLogin as EventListener)
    }
  }, [product.id])

  const handleAddToCart = async () => {
    if (disabled) return

    setError(null)

    // For enhanced products, validate required attributes
    if (isEnhancedProduct(product) && product.attributes) {
      const requiredAttributes = product.attributes.filter((attr) => attr.required)
      const missingAttributes = requiredAttributes.filter((attr) => !selectedAttributes[attr.attributeId])

      if (missingAttributes.length > 0) {
        setError(`Please select: ${missingAttributes.map((attr) => attr.name).join(", ")}`)
        return
      }
    }

    await requireAuth(
      async () => {
        setIsAdding(true)

        try {
          // Create cart item with enhanced data if applicable
          const cartItemData = {
            product,
            quantity,
            ...(isEnhancedProduct(product) && {
              selectedAttributes,
              variantId: getCurrentVariant(product, selectedAttributes)?.id,
            }),
          }

          await addToCart(cartItemData.product, cartItemData.quantity)

          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 2000)
        } catch (error) {
          console.error("Error adding to cart:", error)
          setError("Failed to add item to cart. Please try again.")
        } finally {
          setIsAdding(false)
        }
      },
      {
        onAuthRequired: () => setShowAuthModal(true),
        productId: product.id,
        productName: product.name,
      },
    )
  }

  const buttonContent = () => {
    if (isAdding) {
      return (
        <>
          <Loader2 className="h-5 w-5 animate-spin mr-1" />
          {showText && "Adding..."}
        </>
      )
    }

    if (showSuccess) {
      return (
        <>
          <Check className="h-5 w-5 mr-1 text-green-600" />
          {showText && "Added!"}
        </>
      )
    }

    return (
      <>
        <ShoppingCart className="h-5 w-5 mr-1" />
        {showText && "Add"}
      </>
    )
  }

  return (
    <>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          size={size}
          variant={variant}
          onClick={handleAddToCart}
          disabled={disabled || isAdding}
          className={`${showSuccess ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} ${className}`}
        >
          {buttonContent()}
        </Button>
      </motion.div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

      <AuthPromptModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        productName={product.name}
        loginUrl={buildAuthUrl("login", { productId: product.id, productName: product.name })}
        registerUrl={buildAuthUrl("register", { productId: product.id, productName: product.name })}
      />
    </>
  )
}
