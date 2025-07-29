"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import type { User } from "firebase/auth"
import { PhoneRegistrationFlow } from "@/components/phone-auth/phone-registration-flow"
import { useAuth } from "@/contexts/auth-context"
import { useAuthGuard } from "@/hooks/use-auth-guard"

function PhoneRegisterPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { firebaseUser } = useAuth()
    const { executeAfterAuth } = useAuthGuard()

    // Get redirect parameters from URL
    const returnUrl = searchParams.get("returnUrl") || "/"
    const action = searchParams.get("action") ?? undefined
    const productId = searchParams.get("productId") ?? undefined
    const productName = searchParams.get("productName") ?? undefined

    useEffect(() => {
        // Redirect if already logged in
        if (firebaseUser) {
            router.push(returnUrl)
        }
    }, [firebaseUser, router, returnUrl])

    const handleRegistrationComplete = (user: User, userData: any) => {
        // Execute any pending actions immediately after registration
        executeAfterAuth(() => {
            if (action === "addToCart" && productId) {
                // Trigger add to cart action
                const event = new CustomEvent("addToCartAfterLogin", {
                    detail: { productId, productName },
                })
                window.dispatchEvent(event)
            }
        })

        // Redirect to the intended page
        router.push(returnUrl)
    }

    const handleCancel = () => {
        // Redirect to login page with same parameters
        const params = new URLSearchParams()
        if (returnUrl !== "/") params.set("returnUrl", returnUrl)
        if (action) params.set("action", action)
        if (productId) params.set("productId", productId)
        if (productName) params.set("productName", productName)

        const queryString = params.toString()
        router.push(`/login${queryString ? `?${queryString}` : ""}`)
    }

    if (firebaseUser) {
        return null // Will redirect via useEffect
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
            <PhoneRegistrationFlow
                onComplete={handleRegistrationComplete}
                onCancel={handleCancel}
                returnUrl={returnUrl}
                action={action}
                productId={productId}
                productName={productName}
            />
        </motion.div>
    )
}

export default function PhoneRegisterPage() {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 py-8 flex justify-center">
                    <div className="animate-pulse">Loading...</div>
                </div>
            }
        >
            <PhoneRegisterPageContent />
        </Suspense>
    )
}
