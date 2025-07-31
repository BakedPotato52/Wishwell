export interface LocationCoordinates {
    latitude: number
    longitude: number
}

export interface LocationError {
    code: number
    message: string
    type: "PERMISSION_DENIED" | "POSITION_UNAVAILABLE" | "TIMEOUT" | "GEOCODING_FAILED" | "NETWORK_ERROR" | "UNKNOWN"
}

export class LocationService {
    private static readonly OPENCAGE_API_URL = "https://geocode.maps.co/reverse"
    private static readonly NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/reverse"
    private static readonly REQUEST_TIMEOUT = 10000 // 10 seconds

    /**
     * Get formatted address from coordinates using OpenCage API with Nominatim fallback
     */
    static async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
        // Validate coordinates
        if (!this.isValidCoordinate(latitude, longitude)) {
            throw new Error("Invalid coordinates provided")
        }

        try {
            // Try OpenCage API first (more accurate, requires API key)
            if (process.env.NEXT_PUBLIC_OPENCAGE_API_KEY) {
                try {
                    const address = await this.getAddressFromGeoCode(latitude, longitude)
                    if (address) return address
                } catch (error) {
                    console.warn("OpenCage API failed, falling back to Nominatim:", error)
                }
            }

            // Fallback to Nominatim (free but less accurate)
            const address = await this.getAddressFromNominatim(latitude, longitude)
            if (address) return address

            throw new Error("No address found for the given coordinates")
        } catch (error) {
            console.error("Geocoding error:", error)

            if (error instanceof Error) {
                // Re-throw with more specific error message
                if (error.message.includes("fetch")) {
                    throw new Error(
                        "Network error: Unable to connect to geocoding service. Please check your internet connection.",
                    )
                }
                throw error
            }

            throw new Error("Unable to get address from location. Please try again or enter manually.")
        }
    }

    /**
     * Get address using OpenCage API
     */
    private static async getAddressFromGeoCode(latitude: number, longitude: number): Promise<string | null> {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT)

        try {
            const response = await fetch(
                `${this.OPENCAGE_API_URL}?lat=${latitude}&lon=${longitude}&api_key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`,
                {
                    signal: controller.signal,
                    headers: {
                        Accept: "application/json",
                    },
                },
            )

            clearTimeout(timeoutId)

            if (!response.ok) {
                if (response.status === 402) {
                    throw new Error("Geocoding service quota exceeded")
                }
                if (response.status === 403) {
                    throw new Error("Invalid API key for geocoding service")
                }
                throw new Error(`Geocoding service error: ${response.status}`)
            }

            const data = await response.json()

            if (data.results && data.results.length > 0) {
                return data.results[0].formatted
            }

            return null
        } catch (error) {
            clearTimeout(timeoutId)

            if (error instanceof Error && error.name === "AbortError") {
                throw new Error("Request timeout: Geocoding service took too long to respond")
            }

            throw error
        }
    }

    /**
     * Get address using Nominatim API
     */
    private static async getAddressFromNominatim(latitude: number, longitude: number): Promise<string | null> {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT)

        try {
            const response = await fetch(
                `${this.NOMINATIM_API_URL}?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                {
                    signal: controller.signal,
                    headers: {
                        "User-Agent": "OrderFlowApp/1.0 (contact@example.com)", // Required by Nominatim
                        Accept: "application/json",
                    },
                },
            )

            clearTimeout(timeoutId)

            if (!response.ok) {
                throw new Error(`Nominatim service error: ${response.status}`)
            }

            const data = await response.json()

            if (data.display_name) {
                return data.display_name
            }

            return null
        } catch (error) {
            clearTimeout(timeoutId)

            if (error instanceof Error && error.name === "AbortError") {
                throw new Error("Request timeout: Backup geocoding service took too long to respond")
            }

            throw error
        }
    }

    /**
     * Validate coordinates
     */
    private static isValidCoordinate(latitude: number, longitude: number): boolean {
        return (
            typeof latitude === "number" &&
            typeof longitude === "number" &&
            latitude >= -90 &&
            latitude <= 90 &&
            longitude >= -180 &&
            longitude <= 180 &&
            !isNaN(latitude) &&
            !isNaN(longitude)
        )
    }

    /**
     * Get current user location using browser geolocation API
     */
    static getCurrentLocation(options?: PositionOptions): Promise<LocationCoordinates> {
        return new Promise((resolve, reject) => {
            if (!this.isGeolocationSupported()) {
                reject(new Error("Geolocation is not supported by this browser. Please enter your address manually."))
                return
            }

            const defaultOptions: PositionOptions = {
                enableHighAccuracy: true,
                timeout: 15000, // 15 seconds
                maximumAge: 300000, // 5 minutes
                ...options,
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords

                    // Validate the received coordinates
                    if (!this.isValidCoordinate(latitude, longitude)) {
                        reject(new Error("Invalid location data received. Please try again or enter your address manually."))
                        return
                    }

                    resolve({ latitude, longitude })
                },
                (error) => {
                    let errorMessage = "An unknown error occurred while getting your location"
                    let errorType: LocationError["type"] = "UNKNOWN"

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage =
                                "Location access denied. Please enable location permissions in your browser settings and try again."
                            errorType = "PERMISSION_DENIED"
                            break
                        case error.POSITION_UNAVAILABLE:
                            errorMessage =
                                "Location information is unavailable. Please check your GPS/location services and try again."
                            errorType = "POSITION_UNAVAILABLE"
                            break
                        case error.TIMEOUT:
                            errorMessage = "Location request timed out. Please try again or enter your address manually."
                            errorType = "TIMEOUT"
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
            // Re-throw with context
            if (error instanceof Error) {
                throw error
            }
            throw new Error("Failed to get current address")
        }
    }

    /**
     * Check if geolocation is supported
     */
    static isGeolocationSupported(): boolean {
        return "geolocation" in navigator && typeof navigator.geolocation.getCurrentPosition === "function"
    }

    /**
     * Request location permission (useful for checking permission status)
     */
    static async requestLocationPermission(): Promise<PermissionState> {
        if ("permissions" in navigator) {
            try {
                const permission = await navigator.permissions.query({ name: "geolocation" })
                return permission.state
            } catch (error) {
                console.warn("Unable to query geolocation permission:", error)
                throw new Error("Unable to check location permissions")
            }
        }
        throw new Error("Permissions API not supported in this browser")
    }

    /**
     * Get permission status without requesting
     */
    static async getLocationPermissionStatus(): Promise<PermissionState | null> {
        try {
            return await this.requestLocationPermission()
        } catch (error) {
            return null
        }
    }
}
