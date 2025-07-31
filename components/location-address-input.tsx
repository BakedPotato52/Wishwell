"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface LocationAddressInputProps {
    onLocationDetected?: (address: string, coordinates: { latitude: number; longitude: number }) => void
    value?: string | null
    onChange?: (value: string) => void
    placeholder?: string
    label?: string
}

const LocationAddressInput: React.FC<LocationAddressInputProps> = ({ onLocationDetected, value, onChange, placeholder = "Enter address...", label = "Address" }) => {
    const [detectedAddress, setDetectedAddress] = useState("")
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handleLocation = async () => {
            if (!navigator.geolocation) {
                setError("Browser Not Supported")
                return
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                (error) => {
                    setError(error.message)
                },
            )
        }

        handleLocation()
    }, [])

    useEffect(() => {
        // Call callback if provided
        if (
            onLocationDetected &&
            coordinates &&
            typeof coordinates === "object" &&
            coordinates !== null &&
            typeof coordinates.latitude === "number" &&
            typeof coordinates.longitude === "number"
        ) {
            onLocationDetected(detectedAddress, {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            })
        }
    }, [coordinates, detectedAddress, onLocationDetected])

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}
            {/* Debug Coordinates Display (optional - remove in production) */}
            {process.env.NODE_ENV === "development" && coordinates && (
                <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded border">
                    <div>Debug Info:</div>
                    <div>
                        Coordinates:{" "}
                        {typeof coordinates.latitude === "number" && typeof coordinates.longitude === "number"
                            ? `Latitude: ${coordinates.latitude.toFixed(7)}, Longitude: ${coordinates.longitude.toFixed(7)}`
                            : "Invalid coordinates"}
                    </div>
                </div>
            )}
            {coordinates && (
                <div>
                    <p>Latitude: {coordinates.latitude.toString()}</p>
                    <p>Longitude: {coordinates.longitude.toString()}</p>
                </div>
            )}
            {!coordinates && <p>No location detected</p>}
        </div>
    )
}

export default LocationAddressInput
