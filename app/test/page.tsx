"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocation } from "@/hooks/use-location"
import { CoordinateDisplay, formatCoordinatesString } from "@/components/coordinate-display"
import LocationAddressInput from "@/components/location-address-input"

export default function TestLocationPage() {
    const {
        coordinates,
        address,
        isLoading,
        error,
        getCurrentLocation,
        getCurrentAddress,
        coordinatesDisplay,
        getCoordinateString,
    } = useLocation()

    const [testAddress, setTestAddress] = useState("")

    const handleGetLocation = async () => {
        try {
            await getCurrentLocation()
        } catch (err) {
            console.error("Location error:", err)
        }
    }

    const handleGetAddress = async () => {
        try {
            await getCurrentAddress()
        } catch (err) {
            console.error("Address error:", err)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Location Testing Page</h1>

            <div className="space-y-6">
                {/* Location Address Input Component */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location Address Input</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LocationAddressInput
                            value={testAddress}
                            onChange={setTestAddress}
                            placeholder="Enter your address"
                            label="Test Address"
                            onLocationDetected={(address, coords) => {
                                console.log("Location detected:", {
                                    address,
                                    formattedCoords: formatCoordinatesString(coords),
                                })
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Manual Location Testing */}
                <Card>
                    <CardHeader>
                        <CardTitle>Manual Location Testing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Button onClick={handleGetLocation} disabled={isLoading}>
                                {isLoading ? "Getting Location..." : "Get Coordinates"}
                            </Button>
                            <Button onClick={handleGetAddress} disabled={isLoading} variant="outline">
                                {isLoading ? "Getting Address..." : "Get Address"}
                            </Button>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                                <strong>Error:</strong> {error}
                            </div>
                        )}

                        {coordinates && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">Coordinates (Different Formats):</h3>
                                <div className="space-y-1 text-sm">
                                    <div>
                                        <strong>Simple:</strong> <CoordinateDisplay coordinates={coordinates} format="simple" />
                                    </div>
                                    <div>
                                        <strong>Detailed:</strong> <CoordinateDisplay coordinates={coordinates} format="detailed" />
                                    </div>
                                    <div>
                                        <strong>DMS:</strong> <CoordinateDisplay coordinates={coordinates} format="dms" />
                                    </div>
                                    <div>
                                        <strong>Hook Method:</strong> {coordinatesDisplay || "N/A"}
                                    </div>
                                    <div>
                                        <strong>Utility Function:</strong> {formatCoordinatesString(coordinates)}
                                    </div>
                                </div>
                            </div>
                        )}

                        {address && (
                            <div>
                                <h3 className="font-semibold">Detected Address:</h3>
                                <p className="text-sm text-gray-600 mt-1">{address}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Raw Data Display (for debugging) */}
                {process.env.NODE_ENV === "development" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Debug Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-xs font-mono">
                                <div>
                                    <strong>Coordinates Object:</strong>
                                    {coordinates ? (
                                        <pre className="mt-1 p-2 bg-gray-100 rounded overflow-auto">
                                            {JSON.stringify(coordinates, null, 2)}
                                        </pre>
                                    ) : (
                                        <span className="text-gray-500"> null</span>
                                    )}
                                </div>
                                <div>
                                    <strong>Address:</strong>
                                    <span className="text-gray-600"> {address || "null"}</span>
                                </div>
                                <div>
                                    <strong>Loading:</strong>
                                    <span className="text-gray-600"> {isLoading.toString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
