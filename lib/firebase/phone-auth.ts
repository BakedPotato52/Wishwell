import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    type ConfirmationResult,
    PhoneAuthProvider,
    linkWithCredential,
    type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./config"
import type { FirebaseUser } from "@/lib/types"

export interface PhoneAuthError {
    code: string
    message: string
}

export interface AdditionalUserData {
    name: string
    email?: string
    gender: "Men" | "Women"
    address: string
    dateOfBirth?: string
    preferences?: {
        notifications: boolean
        newsletter: boolean
    }
}

export interface PhoneRegistrationData extends AdditionalUserData {
    phoneNumber: string
}

class PhoneAuthService {
    private recaptchaVerifier: RecaptchaVerifier | null = null
    private confirmationResult: ConfirmationResult | null = null

    // Initialize reCAPTCHA verifier
    initializeRecaptcha(containerId = "recaptcha-container"): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this.recaptchaVerifier) {
                    this.recaptchaVerifier.clear()
                }

                this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
                    size: "invisible",
                    callback: () => {
                        console.log("reCAPTCHA solved")
                        resolve()
                    },
                    "expired-callback": () => {
                        console.log("reCAPTCHA expired")
                        this.cleanup()
                        reject(new Error("reCAPTCHA expired. Please try again."))
                    },
                    "error-callback": (error: any) => {
                        console.error("reCAPTCHA error:", error)
                        this.cleanup()
                        reject(new Error("reCAPTCHA verification failed. Please try again."))
                    },
                })

                // Render the reCAPTCHA
                this.recaptchaVerifier
                    .render()
                    .then(() => {
                        resolve()
                    })
                    .catch((error) => {
                        console.error("reCAPTCHA render error:", error)
                        reject(error)
                    })
            } catch (error) {
                console.error("reCAPTCHA initialization error:", error)
                reject(error)
            }
        })
    }

    // Send verification code to phone number
    async sendVerificationCode(phoneNumber: string): Promise<void> {
        try {
            if (!this.recaptchaVerifier) {
                throw new Error("reCAPTCHA not initialized")
            }

            // Format phone number (ensure it starts with country code)
            const formattedPhone = this.formatPhoneNumber(phoneNumber)

            this.confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, this.recaptchaVerifier)

            console.log("Verification code sent successfully")
        } catch (error: any) {
            console.error("Error sending verification code:", error)
            this.cleanup()
            throw {
                code: error.code,
                message: this.getPhoneAuthErrorMessage(error.code),
            } as PhoneAuthError
        }
    }

    // Verify the code entered by user
    async verifyCode(code: string): Promise<User> {
        try {
            if (!this.confirmationResult) {
                throw new Error("No verification in progress")
            }

            const result = await this.confirmationResult.confirm(code)
            return result.user
        } catch (error: any) {
            console.error("Error verifying code:", error)
            throw {
                code: error.code,
                message: this.getPhoneAuthErrorMessage(error.code),
            } as PhoneAuthError
        }
    }

    // Complete registration with additional user data
    async completeRegistration(user: User, additionalData: AdditionalUserData): Promise<FirebaseUser> {
        try {
            // Create user document in Firestore
            const userDoc: FirebaseUser = {
                uid: user.uid,
                email: additionalData.email || null,
                name: additionalData.name,
                phone: user.phoneNumber || "",
                gender: additionalData.gender,
                address: additionalData.address,
                dateOfBirth: additionalData.dateOfBirth || null,
                photoURL: user.photoURL || null,
                emailVerified: user.emailVerified,
                phoneVerified: true, // Phone is verified through this process
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                preferences: additionalData.preferences || {
                    notifications: true,
                    newsletter: true,
                },
                registrationMethod: "phone",
            }

            await setDoc(doc(db, "users", user.uid), userDoc)

            // Return the user data with current timestamp for immediate use
            return {
                ...userDoc,
                createdAt: new Date() as any,
                updatedAt: new Date() as any,
            }
        } catch (error) {
            console.error("Error completing registration:", error)
            throw error
        }
    }

    // Link phone number to existing email account
    async linkPhoneToAccount(user: User, phoneNumber: string, verificationCode: string): Promise<void> {
        try {
            const credential = PhoneAuthProvider.credential(this.confirmationResult?.verificationId || "", verificationCode)

            await linkWithCredential(user, credential)

            // Update user document to mark phone as verified
            await this.updateUserPhoneVerification(user.uid, phoneNumber)
        } catch (error: any) {
            console.error("Error linking phone to account:", error)
            throw {
                code: error.code,
                message: this.getPhoneAuthErrorMessage(error.code),
            } as PhoneAuthError
        }
    }

    // Update user's phone verification status
    private async updateUserPhoneVerification(uid: string, phoneNumber: string): Promise<void> {
        try {
            const userDocRef = doc(db, "users", uid)
            const userDoc = await getDoc(userDocRef)

            if (userDoc.exists()) {
                await setDoc(
                    userDocRef,
                    {
                        phone: phoneNumber,
                        phoneVerified: true,
                        updatedAt: serverTimestamp(),
                    },
                    { merge: true },
                )
            }
        } catch (error) {
            console.error("Error updating phone verification:", error)
            throw error
        }
    }

    // Format phone number to international format
    private formatPhoneNumber(phoneNumber: string): string {
        // Remove all non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, "")

        // If it doesn't start with country code, assume India (+91)
        if (!cleaned.startsWith("91") && cleaned.length === 10) {
            return `+91${cleaned}`
        }

        // If it starts with 91 but no +, add it
        if (cleaned.startsWith("91") && !phoneNumber.startsWith("+")) {
            return `+${cleaned}`
        }

        // If it already has +, return as is
        if (phoneNumber.startsWith("+")) {
            return phoneNumber
        }

        // Default case
        return `+${cleaned}`
    }

    // Get user-friendly error messages
    private getPhoneAuthErrorMessage(errorCode: string): string {
        switch (errorCode) {
            case "auth/invalid-phone-number":
                return "Invalid phone number. Please enter a valid phone number."
            case "auth/missing-phone-number":
                return "Phone number is required."
            case "auth/quota-exceeded":
                return "SMS quota exceeded. Please try again later."
            case "auth/user-disabled":
                return "This account has been disabled."
            case "auth/operation-not-allowed":
                return "Phone authentication is not enabled."
            case "auth/invalid-verification-code":
                return "Invalid verification code. Please check and try again."
            case "auth/invalid-verification-id":
                return "Invalid verification ID. Please restart the process."
            case "auth/code-expired":
                return "Verification code has expired. Please request a new one."
            case "auth/too-many-requests":
                return "Too many requests. Please try again later."
            case "auth/network-request-failed":
                return "Network error. Please check your connection."
            case "auth/captcha-check-failed":
                return "reCAPTCHA verification failed. Please try again."
            default:
                return "An error occurred during phone verification. Please try again."
        }
    }

    // Cleanup resources
    cleanup(): void {
        if (this.recaptchaVerifier) {
            this.recaptchaVerifier.clear()
            this.recaptchaVerifier = null
        }
        this.confirmationResult = null
    }

    // Resend verification code
    async resendVerificationCode(phoneNumber: string): Promise<void> {
        // Clean up previous attempt
        this.cleanup()

        // Reinitialize and send new code
        await this.initializeRecaptcha()
        await this.sendVerificationCode(phoneNumber)
    }
}

// Export singleton instance
export const phoneAuthService = new PhoneAuthService()

// Export utility functions
export const formatPhoneForDisplay = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, "")
    if (cleaned.startsWith("91") && cleaned.length === 12) {
        const number = cleaned.substring(2)
        return `+91 ${number.substring(0, 5)} ${number.substring(5)}`
    }
    return phoneNumber
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/\D/g, "")
    // Indian phone numbers: 10 digits or 12 digits with country code
    return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith("91"))
}
