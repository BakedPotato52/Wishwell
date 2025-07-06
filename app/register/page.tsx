"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { registerUser } from "@/lib/firebase/auth"
import type { AuthError, RegisterData } from "@/lib/firebase/auth"

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "Men",
    address: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const { firebaseUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already logged in
    if (firebaseUser) {
      const returnUrl = sessionStorage.getItem("returnUrl")
      router.push(returnUrl || "/account")
      return
    }

    // Check if there's a pending action after registration
    const pendingAction = sessionStorage.getItem("pendingAction")
    const pendingProductName = sessionStorage.getItem("pendingProductName")

    if (pendingAction === "addToCart" && pendingProductName) {
      setShowWelcomeMessage(true)
    }
  }, [firebaseUser, router])

  const validateForm = (): boolean => {
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }

    if (!formData.phone.match(/^\+?[\d\s-()]+$/)) {
      setError("Please enter a valid phone number")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      await registerUser(formData)
      setRegistrationSuccess(true)

      // Handle post-registration actions
      setTimeout(() => {
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
      }, 2000)
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (registrationSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-8 max-w-md"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">Welcome to ShopEase!</h2>
              <p className="text-gray-600 mb-4">
                Your account has been created successfully. A verification email has been sent to your email address.
              </p>
              <p className="text-sm text-gray-500">Redirecting you to your account...</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 max-w-md"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {showWelcomeMessage ? "Join ShopEase!" : "Register for ShopEase"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showWelcomeMessage && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                Create your account to start shopping and add items to your cart.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                disabled={isLoading}
                className="mt-1"
                placeholder="+91 12345 67890"
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
                  minLength={6}
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

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value as "Men" | "Women" })}
                className="flex space-x-4 mt-2"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Men" id="men" />
                  <Label htmlFor="men">Men</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Women" id="women" />
                  <Label htmlFor="women">Women</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
