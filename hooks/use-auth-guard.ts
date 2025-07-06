"use client"

import { useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"

interface AuthGuardOptions {
  redirectTo?: string
  returnUrl?: string
  onAuthRequired?: () => void
}

export function useAuthGuard() {
  const { firebaseUser } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const requireAuth = useCallback(
    (action: () => void | Promise<void>, options: AuthGuardOptions = {}) => {
      if (firebaseUser) {
        // User is authenticated, execute the action
        const result = action()
        if (result instanceof Promise) {
          return result.then(() => true).catch(() => false)
        }
        return true
      } else {
        // User is not authenticated, handle auth requirement
        const returnUrl = options.returnUrl || pathname

        if (options.onAuthRequired) {
          options.onAuthRequired()
        } else {
          // Store the return URL and redirect to login
          sessionStorage.setItem("returnUrl", returnUrl)
          sessionStorage.setItem("pendingAction", "addToCart")
          router.push(options.redirectTo || "/login")
        }
        return false
      }
    },
    [firebaseUser, router, pathname],
  )

  const executeAfterAuth = useCallback(
    (action: () => void | Promise<void>) => {
      if (firebaseUser) {
        action()
        // Clear any pending actions
        sessionStorage.removeItem("pendingAction")
        sessionStorage.removeItem("returnUrl")
      }
    },
    [firebaseUser],
  )

  return {
    requireAuth,
    executeAfterAuth,
    isAuthenticated: !!firebaseUser,
  }
}
