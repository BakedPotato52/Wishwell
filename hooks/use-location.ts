"use client"

import { useState, useCallback, useRef } from "react"
import { LocationService, type LocationCoordinates } from "@/lib/location-services"

interface UseLocationReturn {
    coordinates: LocationCoordinates | null
    address: string | null
    isLoading: boolean
    error: string | null
    getCurrentLocation: () => Promise<LocationCoordinates>
    getCurrentAddress: () => Promise<string>
    getAddressFromCoordinates: (lat: number, lng: number) => Promise<string>
    clearError: () => void
    clearData: () => void
    isSupported: boolean
    permissionStatus: PermissionState | null
    formattedCoordinates: string | null
    coordinatesDisplay: string | null // New field for user-friendly display
    getCoordinateString: (format?: "simple" | "detailed") => string | null // Helper function
}

export function useLocation(): UseLocationReturn {
    const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null)
    const [address, setAddress] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null)

    // Use ref to prevent multiple simultaneous requests
    const isRequestingRef = useRef(false)

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    const clearData = useCallback(() => {
        setCoordinates(null)
        setAddress(null)
        setError(null)
    }, [])

    // Helper function to format coordinates safely
    const getCoordinateString = useCallback(
        (format: "simple" | "detailed" = "simple"): string | null => {
            if (!coordinates || typeof coordinates.latitude !== "number" || typeof coordinates.longitude !== "number") {
                return null
            }

            if (format === "detailed") {
                return `Latitude: ${coordinates.latitude.toFixed(7)}, Longitude: ${coordinates.longitude.toFixed(7)}`
            }

            return `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`
        },
        [coordinates],
    )

    const getCurrentLocation = useCallback(async (): Promise<LocationCoordinates> => {
        if (isRequestingRef.current) {
            throw new Error("Location request already in progress")
        }

        setIsLoading(true)
        setError(null)
        isRequestingRef.current = true

        try {
            // Check permission status first
            const permission = await LocationService.getLocationPermissionStatus()
            setPermissionStatus(permission)

            const coords = await LocationService.getCurrentLocation({
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 300000, // 5 minutes
            })

            setCoordinates(coords)
            return coords
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to get location"
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setIsLoading(false)
            isRequestingRef.current = false
        }
    }, [])

    const getAddressFromCoordinates = useCallback(async (lat: number, lng: number): Promise<string> => {
        setIsLoading(true)
        setError(null)

        try {
            const addressResult = await LocationService.getAddressFromCoordinates(lat, lng)
            setAddress(addressResult)
            return addressResult
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to get address"
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const getCurrentAddress = useCallback(async (): Promise<string> => {
        if (isRequestingRef.current) {
            throw new Error("Location request already in progress")
        }

        setIsLoading(true)
        setError(null)
        isRequestingRef.current = true

        try {
            // Check permission status first
            const permission = await LocationService.getLocationPermissionStatus()
            setPermissionStatus(permission)

            const currentAddress = await LocationService.getCurrentAddress({
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 300000, // 5 minutes
            })

            // Also get coordinates for completeness
            const coords = await LocationService.getCurrentLocation()
            setCoordinates(coords)
            setAddress(currentAddress)

            return currentAddress
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to get address"
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setIsLoading(false)
            isRequestingRef.current = false
        }
    }, [])

    return {
        coordinates,
        address,
        isLoading,
        error,
        getCurrentLocation,
        getCurrentAddress,
        getAddressFromCoordinates,
        clearError,
        clearData,
        isSupported: LocationService.isGeolocationSupported(),
        permissionStatus,
        formattedCoordinates: getCoordinateString("simple"),
        coordinatesDisplay: getCoordinateString("detailed"),
        getCoordinateString,
    }
}
