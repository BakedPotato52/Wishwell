"use client"

import type { LocationCoordinates } from "@/lib/location-services"

interface CoordinateDisplayProps {
    coordinates: LocationCoordinates | null
    format?: "simple" | "detailed" | "dms"
    className?: string
}

export function CoordinateDisplay({
    coordinates,
    format = "detailed",
    className = "text-sm text-gray-600",
}: CoordinateDisplayProps) {
    if (!coordinates || typeof coordinates.latitude !== "number" || typeof coordinates.longitude !== "number") {
        return <span className={className}>No coordinates available</span>
    }

    const formatCoordinates = (coords: LocationCoordinates, formatType: string): string => {
        const { latitude, longitude } = coords

        switch (formatType) {
            case "simple":
                return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`

            case "detailed":
                return `Latitude: ${latitude.toFixed(7)}, Longitude: ${longitude.toFixed(7)}`

            case "dms":
                // Convert to Degrees, Minutes, Seconds format
                const latDMS = convertToDMS(latitude, "lat")
                const lngDMS = convertToDMS(longitude, "lng")
                return `${latDMS}, ${lngDMS}`

            default:
                return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }
    }

    const convertToDMS = (decimal: number, type: "lat" | "lng"): string => {
        const absolute = Math.abs(decimal)
        const degrees = Math.floor(absolute)
        const minutes = Math.floor((absolute - degrees) * 60)
        const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(2)

        const direction = type === "lat" ? (decimal >= 0 ? "N" : "S") : decimal >= 0 ? "E" : "W"

        return `${degrees}°${minutes}'${seconds}"${direction}`
    }

    return <span className={className}>{formatCoordinates(coordinates, format)}</span>
}

// Utility function to safely format coordinates as string
export function formatCoordinatesString(
    coordinates: LocationCoordinates | null,
    format: "simple" | "detailed" = "detailed",
): string {
    if (!coordinates || typeof coordinates.latitude !== "number" || typeof coordinates.longitude !== "number") {
        return "No coordinates available"
    }

    if (format === "detailed") {
        return `Latitude: ${coordinates.latitude.toFixed(7)}, Longitude: ${coordinates.longitude.toFixed(7)}`
    }

    return `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`
}
