"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, MapPin, CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { createOrder } from "@/lib/firebase/firestore"
import {
  clearCheckoutOverride,
  computeSubtotal,
  getCheckoutOverride,
  convertToCartItems,
  type CheckoutOverride,
} from "@/lib/checkout-override"

export default function CheckoutPage() {
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const { state: authState } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  console.log(error)
  // Buy Now override handling
  const [override, setOverride] = useState<CheckoutOverride | null>(null)
  const isBuyNowMode = searchParams.get("mode") === "buy-now"

  useEffect(() => {
    if (isBuyNowMode) {
      try {
        const ov = getCheckoutOverride()
        setOverride(ov)
      } catch {
        setOverride(null)
      }
    } else {
      setOverride(null)
    }
  }, [isBuyNowMode])

  const selectedItems = useMemo(() => {
    return override?.items ?? cartState.items
  }, [override?.items, cartState.items])

  const subtotal = useMemo(() => {
    return override ? computeSubtotal(override.items) : cartState.total
  }, [override, cartState.total])

  const additionalFees = 50
  const orderTotal = subtotal + additionalFees

  const backLink = override?.returnTo || "/cart"
  const backLabel = override?.returnTo ? "Back" : "Review Your order"

  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`,
      )

      if (!response.ok) {
        throw new Error("Geocoding failed")
      }

      const data = await response.json()

      if (data.results && data.results.length > 0) {
        return data.results[0].formatted
      }

      throw new Error("No address found")
    } catch (error) {
      // Fallback service
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        )

        if (!response.ok) {
          throw new Error("Fallback geocoding failed")
        }

        const data = await response.json()

        if (data.display_name) {
          return data.display_name
        }

        throw new Error("No address found in fallback")
      } catch {
        throw new Error("Unable to get address from location")
      }
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      return
    }

    setIsGettingLocation(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const address = await getAddressFromCoordinates(latitude, longitude)

          setNewAddress((prev) => ({
            ...prev,
            address: address,
          }))
        } catch (error) {
          setError("Unable to get address from your location. Please enter manually.")
        } finally {
          setIsGettingLocation(false)
        }
      },
      (error) => {
        setIsGettingLocation(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied. Please enable location permissions and try again.")
            break
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setError("Location request timed out. Please try again.")
            break
          default:
            setError("An unknown error occurred while getting location.")
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const handleAddressSubmit = () => {
    setDeliveryAddress(`${newAddress.name}, ${newAddress.address}, ${newAddress.phone}`)
    setIsAddressDialogOpen(false)
    setNewAddress({ name: "", address: "", phone: "" })
  }

  const handlePlaceOrder = async () => {
    if (!authState.user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      })
      return
    }

    if (selectedItems.length === 0) {
      toast({
        title: "No items to checkout",
        description: "Please add items or select Buy Now again.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const orderData = {
        userId: authState.user.uid,
        items: override ? convertToCartItems(override.items) : selectedItems,
        deliveryAddress,
        paymentMethod,
        total: orderTotal,
        subtotal,
        additionalFees,
        status: "confirmed" as const,
        estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000),
        trackingSteps: [
          {
            status: "confirmed" as const,
            timestamp: new Date(),
            description: "Order confirmed and payment received",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const orderId = await createOrder(authState.user.uid, orderData)

      // Cart behavior:
      // - Full-cart checkout: clear full cart
      // - Buy-now checkout: leave cart intact
      if (!override) {
        cartDispatch({ type: "CLEAR_CART" })
      }

      clearCheckoutOverride()

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId.slice(-8)} has been confirmed.`,
      })

      router.push(`/orders/${orderId}`)
    } catch (error) {
      console.error("Error placing order:", error)
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (selectedItems.length === 0) {
    const emptyTitle = isBuyNowMode ? "No item selected for Buy Now" : "No items to checkout"
    const emptyCtaHref = isBuyNowMode ? override?.returnTo || "/" : "/"
    const emptyCtaLabel = isBuyNowMode ? "Go Back" : "Continue Shopping"
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{emptyTitle}</h1>
          <Link href={emptyCtaHref}>
            <Button>{emptyCtaLabel}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href={override?.returnTo || "/cart"}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {override?.returnTo ? "Back" : "Review Your order"}
          </Button>
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            1
          </div>
          <span className="text-sm">Review</span>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            2
          </div>
          <span className="text-sm">Payment</span>
        </div>
      </div>

      {/* Order Items */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 mb-4 last:mb-0">
              <Image
                src={item.product.image || "/placeholder.svg?height=60&width=60&query=product-thumbnail"}
                alt={item.product.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.product.name}</h4>
                <p className="text-blue-600 font-bold">₹{item.product.price}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          {deliveryAddress ? (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p>{deliveryAddress}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent"
                onClick={() => setIsAddressDialogOpen(true)}
              >
                Change Address
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Show existing user address if available */}
              {authState.user?.address && (
                <div className="p-4 bg-blue-50 rounded-lg border">
                  <h4 className="font-semibold mb-2">Your Saved Address</h4>
                  <p className="text-sm text-gray-700 mb-3">{authState.user.address}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDeliveryAddress(authState?.user?.address || "")
                      setIsAddressDialogOpen(false)
                    }}
                  >
                    Use This Address
                  </Button>
                </div>
              )}

              <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    {authState.user?.address ? "Add New Address" : "Select Delivery Address"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">Select Delivery Address</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="text-sm font-medium">+ ADD NEW DELIVERY ADDRESS</div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Customer Name</Label>
                        <Input
                          id="name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Full Address</Label>
                        <div className="flex gap-2">
                          <Input
                            id="address"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            placeholder="Enter your full address"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={getCurrentLocation}
                            disabled={isGettingLocation}
                            className="px-3 bg-transparent"
                            title="Get current location"
                          >
                            {isGettingLocation ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {isGettingLocation && <p className="text-xs text-blue-600 mt-1">Getting your location...</p>}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <Button onClick={handleAddressSubmit} className="w-full">
                        Deliver to this Address
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      {step === 2 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="flex items-center space-x-3">
                  <Label htmlFor="cod" className="cursor-pointer flex-1">
                    Cash on Delivery
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Price Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Price Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Product Price</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Additional Fees</span>
              <span>₹{additionalFees}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Order Total</span>
              <span>₹{orderTotal}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="fixed md:hidden max-md:bottom-16 left-0 right-0 bg-white border-t p-4 md:relative md:border-0 md:p-0">
        <div className="container mx-auto">
          {step === 1 ? (
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setStep(2)}
              disabled={!deliveryAddress}
            >
              Proceed to Payment
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
