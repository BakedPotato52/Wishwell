export interface LocationCoordinates {
    latitude: number
    longitude: number
}

export interface LocationError {
    code: number
    message: string
}

export class LocationService {
    private static readonly GEOCODE_API_URL = "https://geocode.maps.co/reverse"
    private static readonly NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/reverse"

    /**
     * Get formatted address from coordinates using OpenCage API with Nominatim fallback
     */
    static async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
        try {
            // Try OpenCage API first (more accurate, requires API key)
            if (process.env.NEXT_PUBLIC_GEOCODE_API_KEY) {
                const response = await fetch(
                    `${this.GEOCODE_API_URL}?lat=${latitude}&lon=${longitude}&api_key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`,
                )

                if (response.ok) {
                    const data = await response.json()
                    if (data.results && data.results.length > 0) {
                        return data.results[0].formatted
                    }
                }
            }

            // Fallback to Nominatim (free but less accurate)
            const response = await fetch(
                `${this.NOMINATIM_API_URL}?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                {
                    headers: {
                        "User-Agent": "OrderFlowApp/1.0", // Required by Nominatim
                    },
                },
            )

            if (!response.ok) {
                throw new Error("Geocoding service unavailable")
            }

            const data = await response.json()
            if (data.display_name) {
                return data.display_name
            }

            throw new Error("No address found for the given coordinates")
        } catch (error) {
            console.error("Geocoding error:", error)
            throw new Error("Unable to get address from location")
        }
    }

    /**
     * Get current user location using browser geolocation API
     */
    static getCurrentLocation(options?: PositionOptions): Promise<LocationCoordinates> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported by this browser"))
                return
            }

            const defaultOptions: PositionOptions = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
                ...options,
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                (error) => {
                    let errorMessage = "An unknown error occurred while getting location"

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Location access denied. Please enable location permissions and try again."
                            break
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information is unavailable."
                            break
                        case error.TIMEOUT:
                            errorMessage = "Location request timed out. Please try again."
                            break
                    }

                    reject(new Error(errorMessage))
                },
                defaultOptions,
            )
        })
    }

    /**
     * Get current address by combining location and geocoding
     */
    static async getCurrentAddress(options?: PositionOptions): Promise<string> {
        try {
            const coordinates = await this.getCurrentLocation(options)
            const address = await this.getAddressFromCoordinates(coordinates.latitude, coordinates.longitude)
            return address
        } catch (error) {
            throw error
        }
    }

    /**
     * Check if geolocation is supported
     */
    static isGeolocationSupported(): boolean {
        return "geolocation" in navigator
    }

    /**
     * Request location permission (useful for checking permission status)
     */
    static async requestLocationPermission(): Promise<PermissionState> {
        if ("permissions" in navigator) {
            const permission = await navigator.permissions.query({ name: "geolocation" })
            return permission.state
        }
        throw new Error("Permissions API not supported")
    }
}
