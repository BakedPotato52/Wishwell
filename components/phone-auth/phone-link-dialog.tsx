"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Phone, MessageSquare, LinkIcon } from "lucide-react"
import { phoneAuthService, type PhoneAuthError } from "@/lib/firebase/phone-auth"
import { useAuth } from "@/contexts/auth-context"

interface PhoneLinkDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function PhoneLinkDialog({ open, onOpenChange, onSuccess }: PhoneLinkDialogProps) {
    const [step, setStep] = useState<"phone" | "verification">("phone")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { firebaseUser } = useAuth()

    const handleSendCode = async () => {
        if (!phoneNumber.trim()) {
            setError("Please enter your phone number")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            await phoneAuthService.initializeRecaptcha("recaptcha-container-link")
            await phoneAuthService.sendVerificationCode(phoneNumber)
            setStep("verification")
        } catch (error) {
            const phoneError = error as PhoneAuthError
            setError(phoneError.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLinkPhone = async () => {
        if (!firebaseUser || !verificationCode.trim()) {
            setError("Please enter the verification code")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            await phoneAuthService.linkPhoneToAccount(firebaseUser, phoneNumber, verificationCode)
            onSuccess?.()
            onOpenChange(false)
            // Reset form
            setStep("phone")
            setPhoneNumber("")
            setVerificationCode("")
        } catch (error) {
            const phoneError = error as PhoneAuthError
            setError(phoneError.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        onOpenChange(false)
        phoneAuthService.cleanup()
        setStep("phone")
        setPhoneNumber("")
        setVerificationCode("")
        setError(null)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5" />
                        Link Phone Number
                    </DialogTitle>
                </DialogHeader>

                {error && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                )}

                {step === "phone" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="text-center mb-4">
                            <Phone className="h-10 w-10 mx-auto text-blue-600 mb-2" />
                            <p className="text-sm text-gray-600">Add your phone number for enhanced security and faster login</p>
                        </div>

                        <div>
                            <Label htmlFor="phone-link">Phone Number</Label>
                            <Input
                                id="phone-link"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+91 12345 67890"
                                disabled={isLoading}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleClose} disabled={isLoading} className="flex-1 bg-transparent">
                                Cancel
                            </Button>
                            <Button onClick={handleSendCode} disabled={isLoading || !phoneNumber.trim()} className="flex-1">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Send Code
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "verification" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="text-center mb-4">
                            <MessageSquare className="h-10 w-10 mx-auto text-green-600 mb-2" />
                            <p className="text-sm text-gray-600">Enter the verification code sent to {phoneNumber}</p>
                        </div>

                        <div>
                            <Label htmlFor="code-link">Verification Code</Label>
                            <Input
                                id="code-link"
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                placeholder="123456"
                                disabled={isLoading}
                                className="mt-1 text-center text-lg tracking-widest"
                                maxLength={6}
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setStep("phone")} disabled={isLoading} className="flex-1">
                                Back
                            </Button>
                            <Button
                                onClick={handleLinkPhone}
                                disabled={isLoading || verificationCode.length !== 6}
                                className="flex-1"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Linking...
                                    </>
                                ) : (
                                    "Link Phone"
                                )}
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* reCAPTCHA container for linking */}
                <div id="recaptcha-container-link" className="hidden"></div>
            </DialogContent>
        </Dialog>
    )
}
