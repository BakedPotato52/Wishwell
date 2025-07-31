"use client"

import { useState, useEffect } from "react"
import { MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLocation } from "@/hooks/use-location"
import { useToast } from "@/hooks/use-toast"

interface LocationAddressInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
    required?: boolean
}

export function LocationAddressInput({
    value,
    onChange,
    placeholder = "Enter your address",
    label = "Address",
    required = false,
}: LocationAddressInputProps) {
    const { toast } = useToast()
    const { address: detectedAddress, isLoading, error, getCurrentAddress, clearError, isSupported } = useLocation()

    const [showLocationButton, setShowLocationButton] = useState(true)

    useEffect(() => {
        if (detectedAddress) {
            onChange(detectedAddress)
            setShowLocationButton(false)
            toast({
                title: "Location Detected",
                description: "Your address has been automatically filled from your location.",
            })
        }
    }, [detectedAddress, onChange, toast])

    const handleGetLocation = async () => {
        clearError()
        try {
            await getCurrentAddress()
        } catch (err) {
            toast({
                title: "Location Error",
                description: "Unable to get your location. Please enter your address manually.",
                variant: "destructive",
            })
        }
    }

    const handleManualInput = () => {
        setShowLocationButton(false)
        clearError()
    }

    return (
        <div className="space-y-2">
            <Label htmlFor="address">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            {showLocationButton && isSupported && (
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGetLocation}
                        disabled={isLoading}
                        className="flex-1 bg-transparent"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                Getting Location...
                            </>
                        ) : (
                            <>
                                <MapPin className="h-4 w-4 mr-2" />
                                Use Current Location
                            </>
                        )}
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={handleManualInput}>
                        Manual
                    </Button>
                </div>
            )}

            <Input
                id="address"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                disabled={isLoading}
            />

            {error && (
                <Alert variant="destructive">
                    <AlertDescription className="flex items-center justify-between">
                        {error}
                        <Button variant="ghost" size="sm" onClick={clearError}>
                            <X className="h-4 w-4" />
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {!isSupported && (
                <Alert>
                    <AlertDescription>
                        Location services are not supported in this browser. Please enter your address manually.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}
