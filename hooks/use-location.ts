"use client"

import { useState, useCallback } from "react"
import { LocationService, type LocationCoordinates } from "@/lib/location-services"

interface UseLocationReturn {
    coordinates: LocationCoordinates | null
    address: string | null
    isLoading: boolean
    error: string | null
    getCurrentLocation: () => Promise<void>
    getCurrentAddress: () => Promise<void>
    clearError: () => void
    isSupported: boolean
}

export function useLocation(): UseLocationReturn {
    const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null)
    const [address, setAddress] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    const getCurrentLocation = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const coords = await LocationService.getCurrentLocation()
            setCoordinates(coords)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to get location")
        } finally {
            setIsLoading(false)
        }
    }, [])

    const getCurrentAddress = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const currentAddress = await LocationService.getCurrentAddress()
            setAddress(currentAddress)

            // Also set coordinates if we got them during the process
            const coords = await LocationService.getCurrentLocation()
            setCoordinates(coords)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to get address")
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        coordinates,
        address,
        isLoading,
        error,
        getCurrentLocation,
        getCurrentAddress,
        clearError,
        isSupported: LocationService.isGeolocationSupported(),
    }
}
