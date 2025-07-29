"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { User } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Loader2, Phone, MessageSquare, UserIcon, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { phoneAuthService, type AdditionalUserData, type PhoneAuthError } from "@/lib/firebase/phone-auth"
import { useAuth } from "@/contexts/auth-context"

interface PhoneRegistrationFlowProps {
    onComplete: (user: User, userData: any) => void
    onCancel: () => void
    returnUrl?: string
    action?: string
    productId?: string
    productName?: string
}

type Step = "phone" | "verification" | "details" | "complete"

export function PhoneRegistrationFlow({
    onComplete,
    onCancel,
    returnUrl,
    action,
    productId,
    productName,
}: PhoneRegistrationFlowProps) {
    const [currentStep, setCurrentStep] = useState<Step>("phone")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [additionalData, setAdditionalData] = useState<AdditionalUserData>({
        name: "",
        email: "",
        gender: "Men",
        address: "",
        preferences: {
            notifications: true,
            newsletter: true,
        },
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [verifiedUser, setVerifiedUser] = useState<User | null>(null)
    const [countdown, setCountdown] = useState(0)
    const [canResend, setCanResend] = useState(false)

    const { login } = useAuth()

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else if (currentStep === "verification") {
            setCanResend(true)
        }
    }, [countdown, currentStep])

    // Initialize reCAPTCHA when component mounts
    useEffect(() => {
        const initRecaptcha = async () => {
            try {
                await phoneAuthService.initializeRecaptcha()
            } catch (error) {
                console.error("Failed to initialize reCAPTCHA:", error)
                setError("Failed to initialize verification system. Please refresh the page.")
            }
        }

        initRecaptcha()

        // Cleanup on unmount
        return () => {
            phoneAuthService.cleanup()
        }
    }, [])

    const handleSendCode = async () => {
        if (!phoneNumber.trim()) {
            setError("Please enter your phone number")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            await phoneAuthService.sendVerificationCode(phoneNumber)
            setCurrentStep("verification")
            setCountdown(60) // 60 second countdown
            setCanResend(false)
        } catch (error) {
            const phoneError = error as PhoneAuthError
            setError(phoneError.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyCode = async () => {
        if (!verificationCode.trim()) {
            setError("Please enter the verification code")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const user = await phoneAuthService.verifyCode(verificationCode)
            setVerifiedUser(user)
            setCurrentStep("details")
        } catch (error) {
            const phoneError = error as PhoneAuthError
            setError(phoneError.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCompleteRegistration = async () => {
        if (!verifiedUser) {
            setError("Verification failed. Please try again.")
            return
        }

        if (!additionalData.name.trim()) {
            setError("Please enter your name")
            return
        }

        if (!additionalData.address.trim()) {
            setError("Please enter your address")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const userData = await phoneAuthService.completeRegistration(verifiedUser, additionalData)

            // Update auth context
            login(userData)

            setCurrentStep("complete")

            // Complete the flow after a short delay
            setTimeout(() => {
                onComplete(verifiedUser, userData)
            }, 2000)
        } catch (error) {
            console.error("Registration completion error:", error)
            setError("Failed to complete registration. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendCode = async () => {
        setIsLoading(true)
        setError(null)
        setCanResend(false)

        try {
            await phoneAuthService.resendVerificationCode(phoneNumber)
            setCountdown(60)
            setVerificationCode("")
        } catch (error) {
            const phoneError = error as PhoneAuthError
            setError(phoneError.message)
            setCanResend(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        setError(null)
        switch (currentStep) {
            case "verification":
                setCurrentStep("phone")
                setVerificationCode("")
                phoneAuthService.cleanup()
                break
            case "details":
                setCurrentStep("verification")
                break
            default:
                onCancel()
        }
    }

    const getStepProgress = () => {
        switch (currentStep) {
            case "phone":
                return 25
            case "verification":
                return 50
            case "details":
                return 75
            case "complete":
                return 100
            default:
                return 0
        }
    }

    const getWelcomeMessage = () => {
        if (action === "addToCart" && productName) {
            return `Register with your phone number to add "${productName}" to your cart and start shopping!`
        }
        return "Create your account using your phone number for quick and secure access."
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    {currentStep !== "phone" && currentStep !== "complete" && (
                        <Button variant="ghost" size="sm" onClick={handleBack} disabled={isLoading}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    )}
                    <CardTitle className="text-center flex-1">
                        {currentStep === "complete" ? "Welcome!" : "Phone Registration"}
                    </CardTitle>
                    <div className="w-8" /> {/* Spacer for alignment */}
                </div>
                <Progress value={getStepProgress()} className="mt-4" />
            </CardHeader>

            <CardContent>
                {action === "addToCart" && currentStep === "phone" && (
                    <Alert className="mb-4 border-blue-200 bg-blue-50">
                        <Phone className="h-4 w-4" />
                        <AlertDescription className="text-blue-800">{getWelcomeMessage()}</AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert className="mb-4 border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                )}

                <AnimatePresence mode="wait">
                    {/* Step 1: Phone Number Input */}
                    {currentStep === "phone" && (
                        <motion.div
                            key="phone"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="text-center mb-6">
                                <Phone className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                                <h3 className="text-lg font-semibold">Enter Your Phone Number</h3>
                                <p className="text-sm text-gray-600">We'll send you a verification code via SMS</p>
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+91 12345 67890"
                                    disabled={isLoading}
                                    className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter your phone number with country code</p>
                            </div>

                            <Button onClick={handleSendCode} disabled={isLoading || !phoneNumber.trim()} className="w-full">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending Code...
                                    </>
                                ) : (
                                    <>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Send Verification Code
                                    </>
                                )}
                            </Button>

                            <div className="text-center">
                                <Button variant="link" onClick={onCancel} disabled={isLoading} className="text-sm">
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Verification Code */}
                    {currentStep === "verification" && (
                        <motion.div
                            key="verification"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="text-center mb-6">
                                <MessageSquare className="h-12 w-12 mx-auto text-green-600 mb-2" />
                                <h3 className="text-lg font-semibold">Enter Verification Code</h3>
                                <p className="text-sm text-gray-600">We sent a 6-digit code to {phoneNumber}</p>
                            </div>

                            <div>
                                <Label htmlFor="code">Verification Code</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    placeholder="123456"
                                    disabled={isLoading}
                                    className="mt-1 text-center text-lg tracking-widest"
                                    maxLength={6}
                                />
                            </div>

                            <Button
                                onClick={handleVerifyCode}
                                disabled={isLoading || verificationCode.length !== 6}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Code"
                                )}
                            </Button>

                            <div className="text-center">
                                {countdown > 0 ? (
                                    <p className="text-sm text-gray-500">Resend code in {countdown} seconds</p>
                                ) : (
                                    <Button
                                        variant="link"
                                        onClick={handleResendCode}
                                        disabled={isLoading || !canResend}
                                        className="text-sm"
                                    >
                                        <RefreshCw className="mr-1 h-3 w-3" />
                                        Resend Code
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Additional Details */}
                    {currentStep === "details" && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="text-center mb-6">
                                <UserIcon className="h-12 w-12 mx-auto text-purple-600 mb-2" />
                                <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                                <p className="text-sm text-gray-600">Tell us a bit more about yourself</p>
                            </div>

                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    value={additionalData.name}
                                    onChange={(e) => setAdditionalData({ ...additionalData, name: e.target.value })}
                                    placeholder="Enter your full name"
                                    disabled={isLoading}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address (Optional)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={additionalData.email}
                                    onChange={(e) => setAdditionalData({ ...additionalData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label>Gender *</Label>
                                <RadioGroup
                                    value={additionalData.gender}
                                    onValueChange={(value) => setAdditionalData({ ...additionalData, gender: value as "Men" | "Women" })}
                                    className="flex space-x-6 mt-2"
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
                                <Label htmlFor="address">Address *</Label>
                                <Input
                                    id="address"
                                    value={additionalData.address}
                                    onChange={(e) => setAdditionalData({ ...additionalData, address: e.target.value })}
                                    placeholder="Enter your address"
                                    disabled={isLoading}
                                    className="mt-1"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        id="notifications"
                                        type="checkbox"
                                        checked={additionalData.preferences?.notifications}
                                        onChange={(e) =>
                                            setAdditionalData({
                                                ...additionalData,
                                                preferences: {
                                                    ...additionalData.preferences!,
                                                    notifications: e.target.checked,
                                                },
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <Label htmlFor="notifications" className="text-sm">
                                        Receive order and promotional notifications
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        id="newsletter"
                                        type="checkbox"
                                        checked={additionalData.preferences?.newsletter}
                                        onChange={(e) =>
                                            setAdditionalData({
                                                ...additionalData,
                                                preferences: {
                                                    ...additionalData.preferences!,
                                                    newsletter: e.target.checked,
                                                },
                                            })
                                        }
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <Label htmlFor="newsletter" className="text-sm">
                                        Subscribe to newsletter and offers
                                    </Label>
                                </div>
                            </div>

                            <Button
                                onClick={handleCompleteRegistration}
                                disabled={isLoading || !additionalData.name.trim() || !additionalData.address.trim()}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    "Complete Registration"
                                )}
                            </Button>
                        </motion.div>
                    )}

                    {/* Step 4: Success */}
                    {currentStep === "complete" && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2">Welcome to WishWell!</h3>
                            <p className="text-gray-600 mb-4">
                                Your account has been created successfully with phone number verification.
                            </p>
                            {action === "addToCart" && productName && (
                                <p className="text-sm text-blue-600 mb-4">Redirecting you to add "{productName}" to your cart...</p>
                            )}
                            <div className="flex items-center justify-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span className="text-sm text-gray-500">Setting up your account...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* reCAPTCHA container */}
                <div id="recaptcha-container" className="hidden"></div>
            </CardContent>
        </Card>
    )
}
