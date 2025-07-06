"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { loginUser, resetPassword } from "@/lib/firebase/auth"
import type { AuthError } from "@/lib/firebase/auth"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const { firebaseUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already logged in
    if (firebaseUser) {
      const returnUrl = sessionStorage.getItem("returnUrl")
      router.push(returnUrl || "/account")
      return
    }

    // Check if there's a pending action after login
    const pendingAction = sessionStorage.getItem("pendingAction")
    const pendingProductName = sessionStorage.getItem("pendingProductName")

    if (pendingAction === "addToCart" && pendingProductName) {
      setShowWelcomeMessage(true)
    }
  }, [firebaseUser, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await loginUser(formData)

      // Handle post-login actions
      const returnUrl = sessionStorage.getItem("returnUrl")
      const pendingAction = sessionStorage.getItem("pendingAction")

      if (pendingAction === "addToCart") {
        // Clear session storage
        sessionStorage.removeItem("returnUrl")
        sessionStorage.removeItem("pendingAction")
        sessionStorage.removeItem("pendingProductName")
      }

      // Redirect to return URL or account page
      router.push(returnUrl || "/account")
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address first")
      return
    }

    try {
      await resetPassword(formData.email)
      setResetEmailSent(true)
      setError(null)
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 max-w-md"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{showWelcomeMessage ? "Welcome back!" : "Login to WishWell"}</CardTitle>
        </CardHeader>
        <CardContent>
          {showWelcomeMessage && (
            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">
                Sign in to continue adding items to your cart and complete your purchase.
              </AlertDescription>
            </Alert>
          )}

          {resetEmailSent && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                Password reset email sent! Check your inbox for further instructions.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="px-0 text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
